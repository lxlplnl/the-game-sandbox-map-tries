const W = 1000;
const H = 1000;
const GRID = 25;
const IZOHIPS = 32;

var img;
function preload() {
  img = loadImage("../image/map.png");
}
function setup() {
  createCanvas(1000, 1000);
  image(img, 0, 0);
  loadPixels();
  console.log(pixels);
  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var loc = (x + y * W) * 4;
      var a = pixels[loc];
      var r = a < 128 ? 255 : ((255 - a) / 128) * 255;
      var g = a >= 128 ? 255 : (a / 128) * 255;
      var flag = false;
      if (parseInt(r + g) % IZOHIPS == 0) flag = true;
      pixels[loc] = flag ? 0 : r;
      pixels[loc + 1] = flag ? 0 : g;
      pixels[loc + 2] = 0;
    }
  }
  updatePixels();
  stroke(0, 32);
  for (let i = 0; i <= W; i += GRID) {
    line(i, 0, i, H);
  }
  for (let j = 0; j <= H; j += GRID) {
    line(0, j, W, j);
  }
}
function draw() {}
