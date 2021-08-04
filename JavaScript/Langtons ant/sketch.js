let data;
const cols = 200;
const rows = 200;
const _WIDTH = 800;
const _HEIGHT = 800;
const _FPS = 999;
const _ANTOFFSET = 0;
let rectValues = { "height": _HEIGHT / rows, "width": _WIDTH / cols };
let ant;


function createDataArray(cols, rows) {
  data = new Array(rows);
  for (let y = 0; y < rows; y++) {
    data[y] = new Array(cols);
    for (let x = 0; x < cols; x++) {
      data[y][x] = 1/*floor(random(2))*/;
    }
  }
}

function setup() {
  createCanvas(_WIDTH, _HEIGHT, P2D);
  createDataArray(cols, rows);
  ant = new Ant(floor(random(0, rows)), floor(random(0, cols)), ORIENTATIONS.NORTH);
  frameRate(_FPS);
}

function draw() {
  background(255, 255, 255);
  drawData();
  drawLines();
  drawAnt();
  moveAnt();
}

function moveAnt() {
  data[ant.posy][ant.posx] === 1 ? doWhiteMove() : doBlackMove();
}

function doWhiteMove() {
  data[ant.posy][ant.posx] = 0;
  ant.turnRight();
  ant.moveForward();
}

function doBlackMove() {
  data[ant.posy][ant.posx] = 1;
  ant.turnLeft();
  ant.moveForward();
}

function drawData() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      noStroke();
      data[y][x] === 0 ? fill(0) : fill(255);
      rect(x * rectValues.width, y * rectValues.height, rectValues.width, rectValues.height);
    }
  }
}

function drawLines() {
  stroke(color(0, 0, 0));
  for (let x = 0; x < cols; x++) {
    line(x * rectValues.width, 0, x * rectValues.width, _HEIGHT);
  }
  line(_WIDTH, 0, _WIDTH, _HEIGHT);
  stroke(color(0, 0, 0));
  for (let y = 0; y < rows; y++) {
    line(0, y * rectValues.height, _WIDTH, y * rectValues.height);
  }
  line(0, _HEIGHT, _WIDTH, _HEIGHT);
}

function drawAnt() {
  stroke(1);
  stroke(color(180, 20, 20));
  fill(color(0, 0, 0));
  point(getAntXPosition(), getAntYPosition());

  stroke(1);
  stroke(color(180, 20, 20));
  fill(color(180, 20, 20));
  switch (ant.orientation) {
    case ORIENTATIONS.WEST:
      triangleWest();
      break;
    case ORIENTATIONS.EAST:
      triangleEast();
      break;
    case ORIENTATIONS.NORTH:
      triangleNorth();
      break;
    case ORIENTATIONS.SOUTH:
      triangleSouth();
      break;
  }
}

function getAntXPosition() {
  return (ant.posx * rectValues.width);
}

function getAntYPosition() {
  return (ant.posy * rectValues.height);
}

function triangleWest() {
  triangle(
    getAntXPosition() + _ANTOFFSET,
    getAntYPosition() + rectValues.height / 2,
    getAntXPosition() + rectValues.width - _ANTOFFSET,
    getAntYPosition() + _ANTOFFSET,
    getAntXPosition() + rectValues.width - _ANTOFFSET,
    getAntYPosition() + rectValues.height - _ANTOFFSET
  );
}

function triangleEast() {
  triangle(
    getAntXPosition() + _ANTOFFSET,
    getAntYPosition() + _ANTOFFSET,
    getAntXPosition() + rectValues.width - _ANTOFFSET,
    getAntYPosition() + rectValues.height / 2,
    getAntXPosition() + _ANTOFFSET,
    getAntYPosition() + rectValues.height - _ANTOFFSET
  );
}

function triangleNorth() {
  triangle(
    getAntXPosition() + _ANTOFFSET,
    getAntYPosition() + rectValues.height - _ANTOFFSET,
    getAntXPosition() + rectValues.width / 2,
    getAntYPosition() + _ANTOFFSET,
    getAntXPosition() + rectValues.width - _ANTOFFSET,
    getAntYPosition() + rectValues.height - _ANTOFFSET
  );
}

function triangleSouth() {
  triangle(
    getAntXPosition() + _ANTOFFSET,
    getAntYPosition() + _ANTOFFSET,
    getAntXPosition() + rectValues.width - _ANTOFFSET,
    getAntYPosition() + _ANTOFFSET,
    getAntXPosition() + rectValues.width / 2,
    getAntYPosition() + rectValues.height - _ANTOFFSET
  );
}