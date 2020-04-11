/*
    Michael Poirier
    April 2020
    Flappy Bird Clone
    Bird Class
*/

class Bird {
    constructor() {
        this.y = height / 2;
        this.x = 48;

        this.gravity = 0.4;
        this.lift = -15;
        this.velocity = 0;

        //this.icon = birdSprite;
        this.width = 48;
        this.height = 48;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y < 0 + this.height / 2) {
            this.y = 0 + this.height / 2;
            this.velocity = 0;
        } else if (this.y > height - this.height / 2) {
            this.y = height - this.height / 2;
            this.velocity = 0;
        }
    }

    show() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.width, this.height);
    }

    up() {
        if (!(this.y < 0 + this.height / 2) && !(this.y > height - this.height / 2)) {
            this.velocity += this.lift;
        } else {
            this.velocity = 0;
        }

    }
}