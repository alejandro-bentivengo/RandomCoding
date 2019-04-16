class Cube {
  cubies = [];

  newCube(size, cubieWidth) {
    this.cubies = new Array();
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          this.cubies.push(new Cubie(createVector(x * cubieWidth, y * cubieWidth, z * cubieWidth), cubieWidth, colours.RED));
        }
      }
    }
  }

  draw() {
    for (let i = 0; i < this.cubies.length; i++) {
      stroke(255);
      this.cubies[i].draw();
    }
  }
}
