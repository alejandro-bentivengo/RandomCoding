class Vector {
  p1;
  p2;

  normalized;
  constructor(x1, y1, x2, y2) {
    this.p1 = createVector(x1, y1);
    this.p2 = createVector(x2, y2);
    this.normalized = createVector(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
  }

  draw() {
    stroke(255);
    strokeWeight(4);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }

  isParallel(v2) {
    if (this.normalized.x * v2.normalized.x + this.normalized.y * v2.normalized.y === 1) {
      return true;
    } else {
      return false;
    }
  }

  getIntersectionPoint(v2) {
    if (!this.isParallel(v2)) {
      const scalar =
        ((v2.p2.x - v2.p1.x) * (this.p1.y - v2.p1.y) - (v2.p2.y - v2.p1.y) * (this.p1.x - v2.p1.x)) /
        ((v2.p2.y - v2.p1.y) * (this.p2.x - this.p1.x) - (v2.p2.x - v2.p1.x) * (this.p2.y - this.p1.y));
      if (scalar >= 0) {
        const x = this.p1.x + scalar * (this.p2.x - this.p1.x);
        const y = this.p1.y + scalar * (this.p2.y - this.p1.y);
        return { x: x, y: y };
      }
    }
    return undefined;
  }
}
