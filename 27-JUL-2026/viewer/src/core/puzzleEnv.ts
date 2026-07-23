import * as ort from "onnxruntime-web";
import {
  clamp,
  mat3ToQuat,
  quatFromZRadians,
  quatInv,
  quatMul,
  quatRotate,
  quatToAxisAngle,
  yawFromMat,
} from "./puzzleMath";
import { SeededRng } from "./rng";
import { solveUr5eIkWithStatus } from "./ur5eAnalyticIk";

export type Manifest = {
  env_name: string;
  timing: { sim_dt: number; ctrl_dt: number; n_substeps: number; episode_length: number };
  ids: Record<string, number[] | number>;
  reset: Record<string, number[]>;
  constants: Record<string, number | number[] | number[][]>;
};

type StepInfo = {
  reward: number;
  accumulatedReward: number;
  rewardTrace: number[];
  success: boolean;
  done: boolean;
  step: number;
  policyLoaded: boolean;
  ikNoSolution: boolean;
  controller: "policy" | "oracle" | "zero";
};

function metadataDim(session: ort.InferenceSession, name: string, axis: number) {
  const metadata = (session as unknown as { inputMetadata?: unknown }).inputMetadata;
  if (Array.isArray(metadata)) {
    const entry = metadata.find((item) => item && typeof item === "object" && (item as { name?: unknown }).name === name);
    const shape = (entry as { shape?: unknown[] } | undefined)?.shape;
    const dim = shape?.[axis];
    return typeof dim === "number" && dim > 0 ? dim : null;
  }
  if (metadata && typeof metadata === "object") {
    const entry = (metadata as Record<string, { dimensions?: unknown[]; shape?: unknown[] }>)[name];
    const dim = (entry?.dimensions ?? entry?.shape)?.[axis];
    return typeof dim === "number" && dim > 0 ? dim : null;
  }
  return null;
}

function firstTensor(result: ort.InferenceSession.ReturnType, preferred: string) {
  return result[preferred] ?? result[Object.keys(result)[0]];
}

function vec3(values: ArrayLike<number>, offset: number) {
  return [values[offset], values[offset + 1], values[offset + 2]];
}

function finite(values: number[]) {
  return values.every(Number.isFinite);
}

function norm(values: number[]) {
  return Math.hypot(...values);
}

function cross(a: number[], b: number[]) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function shapeDiff(diff: number[], minNorm = 0.4) {
  const diffNorm = norm(diff);
  if (diffNorm >= minNorm) return diff;
  const scale = minNorm / (diffNorm + 1e-6);
  return diff.map((value) => value * scale);
}

function toggleMatrix3x3() {
  const matrix = Array.from({ length: 9 }, () => Array(9).fill(0));
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      const pressed = row * 3 + col;
      for (const [drow, dcol] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const neighborRow = row + drow;
        const neighborCol = col + dcol;
        if (neighborRow >= 0 && neighborRow < 3 && neighborCol >= 0 && neighborCol < 3) {
          matrix[pressed][neighborRow * 3 + neighborCol] = 1;
        }
      }
    }
  }
  return matrix;
}

function solvePuzzle3x3Presses(buttonStates: number[], targetButtonStates: number[]) {
  const toggle = toggleMatrix3x3();
  const delta = targetButtonStates.map((target, i) => (target - buttonStates[i] + 2) % 2);
  let best: number[] | null = null;
  for (let mask = 0; mask < 1 << 9; mask += 1) {
    const presses = Array.from({ length: 9 }, (_, idx) => (mask >> idx) & 1);
    const outcome = Array(9).fill(0);
    for (let pressed = 0; pressed < 9; pressed += 1) {
      if (!presses[pressed]) continue;
      for (let j = 0; j < 9; j += 1) outcome[j] = (outcome[j] + toggle[pressed][j]) % 2;
    }
    if (outcome.every((value, i) => value === delta[i])) {
      const sequence = presses.map((value, idx) => (value ? idx : -1)).filter((idx) => idx >= 0);
      if (best === null || sequence.length < best.length) best = sequence;
    }
  }
  if (!best) throw new Error("No 3x3 puzzle oracle solution.");
  return best;
}

class PuzzleButtonOracle {
  private targetButton: number | null = null;
  private targetButtonState: number | null = null;
  private finalPos = [0.42, 0, 0.24];
  private finalYaw = 0;

  constructor(
    private readonly rng: SeededRng,
    private readonly armSamplingBounds: number[][],
  ) {}

  reset() {
    this.targetButton = null;
    this.targetButtonState = null;
    this.finalPos = this.sampleFinalPos();
    this.finalYaw = this.sampleUniform(-Math.PI, Math.PI);
  }

  selectAction(env: PuzzleEnv) {
    const { current, target } = env.buttons();

    if (this.targetButton !== null && this.targetButtonState !== null) {
      if (current[this.targetButton] === this.targetButtonState) {
        this.targetButton = null;
        this.targetButtonState = null;
      }
    }

    if (this.targetButton === null) {
      if (current.every((value, i) => value === target[i])) {
        return new Float32Array(5);
      }
      const sequence = solvePuzzle3x3Presses(current, target);
      this.targetButton = sequence[0];
      this.targetButtonState = 1 - current[this.targetButton];
      this.finalPos = this.sampleFinalPos();
      this.finalYaw = this.sampleUniform(-Math.PI, Math.PI);
    }

    return Float32Array.from(this.selectButtonAction(env, this.targetButton, this.targetButtonState!));
  }

  private selectButtonAction(env: PuzzleEnv, targetButton: number, targetState: number) {
    const info = env.oracleInfo();
    const effectorPos = info.effectorPos;
    const effectorYaw = info.effectorYaw;
    const buttonTop = info.buttonTopPositions[targetButton];
    const buttonTargetTop = [buttonTop[0], buttonTop[1], buttonTop[2] + 0.06];
    const buttonTargetBottom = [buttonTop[0], buttonTop[1], buttonTop[2] - 0.022];
    const buttonState = info.buttonStates[targetButton];

    const aboveThreshold = 0.16;
    const above = effectorPos[2] > aboveThreshold;
    const xyAligned = norm([buttonTargetTop[0] - effectorPos[0], buttonTargetTop[1] - effectorPos[1]]) <= 0.04;
    const targetAchieved = buttonState === targetState;
    const finalPosAligned = norm(this.finalPos.map((value, i) => value - effectorPos[i])) <= 0.04;
    const gainPos = 5;
    const gainYaw = 3;
    const action = [0, 0, 0, 0, 0];

    if (!targetAchieved) {
      const target = xyAligned ? buttonTargetBottom : buttonTargetTop;
      const diff = shapeDiff(target.map((value, i) => value - effectorPos[i]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[4] = 1;
    } else if (!above) {
      const diff = shapeDiff([buttonTargetTop[0], buttonTargetTop[1], aboveThreshold * 2].map((value, i) => value - effectorPos[i]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[3] = (this.finalYaw - effectorYaw) * gainYaw;
      action[4] = -1;
    } else {
      const diff = shapeDiff(this.finalPos.map((value, i) => value - effectorPos[i]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[3] = (this.finalYaw - effectorYaw) * gainYaw;
      action[4] = -1;
      if (finalPosAligned) {
        this.targetButton = null;
        this.targetButtonState = null;
      }
    }

    return action.map((value) => clamp(value, -1, 1));
  }

  private sampleFinalPos() {
    const lower = this.armSamplingBounds[0] ?? [0.25, -0.35, 0.16];
    const upper = this.armSamplingBounds[1] ?? [0.6, 0.35, 0.35];
    return lower.map((lo, i) => this.sampleUniform(lo, upper[i] ?? lo));
  }

  private sampleUniform(low: number, high: number) {
    return low + this.rng.uniform() * (high - low);
  }
}

export class PuzzleEnv {
  private policy: ort.InferenceSession | null = null;
  private policyActionQueue: Float32Array[] = [];
  private rng = new SeededRng(0);
  private oracle = new PuzzleButtonOracle(this.rng, [[0.25, -0.35, 0.16], [0.6, 0.35, 0.35]]);
  private noiseDim = 10;
  private stepCount = 0;
  private accumulatedReward = 0;
  private rewardTrace: number[] = [];
  private buttonStates: number[];
  private prevButtonQpos: number[];
  private readonly targetButtonStates: number[];

  constructor(
    private mujoco: any,
    readonly model: any,
    readonly data: any,
    readonly manifest: Manifest,
  ) {
    this.buttonStates = [...manifest.reset.button_states];
    this.targetButtonStates = [...manifest.reset.target_button_states];
    this.prevButtonQpos = [...manifest.reset.prev_button_qpos];
    this.oracle = new PuzzleButtonOracle(this.rng, this.armSamplingBounds());
    this.reset(0);
  }

  async loadPolicy(url: string | null) {
    this.policyActionQueue = [];
    if (!url) {
      this.policy = null;
      return;
    }
    try {
      this.policy = await ort.InferenceSession.create(url, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });
      this.noiseDim = metadataDim(this.policy, "noise", 1) ?? this.noiseDim;
    } catch (error) {
      console.warn("Policy unavailable; using zero actions.", error);
      this.policy = null;
    }
  }

  reset(seed = 0) {
    this.rng = new SeededRng(seed);
    this.stepCount = 0;
    this.accumulatedReward = 0;
    this.rewardTrace = [];
    this.policyActionQueue = [];
    this.copyInto(this.data.qpos, this.manifest.reset.qpos);
    this.copyInto(this.data.qvel, this.manifest.reset.qvel);
    this.copyInto(this.data.ctrl, this.manifest.reset.ctrl);
    this.buttonStates = [...this.manifest.reset.button_states];
    this.prevButtonQpos = [...this.manifest.reset.prev_button_qpos];
    this.oracle = new PuzzleButtonOracle(this.rng, this.armSamplingBounds());
    this.oracle.reset();
    this.mujoco.mj_forward(this.model, this.data);
  }

  reseed(seed: number) {
    this.rng = new SeededRng(seed);
    this.policyActionQueue = [];
  }

  info(): StepInfo {
    const success = this.buttonStates.every((value, i) => value === this.targetButtonStates[i]);
    return {
      reward: this.denseReward(),
      accumulatedReward: this.accumulatedReward,
      rewardTrace: [...this.rewardTrace],
      success,
      done: success || this.stepCount >= this.manifest.timing.episode_length,
      step: this.stepCount,
      policyLoaded: this.policy !== null,
      ikNoSolution: false,
      controller: this.policy ? "policy" : "zero",
    };
  }

  buttons() {
    return { current: [...this.buttonStates], target: [...this.targetButtonStates] };
  }

  rewardHistory() {
    return {
      accumulatedReward: this.accumulatedReward,
      rewardTrace: [...this.rewardTrace],
    };
  }

  async policyAction() {
    const actionDim = (this.manifest.constants.action_low as number[]).length;
    if (!this.policy) return new Float32Array(actionDim);
    const queued = this.policyActionQueue.shift();
    if (queued) return queued;

    const obs = Float32Array.from(this.getObservation());
    const noise = new Float32Array(this.noiseDim);
    for (let i = 0; i < noise.length; i += 1) noise[i] = this.rng.normal();
    const result = await this.policy.run({
      obs: new ort.Tensor("float32", obs, [1, obs.length]),
      noise: new ort.Tensor("float32", noise, [1, noise.length]),
    });
    const raw = firstTensor(result, "action").data;
    const actionChunk = ArrayBuffer.isView(raw)
      ? new Float32Array(raw as Float32Array)
      : Float32Array.from(raw as unknown as number[]);
    for (let offset = 0; offset + actionDim <= actionChunk.length; offset += actionDim) {
      this.policyActionQueue.push(actionChunk.slice(offset, offset + actionDim));
    }
    return this.policyActionQueue.shift() ?? new Float32Array(actionDim);
  }

  async step(policyEnabled: boolean) {
    const action = policyEnabled ? await this.policyAction() : new Float32Array(5);
    return { ...this.stepWithAction(action), controller: policyEnabled && this.policy ? "policy" as const : "zero" as const };
  }

  stepOracle() {
    return { ...this.stepWithAction(this.oracle.selectAction(this)), controller: "oracle" as const };
  }

  stepWithAction(action: ArrayLike<number>) {
    const prevButtonQpos = this.buttonQpos();
    const prevButtonStates = [...this.buttonStates];
    const deltas = this.unnormalizeAction(action);
    const ikNoSolution = this.applyControl(deltas);
    for (let i = 0; i < this.manifest.timing.n_substeps; i += 1) {
      this.mujoco.mj_step(this.model, this.data);
    }
    this.mujoco.mj_rnePostConstraint?.(this.model, this.data);
    this.updateButtonStates(prevButtonStates, prevButtonQpos, this.buttonQpos());
    this.prevButtonQpos = prevButtonQpos;
    this.stepCount += 1;
    const reward = this.denseReward();
    this.accumulatedReward += reward;
    this.rewardTrace.push(reward);
    const maxTraceLength = this.manifest.timing.episode_length;
    if (this.rewardTrace.length > maxTraceLength) {
      this.rewardTrace = this.rewardTrace.slice(this.rewardTrace.length - maxTraceLength);
    }
    return { ...this.info(), reward, ikNoSolution };
  }

  getObservation() {
    const ids = this.manifest.ids;
    const c = this.manifest.constants;
    const armQpos = ids.arm_qposadr as number[];
    const armDof = ids.arm_dofadr as number[];
    const buttonQpos = ids.button_qposadr as number[];
    const buttonDof = ids.button_dofadr as number[];
    const pinchSite = ids.pinch_site_id as number;
    const rightPad = ids.right_pad_body_id as number;
    const xyzCenter = c.xyz_center as number[];
    const obs: number[] = [];

    for (const idx of armQpos) obs.push(this.data.qpos[idx]);
    for (const idx of armDof) obs.push(this.data.qvel[idx]);
    const pinch = vec3(this.data.site_xpos, pinchSite * 3);
    obs.push((pinch[0] - xyzCenter[0]) * 10, (pinch[1] - xyzCenter[1]) * 10, (pinch[2] - xyzCenter[2]) * 10);
    const yaw = yawFromMat(this.data.site_xmat, pinchSite * 9);
    obs.push(Math.cos(yaw), Math.sin(yaw));
    const gripperOpening = clamp(this.data.qpos[ids.gripper_opening_qposadr as number] / 0.8, 0, 1);
    obs.push(gripperOpening * 3.0);
    let cfrc = 0;
    for (let i = 0; i < 6; i += 1) cfrc += this.data.cfrc_ext[rightPad * 6 + i] ** 2;
    const limitContact = clamp(
      (this.data.qpos[ids.gripper_opening_qposadr as number] - (c.gripper_limit_contact_threshold as number)) *
        (c.gripper_limit_contact_gain as number),
      0,
      c.gripper_limit_contact_max as number,
    );
    obs.push(Math.max(clamp(Math.sqrt(cfrc) / 50.0, 0, 1), limitContact));
    for (let i = 0; i < 9; i += 1) {
      obs.push(this.buttonStates[i] === 0 ? 1 : 0, this.buttonStates[i] === 1 ? 1 : 0);
      obs.push(this.data.qpos[buttonQpos[i]] * 120.0);
      obs.push(this.data.qvel[buttonDof[i]]);
    }
    return obs;
  }

  oracleInfo() {
    const ids = this.manifest.ids;
    const pinchSite = ids.pinch_site_id as number;
    const buttonSiteIds = ids.button_site_ids as number[];
    return {
      buttonStates: [...this.buttonStates],
      targetButtonStates: [...this.targetButtonStates],
      effectorPos: vec3(this.data.site_xpos, pinchSite * 3),
      effectorYaw: yawFromMat(this.data.site_xmat, pinchSite * 9),
      gripperOpening: clamp(this.data.qpos[ids.gripper_opening_qposadr as number] / 0.8, 0, 1),
      buttonTopPositions: buttonSiteIds.map((siteId) => vec3(this.data.site_xpos, siteId * 3)),
    };
  }

  private armSamplingBounds() {
    const bounds = this.manifest.constants.arm_sampling_bounds as number[][] | undefined;
    if (Array.isArray(bounds) && bounds.length === 2) return bounds;
    return [[0.25, -0.35, 0.16], [0.6, 0.35, 0.35]];
  }

  private copyInto(dst: ArrayLike<number>, src: number[]) {
    for (let i = 0; i < src.length; i += 1) (dst as any)[i] = src[i];
  }

  private unnormalizeAction(action: ArrayLike<number>) {
    const low = this.manifest.constants.action_low as number[];
    const high = this.manifest.constants.action_high as number[];
    return low.map((lo, i) => 0.5 * (clamp(action[i] ?? 0, -1, 1) + 1.0) * (high[i] - lo) + lo);
  }

  private targetAttachPose(action: number[]) {
    const pinchSite = this.manifest.ids.pinch_site_id as number;
    const center = vec3(this.data.site_xpos, pinchSite * 3);
    const targetEffectorPos = [
      clamp(center[0] + action[0], 0.25, 0.6),
      clamp(center[1] + action[1], -0.35, 0.35),
      clamp(center[2] + action[2], 0.02, 0.35),
    ];
    const targetYaw = clamp(yawFromMat(this.data.site_xmat, pinchSite * 9) + action[3], -Math.PI, Math.PI);
    const downQuat = this.manifest.constants.down_quat as number[];
    const targetEffectorQuat = quatMul(quatFromZRadians(targetYaw), downQuat);
    const tPaPos = this.manifest.constants.t_pa_pos as number[];
    const tPaQuat = this.manifest.constants.t_pa_quat as number[];
    const rotated = quatRotate(targetEffectorQuat, tPaPos);
    return {
      pos: [
        targetEffectorPos[0] + rotated[0],
        targetEffectorPos[1] + rotated[1],
        targetEffectorPos[2] + rotated[2],
      ],
      quat: quatMul(targetEffectorQuat, tPaQuat),
    };
  }

  private applyControl(action: number[]) {
    const { pos, quat } = this.targetAttachPose(action);
    const { qpos, failed } = this.solveIk(pos, quat);
    const ids = this.manifest.ids;
    const armActuators = ids.arm_actuator_ids as number[];
    const gripperActuators = ids.gripper_actuator_ids as number[];
    const ctrlLow = this.manifest.constants.ctrl_low as number[];
    const ctrlHigh = this.manifest.constants.ctrl_high as number[];
    const gripperOpening = clamp(this.data.qpos[ids.gripper_opening_qposadr as number] / 0.8, 0, 1);
    const gripperTarget = clamp(gripperOpening + action[4], 0, 1);
    const nextCtrl = Array.from(this.data.ctrl);
    for (let i = 0; i < armActuators.length; i += 1) {
      const actuator = armActuators[i];
      nextCtrl[actuator] = clamp(qpos[i], ctrlLow[actuator], ctrlHigh[actuator]);
    }
    for (const actuator of gripperActuators) {
      nextCtrl[actuator] = clamp(255.0 * gripperTarget, ctrlLow[actuator], ctrlHigh[actuator]);
    }
    if (!nextCtrl.every(Number.isFinite)) {
      return true;
    }
    for (let i = 0; i < nextCtrl.length; i += 1) {
      this.data.ctrl[i] = nextCtrl[i];
    }
    return failed;
  }

  private solveIk(targetPos: number[], targetQuat: number[]) {
    const ids = this.manifest.ids;
    const armQpos = ids.arm_qposadr as number[];
    const original = armQpos.map((idx) => this.data.qpos[idx]);
    return solveUr5eIkWithStatus(original, targetPos, targetQuat);
  }

  private solveLinearSystem(a: number[][], b: number[]) {
    const n = b.length;
    const m = a.map((row, i) => [...row, b[i]]);
    for (let col = 0; col < n; col += 1) {
      let pivot = col;
      for (let row = col + 1; row < n; row += 1) {
        if (Math.abs(m[row][col]) > Math.abs(m[pivot][col])) pivot = row;
      }
      [m[col], m[pivot]] = [m[pivot], m[col]];
      const denom = Math.abs(m[col][col]) < 1e-12 ? 1e-12 : m[col][col];
      for (let j = col; j <= n; j += 1) m[col][j] /= denom;
      for (let row = 0; row < n; row += 1) {
        if (row === col) continue;
        const factor = m[row][col];
        for (let j = col; j <= n; j += 1) m[row][j] -= factor * m[col][j];
      }
    }
    return m.map((row) => row[n]);
  }

  private buttonQpos() {
    return (this.manifest.ids.button_qposadr as number[]).map((idx) => this.data.qpos[idx]);
  }

  private updateButtonStates(prevStates: number[], prevQpos: number[], currentQpos: number[]) {
    const toggle = this.manifest.constants.toggle_matrix as number[][];
    const next = [...prevStates];
    for (let pressed = 0; pressed < 9; pressed += 1) {
      if (prevQpos[pressed] > -0.02 && currentQpos[pressed] <= -0.02) {
        for (let j = 0; j < 9; j += 1) next[j] = (next[j] + toggle[pressed][j]) % 2;
      }
    }
    this.buttonStates = next;
  }

  private denseReward() {
    let matches = 0;
    for (let i = 0; i < this.buttonStates.length; i += 1) {
      if (this.buttonStates[i] === this.targetButtonStates[i]) matches += 1;
    }
    return matches - this.buttonStates.length;
  }
}
