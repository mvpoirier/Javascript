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

// define global variables
var values = [];
var speed = 30;
var i = 0;
var bubble = 0;
var complete = false;

function setup() {
    createCanvas(800, 200);
    frameRate(30);

    resetSketch();

    var button = createButton("Accelerate or Reset");
    button.mousePressed(resetSketch);
}

function resetSketch() {
    if (i > 0 || complete) {
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

// asyncronous Bubble Sort function: will run independent of draw()
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

                // if there is a swap in the array, we're not finished
                finished = false;

                // keep track of 'bubbling' value for identification
                bubble = index + 1;
            }

            // asyncronously wait specificed millisconds (speed) before next iteration
            await sleep(speed);
        }

        // global variable to keep track of how many iterations have completed
        i++;
    }
    complete = true;
}

// asyncronous sleep function (in milliseconds)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function draw() {
    background(0);

    for (let j = 0; j < values.length - i; j++) {
        if (j == bubble) {
            // color the 'bubbled' value red
            fill(255, 0, 0);
        } else {
            // color unsorted values white
            fill(255);
        }
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    // color already sorted cells green
    for (let j = values.length - i; j < values.length; j++) {
        fill(0, 255, 0);
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    if (complete) {

        // color all bars green on complete (to be sure of any that were sorted by default)
        for (let j = 0; j < values.length - i; j++) {
            fill(0, 255, 0);
            stroke(0);
            rect(j * w, height - values[j], w, values[j]);
        }

        // output completion to console, stop looping
        console.log("Bubble Sort Completed.");
        noLoop();
    }
}