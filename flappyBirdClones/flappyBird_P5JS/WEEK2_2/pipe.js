/*
    Mike Poirier
    Flappy Bird Clone
    Pipe Class
    Updated: April 14, 2020
*/

class Pipe {
    constructor() {
        this.r = round(random(0, 3));

        this.highlight = false;

        if (this.r < 3) {
            this.spacing = round(random(105, 175));
            this.top = random(height / 10, height / 2);
            this.bottom = this.top + this.spacing;
        } else {
            this.spacing = round(random(105, 125));
            this.top = random(height / 2, height - this.spacing);
            this.bottom = this.top + this.spacing;
        }
        //console.log(this.r);
        //console.log(this.spacing);

        this.x = width;
        this.w = 20;
        this.speed = -1.5;
    }

    show() {
        if (!this.highlight) {
            fill(255);
            //fill(0, 255 * (1 - (this.x / width)), 255 * (1 - (this.x / width)));
        } else {
            fill(255, 0, 0);
        }

        rect(this.x, 0, this.w, this.top); //top rectangle
        rect(this.x, this.bottom, this.w, height - this.bottom); //bottom rectangle
    }

    update() {
        this.x = this.x + this.speed;
    }

    hit(bird) {
        if ((bird.y < this.top || bird.y > this.top + this.spacing) && bird.x >= this.x && bird.x <= this.x + this.w) {
            this.highlight = true;
            return true;
        } else {
            return false;
        }
    }
}