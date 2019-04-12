let values = [];
let tracers = [];
let slowness = 2;

function setup() {
  createCanvas(1000, 600);
  createValues();
  shellSort(values);
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

async function shellSort(arr) {
  var increment = arr.length / 2;
  while (increment > 0) {
    for (i = increment; i < arr.length; i++) {
      var j = i;
      tracers[i] = -1;
      var temp = arr[i];
      while (j >= increment && arr[j - increment] > temp) {
        await sleep(slowness);
        arr[j] = arr[j - increment];
        j = j - increment;
      }
      arr[j] = temp;
      tracers[i] = 0;
    }
    if (increment == 2) {
      increment = 1;
    } else {
      increment = parseInt((increment * 5) / 11);
    }
  }
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
