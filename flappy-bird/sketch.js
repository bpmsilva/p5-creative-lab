
var UP_ARROW = 32;

var y = 0;
var fillVal = 0;
var canvas_size = 300;

var obstacle;

function setup() {
    createCanvas(300, 300);
    obstacle = new Obstacle();
}

class Obstacle {
    constructor() {
        this.x = canvas_size;
        this.width = 50;

        this.y = 0;
        this.gap = 100;
        this.height = random(2*this.gap, canvas_size - 2*this.gap);
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
        rect(this.x, this.height + this.gap, this.width, canvas_size - this.height);
    }

    move() {
        this.x -= 1;
    }
}


function draw() {
    background(fillVal);
    circle(canvas_size / 2, canvas_size / 2 + y, 50);
    obstacle.draw();
    obstacle.move();
    y += 1;
}


function keyPressed() {
    if (keyCode === UP_ARROW) {
        y -= 20;
    }
}

