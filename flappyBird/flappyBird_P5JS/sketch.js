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