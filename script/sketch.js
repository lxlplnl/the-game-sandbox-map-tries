const W = 500;
const H = 500;
const GRID = 25;
const IZOHIPS = 16;
const IZOHIPS_COLOR = 0;
const T = 255;

function setup() {
  createCanvas(W, H);
  drawMap();
}

function draw() {
  if (mouseIsPressed) {
    drawMap();
  }
}

function drawMap() {
  loadPixels();
  fill(0);
  rect(0, 0, W, H);

  const M = getPixels();
  for (let i = 0; i < random(4); i++) {
    cloud(M, random(1, 8) * 8, 1);
  }
  cloud(M, 0, IZOHIPS);

  HQ(M);
  isohips();
  updatePixels();
  drawGrid();
}

function drawGrid() {
  stroke(0, 32);
  for (let i = 0; i <= W; i += GRID) {
    line(i, 0, i, H);
  }
  for (let j = 0; j <= H; j += GRID) {
    line(0, j, W, j);
  }
}

function isohips() {
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      var i = (x + y * W) * 4;
      var c = pixels[i];
      var red = c < T / 2 ? T : 2 * (T - c);
      var green = c > T / 2 ? T : 2 * c;

      var border = false;
      if (parseInt((red + green) / 2) % parseInt(T / IZOHIPS) == 0)
        border = true;
      pixels[i + 0] = border ? IZOHIPS_COLOR : red;
      pixels[i + 1] = border ? IZOHIPS_COLOR : green;
      pixels[i + 2] = border ? IZOHIPS_COLOR : 0;
    }
  }
}

function cloud(M, DELTA, DEPTH) {
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var col = 0;
      const avg = getAvg(M, x, y, DEPTH);
      if (avg == 0) col = parseInt(random(255));
      else col = parseInt(avg + random(-DELTA, DELTA) + 0.5);
      if (col > 255) col = 255;
      if (col < 0) col = 0;
      M[x][y][0] = col;
      M[x][y][1] = col;
      M[x][y][2] = col;
    }
  }
  setPixels(M);
}

function getAvg(M, x, y, DEPTH = 1) {
  let sum = 0;
  let count = 0;
  for (let j = y - DEPTH; j <= y + DEPTH; j++) {
    for (let i = x - DEPTH; i <= x + DEPTH; i++) {
      if (i == x && j == y) continue;
      if (i < 0 || j < 0 || i >= W || j >= H) continue;
      if (M[i][j][0] <= 0) continue;
      count++;
      sum += M[i][j][0];
    }
  }
  if (count == 0) return 0;
  return sum / count;
}

function smooth(DEPTH) {
  const M = getPixels(pixels);
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      const avg = getAvg(M, x, y, DEPTH);
      M[x][y][0] = avg;
      M[x][y][1] = avg;
      M[x][y][2] = avg;
    }
  }
  setPixels(M);
}

function getPixels(pixels) {
  var M = [];
  for (var x = 0; x < W; x++) {
    var line = [];
    for (var y = 0; y < H; y++) {
      var p = [];
      for (let i = 0; i < 4; i++) {
        if (pixels) p.push(pixels[i]);
        else p.push(i == 3 ? 255 : 0);
      }
      line.push(p);
    }
    M.push(line);
  }
  return M;
}

function setPixels(M) {
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      var loc = (x + y * W) * 4;
      for (let i = 0; i < 4; i++) {
        pixels[loc + i] = M[x][y][i];
      }
    }
  }
}

function HQ(M) {
  const P = [];
  for (let i = 0; i < 255; i++) {
    P.push(0);
  }
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      P[M[x][y][0]]++;
    }
  }
  for (let i = 1; i < 255; i++) {
    P[i] += P[i - 1];
  }
  const MAX = max(P);
  const MIN = min(P);
  for (var x = 0; x < W; x++) {
    for (var y = 0; y < H; y++) {
      const h = ((P[M[x][y][0]] - MIN) / (MAX - MIN)) * 255;
      M[x][y][0] = h;
      M[x][y][1] = h;
      M[x][y][2] = h;
    }
  }
  setPixels(M);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
