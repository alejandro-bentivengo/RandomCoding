let data;
const cols = 100;
const rows = 100;
const _WIDTH = 800;
const _HEIGHT = 800;
const _FPS = 60;
const _ANTOFFSET = 0;
let rectValues = { "height": _HEIGHT / rows, "width": _WIDTH / cols };
let ant;
const _FASTMODE = true;
const _FASTLOOPS = 50;


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
  if (_FASTMODE) {
    drawData();
  }
}

function draw() {
  if (!_FASTMODE) {
    background(255, 255, 255);
    drawData();
    drawAnt();
    moveAnt();
  } else {
    for (let i = 0; i < _FASTLOOPS; i++) {
      drawSquareUpdate();
      moveAnt();
    }
  }
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
  let drawLines = true;
  for (let y = 0; y < rows; y++) {
    stroke(color(0, 0, 0));
    strokeWeight(1);
    line(0, y * rectValues.height, _WIDTH, y * rectValues.height);
    for (let x = 0; x < cols; x++) {
      if (drawLines) {
        stroke(color(0, 0, 0));
        strokeWeight(1);
        line(x * rectValues.width, 0, x * rectValues.width, _HEIGHT);        
      }
      noStroke();
      data[y][x] === 0 ? fill(0) : fill(255);
      rect(1 + (x * rectValues.width), 1 + (y * rectValues.height), (-2 + rectValues.width), (-2 + rectValues.height));
    }
    if (drawLines) {
      stroke(color(0, 0, 0));
      strokeWeight(1);
      line(_WIDTH, 0, _WIDTH, _HEIGHT);
      drawLines = false;
    }
  }
  stroke(color(0, 0, 0));
  strokeWeight(1);
  line(0, _HEIGHT, _WIDTH, _HEIGHT);
}

function drawSquareUpdate() {
  noStroke();
  data[ant.posy][ant.posx] === 0 ? fill(0) : fill(255);
  rect(1 + (getAntXPosition()), 1 + (getAntYPosition()), (-2 + rectValues.width), (-2 + rectValues.height));
}

function drawAnt() {
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