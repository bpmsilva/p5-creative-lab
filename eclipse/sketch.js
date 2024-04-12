
var canvas_size = 400;
var sun_radius = 100;
var sun;
var monn;

function setup() {
  createCanvas(canvas_size, canvas_size);

  // color of the sun ir orange
  let sun_color = color('#FDB813');
  let moon_color = color('#837e67');
  sun = new RoundObject(
    sun_radius,
    canvas_size/2,
    canvas_size/2,
    sun_color
  );


  moon = new RoundObject(
    sun_radius,
    canvas_size/2 + sun_radius,
    canvas_size/2,
    moon_color
  );
}

class RoundObject {
  constructor(radius, pos_x, pos_y, color) {
    this.x = pos_x;
    this.y = pos_y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.radius);
  }

  move() {
    this.x = mouseX;
    this.y = mouseY;
  }
}

function overlap(x1, y1, r1, x2, y2, r2) {
  let d = Math.sqrt((x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2));
  return r1 - d;
}

function draw() {

  // bluish, sky look like background
  let d = overlap(sun.x, sun.y, sun.radius, moon.x, moon.y, moon.radius);
  let c = color(200-d, 145-d, 35-d);
  background(c);


  // draw the sun, it doesn't move
  sun.draw();

  // draw the moon, it follows the mouse
  moon.draw();
  moon.move();

  // circle(canvas_size/2, canvas_size/2, 100);

  // circle(mouseX, mouseY, 100);
}
