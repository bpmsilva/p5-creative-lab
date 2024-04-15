var canvasSize = 600;

// Drops' constants
var drops = [];
var maxDrops = 50;
var dropHeight = 80;

// Drop's random constants
var randomConst = 20;
var minVel = 1, maxVel = 20;
var minGrav = 0.05, maxGrav = 0.2;
var minLen = 5, maxLen = 10;

class Drop {

  constructor() {
    this.init();
  }

  init() {
    // position
    this.x = random(canvasSize);
    this.y = random(canvasSize) - canvasSize - dropHeight;

    // z is the depth of the drop
    // it is used to calculate the speed,
    // length and gravity of the drop
    this.z = random(randomConst);
    this.velocity = map(this.z, 0, randomConst, minVel, maxVel);
    this.grav = map(this.z, 0, randomConst, minGrav, maxGrav);
    this.len = map(this.z, 0, randomConst, minLen, maxLen);
  }

  update() {
    // update position through velocity and gravity
    this.velocity += this.grav;
    this.y += this.velocity;

    // Reset if the drop goes below the canvas
    if (this.y > canvasSize) {
      this.init(); // / Reset drop properties if it goes below the canvas
    }
  }

  show() {
    const c = color(138, 43, 226);
    fill(c);
    stroke(c);
    rect(this.x, this.y, this.len, dropHeight);
  }

}
function setup() {
  createCanvas(canvasSize, canvasSize);
  for (let i = 0; i < maxDrops; i++) {
    drops.push(new Drop());
  }
}

function draw() {
  background(255);
  drops.forEach(drop => {
    if (drop.y > canvasSize) {
      drop = drop.constructor();
    }
    drop.update();
    drop.show();
  });
}
