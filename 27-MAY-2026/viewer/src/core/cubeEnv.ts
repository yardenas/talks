import * as ort from "onnxruntime-web";
import {
  clamp,
  mat3ToQuat,
  quatFromZRadians,
  quatInv,
  quatMul,
  quatNormalize,
  quatRotate,
  quatToAxisAngle,
  yawFromMat,
} from "./puzzleMath";
import { SeededRng } from "./rng";

export type CubeManifest = {
  env_name: string;
  timing: { sim_dt: number; ctrl_dt: number; n_substeps: number; episode_length: number };
  ids: Record<string, number[] | number | number[][]>;
  reset: Record<string, number[] | number[][]>;
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

type CubeOracleInfo = {
  effectorPos: number[];
  effectorYaw: number;
  gripperOpening: number;
  gripperContact: number;
  blockPositions: number[][];
  blockQuats: number[][];
  blockYaws: number[];
  targetXyzs: number[][];
  targetQuats: number[][];
  targetYaws: number[];
  successes: boolean[];
  success: boolean;
};

function vec3(values: ArrayLike<number>, offset: number) {
  return [values[offset], values[offset + 1], values[offset + 2]];
}

function sliceNumbers(values: { slice(start: number, end: number): ArrayLike<number> }, start: number, end: number) {
  return Array.from(values.slice(start, end)) as number[];
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

function yawFromQuat(quat: number[]) {
  const [w, x, y, z] = quatNormalize(quat);
  return Math.atan2(2.0 * (w * z + x * y), 1.0 - 2.0 * (y * y + z * z));
}

function shortestYaw(effectorYaw: number, objectYaw: number, n = 4) {
  let best = objectYaw;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let idx = -n; idx <= n; idx += 1) {
    const candidate = idx * 2.0 * Math.PI / n + objectYaw;
    const distance = Math.abs(effectorYaw - candidate);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = candidate;
    }
  }
  return best;
}

class CubeTaskOracle {
  private targetBlock: number | null = null;
  private done = false;
  private finalPos = [0.42, 0, 0.24];
  private finalYaw = 0;
  private step = 0;

  constructor(
    private readonly rng: SeededRng,
    private readonly armSamplingBounds: number[][],
  ) {}

  reset() {
    this.targetBlock = null;
    this.done = false;
    this.step = 0;
    this.finalPos = this.sampleFinalPos();
    this.finalYaw = this.sampleUniform(-Math.PI, Math.PI);
  }

  selectAction(env: CubeEnv) {
    const info = env.oracleInfo();
    if (this.targetBlock !== null && info.successes[this.targetBlock]) {
      this.targetBlock = null;
    }

    if (this.targetBlock === null) {
      const remaining = info.successes
        .map((success, idx) => (success ? -1 : idx))
        .filter((idx) => idx >= 0);
      if (remaining.length === 0) {
        this.done = true;
        return new Float32Array(5);
      }
      this.targetBlock = remaining[0];
      this.done = false;
      this.step = 0;
      this.finalPos = this.sampleFinalPos();
      this.finalYaw = this.sampleUniform(-Math.PI, Math.PI);
    }

    return Float32Array.from(this.selectBlockAction(info, this.targetBlock));
  }

  private selectBlockAction(info: CubeOracleInfo, targetBlock: number) {
    const effectorPos = info.effectorPos;
    const effectorYaw = info.effectorYaw;
    const blockPos = info.blockPositions[targetBlock];
    const blockYaw = shortestYaw(effectorYaw, info.blockYaws[targetBlock]);
    const targetPos = info.targetXyzs[targetBlock];
    const targetYaw = shortestYaw(effectorYaw, info.targetYaws[targetBlock]);

    const blockAboveOffset = [0, 0, 0.18];
    const aboveThreshold = 0.16;
    const gripperClosed = info.gripperContact > 0.5;
    const gripperOpen = info.gripperContact < 0.1;
    const above = effectorPos[2] > aboveThreshold;
    const xyAligned = norm([blockPos[0] - effectorPos[0], blockPos[1] - effectorPos[1]]) <= 0.04;
    const posAligned = norm(blockPos.map((value, idx) => value - effectorPos[idx])) <= 0.02;
    const targetXyAligned = norm([targetPos[0] - blockPos[0], targetPos[1] - blockPos[1]]) <= 0.04;
    const targetPosAligned = norm(targetPos.map((value, idx) => value - blockPos[idx])) <= 0.02;
    const finalPosAligned = norm(this.finalPos.map((value, idx) => value - effectorPos[idx])) <= 0.04;

    const gainPos = 5;
    const gainYaw = 3;
    const action = [0, 0, 0, 0, 0];
    if (!targetPosAligned) {
      if (!xyAligned) {
        const diff = shapeDiff(blockPos.map((value, idx) => value + blockAboveOffset[idx] - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (blockYaw - effectorYaw) * gainYaw;
        action[4] = -1;
      } else if (!posAligned) {
        const diff = shapeDiff(blockPos.map((value, idx) => value - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (blockYaw - effectorYaw) * gainYaw;
        action[4] = -1;
      } else if (!gripperClosed) {
        const diff = shapeDiff(blockPos.map((value, idx) => value - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (blockYaw - effectorYaw) * gainYaw;
        action[4] = 1;
      } else if (!above && !targetXyAligned) {
        const diff = shapeDiff([blockPos[0], blockPos[1], blockAboveOffset[2] * 2].map((value, idx) => value - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (targetYaw - blockYaw) * gainYaw;
        action[4] = 1;
      } else if (above && !targetXyAligned) {
        const diff = shapeDiff(targetPos.map((value, idx) => value + blockAboveOffset[idx] - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (targetYaw - blockYaw) * gainYaw;
        action[4] = 1;
      } else {
        const diff = shapeDiff(targetPos.map((value, idx) => value - effectorPos[idx]));
        action[0] = diff[0] * gainPos;
        action[1] = diff[1] * gainPos;
        action[2] = diff[2] * gainPos;
        action[3] = (targetYaw - blockYaw) * gainYaw;
        action[4] = 1;
      }
    } else if (!gripperOpen) {
      const diff = shapeDiff(targetPos.map((value, idx) => value - effectorPos[idx]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[3] = (targetYaw - blockYaw) * gainYaw;
      action[4] = -1;
    } else if (!above) {
      const diff = shapeDiff([blockPos[0], blockPos[1], aboveThreshold * 2].map((value, idx) => value - effectorPos[idx]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[3] = (this.finalYaw - effectorYaw) * gainYaw;
      action[4] = -1;
    } else {
      const diff = shapeDiff(this.finalPos.map((value, idx) => value - effectorPos[idx]));
      action[0] = diff[0] * gainPos;
      action[1] = diff[1] * gainPos;
      action[2] = diff[2] * gainPos;
      action[3] = (this.finalYaw - effectorYaw) * gainYaw;
      action[4] = -1;
      if (finalPosAligned) {
        this.done = true;
      }
    }

    this.step += 1;
    if (this.step >= 200) {
      this.done = true;
    }
    return action.map((value) => clamp(value, -1, 1));
  }

  private sampleFinalPos() {
    const lower = this.armSamplingBounds[0] ?? [0.25, -0.35, 0.2];
    const upper = this.armSamplingBounds[1] ?? [0.6, 0.35, 0.35];
    return lower.map((lo, idx) => this.sampleUniform(lo, upper[idx] ?? lo));
  }

  private sampleUniform(low: number, high: number) {
    return low + this.rng.uniform() * (high - low);
  }
}

export class CubeEnv {
  private policy: ort.InferenceSession | null = null;
  private rng = new SeededRng(0);
  private oracle = new CubeTaskOracle(this.rng, [[0.25, -0.35, 0.2], [0.6, 0.35, 0.35]]);
  private noiseDim = 10;
  private stepCount = 0;
  private accumulatedReward = 0;
  private rewardTrace: number[] = [];
  private successes: boolean[];

  constructor(
    private mujoco: any,
    readonly model: any,
    readonly data: any,
    readonly manifest: CubeManifest,
  ) {
    const numCubes = this.numCubes();
    this.successes = Array.from({ length: numCubes }, () => false);
    this.oracle = new CubeTaskOracle(this.rng, this.armSamplingBounds());
    this.reset(0);
  }

  async loadPolicy(url: string) {
    try {
      this.policy = await ort.InferenceSession.create(url, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "all",
      });
      const meta = (this.policy as any).inputMetadata?.noise;
      const dim = meta?.dimensions?.[1];
      if (typeof dim === "number" && dim > 0) this.noiseDim = dim;
    } catch (error) {
      console.warn("Cube policy unavailable; using zero actions.", error);
      this.policy = null;
    }
  }

  reset(seed = 0) {
    this.rng = new SeededRng(seed);
    this.stepCount = 0;
    this.accumulatedReward = 0;
    this.rewardTrace = [];
    this.copyInto(this.data.qpos, this.manifest.reset.qpos as number[]);
    this.copyInto(this.data.qvel, this.manifest.reset.qvel as number[]);
    this.copyInto(this.data.ctrl, this.manifest.reset.ctrl as number[]);
    if (this.manifest.reset.mocap_pos) {
      this.copyInto(this.data.mocap_pos, this.manifest.reset.mocap_pos as number[]);
    }
    if (this.manifest.reset.mocap_quat) {
      this.copyInto(this.data.mocap_quat, this.manifest.reset.mocap_quat as number[]);
    }
    this.oracle = new CubeTaskOracle(this.rng, this.armSamplingBounds());
    this.oracle.reset();
    this.mujoco.mj_forward(this.model, this.data);
    this.updateSuccesses();
  }

  reseed(seed: number) {
    this.rng = new SeededRng(seed);
  }

  info(): StepInfo {
    const success = this.successes.every(Boolean);
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

  rewardHistory() {
    return {
      accumulatedReward: this.accumulatedReward,
      rewardTrace: [...this.rewardTrace],
    };
  }

  async policyAction() {
    if (!this.policy) return new Float32Array(5);
    const obs = Float32Array.from(this.getObservation());
    const noise = new Float32Array(this.noiseDim);
    for (let i = 0; i < noise.length; i += 1) noise[i] = this.rng.normal();
    const result = await this.policy.run({
      obs: new ort.Tensor("float32", obs, [1, obs.length]),
      noise: new ort.Tensor("float32", noise, [1, noise.length]),
    });
    return result.action.data as Float32Array;
  }

  async step(policyEnabled: boolean) {
    const action = policyEnabled ? await this.policyAction() : new Float32Array(5);
    return { ...this.stepWithAction(action), controller: policyEnabled && this.policy ? "policy" as const : "zero" as const };
  }

  stepOracle() {
    return { ...this.stepWithAction(this.oracle.selectAction(this)), controller: "oracle" as const };
  }

  stepWithAction(action: ArrayLike<number>) {
    const deltas = this.unnormalizeAction(action);
    const ikNoSolution = this.applyControl(deltas);
    for (let i = 0; i < this.manifest.timing.n_substeps; i += 1) {
      this.mujoco.mj_step(this.model, this.data);
    }
    this.mujoco.mj_rnePostConstraint?.(this.model, this.data);
    this.updateSuccesses();
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
    const pinchSite = ids.pinch_site_id as number;
    const cubeQpos = ids.cube_qposadr as number[];
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
    obs.push(this.gripperContact());

    for (const qposadr of cubeQpos) {
      const pos = vec3(this.data.qpos, qposadr);
      const quat = sliceNumbers(this.data.qpos, qposadr + 3, qposadr + 7);
      const blockYaw = yawFromQuat(quat);
      obs.push((pos[0] - xyzCenter[0]) * 10, (pos[1] - xyzCenter[1]) * 10, (pos[2] - xyzCenter[2]) * 10);
      obs.push(quat[0], quat[1], quat[2], quat[3]);
      obs.push(Math.cos(blockYaw), Math.sin(blockYaw));
    }

    return obs;
  }

  oracleInfo(): CubeOracleInfo {
    const ids = this.manifest.ids;
    const pinchSite = ids.pinch_site_id as number;
    const cubeQpos = ids.cube_qposadr as number[];
    const targetMocaps = ids.cube_target_mocap_ids as number[];
    const blockPositions = cubeQpos.map((qposadr) => vec3(this.data.qpos, qposadr));
    const blockQuats = cubeQpos.map((qposadr) => sliceNumbers(this.data.qpos, qposadr + 3, qposadr + 7));
    const targetXyzs = targetMocaps.map((mocapId) => vec3(this.data.mocap_pos, mocapId * 3));
    const targetQuats = targetMocaps.map((mocapId) => sliceNumbers(this.data.mocap_quat, mocapId * 4, mocapId * 4 + 4));
    return {
      effectorPos: vec3(this.data.site_xpos, pinchSite * 3),
      effectorYaw: yawFromMat(this.data.site_xmat, pinchSite * 9),
      gripperOpening: clamp(this.data.qpos[ids.gripper_opening_qposadr as number] / 0.8, 0, 1),
      gripperContact: this.gripperContact(),
      blockPositions,
      blockQuats,
      blockYaws: blockQuats.map(yawFromQuat),
      targetXyzs,
      targetQuats,
      targetYaws: targetQuats.map(yawFromQuat),
      successes: [...this.successes],
      success: this.successes.every(Boolean),
    };
  }

  visualGeomColors() {
    const ids = this.manifest.ids;
    const c = this.manifest.constants;
    const cubeGeomIds = ids.cube_geom_ids_list as number[][];
    const targetGeomIds = ids.cube_target_geom_ids_list as number[][];
    const cubeColors = c.cube_colors as number[][];
    const cubeSuccessColors = c.cube_success_colors as number[][];
    const colors: Array<{ geomId: number; color: [number, number, number, number] }> = [];
    for (let cubeIdx = 0; cubeIdx < this.numCubes(); cubeIdx += 1) {
      const cubeColor = (this.successes[cubeIdx] ? cubeSuccessColors[cubeIdx] : cubeColors[cubeIdx]) ?? [0.5, 0.5, 0.5, 1.0];
      const targetColor = cubeColors[cubeIdx] ?? [0.5, 0.5, 0.5, 1.0];
      for (const geomId of cubeGeomIds[cubeIdx] ?? []) {
        colors.push({ geomId, color: [cubeColor[0], cubeColor[1], cubeColor[2], cubeColor[3] ?? 1.0] });
      }
      for (const geomId of targetGeomIds[cubeIdx] ?? []) {
        colors.push({ geomId, color: [targetColor[0], targetColor[1], targetColor[2], 0.2] });
      }
    }
    return colors;
  }

  private copyInto(dst: ArrayLike<number>, src: number[]) {
    const writable = dst as { [idx: number]: number };
    for (let i = 0; i < src.length; i += 1) writable[i] = src[i];
  }

  private numCubes() {
    return this.manifest.constants.num_cubes as number;
  }

  private armSamplingBounds() {
    const bounds = this.manifest.constants.arm_sampling_bounds as number[][] | undefined;
    if (Array.isArray(bounds) && bounds.length === 2) return bounds;
    return [[0.25, -0.35, 0.2], [0.6, 0.35, 0.35]];
  }

  private workspaceBounds() {
    const bounds = this.manifest.constants.workspace_bounds as number[][] | undefined;
    if (Array.isArray(bounds) && bounds.length === 2) return bounds;
    return [[0.25, -0.35, 0.02], [0.6, 0.35, 0.35]];
  }

  private unnormalizeAction(action: ArrayLike<number>) {
    const low = this.manifest.constants.action_low as number[];
    const high = this.manifest.constants.action_high as number[];
    return low.map((lo, i) => 0.5 * (clamp(action[i] ?? 0, -1, 1) + 1.0) * (high[i] - lo) + lo);
  }

  private targetAttachPose(action: number[]) {
    const pinchSite = this.manifest.ids.pinch_site_id as number;
    const center = vec3(this.data.site_xpos, pinchSite * 3);
    const [lower, upper] = this.workspaceBounds();
    const targetEffectorPos = [
      clamp(center[0] + action[0], lower[0], upper[0]),
      clamp(center[1] + action[1], lower[1], upper[1]),
      clamp(center[2] + action[2], lower[2], upper[2]),
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
    const armJointIds = ids.arm_joint_ids as number[];
    const attachSite = ids.attach_site_id as number;
    const original = armQpos.map((idx) => this.data.qpos[idx]);
    let q = [...original];
    let failed = !finite(targetPos) || !finite(targetQuat);

    for (let iter = 0; iter < 20 && !failed; iter += 1) {
      for (let i = 0; i < armQpos.length; i += 1) this.data.qpos[armQpos[i]] = q[i];
      this.mujoco.mj_forward(this.model, this.data);

      const currentPos = vec3(this.data.site_xpos, attachSite * 3);
      const posError = targetPos.map((value, i) => value - currentPos[i]);
      const currentQuat = mat3ToQuat(this.data.site_xmat, attachSite * 9);
      const quatError = quatMul(targetQuat, quatInv(currentQuat));
      const rotError = quatToAxisAngle(quatError);
      const error = [...posError, ...rotError];
      if (Math.hypot(...posError) <= 1e-4 && Math.hypot(...rotError) <= 1e-4) break;

      const jac = Array.from({ length: 6 }, () => Array(q.length).fill(0));
      for (let j = 0; j < q.length; j += 1) {
        const jointId = armJointIds[j];
        const axis = vec3(this.data.xaxis, jointId * 3);
        const anchor = vec3(this.data.xanchor, jointId * 3);
        const rel = currentPos.map((value, i) => value - anchor[i]);
        const jp = cross(axis, rel);
        jac[0][j] = jp[0];
        jac[1][j] = jp[1];
        jac[2][j] = jp[2];
        jac[3][j] = axis[0];
        jac[4][j] = axis[1];
        jac[5][j] = axis[2];
      }

      const h = Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => {
          let sum = r === c ? 1e-12 : 0;
          for (let j = 0; j < q.length; j += 1) sum += jac[r][j] * jac[c][j];
          return sum;
        }),
      );
      const solved = this.solveLinearSystem(h, error);
      const update = q.map((_, j) => jac.reduce((sum, row, r) => sum + row[j] * solved[r], 0));
      const maxUpdate = Math.max(...update.map(Math.abs));
      const scale = maxUpdate > Math.PI / 4 ? (Math.PI / 4) / maxUpdate : 1.0;
      q = q.map((value, i) => value + update[i] * scale);
      failed = failed || !finite(q);
    }
    for (let i = 0; i < armQpos.length; i += 1) this.data.qpos[armQpos[i]] = original[i];
    this.mujoco.mj_forward(this.model, this.data);
    return { qpos: failed ? original : q, failed };
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

  private cubePositions() {
    return (this.manifest.ids.cube_qposadr as number[]).map((qposadr) => vec3(this.data.qpos, qposadr));
  }

  private targetPositions() {
    return (this.manifest.ids.cube_target_mocap_ids as number[]).map((mocapId) => vec3(this.data.mocap_pos, mocapId * 3));
  }

  private updateSuccesses() {
    const threshold = this.manifest.constants.success_threshold as number;
    const targets = this.targetPositions();
    this.successes = this.cubePositions().map((pos, idx) => norm(pos.map((value, axis) => value - targets[idx][axis])) <= threshold);
  }

  private gripperContact() {
    const rightPad = this.manifest.ids.right_pad_body_id as number;
    let cfrc = 0;
    for (let i = 0; i < 6; i += 1) cfrc += this.data.cfrc_ext[rightPad * 6 + i] ** 2;
    return clamp(Math.sqrt(cfrc) / 50.0, 0, 1);
  }

  private denseReward() {
    let matches = 0;
    for (const success of this.successes) {
      if (success) matches += 1;
    }
    return matches - this.successes.length;
  }
}
