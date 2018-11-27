const W = 1000;
const H = 1000;
const GRID = 25;
const IZOHIPS = 10;
const IZOHIPS_COLOR = 100;

var img;
function preload() {
  img = loadImage("../image/map.png");
}

function setup() {
  createCanvas(W, H);
  image(img, 0, 0);
  loadPixels();
  console.log(pixels);
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var i = (x + y * W) * 4;
      var col = pixels[i];
      var red = col < 128 ? 255 : ((255 - col) / 128) * 255;
      var green = col >= 128 ? 255 : (col / 128) * 255;

      var flag = false;
      if (parseInt((red + green) / 2) % parseInt(255 / IZOHIPS) == 0) flag = true;
      pixels[i] = flag ? IZOHIPS_COLOR : red;
      pixels[i + 1] = flag ? IZOHIPS_COLOR : green;
      pixels[i + 2] = flag ? IZOHIPS_COLOR : 0;
    }
  }
  updatePixels();
  drawGrid();
}
function draw() { }


function drawGrid() {
  stroke(0, 32);
  for (let i = 0; i <= W; i += GRID) {
    line(i, 0, i, H);
  }
  for (let j = 0; j <= H; j += GRID) {
    line(0, j, W, j);
  }
}
