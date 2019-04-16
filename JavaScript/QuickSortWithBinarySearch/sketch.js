let values = [];
let tracers = [];
let slowness = 2;
let sorting = false;
let searching = false;
let found = false;
let indexFound = 0;
let searchValue = 0;

function setup() {
  createCanvas(1000, 600);
  createValues();
  searchValue = values[round(random(values.length - 1))];
  sorting = true;
  quickSort(values, 0, values.length - 1).then(start => {
    sorting = false;
    searching = true;
    binarySearch(values, 0, values.length, searchValue).then(val => {
      indexFound = val;
      found = true;
      searching = false;
    });
  });
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
      case 5:
        stroke(0, 255, 255);
        break;
      case 6:
        stroke(255, 0, 255);
        break;
      default:
        stroke(180);
        break;
    }
    line(i, height, i, height - values[i]);
  }
  textSize(32);
  fill(255, 255, 0);
  if (sorting) {
    text('SORTING', 10, 50);
  } else if (searching) {
    text('SEARCHING VALUE: ' + searchValue, 10, 50);
  } else if (found) {
    text('VALUE FOUND AT INDEX: ' + indexFound, 10, 50);
  }
}

function createValues() {
  for (let i = 0; i < width; i++) {
    values.push(round(random(height)));
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

async function binarySearch(arr, l, r, x) {
  if (r >= l) {
    mid = round(l + (r - l) / 2);
    tracers[mid] = 5;
    await sleep(500);
    if (arr[mid] == x) {
      tracers[mid] = 6;
      return mid;
    }
    if (arr[mid] > x) {
      tracers[mid] = 0;
      return await binarySearch(arr, l, mid - 1, x);
    }
    tracers[mid] = 0;
    return await binarySearch(arr, mid + 1, r, x);
  }
  tracers[mid] = 0;
  return -1;
}
