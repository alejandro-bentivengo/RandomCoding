class Cubie {
  constructor(vector, width) {
    this.vector = vector;
    this.width = width;
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
      stroke(0);
      let offset = this.width / 2;
      beginShape();
      // F
      fill(colours.WHITE.r, colours.WHITE.g, colours.WHITE.b);
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      endShape();
      beginShape();
      // T
      fill(colours.RED.r, colours.RED.g, colours.RED.b);
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      endShape();
      beginShape();
      // L
      fill(colours.BLUE.r, colours.BLUE.g, colours.BLUE.b);
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z + offset); //2
      endShape();
      beginShape();
      // BK
      fill(colours.YELLOW.r, colours.YELLOW.g, colours.YELLOW.b);
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x + offset, this.vector.y + offset, this.vector.z - offset); //7
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      endShape();
      beginShape();
      // R
      fill(colours.GREEN.r, colours.GREEN.g, colours.GREEN.b);
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z - offset); //8
      vertex(this.vector.x - offset, this.vector.y + offset, this.vector.z + offset); //1
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      endShape();
      beginShape();
      //BOT
      fill(colours.ORANGE.r, colours.ORANGE.g, colours.ORANGE.b);
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z + offset); //4
      vertex(this.vector.x - offset, this.vector.y - offset, this.vector.z - offset); //5
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z - offset); //6
      vertex(this.vector.x + offset, this.vector.y - offset, this.vector.z + offset); //3
      endShape();
    }
  }
}
