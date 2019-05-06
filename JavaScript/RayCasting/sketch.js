let vector2;
let point;
let circlePoints;
let figures = new Array();

function setup() {
  createCanvas(1000, 600);
  vector2 = new Vector(round(random(width)), round(random(height)), round(random(width)), round(random(height)));
  //  if (!vector1.isParallel(vector2)) {
  //    point = vector1.getIntersectionPoint(vector2);
  //  }
  for (let i = 0; i < 4; i++) {
    const p1 = { x: round(random(width)), y: round(random(height)) };
    const p2 = { x: p1.x + round(random(50)), y: p1.y };
    const p3 = {};
    rect(round(random(width)), round(random(height)));
  }

  circlePoints = circleStuff(40, 40);
}

function circleStuff(r, n) {
  x = 0;
  y = 0;
  values = new Array();
  delta = 1;
  for (let i = 0; i < 360; i += n) {
    values.push({ x: round(r * cos((PI * delta * i) / 180)), y: round(r * sin((PI * delta * i) / 180)) });
  }
  return values;
}

function draw() {
  background(0);
  vector2.draw();
  for (let vals of circlePoints) {
    let vector1 = new Vector(mouseX, mouseY, vals.x + mouseX, vals.y + mouseY);

    if (!vector1.isParallel(vector2)) {
      point = vector1.getIntersectionPoint(vector2);
    }

    if (point) {
      fill(255, 0, 0);
      stroke(255);
      line(mouseX, mouseY, point.x, point.y);
      noStroke();
      fill(255, 0, 0);
      circle(point.x, point.y, 15);
    }
  }
}
