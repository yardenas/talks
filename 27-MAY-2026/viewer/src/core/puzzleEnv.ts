import * as ort from "onnxruntime-web";
import {
  clamp,
  mat3ToQuat,
  quatFromZRadians,
  quatInv,
  quatMul,
  quatRotate,
  quatToAxisAngle,
  solveLinearSystem,
  yawFromMat,
} from "./puzzleMath";
import { SeededRng } from "./rng";

export type Manifest = {
  env_name: string;
  timing: { sim_dt: number; ctrl_dt: number; n_substeps: number; episode_length: number };
  ids: Record<string, number[] | number>;
  reset: Record<string, number[]>;
  constants: Record<string, number[] | number>;
};

type StepInfo = {
  reward: number;
  success: boolean;
  done: boolean;
  step: number;
  policyLoaded: boolean;
  ikNoSolution: boolean;
};

function vec3(values: ArrayLike<number>, offset: number) {
  return [values[offset], values[offset + 1], values[offset + 2]];
}

function cross(a: number[], b: number[]) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function finite(values: number[]) {
  return values.every(Number.isFinite);
}

export class PuzzleEnv {
  private policy: ort.InferenceSession | null = null;
  private rng = new SeededRng(0);
  private noiseDim = 10;
  private stepCount = 0;
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
      console.warn("Policy unavailable; using zero actions.", error);
      this.policy = null;
    }
  }

  reset(seed = 0) {
    this.rng = new SeededRng(seed);
    this.stepCount = 0;
    this.copyInto(this.data.qpos, this.manifest.reset.qpos);
    this.copyInto(this.data.qvel, this.manifest.reset.qvel);
    this.copyInto(this.data.ctrl, this.manifest.reset.ctrl);
    this.buttonStates = [...this.manifest.reset.button_states];
    this.prevButtonQpos = [...this.manifest.reset.prev_button_qpos];
    this.mujoco.mj_forward(this.model, this.data);
  }

  reseed(seed: number) {
    this.rng = new SeededRng(seed);
  }

  info(): StepInfo {
    const success = this.buttonStates.every((value, i) => value === this.targetButtonStates[i]);
    return {
      reward: this.denseReward(),
      success,
      done: success || this.stepCount >= this.manifest.timing.episode_length,
      step: this.stepCount,
      policyLoaded: this.policy !== null,
      ikNoSolution: false,
    };
  }

  buttons() {
    return { current: [...this.buttonStates], target: [...this.targetButtonStates] };
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
    return this.stepWithAction(action);
  }

  stepWithAction(action: ArrayLike<number>) {
    const prevButtonQpos = this.buttonQpos();
    const prevButtonStates = [...this.buttonStates];
    const deltas = this.unnormalizeAction(action);
    const ikNoSolution = this.applyControl(deltas);
    for (let i = 0; i < this.manifest.timing.n_substeps; i += 1) {
      this.mujoco.mj_step(this.model, this.data);
    }
    this.updateButtonStates(prevButtonStates, prevButtonQpos, this.buttonQpos());
    this.prevButtonQpos = prevButtonQpos;
    this.stepCount += 1;
    return { ...this.info(), ikNoSolution };
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
    for (let i = 0; i < armActuators.length; i += 1) {
      const actuator = armActuators[i];
      this.data.ctrl[actuator] = clamp(qpos[i], ctrlLow[actuator], ctrlHigh[actuator]);
    }
    for (const actuator of gripperActuators) {
      this.data.ctrl[actuator] = clamp(255.0 * gripperTarget, ctrlLow[actuator], ctrlHigh[actuator]);
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
    for (let iter = 0; iter < 12 && !failed; iter += 1) {
      for (let i = 0; i < armQpos.length; i += 1) this.data.qpos[armQpos[i]] = q[i];
      this.mujoco.mj_forward(this.model, this.data);
      const currentPos = vec3(this.data.site_xpos, attachSite * 3);
      const currentQuat = mat3ToQuat(this.data.site_xmat, attachSite * 9);
      const posError = targetPos.map((v, i) => v - currentPos[i]);
      const quatError = quatMul(targetQuat, quatInv(currentQuat));
      const rotError = quatToAxisAngle(quatError);
      const error = [...posError, ...rotError];
      const jac = Array.from({ length: 6 }, () => Array(q.length).fill(0));
      for (let j = 0; j < q.length; j += 1) {
        const jointId = armJointIds[j];
        const axis = vec3(this.data.xaxis, jointId * 3);
        const anchor = vec3(this.data.xanchor, jointId * 3);
        const rel = currentPos.map((v, i) => v - anchor[i]);
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
          let sum = r === c ? 1e-8 : 0;
          for (let j = 0; j < q.length; j += 1) sum += jac[r][j] * jac[c][j];
          return sum;
        }),
      );
      const solved = solveLinearSystem(h, error);
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
