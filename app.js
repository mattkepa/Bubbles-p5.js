let bubbles = [];

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 20; i++) {
        let x = random(width);
        let y = random(height);
        let r = random(10, 30);
        bubbles[i] = new Bubble(x, y, r);
    }
}

function draw() {
    background(34);

    for (let bubble of bubbles) {
        bubble.show();
        bubble.move();
        let isOverlapping = false;
        for (let other of bubbles) {
            if (bubble !== other && bubble.intersects(other)) {
                isOverlapping = true;
            }
        }
        if (isOverlapping) {
            bubble.changeFillColor(255);
        } else {
            bubble.changeFillColor(34);
        }
    }
}

function mousePressed() {
    for (let i = bubbles.length - 1; i >= 0; i--) {
        if (bubbles[i].containsCursor(mouseX, mouseY)) {
            bubbles.splice(i, 1);
        }
    }
}


class Bubble {
    constructor(x, y, r) {
        this.pos_x = x;
        this.pos_y = y;
        this.radius = r;
        this.colorR = map(x, 0, width, 75, 150);
        this.colorB = map(x, 0, width, 130, 140);
        this.colorFill = 0;
    }

    move() {
        this.pos_x = this.pos_x + random(-2, 2);
        this.pos_y = this.pos_y + random(-1, 1);
        this.colorR = map(this.pos_x, 0, width, 75, 150);
        this.colorB = map(this.pos_x, 0, width, 130, 140);
    }

    show() {
        stroke(this.colorR, 0, this.colorB);
        strokeWeight(2);
        fill(this.colorFill, 125);
        ellipse(this.pos_x, this.pos_y, this.radius * 2);
    }

    intersects(other) {
        let distance = dist(this.pos_x, this.pos_y, other.pos_x, other.pos_y);
        return distance < this.radius + other.radius;
    }

    containsCursor(px, py) {
        let distance = dist(px, py, this.pos_x, this.pos_y);
        if (distance < this.radius) {
            return true;
        } else {
            return false;
        }
    }

    changeFillColor(color) {
        this.colorFill = color;
    }

}
