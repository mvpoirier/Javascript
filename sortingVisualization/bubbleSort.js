/*
    Visualized sorting algorithms in Javascript and p5.js, inspired by:
    Coding Train - Bubblesort: https://www.youtube.com/watch?v=67k3I2GxTH8
    Coding Train - Quicksort: https://www.youtube.com/watch?v=eqo2LxRADhU
    Visualizing Algorithms: https://bost.ocks.org/mike/algorithms/
    async & await for asynchronous functions: https://www.youtube.com/watch?v=XO77Fib9tSI
*/

/*
    BUBBLE SORT
*/

let w = 5;
let values = [];
let i = 0

function setup() {
    createCanvas(800, 200);

    values = new Array(floor(width / w));

    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    frameRate(30);
}

function bubbleSort(arr) {
    let temp = 0;
    for (let index = 0; index < (arr.length - 1 - i); index++) {
        if (arr[index] > arr[index + 1]) {
            temp = arr[index];
            arr[index] = arr[index + 1];
            arr[index + 1] = temp;
        }
    }
}

function draw() {
    background(0);

    if (i < values.length) {
        bubbleSort(values);
    } else {
        console.log("Bubble Sort is finished.");
        noLoop();
    }
    i++;

    for (let j = 0; j < values.length; j++) {
        stroke(0);
        if (j == (values.length - i)) {
            fill(255, 0, 0);
        } else {
            fill(255);
        }
        rect(j * w, height - values[j], w, values[j]);
    }
}