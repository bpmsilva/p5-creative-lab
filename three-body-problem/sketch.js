// This is a simple simulation of the n-body problem.

// Inputs
const circles = [];
const canvasSize = 800;
const massRadiusConstant = 10; // A const that mutiplies the mass to get the radius
const gravitationalConstant = 15; // Kind of a Kepler constant
const epsilon = 0.001; // avoid division by zero

// masses (also the number of bodies)
const masses = [3, 6, 9, 12];

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


function computeFinalVelocity(mass1, mass2, vel1, vel2) {
  return (mass1 * vel1 + mass2 * vel2) / (mass1 + mass2);
}


function removeElementFromArray(array, elem) {
  let index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}


function inelasticCollision() {
  // This is a simple inelastic collision between two circles

  // The circles are going to collide if the distance between them
  // is less then the sum of their radius.
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      if (i != j) {
        let dx = circles[j].x - circles[i].x;
        let dy = circles[j].y - circles[i].y;
        let d = sqrt(dx*dx + dy*dy + epsilon); // Avoid division by zero
        if (d < circles[i].r + circles[j].r) {
          // The circles are going to collide

          // the final velocity from the inelastic collision is:
          let vx = computeFinalVelocity(circles[i].mass, circles[j].mass, circles[i].velX, circles[j].velX);
          let vy = computeFinalVelocity(circles[i].mass, circles[j].mass, circles[i].velY, circles[j].velY);

          // add the new circle
          let newMass = circles[i].mass + circles[j].mass;
          let newX = (circles[i].x + circles[j].x) / 2;
          let newY = (circles[i].y + circles[j].y) / 2;

          // remove the old circles
          if (i > j) {
            removeElementFromArray(circles, circles[i]);
            removeElementFromArray(circles, circles[j]);
          } else {
            removeElementFromArray(circles, circles[j]);
            removeElementFromArray(circles, circles[i]);
          }

          circles.push(new Circle(
            newMass,
            newX,
            newY,
            vx,
            vy
          ));
        }
      }
    }
  } 
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(255);

  for (let i = 0; i < masses.length; i++) {
    let randomX = random(canvasSize);
    let randomY = random(canvasSize);
    let randomVelX = random(2) - 1;
    let randomVelY = random(2) - 1;
    console.log(masses[i]);
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
  background(255);
  computeGravity();
  inelasticCollision();
  for (let i = 0; i < circles.length; i++) {
    circles[i].update();
    circles[i].show();
  }
}
