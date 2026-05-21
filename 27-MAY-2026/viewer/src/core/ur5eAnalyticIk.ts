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
  return ((((angle + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
}

function safeSqrt(value: number) {
  return Math.sqrt(Math.max(value, 0));
}

function finite(values: number[] | number[][]) {
  return values.flat().every(Number.isFinite);
}

function matMul(a: number[][], b: number[][]) {
  return a.map((row) =>
    b[0].map((_, col) => row.reduce((sum, value, idx) => sum + value * b[idx][col], 0)),
  );
}

function mat3VecMul(mat: number[][], vec: number[]) {
  return mat.map((row) => row.reduce((sum, value, idx) => sum + value * vec[idx], 0));
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

function quatToMat(quat: number[]) {
  const n = Math.hypot(quat[0], quat[1], quat[2], quat[3]) || 1;
  const w = quat[0] / n;
  const x = quat[1] / n;
  const y = quat[2] / n;
  const z = quat[3] / n;
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
    [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
    [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
  ];
}

function worldAttachPoseToDh(targetPos: number[], targetQuat: number[]) {
  const worldRot = quatToMat(targetQuat);
  const dhRot = matMul(WORLD_TO_DH_ROT, worldRot);
  const dhPos = mat3VecMul(WORLD_TO_DH_ROT, targetPos);
  return [
    [dhRot[0][0], dhRot[0][1], dhRot[0][2], dhPos[0]],
    [dhRot[1][0], dhRot[1][1], dhRot[1][2], dhPos[1]],
    [dhRot[2][0], dhRot[2][1], dhRot[2][2], dhPos[2]],
    [0, 0, 0, 1],
  ];
}

function calculateTheta6(sign5: number, c1: number, s1: number, r11: number, r12: number, r21: number, r22: number) {
  let h1 = c1 * r22 - s1 * r12;
  let h2 = s1 * r11 - c1 * r21;
  h1 = Math.abs(h1) < IK_EPS ? 0 : h1;
  h2 = Math.abs(h2) < IK_EPS ? 0 : h2;
  return Math.atan2(sign5 * h1, sign5 * h2);
}

function signOr(value: number, fallback: number) {
  return Math.abs(value) <= IK_EPS ? fallback : value / Math.max(Math.abs(value), IK_EPS);
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
  const valid = Array.from({ length: 8 }, () => true);

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

    for (const idx of [row, row + 1]) {
      solutions[idx][4] = theta5a;
      solutions[idx][5] = theta6a;
    }
    for (const idx of [row + 2, row + 3]) {
      solutions[idx][4] = theta5b;
      solutions[idx][5] = theta6b;
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
    for (let r = 0; r < 4; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        fkError = Math.max(fkError, Math.abs(fkPose[r][c] - targetPose[r][c]));
      }
    }
    valid[row] = valid[row] && finite(solutions[row]) && finite(fkPose) && fkError <= IK_FK_TOL;
  }

  return { solutions, valid };
}

function closestIkSolution(solutions: number[][], valid: boolean[], qpos0: number[]) {
  const qpos0Mapped = qpos0.map(wrapToPi);
  let bestIdx = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let row = 0; row < solutions.length; row += 1) {
    let distance = 0;
    for (let j = 0; j < 6; j += 1) {
      let diff = Math.abs(solutions[row][j] - qpos0Mapped[j]);
      if (diff > Math.PI) diff = 2 * Math.PI - diff;
      distance += diff;
    }
    if (valid[row] && distance < bestDistance) {
      bestDistance = distance;
      bestIdx = row;
    }
  }
  const closest = solutions[bestIdx];
  return closest.map((value, idx) => {
    const alternative = value < 0 ? value + 2 * Math.PI : value - 2 * Math.PI;
    return Math.abs(value - qpos0[idx]) < Math.abs(alternative - qpos0[idx]) ? value : alternative;
  });
}

export function solveUr5eIkWithStatus(qpos0: number[], targetPos: number[], targetQuat: number[]) {
  const original = [...qpos0];
  if (!finite(original) || !finite(targetPos) || !finite(targetQuat)) {
    return { qpos: original, failed: true };
  }

  const targetPoseDh = worldAttachPoseToDh(targetPos, targetQuat);
  const { solutions, valid } = inverseKinematicsDh(targetPoseDh);
  const anyValid = valid.some(Boolean);
  const qpos = anyValid ? closestIkSolution(solutions, valid, original) : original;
  const failed = !anyValid || !finite(targetPoseDh) || !finite(qpos);
  return { qpos: failed ? original : qpos, failed };
}
