class Cubie {
  constructor(vector, width, colour) {
    this.vector = vector;
    this.width = width;
    this.colour = colour;
  }

  shouldDraw() {
    if (
      this.vector.x > 0 &&
      this.vector.x < cubesPerSide * cubeWidth - cubeWidth &&
      this.vector.y > 0 &&
      this.vector.y < cubesPerSide * cubeWidth - cubeWidth &&
      this.vector.z > 0 &&
      this.vector.z < cubesPerSide * cubeWidth - cubeWidth
    ) {
      return false;
    } else {
      return true;
    }
  }

  draw() {
    if (this.shouldDraw()) {
      fill(this.colour.r, this.colour.g, this.colour.b);
      let offset = this.width / 2;
      beginShape();
      // F
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      endShape();
      beginShape();
      // T
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      endShape();
      beginShape();
      // R
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      endShape();
      beginShape();
      // BK
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      endShape();
      beginShape();
      // L
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      endShape();
      beginShape();
      //BOT
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      endShape();
    }
  }
}
