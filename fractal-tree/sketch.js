// initial constants
const canvasSize = 600;
const firstBranchLength = 200;

// initial values for the first branch
const x0 = canvasSize / 2;
const x1 = x0;
const y0 = canvasSize;
const y1 = y0 - firstBranchLength;

const maxEndBranches = 2048;
const initialFractalRatio = 0.5;
const initialFractalAngle = Math.PI / 4;

// variables for the size ratio sliders
let ratioSlider1, ratioSlider2;
let oldFractalRatio1 = 0;
let oldFractalRatio2 = 0;
let fractalRatio1 = initialFractalRatio;
let fractalRatio2 = initialFractalRatio;

// fractal angle slider
let angleSlider1, angleSlider2;
let oldFractalAngle1 = 0;
let oldFractalAngle2 = 0;
let fractalAngle1 = initialFractalAngle;
let fractalAngle2 = initialFractalAngle;

class Branch {
  constructor(start, end) {
    // start and end are objects with x and y properties
    this.start = start;
    this.end = end;
  }

  computeAngle() {
    // What is the difference between atan and atan2?
    // Answer (Copilot): atan2 is a function that returns the arctangent of the quotient of its arguments.
    // It is similar to atan, but atan2 returns the angle in the correct quadrant.
    return Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
  }

  computeSize() {
    // Where is distance defined? In the p5.js library?
    return dist(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  show() {
    // Draw a line between the start and end points
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

}

// recursive function to draw branches
function drawBranches(branchArr, fractalRatio1, fractalRatio2, fractalAngle1, fractalAngle2) {

  if (branchArr.length > maxEndBranches) {
    return;
  }

  let newBranches = [];
  for (let i = 0; i < branchArr.length; i++) {
    let branch = branchArr[i];
    let angle = branch.computeAngle();
    let size = branch.computeSize();

    let newBranch1 = new Branch(
      // Branch starts at the end of the previous branch
      { x: branch.end.x, y: branch.end.y },
      {
        // New branch ends at a give ratio and angle from the previous branch
        // 2/3 is the ratio and Math.PI / 4 is the angle that need to be remove
        // as they are magic numbers. The ideia here is to make sliders to control them
        x: branch.end.x + fractalRatio1 * size * Math.cos(angle + fractalAngle1),
        y: branch.end.y + fractalRatio1 * size * Math.sin(angle + fractalAngle1)
      }
    );

    let newBranch2 = new Branch(
      // The second branch has the same properties as the first one,
      // but the angle is different
      { x: branch.end.x, y: branch.end.y },
      {
        x: branch.end.x + fractalRatio2 * size * Math.cos(angle - fractalAngle2),
        y: branch.end.y + fractalRatio2 * size * Math.sin(angle - fractalAngle2)
      }
    );

    newBranch1.show();
    newBranch2.show();

    // Add the new branches to the array for next iteration
    newBranches.push(newBranch1);
    newBranches.push(newBranch2);
  }

  drawBranches(newBranches, fractalRatio1, fractalRatio2, fractalAngle1, fractalAngle2);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(255);

  stroke(0);
  strokeWeight(2);

  ratioSlider1 = createSlider(0, 1, initialFractalRatio, 0.01);
  ratioSlider2 = createSlider(0, 1, initialFractalRatio, 0.01);

  angleSlider1 = createSlider(0, Math.PI / 2, initialFractalAngle, 0.01);
  angleSlider2 = createSlider(0, Math.PI / 2, initialFractalAngle, 0.01);
}

function draw() {

  fractalRatio1 = ratioSlider1.value();
  fractalRatio2 = ratioSlider2.value();

  fractalAngle1 = angleSlider1.value();
  fractalAngle2 = angleSlider2.value();

  // draw first branch
  if (fractalRatio1 != oldFractalRatio1 ||
    fractalRatio2 != oldFractalRatio2 ||
    fractalAngle1 != oldFractalAngle1 ||
    fractalAngle2 != oldFractalAngle2
  ) {
    background(255);

    let firstBranch = new Branch({ x: x0, y: y0 }, { x: x1, y: y1 });
    firstBranch.show();

    // draw next branches
    drawBranches([firstBranch], fractalRatio1, fractalRatio2, fractalAngle1, fractalAngle2);

    oldFractalRatio1 = fractalRatio1;
    oldFractalRatio2 = fractalRatio2;

    oldFractalAngle1 = fractalAngle1;
    oldFractalAngle2 = fractalAngle2;
  }
}
