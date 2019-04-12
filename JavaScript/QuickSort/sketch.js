let values = [];
let tracers = [];
let slowness = 2;

function setup() {
  createCanvas(1000, 600);
  createValues();
  quickSort(values, 0, values.length - 1);
}

function draw() {
  background(0);
  for (let i = 0; i < values.length; i++) {
    switch (tracers[i]) {
      case 0:
        stroke(180);
        break;
      case -1:
        stroke(255, 0, 0);
        break;
      case 1:
        stroke(0, 255, 0);
        break;
      case 2:
        stroke(0, 0, 255);
        break;
      default:
        stroke(180);
        break;
    }
    line(i, height, i, height - values[i]);
  }
}

function createValues() {
  for (let i = 0; i < width; i++) {
    values.push(random(height));
    tracers.push(0);
  }
}

async function quickSort(array, low, high) {
  if (low < high) {
    const p = await partition(array, low, high);
    await Promise.all([quickSort(array, low, p - 1), quickSort(array, p + 1, high)]);
  }
}

async function partition(array, low, high) {
  const pivot = array[high];
  let i = low;
  tracers[low] = -1;
  tracers[high] = 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      await swap(array, i, j);
      i++;
    }
  }
  await swap(array, i, high);
  tracers[low] = 0;
  tracers[high] = 0;
  return i;
}

async function swap(array, old, newValue) {
  tracers[newValue] = 2;
  await sleep(slowness);
  let temp = array[old];
  array[old] = array[newValue];
  array[newValue] = temp;
  tracers[newValue] = 0;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
