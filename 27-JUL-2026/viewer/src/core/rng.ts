export class SeededRng {
  private state: number;
  private spare: number | null = null;

  constructor(seed: number) {
    this.state = seed >>> 0 || 1;
  }

  uniform() {
    this.state = (1664525 * this.state + 1013904223) >>> 0;
    return (this.state + 0.5) / 4294967296;
  }

  normal() {
    if (this.spare !== null) {
      const value = this.spare;
      this.spare = null;
      return value;
    }
    const u = Math.max(this.uniform(), 1e-12);
    const v = this.uniform();
    const r = Math.sqrt(-2.0 * Math.log(u));
    const theta = 2.0 * Math.PI * v;
    this.spare = r * Math.sin(theta);
    return r * Math.cos(theta);
  }
}
