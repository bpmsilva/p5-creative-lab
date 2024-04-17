// This is a simple simulation of the n-body problem.

// Inputs
const circles = [];
const canvasSize = 800;
const massRadiusConstant = 10; 
const gravitationalConstant = 10;
const epsilon = 0.001;

// masses (also the number of bodies)
const masses = [1, 2, 4, 16];

class Circle {
  // The bodies are represented as circles
  constructor(mass, x, y, velX, velY) {
    
    this.mass = mass;
    this.r = massRadiusConstant * Math.pow(this.mass, 1/3);
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

  update() {
    // update state (position and velocity)
    this.x += this.velX;
    this.y += this.velY;
  }

  show() {
    // draw the circle
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function computeGravity() {
  // F = G * m1 * m2 / r^2
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      // There is another way to compute these gravities
      // between the circles, but I'm not going to implement it
      // afraid of introducing bugs.
      if (i != j) {
        let dx = circles[j].x - circles[i].x;
        let dy = circles[j].y - circles[i].y;
        let d = sqrt(dx*dx + dy*dy + epsilon);  // Avoid division by zero
        // mass is equal one for now
        let force = gravitationalConstant * circles[i].mass * circles[j].mass / (d * d);
        let fx = force * dx / d;
        let fy = force * dy / d;

        circles[i].velX += fx / circles[i].mass;
        circles[i].velY += fy / circles[i].mass;
      }
    }
  }
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(255);

  for (let i = 0; i < masses.length; i++){
    let randomX = random(canvasSize);
    let randomY = random(canvasSize);
    let randomVelX = random(2) - 1;
    let randomVelY = random(2) - 1;
    console.log(masses[i])
    circles.push(
      new Circle(
        masses[i],
        randomX,
        randomY,
        randomVelX,
        randomVelY
      ));
  }
}

function draw() {
  computeGravity();
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }
}
