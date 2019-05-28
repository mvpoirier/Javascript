/*
    Visualized Bubble Sort in Javascript and p5.js, inspired by:
    Coding Train - Bubblesort: https://www.youtube.com/watch?v=67k3I2GxTH8
    Coding Train - Quicksort: https://www.youtube.com/watch?v=eqo2LxRADhU
    Visualizing Algorithms: https://bost.ocks.org/mike/algorithms/
    async & await for asynchronous functions: https://www.youtube.com/watch?v=XO77Fib9tSI
    Reset sketch with a button: https://www.youtube.com/watch?v=lm8Y8TD4CTM
*/

let w = 20;
let values = [];
let bubble = 0;
let i = 0;
let complete = false;
let speed = 30;

function setup() {
    createCanvas(800, 200);
    frameRate(30);

    resetSketch();

    var button = createButton("Accelerate or Reset");
    button.mousePressed(resetSketch);
}

function resetSketch() {
    if (i == 0 || complete) {
        bubble = 0;
        i = 0;
        complete = false;
        speed = 30;
        values = new Array(floor(width / w));

        for (let i = 0; i < values.length; i++) {
            values[i] = random(height);
        }

        bubbleSort(values);
        loop();
    } else {
        console.log("Need to wait for sort to finish, speeding it up...");
        speed = 1;
    }
}

async function bubbleSort(arr) {
    let finished = false;
    let temp = 0;
    while (!finished) {
        finished = true;
        for (let index = 0; index < arr.length - i; index++) {
            if (arr[index] > arr[index + 1]) {
                temp = arr[index];
                arr[index] = arr[index + 1];
                arr[index + 1] = temp;
                bubble = index + 1;
                finished = false;
            }
            await sleep(speed);
        }
        i++;
    }
    complete = true;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function draw() {
    background(0);

    for (let j = 0; j < values.length - i; j++) {
        if (j == bubble) {
            fill(255, 0, 0);
        } else {
            fill(255);
        }
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    for (let j = values.length - 1 - i; j < values.length; j++) {
        fill(0, 255, 0);
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    if (complete) {

        for (let j = 0; j < values.length - i; j++) {
            fill(0, 255, 0);
            stroke(0);
            rect(j * w, height - values[j], w, values[j]);
        }

        console.log("Bubble Sort Completed.");
        noLoop();
    }
}