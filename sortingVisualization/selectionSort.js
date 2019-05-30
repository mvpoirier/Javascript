/*
    Visualized Selection Sort in Javascript and p5.js, inspired by:

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
        values = new Array(floor(width / w));
        speed = spd;
        index = 0;
        selection = 0;
        complete = false;
        startTime = millis();
        endTime = 0;

        for (let j = 0; j < values.length; j++) {
            //randomSeed(j*j*random(j));
            values[j] = random(height-10);
        }

        selectionSort(values);
        loop();

    } else {
        if (speed > spd_change) {
            speed = speed - spd_change;
        } else {
            speed = 1;
        }
    }
}

//  asyncronous Selection Sort function: will run independent of draw()
//  Go through the unsorted array and find the smallest value,
//  and create a new sub array in ascending order
async function selectionSort(arr) {
    let temp = 0;

    for (let i = 0; i < arr.length; i++) {
        temp = arr[i];

        for (let j = i + 1; j < arr.length; j++){

            selection = j;
            //await sleep(speed);

            if (arr[j] < temp) {
                temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                await sleep(speed);
            }
        }
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

    // iterate through unsorted values: index to length
    for (let j = index; j < values.length; j++) {
        if (j == selection) {
            // color the 'bubbled' value red
            fill(255, 0, 0);
        }  else{
            // color unsorted values white
            fill(255);
        }
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    // iterate and color sorted cells green (0 to index)
    for (let j = 0; j < index; j++) {
        fill(0, 255, 0);
        stroke(0);
        rect(j * w, height - values[j], w, values[j]);
    }

    if (complete) {

        // color all bars green on complete (to be sure of any that were sorted by default)
        for (let j = 0; j < values.length; j++) {
            fill(0, 255, 0);
            stroke(0);
            rect(j * w, height - values[j], w, values[j]);
        }

        // text output of total time
        fill(200);
        textSize(16);
        text("Selection Sort Completed!\nTotal Time: " + (endTime - startTime) + " ms.", 10, 25);

        noLoop();
    }
}