// fix for EasyCam to work with p5 v0.7.2
Dw.EasyCam.prototype.apply = function(n) {
  var o = this.cam;
  (n = n || o.renderer),
    n &&
      ((this.camEYE = this.getPosition(this.camEYE)),
      (this.camLAT = this.getCenter(this.camLAT)),
      (this.camRUP = this.getUpVector(this.camRUP)),
      n._curCamera.camera(
        this.camEYE[0],
        this.camEYE[1],
        this.camEYE[2],
        this.camLAT[0],
        this.camLAT[1],
        this.camLAT[2],
        this.camRUP[0],
        this.camRUP[1],
        this.camRUP[2]
      ));
};

let colours = {
  WHITE: { r: 255, g: 255, b: 255 },
  BLACK: { r: 0, g: 0, b: 0 },
  RED: { r: 255, g: 0, b: 0 },
  GREEN: { r: 0, g: 255, b: 0 },
  BLUE: { r: 0, g: 0, b: 255 },
  YELLOW: { r: 255, g: 255, b: 0 },
  ORANGE: { r: 255, g: 127, b: 0 }
};

let posOffset;
let easycam;
let cube;
let cubesPerSide = 3;
let cubeWidth = 20;

function setup() {
  angleMode(DEGREES);
  createCanvas(800, 600, WEBGL);
  posOffset = (cubesPerSide * cubeWidth) / 2;
  easycam = createEasyCam(this._renderer, { distance: 400, center: [posOffset, posOffset, posOffset] });
  cube = new Cube();
  cube.newCube(cubesPerSide, cubeWidth);
}

function draw() {
  background(60);
  if (cube) cube.draw();
}
