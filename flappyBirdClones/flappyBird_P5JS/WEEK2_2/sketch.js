/*
    Mike Poirier
    Flappy Bird Clone
    Main Sketch
    Updated: April 14, 2020
*/

var bird;

function setup() {
    createCanvas(800, 500);
    bird = new Bird();
    pipe = new Pipe();
}

function draw() {
    background(0, 200, 0);
    bird.update();
    bird.show();
    pipe.update();
    pipe.show();
}

function keyPressed() {
    if (key === ' ') {
        bird.up();
        console.log(round(random(0, 10))); //print a random number 1-10 to console, for fun.
    }
}

/*
    Disable user keys from scrolling from browser
    https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
*/
window.addEventListener("keydown", function (e) {
    // spacebar = 32
    if ([32].indexOf(e.keyCode) > -1) {
        e.preventDefault(); // prevents default browser behaviour when interacting with p5.js
    }
}, false);