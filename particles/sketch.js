var num_particles = 25;
var canvas_size = 600;
var particles = []

class Particle {
  constructor(radius, pox_x, pos_y, vel_x, vel_y) {
    this.x = pox_x;
    this.y = pos_y;

    this.radius = radius;

    this.vel_x = vel_x;
    this.vel_y = vel_y;

    // grey color for the particles
    this.color = color(196, 196, 196);
  }

  increment() {
    // update the position of the particle
    // according to its velocity
    this.x += this.vel_x;
    this.y += this.vel_y;
  }

  detect_collision(canvas_x, canvas_y) {
    // detect if the particle is colliding with the walls
    if (this.x + this.radius > canvas_x || this.x < this.radius) {
      this.vel_x = -this.vel_x;
    }

    if (this.y + this.radius  > canvas_y || this.y < this.radius) {
      this.vel_y = -this.vel_y;
    }
  }

  detect_particle_collision(p) {
    let cat1 = (p.x - this.x);
    let cat2 = (p.y - this.y);

    // calculate the hypotenuse
    let hip  = Math.sqrt(cat1*cat1 + cat2*cat2);
    if (hip <= this.radius + p.radius) {
      // swap the velocities
      let tmp1 = this.vel_x;
      let tmp2 = this.vel_y;
      this.vel_x = p.vel_x;
      this.vel_y = p.vel_y;
      p.vel_x = tmp1;
      p.vel_y = tmp2;
    }
  }

  drawLine(p) {
    let d = Math.sqrt((this.x - p.x)*(this.x - p.x) + (this.y - p.y)*(this.y - p.y));

    if (d < 33) {
      let c = color(0, 0, 0);
      stroke(c);
      line(this.x, this.y, p.x, p.y);
    } else if (d < 66) {
      let c = color(98, 98, 98);
      stroke(c);
      line(this.x, this.y, p.x, p.y);
    } else if (d < 100) {
      let c = color(196, 196, 196);
      stroke(c);
      line(this.x, this.y, p.x, p.y);
    }
  }

  draw() {
    // grey color for the particles
    fill(this.color);
    circle(this.x, this.y, 2*this.radius);
  }
}

function setup() {
  createCanvas(canvas_size, canvas_size);

  for (let i = 0; i < num_particles; i++) {
    let p = new Particle(
      random(5) + 1,
      random(-250, 250) + 250, // TODO: check if this places the randomly
      random(-250, 250) + 250, // spawned particles in the center of the canvas
      random(2), random(2));
    particles.push(p);
  }
}

function draw() {
  background(255);

  for (let i = 0; i < num_particles; i++) {
    particles[i].increment();
    particles[i].detect_collision(canvas_size, canvas_size);
    particles[i].draw();
    for (let j = i; j < num_particles; j++) {
      particles[i].detect_particle_collision(particles[j]);
      particles[i].drawLine(particles[j])
    }
  }
}
