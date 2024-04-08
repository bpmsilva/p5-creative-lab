var canvasSize = 500;
var step = canvasSize/10;
var largeNumber = canvasSize+100;
var sx = 1.5;
var sy = 2;


function setup() {
  createCanvas(canvasSize, canvasSize);

  strokeWeight(3);
  background(255);

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
  RiemannZeta(sx, sy);
  console.log("Done!");
}


function draw() {
  // no animation
}


function drawThinRedLine() {
  // red color
  let c = color(255, 0, 0);

  stroke(c);
  line(canvasSize/2, 0, canvasSize/2, canvasSize);
}


function compute_angle(t, n) {
    return -t*Math.log(n);
}


function RiemannZeta(alpha, omega, lim=10000) {

  var x0 = canvasSize/2 - step;
  var y0 = canvasSize/2;

  let old_x = 0;
  let curr_x = 0;
  let old_y = 0;
  let curr_y = 0;

  for (n = 1; n < lim+1; n++) {
    let curr_r = Math.pow(1/n, alpha);

    let angle = compute_angle(omega, n);
    curr_x += curr_r*Math.cos(angle);
    curr_y += curr_r*Math.sin(angle);

    // add color (each segment has its own color)
    c = color(random(255), random(255), random(255));
    stroke(c);

    // draw line
    line(
      x0 + 2*step*old_x,
      y0 - 2*step*old_y,
      x0 + 2*step*curr_x,
      y0 - 2*step*curr_y
    );

    old_x = curr_x;
    old_y = curr_y;
  }
}
