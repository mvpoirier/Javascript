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
var i = 0;
var bubble = -1;
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
    if (bubble == -1 || complete) {
        console.log("Bubble Sort starting...");

        values = new Array(floor(width / w));
        speed = spd;
        i = 0;
        bubble = 0;
        complete = false;
        startTime = millis();
        endTime = 0;

        for (let i = 0; i < values.length; i++) {
            values[i] = random(height);
        }

        bubbleSort(values);
        loop();

    } else {
        if (speed > spd_change) {
            speed = speed - spd_change;
        } else {
            speed = 1;
        }
        console.log("New speed: " + speed + " ms.");
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
    endTime = millis();
}

async function selectionSort(arr) {
    let sorted = new Array(arr.length);
    let temp = 0;
    let index = 0;

    for (let i = 0; i < arr.length; i++) {
        // add search
        temp = arr[i];
        index = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < temp) {
                temp = arr[j];
                index = j;

                //swapping...
            }
        }
    }

}

/*
	
	 * @method	Selection Sort
	 * @use 	Go through the unsorted array and find the smallest value,
	 * 			and create a new sub array in ascending order
	 
	
	public static int[] selectionSort (int[] unSorted) {
		int[] sorted = new int[unSorted.length];
		int temp;
		int index;
		boolean found;
		
		// traverse the entire array
		for (int i = 0; i < unSorted.length; i++) {
			// store next element at index i to compare
			temp = unSorted[i];
			index = i;
			
			// traverse from i + 1 to end of the array
			for (int j = i + 1; j < unSorted.length; j++) {
				if (unSorted[j] < temp) {
					// store the new smallest element
					temp = unSorted[j];
					index = j;
					
					// swap with the previously smallest element
					unSorted[j] = unSorted[i];
				}
			}
			
			// add smallest element to the new sub array
			sorted[i] = temp;
		}
		return sorted;
    }
    
*/

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

        // text output of total time
        fill(200);
        textSize(16);
        text("Bubble Sort Completed.\nTotal Time: " + (endTime - startTime) + " ms.", 10, 30);

        // output completion to console, stop looping
        console.log("Start time: " + startTime + " ms.");
        console.log("End time: " + endTime + " ms.");
        console.log("*** Bubble Sort Completed. ***");
        noLoop();
    }
}