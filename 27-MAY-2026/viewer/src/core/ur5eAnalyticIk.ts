import { quatToMat } from "./puzzleMath";

const D1 = 0.163;
const D4 = 0.134;
const D5 = 0.1;
const D6 = 0.1;
const A2 = -0.425;
const A3 = -0.392;
const IK_EPS = 1e-9;
const IK_FK_TOL = 1e-3;

const WORLD_TO_DH_ROT = [
  [0, -1, 0],
  [1, 0, 0],
  [0, 0, 1],
];

const DH_TO_WORLD_ROT = [
  [0, 1, 0],
  [-1, 0, 0],
  [0, 0, 1],
];

function wrapToPi(angle: number) {
  return ((angle + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
}

function safeSqrt(value: number) {
  return Math.sqrt(Math.max(value, 0));
}

function signOr(value: number, fallback: number) {
  if (Math.abs(value) <= IK_EPS) return fallback;
  return value / Math.abs(value);
}

function matMul(a: number[][], b: number[][]) {
  const out = Array.from({ length: a.length }, () => Array(b[0].length).fill(0));
  for (let i = 0; i < a.length; i += 1) {
    for (let j = 0; j < b[0].length; j += 1) {
      for (let k = 0; k < b.length; k += 1) out[i][j] += a[i][k] * b[k][j];
    }
  }
  return out;
}

function matVecMul(a: number[][], v: number[]) {
  return a.map((row) => row.reduce((sum, value, i) => sum + value * v[i], 0));
}

function dhMatrix(theta: number, d: number, a: number, alpha: number) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const ca = Math.cos(alpha);
  const sa = Math.sin(alpha);
  return [
    [c, -s * ca, s * sa, a * c],
    [s, c * ca, -c * sa, a * s],
    [0, sa, ca, d],
    [0, 0, 0, 1],
  ];
}

function fkDh(qpos: number[]) {
  let pose = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  pose = matMul(pose, dhMatrix(qpos[0], D1, 0, Math.PI / 2));
  pose = matMul(pose, dhMatrix(qpos[1], 0, A2, 0));
  pose = matMul(pose, dhMatrix(qpos[2], 0, A3, 0));
  pose = matMul(pose, dhMatrix(qpos[3], D4, 0, Math.PI / 2));
  pose = matMul(pose, dhMatrix(qpos[4], D5, 0, -Math.PI / 2));
  return matMul(pose, dhMatrix(qpos[5], D6, 0, 0));
}

function worldAttachPoseToDh(targetPos: number[], targetQuat: number[]) {
  const worldRot = quatToMat(targetQuat);
  const dhRot = matMul(WORLD_TO_DH_ROT, worldRot);
  const dhPos = matVecMul(WORLD_TO_DH_ROT, targetPos);
  return [
    [...dhRot[0], dhPos[0]],
    [...dhRot[1], dhPos[1]],
    [...dhRot[2], dhPos[2]],
    [0, 0, 0, 1],
  ];
}

function calculateTheta6(
  sign5: number,
  c1: number,
  s1: number,
  r11: number,
  r12: number,
  r21: number,
  r22: number,
) {
  let h1 = c1 * r22 - s1 * r12;
  let h2 = s1 * r11 - c1 * r21;
  if (Math.abs(h1) < IK_EPS) h1 = 0;
  if (Math.abs(h2) < IK_EPS) h2 = 0;
  return Math.atan2(sign5 * h1, sign5 * h2);
}

function inverseKinematicsDh(targetPose: number[][]) {
  const r11 = targetPose[0][0];
  const r12 = targetPose[0][1];
  const r13 = targetPose[0][2];
  const r21 = targetPose[1][0];
  const r22 = targetPose[1][1];
  const r23 = targetPose[1][2];
  const r31 = targetPose[2][0];
  const px = targetPose[0][3];
  const py = targetPose[1][3];
  const pz = targetPose[2][3];

  const solutions = Array.from({ length: 8 }, () => Array(6).fill(0));
  const valid = Array(8).fill(true);

  const a1 = px - D6 * r13;
  const b1 = D6 * r23 - py;
  const theta1Domain = a1 * a1 + b1 * b1 - D4 * D4;
  const theta1Valid = theta1Domain >= -IK_EPS;
  const theta1Delta = Math.atan2(safeSqrt(theta1Domain), D4);
  const theta1Base = Math.atan2(a1, b1);
  const theta1a = theta1Base + theta1Delta;
  const theta1b = theta1Base - theta1Delta;

  for (let row = 0; row < 4; row += 1) solutions[row][0] = theta1a;
  for (let row = 4; row < 8; row += 1) solutions[row][0] = theta1b;
  for (let row = 0; row < 8; row += 1) valid[row] = valid[row] && theta1Valid;

  for (const row of [0, 4]) {
    const theta1 = solutions[row][0];
    const c1 = Math.cos(theta1);
    const s1 = Math.sin(theta1);
    const c5 = s1 * r13 - c1 * r23;
    const s5 = safeSqrt((s1 * r11 - c1 * r21) ** 2 + (s1 * r12 - c1 * r22) ** 2);
    const theta5a = Math.atan2(s5, c5);
    const theta5b = Math.atan2(-s5, c5);
    const s5a = Math.sin(theta5a);
    const s5b = Math.sin(theta5b);
    const sign5a = signOr(s5a, 1);
    const sign5b = Math.abs(s5a) <= IK_EPS ? -1 : signOr(s5b, -1);
    const theta6a = calculateTheta6(sign5a, c1, s1, r11, r12, r21, r22);
    const theta6b = calculateTheta6(sign5b, c1, s1, r11, r12, r21, r22);

    for (const r of [row, row + 1]) {
      solutions[r][4] = theta5a;
      solutions[r][5] = theta6a;
    }
    for (const r of [row + 2, row + 3]) {
      solutions[r][4] = theta5b;
      solutions[r][5] = theta6b;
    }
  }

  for (const row of [0, 2, 4, 6]) {
    const theta1 = solutions[row][0];
    const theta5 = solutions[row][4];
    const theta6 = solutions[row][5];
    const c1 = Math.cos(theta1);
    const s1 = Math.sin(theta1);
    const c5 = Math.cos(theta5);
    const s5 = Math.sin(theta5);
    const c6 = Math.cos(theta6);
    const s6 = Math.sin(theta6);

    const a234 = c1 * r11 + s1 * r21;
    const h1 = c5 * c6 * r31 - s6 * a234;
    const h2 = c5 * c6 * a234 + s6 * r31;
    const theta234 = Math.atan2(h1, h2);
    const c234 = Math.cos(theta234);
    const s234 = Math.sin(theta234);
    const kc = c1 * px + s1 * py - s234 * D5 + c234 * s5 * D6;
    const ks = pz - D1 + c234 * D5 + s234 * s5 * D6;
    const c3 = (ks * ks + kc * kc - A2 * A2 - A3 * A3) / (2 * A2 * A3);
    const theta3Domain = 1 - c3 * c3;
    const theta3Valid = theta3Domain >= -IK_EPS;
    const theta3a = Math.atan2(safeSqrt(theta3Domain), c3);
    const theta3b = -theta3a;

    const c3a = Math.cos(theta3a);
    const s3a = Math.sin(theta3a);
    const theta2a = Math.atan2(ks, kc) - Math.atan2(A3 * s3a, A3 * c3a + A2);
    const c3b = Math.cos(theta3b);
    const s3b = Math.sin(theta3b);
    const theta2b = Math.atan2(ks, kc) - Math.atan2(A3 * s3b, A3 * c3b + A2);

    solutions[row][1] = theta2a;
    solutions[row][2] = theta3a;
    solutions[row][3] = theta234 - theta2a - theta3a;
    solutions[row + 1][1] = theta2b;
    solutions[row + 1][2] = theta3b;
    solutions[row + 1][3] = theta234 - theta2b - theta3b;
    valid[row] = valid[row] && theta3Valid;
    valid[row + 1] = valid[row + 1] && theta3Valid;
  }

  for (let row = 0; row < 8; row += 1) {
    solutions[row] = solutions[row].map(wrapToPi);
    const fkPose = fkDh(solutions[row]);
    let fkError = 0;
    for (let i = 0; i < 4; i += 1) {
      for (let j = 0; j < 4; j += 1) {
        fkError = Math.max(fkError, Math.abs(fkPose[i][j] - targetPose[i][j]));
      }
    }
    valid[row] = valid[row] && solutions[row].every(Number.isFinite) && fkError <= IK_FK_TOL;
  }

  return { solutions, valid };
}

function closestIkSolution(solutions: number[][], valid: boolean[], qpos0: number[]) {
  const qpos0Mapped = qpos0.map(wrapToPi);
  let bestIdx = 0;
  let bestDistance = Infinity;
  for (let i = 0; i < solutions.length; i += 1) {
    if (!valid[i]) continue;
    let distance = 0;
    for (let j = 0; j < 6; j += 1) {
      let diff = Math.abs(solutions[i][j] - qpos0Mapped[j]);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      distance += diff;
    }
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIdx = i;
    }
  }
  const closest = solutions[bestIdx];
  return closest.map((value, i) => {
    const alternative = value < 0 ? value + 2 * Math.PI : value - 2 * Math.PI;
    return Math.abs(value - qpos0[i]) < Math.abs(alternative - qpos0[i]) ? value : alternative;
  });
}

export function solveUr5eAnalyticIkWithStatus(
  qpos0: number[],
  targetPos: number[],
  targetQuat: number[],
) {
  const targetPoseDh = worldAttachPoseToDh(targetPos, targetQuat);
  const { solutions, valid } = inverseKinematicsDh(targetPoseDh);
  let qposTarget = closestIkSolution(solutions, valid, qpos0);
  let failed =
    !valid.some(Boolean) ||
    !targetPoseDh.flat().every(Number.isFinite) ||
    !qposTarget.every(Number.isFinite);
  if (failed) qposTarget = [...qpos0];
  failed = failed || !qposTarget.every(Number.isFinite);
  return { qpos: qposTarget, failed };
}

export function fkWorldAttach(qpos: number[]) {
  const dhPose = fkDh(qpos);
  const worldRot = matMul(DH_TO_WORLD_ROT, dhPose.slice(0, 3).map((row) => row.slice(0, 3)));
  const worldPos = matVecMul(DH_TO_WORLD_ROT, dhPose.slice(0, 3).map((row) => row[3]));
  return {
    pos: worldPos,
    mat: worldRot,
  };
}
