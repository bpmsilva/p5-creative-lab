const canvasSize = 600;
const firstBranchLength = 200;

const x0 = canvasSize / 2;
const x1 = x0;
const y0 = canvasSize;
const y1 = y0 - firstBranchLength;

const maxEndBranches = 2048;
const fractalRatio = 2/3;
const fractalAngle = Math.PI / 4;

class Branch {
  constructor(start, end) {
    // start and end are objects with x and y properties
    this.start = start;
    this.end = end;
  }

  compute_angle() {
    // What is the difference between atan and atan2?
    // Answer (Copilot): atan2 is a function that returns the arctangent of the quotient of its arguments.
    // It is similar to atan, but atan2 returns the angle in the correct quadrant.
    return Math.atan2(
      this.end.y - this.start.y,
      this.end.x - this.start.x
    );
  }

  compute_size() {
    // Where is distance defined? In the p5.js library?
    return dist(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  show() {
    // Draw a line between the start and end points
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

}

// recursive function to draw branches
function drawBranches(branchArr) {

  if (branchArr.length > maxEndBranches) {
    return;
  }

  let newBranches = [];
  for (let i = 0; i < branchArr.length; i++) {
    let branch = branchArr[i];
    let angle = branch.compute_angle();
    let size = branch.compute_size();

    let newBranch1 = new Branch(
      // Branch starts at the end of the previous branch
      {x: branch.end.x, y: branch.end.y},
      {
        // New branch ends at a give ratio and angle from the previous branch
        // 2/3 is the ratio and Math.PI / 4 is the angle that need to be remove
        // as they are magic numbers. The ideia here is to make sliders to control them
        x: branch.end.x + fractalRatio * size * Math.cos(angle + fractalAngle),
        y: branch.end.y + fractalRatio * size * Math.sin(angle + fractalAngle)
      }
    );

    let newBranch2 = new Branch(
      // The second branch has the same properties as the first one,
      // but the angle is different
      {x: branch.end.x, y: branch.end.y},
      {
        x: branch.end.x + fractalRatio * size * Math.cos(angle - fractalAngle),
        y: branch.end.y + fractalRatio * size * Math.sin(angle - fractalAngle)
      }
    );

    newBranch1.show();
    newBranch2.show();

    // Add the new branches to the array for next iteration
    newBranches.push(newBranch1);
    newBranches.push(newBranch2);
  }

  drawBranches(newBranches);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(255);

  stroke(0);
  strokeWeight(2);

  // draw first branch
  let firstBranch = new Branch({x: x0, y: y0}, {x: x1, y: y1});
  firstBranch.show();

  // draw next branches
  drawBranches([firstBranch]);
}
