/*
    Mike Poirier
    Flappy Bird Clone
    Pipe Class
    Updated: April 14, 2020
*/

class Pipe {
    constructor() {
        this.top = random(height / 10, height / 2);
        this.spacing = round(random(100, 200));
        this.bottom = this.top + this.spacing;

        this.x = width;
        this.w = 20;
        this.speed = -2;
    }

    show() {
        fill(0, 255 * (1 - (this.x / width)), 255 * (1 - (this.x / width)));
        //fill(255 * (1 - (this.x / width)), 0, 255 * (this.x / width));

        rect(this.x, 0, this.w, this.top); //top rectangle
        rect(this.x, this.bottom, this.w, height - this.bottom); //bottom rectangle
    }

    update() {
        this.x = this.x + this.speed;
    }
}