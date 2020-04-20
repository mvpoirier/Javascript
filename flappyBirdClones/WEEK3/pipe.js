/*
    Mike Poirier
    https://mvpoirier.github.io/

    Flappy Bird Clone - Week 3 Progress
    Updated: April 20, 2020
*/

class Pipe {
    constructor() {
        //randomly decide if spacing is above or below midpoint (33% of the time)
        this.r = round(random(1, 3));
        if (this.r < 3) {
            this.spacing = round(random(105, 175));
            this.top = random(height / 10, height / 2);
            this.bottom = this.top + this.spacing;
        } else {
            this.spacing = round(random(105, 125));
            this.top = random(height / 2, height - this.spacing);
            this.bottom = this.top + this.spacing;
        }

        //set pipe parameters
        this.x = width;
        this.w = 20;
        this.speed = -1.5;
    }

    show() {
        //draw the top and bottom of the rectangle (with spacing)
        fill(255 * (this.x / width), 255 * (this.x / width), 255 * (this.x / width));
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height - this.bottom);
    }

    update() {
        //translate rectangle left by speed value
        this.x = this.x + this.speed;
    }

    hit(bird) {
        //if bird is between is NOT between y-spacing, AND *IS* between x-width -- it's a hit.
        if (((bird.y - bird.width / 2) < this.top || (bird.y + bird.width / 2) > this.top + this.spacing) && (bird.x >= this.x && bird.x <= this.x + this.w)) {
            return true;
        } else {
            return false;
        }
    }

    pass(bird) {
        //determine if the rectangle has moved past the bird 
        return (bird.x > this.x + this.w)
    }
}