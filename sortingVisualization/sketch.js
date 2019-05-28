/*
    Visualized sorting algorithms in Javascript and p5.js, inspired by:
    Coding Train - Bubblesort: https://www.youtube.com/watch?v=67k3I2GxTH8
    Coding Train - Quicksort: https://www.youtube.com/watch?v=eqo2LxRADhU
    Visualizing Algorithms: https://bost.ocks.org/mike/algorithms/
*/

var w = 10;

function setup() {
    createCanvas(800, 200);
    values = new Array(floor(width / w));

    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    frameRate(5);
}

function draw() {
    background(51);

    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill(255);
        rect(i * w, height - values[i], w, values[i]);
    }
}