/*
    Mike Poirier
    https://mvpoirier.github.io/

    Flappy Bird Clone - Week 3 Progress
    Updated: April 20, 2020
*/

class Bird {

    constructor() {
        this.y = height / 2;
        this.x = 48;

        this.gravity = 0.3;
        this.lift = -8;
        this.velocity = 0;

        this.width = 36;
        this.height = 36;
    }

    update() {
        //gravitational acceleration
        this.velocity += this.gravity;
        this.y += this.velocity;

        //don't allow the bird to exist outside of the canvas
        if (this.y < 0 + this.height / 2) {
            this.y = 0 + this.height / 2;
            this.velocity = 0;
        } else if (this.y > height - this.height / 2) {
            this.y = height - this.height / 2;
            this.velocity = 0;
        }
    }

    show() {
        //change colour of bird based on vertical location
        fill((255 * (this.y / height)), 0, 255 - (255 * (this.y / height)));
        ellipse(this.x, this.y, this.width, this.height);
    }

    up() {
        //don't allow lift if object is at max-min bounds of the canvas height
        if (!(this.y < 0 + this.height / 2) && !(this.y > height - this.height / 2)) {
            this.velocity += this.lift;
        } else {
            this.velocity = 0;
        }
    }
}