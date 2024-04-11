var canvasSize = 500;
var step = canvasSize/10;
var largeNumber = canvasSize+100;
var oldAlpha = 0.5;
var oldOmega = 14.1347251417346937;


function setup() {
  randomSeed(0);
  createCanvas(canvasSize, canvasSize);

  sliderAlpha = createSlider(0, 3, oldAlpha, 0.001);
  sliderAlpha.position(step/2, 10);
  sliderAlpha.size(canvasSize/2 - 2*step);

  sliderOmega = createSlider(0, 20, oldOmega, 0.001);
  sliderOmega.position(step/2, 50);
  sliderOmega.size(canvasSize/2 - 2*step);

  draw_background();
  RiemannZeta(oldAlpha, oldOmega);
}


draw_background = function() {
  background(255);
  strokeWeight(3);

  c = color(0, 0, 0);
  stroke(c);

  // x axis
  line(
    -largeNumber, // < 0
    canvasSize/2,
    largeNumber, // > canvasSize 
    canvasSize/2
  );

  // y = 0 axis
  line(canvasSize/2-step, 0, canvasSize/2-step, canvasSize);

  // y = 1 axis
  line(canvasSize/2+step, 0, canvasSize/2+step, canvasSize);

  drawThinRedLine();
}


function drawThinRedLine() {
  // red color
  let c = color(255, 0, 0);

  stroke(c);
  line(canvasSize/2, 0, canvasSize/2, canvasSize);
}


function writeText() {
  fill(0);
  stroke('white');
  textSize(20);
  let alpha = sliderAlpha.value();
  let omega = sliderOmega.value();
  text('alpha = ' + alpha, canvasSize - 150, 45);
  text('omega = ' + omega, canvasSize - 150, 80);
}


function draw() {
  let alpha = sliderAlpha.value();
  let omega = sliderOmega.value();
  
  if (alpha != oldAlpha || omega != oldOmega) {
    draw_background();
    RiemannZeta(alpha, omega);
  }
  writeText();

  oldAlpha = alpha;
  oldOmega = omega;
}


function compute_angle(t, n) {
    return -t*Math.log(n);
}


function RiemannZeta(alpha, omega, lim=10000) {

  var x0 = canvasSize/2 - step;
  var y0 = canvasSize/2;

  let oldX = 0;
  let currX = 0;
  let oldY = 0;
  let currY = 0;

  for (n = 1; n < lim+1; n++) {
    let currR = Math.pow(1/n, alpha);

    let angle = compute_angle(omega, n);
    currX += currR*Math.cos(angle);
    currY += currR*Math.sin(angle);

    // add color (each segment has its own color)
    c = color(random(255), random(255), random(255));
    stroke(c);

    // draw line
    line(
      x0 + 2*step*oldX,
      y0 - 2*step*oldY,
      x0 + 2*step*currX,
      y0 - 2*step*currY
    );

    oldX = currX;
    oldY = currY;
  }
}
