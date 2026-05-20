import {
  fkWorldAttach,
  solveUr5eAnalyticIkWithStatus,
} from "../viewer/src/core/ur5eAnalyticIk";
import { quatFromZRadians, quatMul, quatRotate } from "../viewer/src/core/puzzleMath";

type Stats = {
  samples: number;
  noSolution: number;
  nonfinite: number;
  maxPosError: number;
  maxRotError: number;
  posErrorSum: number;
  rotErrorSum: number;
};

const POS_ATOL = 2e-3;
const ROT_ATOL = 2e-3;
const FALLBACK_ATOL = 1e-6;
const SAMPLES = 128;

const DOWN_QUAT = [0, 1, 0, 0];
const T_PA_POS = [-8.326672684688674e-17, 0, -0.155799999833107];
const T_PA_QUAT = [
  0.7071067690849304,
  1.1438961576987612e-16,
  -1.1438961576987612e-16,
  0.7071067690849304,
];

function makeStats(): Stats {
  return {
    samples: 0,
    noSolution: 0,
    nonfinite: 0,
    maxPosError: 0,
    maxRotError: 0,
    posErrorSum: 0,
    rotErrorSum: 0,
  };
}

function mulberry32(seed: number) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function uniform(rng: () => number, low: number, high: number) {
  return low + rng() * (high - low);
}

function sampleArmQpos(rng: () => number) {
  const low = [-2 * Math.PI, -2 * Math.PI, -Math.PI, -2 * Math.PI, -2 * Math.PI, -2 * Math.PI];
  const high = [2 * Math.PI, 2 * Math.PI, Math.PI, 2 * Math.PI, 2 * Math.PI, 2 * Math.PI];
  return low.map((lo, i) => uniform(rng, lo, high[i]));
}

function matToQuat(mat: number[][]) {
  const m00 = mat[0][0];
  const m01 = mat[0][1];
  const m02 = mat[0][2];
  const m10 = mat[1][0];
  const m11 = mat[1][1];
  const m12 = mat[1][2];
  const m20 = mat[2][0];
  const m21 = mat[2][1];
  const m22 = mat[2][2];
  const trace = m00 + m11 + m22;
  let w: number;
  let x: number;
  let y: number;
  let z: number;
  if (trace > 0) {
    const s = Math.sqrt(trace + 1) * 2;
    w = 0.25 * s;
    x = (m21 - m12) / s;
    y = (m02 - m20) / s;
    z = (m10 - m01) / s;
  } else if (m00 > m11 && m00 > m22) {
    const s = Math.sqrt(1 + m00 - m11 - m22) * 2;
    w = (m21 - m12) / s;
    x = 0.25 * s;
    y = (m01 + m10) / s;
    z = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = Math.sqrt(1 + m11 - m00 - m22) * 2;
    w = (m02 - m20) / s;
    x = (m01 + m10) / s;
    y = 0.25 * s;
    z = (m12 + m21) / s;
  } else {
    const s = Math.sqrt(1 + m22 - m00 - m11) * 2;
    w = (m10 - m01) / s;
    x = (m02 + m20) / s;
    y = (m12 + m21) / s;
    z = 0.25 * s;
  }
  const norm = Math.hypot(w, x, y, z) || 1;
  return [w / norm, x / norm, y / norm, z / norm];
}

function poseErrors(qpos: number[], targetPos: number[], targetQuat: number[]) {
  const pose = fkWorldAttach(qpos);
  const targetMat = quatToMat(targetQuat);
  const posError = Math.hypot(...pose.pos.map((value, i) => value - targetPos[i]));
  const relativeRot = matMul(transpose(pose.mat), targetMat);
  const trace = relativeRot[0][0] + relativeRot[1][1] + relativeRot[2][2];
  const rotError = Math.acos(Math.max(-1, Math.min(1, 0.5 * (trace - 1))));
  return { posError, rotError };
}

function quatToMat(qRaw: number[]) {
  const norm = Math.hypot(...qRaw) || 1;
  const [w, x, y, z] = qRaw.map((value) => value / norm);
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)],
  ];
}

function transpose(mat: number[][]) {
  return mat[0].map((_, col) => mat.map((row) => row[col]));
}

function matMul(a: number[][], b: number[][]) {
  return a.map((row) =>
    b[0].map((_, col) => row.reduce((sum, value, idx) => sum + value * b[idx][col], 0)),
  );
}

function updateStats(stats: Stats, qpos0: number[], targetPos: number[], targetQuat: number[]) {
  stats.samples += 1;
  const result = solveUr5eAnalyticIkWithStatus(qpos0, targetPos, targetQuat);
  stats.noSolution += Number(result.failed);
  stats.nonfinite += Number(!result.qpos.every(Number.isFinite));
  const { posError, rotError } = poseErrors(result.qpos, targetPos, targetQuat);
  stats.posErrorSum += posError;
  stats.rotErrorSum += rotError;
  stats.maxPosError = Math.max(stats.maxPosError, posError);
  stats.maxRotError = Math.max(stats.maxRotError, rotError);
}

function targetAttachPoseFromEffector(effectorPos: number[], effectorYaw: number, action: number[]) {
  const targetEffectorPos = [
    clamp(effectorPos[0] + action[0], 0.25, 0.6),
    clamp(effectorPos[1] + action[1], -0.35, 0.35),
    clamp(effectorPos[2] + action[2], 0.02, 0.35),
  ];
  const targetYaw = clamp(effectorYaw + action[3], -Math.PI, Math.PI);
  const targetEffectorQuat = quatMul(quatFromZRadians(targetYaw), DOWN_QUAT);
  const rotated = quatRotate(targetEffectorQuat, T_PA_POS);
  return {
    pos: targetEffectorPos.map((value, i) => value + rotated[i]),
    quat: quatMul(targetEffectorQuat, T_PA_QUAT),
  };
}

function clamp(value: number, low: number, high: number) {
  return Math.max(low, Math.min(high, value));
}

function assertStatsWithin(name: string, stats: Stats) {
  const meanPos = stats.posErrorSum / Math.max(1, stats.samples);
  const meanRot = stats.rotErrorSum / Math.max(1, stats.samples);
  console.log(
    `${name}: samples=${stats.samples} no_solution=${stats.noSolution} nonfinite=${stats.nonfinite} ` +
      `pos_error max=${stats.maxPosError.toExponential(3)} mean=${meanPos.toExponential(3)} ` +
      `rot_error max=${stats.maxRotError.toExponential(3)} mean=${meanRot.toExponential(3)}`,
  );
  if (
    stats.noSolution !== 0 ||
    stats.nonfinite !== 0 ||
    stats.maxPosError > POS_ATOL ||
    stats.maxRotError > ROT_ATOL
  ) {
    throw new Error(`${name} exceeded IK thresholds.`);
  }
}

function assertFallback() {
  const qpos0 = [-1.5, -1.4, 1.67, -1.82, -Math.PI / 2, -1.38];
  const quat = [1, 0, 0, 0];
  for (const [name, pos] of [
    ["unreachable", [10, 10, 10]],
    ["nan_target", [Number.NaN, 0, 0]],
  ] as const) {
    const result = solveUr5eAnalyticIkWithStatus(qpos0, pos, quat);
    const maxDelta = Math.max(...result.qpos.map((value, i) => Math.abs(value - qpos0[i])));
    console.log(
      `fallback_${name}: no_solution=${Number(result.failed)} finite=${Number(
        result.qpos.every(Number.isFinite),
      )} max_abs_delta=${maxDelta.toExponential(3)}`,
    );
    if (!result.failed || !result.qpos.every(Number.isFinite) || maxDelta > FALLBACK_ATOL) {
      throw new Error(`Fallback check failed for ${name}.`);
    }
  }
}

function main() {
  const rng = mulberry32(0);
  const reachable = makeStats();
  const actionTargets = makeStats();

  for (let i = 0; i < SAMPLES; i += 1) {
    const qpos = sampleArmQpos(rng);
    const pose = fkWorldAttach(qpos);
    const quat = matToQuat(pose.mat);
    updateStats(reachable, qpos, pose.pos, quat);

    const effectorPos = [
      uniform(rng, 0.25, 0.6),
      uniform(rng, -0.2, 0.2),
      uniform(rng, 0.2, 0.25),
    ];
    const effectorYaw = uniform(rng, -Math.PI, Math.PI);
    const action = [
      uniform(rng, -0.05, 0.05),
      uniform(rng, -0.05, 0.05),
      uniform(rng, -0.05, 0.05),
      uniform(rng, -0.3, 0.3),
    ];
    const target = targetAttachPoseFromEffector(effectorPos, effectorYaw, action);
    updateStats(actionTargets, qpos, target.pos, target.quat);
  }

  assertStatsWithin("reachable_fk", reachable);
  assertStatsWithin("action_targets", actionTargets);
  assertFallback();
  console.log("UR5e analytic IK validation passed.");
}

main();
