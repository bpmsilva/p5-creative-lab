// This is a simple simulation of the n-body problem.

// Inputs
const bodies = [];
const canvasSize = 800;
const massRadiusConstant = 10; // A const that mutiplies the mass to get the radius
const gravitationalConstant = 20; // Kind of a Kepler constant
const epsilon = 0.001; // avoid division by zero

// masses (also the number of bodies)
const numMasses = 10;
const masses = [];

class Body {

  constructor(mass, x, y, velX, velY, color) {
    this.mass = mass;
    this.r = massRadiusConstant * Math.pow(this.mass, 1 / 3);
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
  }

  update() {
    // update state (position and velocity)
    this.x += this.velX;
    this.y += this.velY;
  }

  show() {
    // draw the body as a circle
    fill(this.color);
    stroke(this.color);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }    
}


function computeDistance(x1, x2, y1, y2) {
  let dx = x1 - x2;
  let dy = y1 - y2;
  return sqrt(dx * dx + dy * dy);
}


function computeGravity(i, j) {
  // F = G * m1 * m2 / r^2

  // distances
  let dx = bodies[j].x - bodies[i].x;
  let dy = bodies[j].y - bodies[i].y;
  let d = sqrt(dx * dx + dy * dy);  // Avoid division by zero

  // forces
  let force = gravitationalConstant * bodies[i].mass * bodies[j].mass / ((d * d) + epsilon);
  let fx = force * dx / d;
  let fy = force * dy / d;

  // update velocities
  bodies[i].velX += fx / bodies[i].mass;
  bodies[i].velY += fy / bodies[i].mass;
}


function computeFinalVelocity(mass1, mass2, vel1, vel2) {
  // This is a simple inelastic collision between two bodies
  return (mass1 * vel1 + mass2 * vel2) / (mass1 + mass2);
}


function removeElementFromArray(array, elem) {
  let index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
}


function inelasticCollision(i, j) {
  // This is a simple inelastic collision between two bodies

  // The bodies are going to collide if the distance between them
  // is less then the sum of their radius
  let d = computeDistance(bodies[i].x, bodies[j].x, bodies[i].y, bodies[j].y);
  if (d < bodies[i].r + bodies[j].r) {
    // The bodies collided

    // the final velocity from the inelastic collision is:
    let vx = computeFinalVelocity(bodies[i].mass, bodies[j].mass, bodies[i].velX, bodies[j].velX);
    let vy = computeFinalVelocity(bodies[i].mass, bodies[j].mass, bodies[i].velY, bodies[j].velY);

    // add the new bodies
    let newMass = bodies[i].mass + bodies[j].mass;
    let newX = (bodies[i].x + bodies[j].x) / 2;
    let newY = (bodies[i].y + bodies[j].y) / 2;

    // average the colors to later use in the new body
    avgColor = averageColors(bodies[i].color, bodies[j].color);

    // remove the old bodies
    if (i > j) {
      removeElementFromArray(bodies, bodies[i]);
      removeElementFromArray(bodies, bodies[j]);
    } else {
      removeElementFromArray(bodies, bodies[j]);
      removeElementFromArray(bodies, bodies[i]);
    }

    bodies.push(new Body(newMass, newX, newY, vx, vy, avgColor));
  }
}


function averageColors(color1, color2) {
  r = color1.levels[0] + color2.levels[0] / 2;
  g = color1.levels[1] + color2.levels[1] / 2;
  b = color1.levels[2] + color2.levels[2] / 2;
  return color(r, g, b);
}


function setup() {
  createCanvas(canvasSize, canvasSize);
  background(0);

  for (let i = 0; i < numMasses; i++) {
    masses.push(random(1,10));
  }

  for (let i = 0; i < masses.length; i++) {
    let randomX = random(canvasSize);
    let randomY = random(canvasSize);
    let randomVelX = random(2) - 1;
    let randomVelY = random(2) - 1;
    let randomColor = color(random(255), random(255), random(255));
    // console.log(masses[i]);
    bodies.push(
      new Body(
        masses[i],
        randomX,
        randomY,
        randomVelX,
        randomVelY,
        randomColor
      ));
  }
}


function loops(naturalLaw) {
  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i != j) {
        naturalLaw(i, j);
      }
    }
  }
}


function applyNaturalLaws() {
  loops(computeGravity);
  loops(inelasticCollision);
}


function draw() {
  background(0, 10);
  applyNaturalLaws();
  for (let i = 0; i < bodies.length; i++) {
    bodies[i].update();
    bodies[i].show();
  }
}
