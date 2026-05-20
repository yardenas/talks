import * as THREE from "three";

export function getVec3(values: ArrayLike<number>, index: number, target = new THREE.Vector3()) {
  const offset = index * 3;
  return target.set(values[offset], values[offset + 1], values[offset + 2]);
}

export function getQuat(values: ArrayLike<number>, index: number, target = new THREE.Quaternion()) {
  const offset = index * 4;
  return target.set(values[offset + 1], values[offset + 2], values[offset + 3], values[offset]);
}

export function mat3ToQuat(mat: ArrayLike<number>, offset = 0): number[] {
  const m00 = mat[offset + 0];
  const m01 = mat[offset + 1];
  const m02 = mat[offset + 2];
  const m10 = mat[offset + 3];
  const m11 = mat[offset + 4];
  const m12 = mat[offset + 5];
  const m20 = mat[offset + 6];
  const m21 = mat[offset + 7];
  const m22 = mat[offset + 8];
  const trace = m00 + m11 + m22;
  let w: number;
  let x: number;
  let y: number;
  let z: number;
  if (trace > 0) {
    const s = Math.sqrt(trace + 1.0) * 2.0;
    w = 0.25 * s;
    x = (m21 - m12) / s;
    y = (m02 - m20) / s;
    z = (m10 - m01) / s;
  } else if (m00 > m11 && m00 > m22) {
    const s = Math.sqrt(1.0 + m00 - m11 - m22) * 2.0;
    w = (m21 - m12) / s;
    x = 0.25 * s;
    y = (m01 + m10) / s;
    z = (m02 + m20) / s;
  } else if (m11 > m22) {
    const s = Math.sqrt(1.0 + m11 - m00 - m22) * 2.0;
    w = (m02 - m20) / s;
    x = (m01 + m10) / s;
    y = 0.25 * s;
    z = (m12 + m21) / s;
  } else {
    const s = Math.sqrt(1.0 + m22 - m00 - m11) * 2.0;
    w = (m10 - m01) / s;
    x = (m02 + m20) / s;
    y = (m12 + m21) / s;
    z = 0.25 * s;
  }
  return quatNormalize([w, x, y, z]);
}

export function yawFromMat(mat: ArrayLike<number>, offset = 0) {
  return Math.atan2(mat[offset + 3], mat[offset + 0]);
}

export function quatNormalize(q: number[]) {
  const n = Math.hypot(q[0], q[1], q[2], q[3]) || 1.0;
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
}

export function quatMul(a: number[], b: number[]) {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}

export function quatInv(q: number[]) {
  return [q[0], -q[1], -q[2], -q[3]];
}

export function quatFromZRadians(theta: number) {
  const half = 0.5 * theta;
  return [Math.cos(half), 0, 0, Math.sin(half)];
}

export function quatRotate(q: number[], v: number[]) {
  const r = quatMul(quatMul(q, [0, v[0], v[1], v[2]]), quatInv(q));
  return [r[1], r[2], r[3]];
}

export function quatToAxisAngle(qRaw: number[]) {
  const q = quatNormalize(qRaw);
  const angle = 2.0 * Math.atan2(Math.hypot(q[1], q[2], q[3]), q[0]);
  const s = Math.sin(angle / 2.0);
  if (Math.abs(s) < 1e-8) return [0, 0, 0];
  return [q[1] / s * angle, q[2] / s * angle, q[3] / s * angle];
}

export function clamp(value: number, low: number, high: number) {
  return Math.max(low, Math.min(high, value));
}

export function solveLinearSystem(a: number[][], b: number[]) {
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
