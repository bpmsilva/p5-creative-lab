// This is a simple simulation of the n-body problem.

// Inputs
const bodies = [];
const canvasSize = 800;
const massRadiusConstant = 10; // A const that mutiplies the mass to get the radius
const gravitationalConstant = 15; // Kind of a Kepler constant
const epsilon = 0.001; // avoid division by zero

// masses (also the number of bodies)
const masses = [3, 6, 9, 12];

class Body {

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
    // draw the body as a circle
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
}

function computeGravity() {
  // F = G * m1 * m2 / r^2
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      // There is another way to compute these gravities
      // between the bodies, but I'm not going to implement it
      // afraid of introducing bugs.
      if (i != j) {
        let dx = bodies[j].x - bodies[i].x;
        let dy = bodies[j].y - bodies[i].y;
        let d = sqrt(dx*dx + dy*dy);  // Avoid division by zero

        let force = gravitationalConstant * bodies[i].mass * bodies[j].mass / ((d * d) + epsilon);
        let fx = force * dx / d;
        let fy = force * dy / d;

        bodies[i].velX += fx / bodies[i].mass;
        bodies[i].velY += fy / bodies[i].mass;
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
  // This is a simple inelastic collision between two bodies

  // The bodies are going to collide if the distance between them
  // is less then the sum of their radius.
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i != j) {
        let dx = bodies[j].x - bodies[i].x;
        let dy = bodies[j].y - bodies[i].y;
        let d = sqrt(dx*dx + dy*dy + epsilon); // Avoid division by zero
        if (d < bodies[i].r + bodies[j].r) {
          // The bodies are going to collide

          // the final velocity from the inelastic collision is:
          let vx = computeFinalVelocity(bodies[i].mass, bodies[j].mass, bodies[i].velX, bodies[j].velX);
          let vy = computeFinalVelocity(bodies[i].mass, bodies[j].mass, bodies[i].velY, bodies[j].velY);

          // add the new bodies
          let newMass = bodies[i].mass + bodies[j].mass;
          let newX = (bodies[i].x + bodies[j].x) / 2;
          let newY = (bodies[i].y + bodies[j].y) / 2;

          // remove the old bodies
          if (i > j) {
            removeElementFromArray(bodies, bodies[i]);
            removeElementFromArray(bodies, bodies[j]);
          } else {
            removeElementFromArray(bodies, bodies[j]);
            removeElementFromArray(bodies, bodies[i]);
          }

          bodies.push(new Body(
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
    bodies.push(
      new Body(
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
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].update();
    bodies[i].show();
  }
}
