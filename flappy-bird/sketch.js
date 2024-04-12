
// Constants
var UP_ARROW = 32;

// "Inputs"
var fillVal = 0;
var canvasSize = 300;

var bird; // TODO: should this be a global variable?
var obstacles = []; // TODO: Idem

class Bird {
    constructor() {
        // Bird starts in the middle of the canvas
        this.x = canvasSize / 2;
        this.y = canvasSize / 2;

        // Size is fixed for now
        this.size = 50;
    }

    draw() {
        circle(this.x, this.y, this.size);
    }

    move() {
        // velocity is also fixed
        this.y += 1;
    }
}

class Obstacle {
    constructor(x) {
        this.x = x;
        this.width = 50; // fixed

        this.y = 0;
        this.gap = 100; // fixed
        this.height = this.computeRandomHeight();
    }

    computeRandomHeight() {
        return random(2*this.gap, canvasSize - 2*this.gap);
    }

    draw() {
        // Draw the top part of the obstacle
        rect(this.x, this.y, this.width, this.height);
        // Draw the bottom part of the obstacle
        rect(this.x, this.height + this.gap, this.width, canvasSize - this.height);
    }

    move() {
        this.x -= 1; // fixed velocity
        if (this.x + this.width < 0) {
            // Reset the obstacle
            this.x = canvasSize + 100; // TODO: Why 100? Remove this magic number
            this.height = this.computeRandomHeight();
        }
    }
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    bird = new Bird();
    for (var i = 0; i < 3; i++) {
        obstacles.push(new Obstacle(canvasSize  + i*150)); // MAGIC NUMBER!!!
    }
}


function draw() {
    background(fillVal);  
    bird.draw();
    bird.move();

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        obstacles[i].move();
    }
;
}


function keyPressed() {
    // not to sure how it works
    if (keyCode === UP_ARROW) {
        bird.y -= 20;
    }
}

