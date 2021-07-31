let data;
const cols = 50;
const rows = 50;
const _WIDTH = 800;
const _HEIGHT = 800;
const _FPS = 20;
let rectValues = { "height": _HEIGHT / rows, "width": _WIDTH / cols };

function createDataArray(cols, rows) {
  data = new Array(rows);
  for (let y = 0; y < rows; y++) {
    data[y] = new Array(cols);
    for (let x = 0; x < cols; x++) {
      data[y][x] = getDataValue(floor(random(2)));
    }
  }
}

function getDataValue(value) {
  return {
    "value": value,
    "nextValue": null
  }
}

function setup() {
  createCanvas(_WIDTH, _HEIGHT, P2D);
  createDataArray(cols, rows);
  frameRate(_FPS);
}

function draw() {
  background(255, 255, 255);
  drawData();
  // As per wiki all cells need to be calculated with current values
  calculateNextValues();
  // And then the changes must be applied once all was calculated
  applyChanges();
}

function drawData() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      stroke(color(40, 40, 40));
      strokeWeight(1);
      data[y][x].value === 0 ? fill(255) : fill(0);
      rect(x + (x * rectValues.width), y + (y * rectValues.height), rectValues.width, rectValues.height);
    }
  }
}

function applyChanges() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      data[y][x].value = data[y][x].nextValue;
    }
  }
}

function calculateNextValues() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const neighbours = getNeighbours(x, y);
      if (neighbours.has(1)) {
        const liveNeighbours = neighbours.get(1);
        if (data[y][x].value === 1) {
          data[y][x].nextValue = liveNeighbours < 2 || liveNeighbours > 3 ? 0 : 1;
        } else {
          data[y][x].nextValue = liveNeighbours === 3 ? 1 : 0;
        }
      } else {
        data[y][x].nextValue = 0;
      }
    }
  }
}

function getNeighbours(cx, cy) {
  const values = new Map();
  for (let y = cy - 1; y <= cy + 1; y++) {
    // if out of bounds dont be a dummy
    if (y >= 0 && y < data.length) {
      for (let x = cx - 1; x <= cx + 1; x++) {
        // if out of bounds dont be a dummy
        if (x >= 0 && x < data[y].length) {
          // if not center evaluate
          if (x !== cx || y !== cy) {
            const value = data[y][x].value;
            values.set(value, values.has(value) ? values.get(value) + 1 : 1);
          }
        }
      }
    }
  }
  return values;
}