/*
    Visualized Bubble Sort in Javascript and p5.js, inspired by:

    Coding Train - Bubblesort: https://www.youtube.com/watch?v=67k3I2GxTH8
    Coding Train - Quicksort: https://www.youtube.com/watch?v=eqo2LxRADhU
    
    Visualizing Algorithms: https://bost.ocks.org/mike/algorithms/
    
    async & await for asynchronous functions: https://www.youtube.com/watch?v=XO77Fib9tSI
    
    Reset sketch with a button: https://www.youtube.com/watch?v=lm8Y8TD4CTM
*/

// define global constants
const w = 20;
const spd = 30;
const spd_change = 10;
const fps = 30;

// define global variables
var values = [];
var speed = spd;
var index = 0;
var selection = -1;
var complete = false;
var startTime = 0;
var endTime = 0;

function setup() {
    createCanvas(800, 200);
    frameRate(fps);

    resetSketch();

    var button = createButton("Speed Up or Reset");
    button.mousePressed(resetSketch);
}

function resetSketch() {
    if (selection == -1 || complete) {
        console.log("Bubble Sort starting...");

        values = new Array(floor(width / w));
        speed = spd;
        index = 0;
        selection = 0;
        complete = false;
        startTime = millis();
        endTime = 0;

        for (let j = 0; j < values.length; j++) {
            values[j] = random(height-10);
        }

        bubbleSort(values);
        loop();

    } else {
        if (speed > spd_change) {
            speed = speed - spd_change;
        } else {
            speed = 1;
        }
    }
}

// asyncronous Bubble Sort function: will run independent of draw()
async function bubbleSort(arr) {
    let finished = false;
    let temp = 0;
    while (!finished) {
        finished = true;
        for (let j = 0; j < arr.length - index; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                // if there is a swap in the array, we're not finished
                finished = false;

                // keep track of 'bubbling' value for identification
                selection = j + 1;
            }

            // asyncronously wait specificed millisconds (speed) before next iteration
            await sleep(speed);
        }

        // global variable to keep track of how many iterations have completed
        index++;
    }
    complete = true;
    endTime = millis();
}

// asyncronous sleep function (in milliseconds)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function draw() {
    background(0);

    // iterate from 0 to last unsorted value (index - 1)
    for (let j = 0; j < values.length - index; j++) {
        if (j == selection) {
            // color the 'bubbled' value red
            fill(255, 0, 0);
        } else {
            // color unsorted values white
            fill(255);
        }
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    // iterate and color sorted cells green (index to length)
    for (let j = values.length - index; j < values.length; j++) {
        fill(0, 255, 0);
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    if (complete) {

        // color all bars green on complete (to be sure of any that were sorted by default)
        for (let j = 0; j < values.length - index; j++) {
            fill(0, 255, 0);
            stroke(0);
            rect(j * w, height - values[j], w, values[j]);
        }

        // text output of total time
        fill(200);
        textSize(16);
        text("Bubble Sort Completed!\nTotal Time: " + (endTime - startTime) + " ms.", 10, 25);

        noLoop();
    }
}