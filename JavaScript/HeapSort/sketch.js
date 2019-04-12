let values = [];
let strokes = [];
let slowness = 0;

function setup() {
  createCanvas(800, 600, P2D);
  generateValues();
  heapSort();
}

function draw() {
  background(0);
  drawValues();
}

function generateValues() {
  for (let i = 0; i < width; i++) {
    values.push(round(random(height)));
  }
}

function drawValues() {
  for (let i = 0; i < width; i++) {
    switch (strokes[i]) {
      case 0:
        stroke(240);
        break;
      case 1:
        stroke(0, 255, 0);
        break;
      case -1:
        stroke(255, 0, 0);
        break;
      case 2:
        stroke(0, 0, 255);
        break;
      default:
        stroke(240);
        break;
    }
    line(i, height, i, height - values[i]);
  }
}

async function heapSort() {
  let n = values.length;

  for (let i = n / 2 - 1; i >= 0; i--) {
    await heapify(values, n, i);
  }

  for (let i = n - 1; i >= 0; i--) {
    let temp = values[0];
    values[0] = values[i];
    values[i] = temp;
    await heapify(values, i, 0);
  }
}

async function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  strokes[l] = -1;
  strokes[r] = 1;
  if (l < n && arr[l] > arr[largest]) {
    largest = l;
  }
  if (r < n && arr[r] > arr[largest]) {
    largest = r;
  }
  if (largest != i) {
    strokes[largest] = 2;
    strokes[i] = 2;
    await sleep(slowness);
    let swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    strokes[largest] = 0;
    strokes[i] = 0;
    await heapify(arr, n, largest);
  }
  strokes[l] = 0;
  strokes[r] = 0;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
