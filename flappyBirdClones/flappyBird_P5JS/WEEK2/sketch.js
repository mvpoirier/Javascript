/*
    Michael Poirier
    April 2020
    Flappy Bird Clone
    Main Sketch
*/

var bird;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(800, 500);
    bird = new Bird();
}

function draw() {
    //background (R, G, B)
    background(0, 200, 0);
    bird.update();
    bird.show();
}

function keyPressed() {
    if (key === ' ') {
        bird.up();
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