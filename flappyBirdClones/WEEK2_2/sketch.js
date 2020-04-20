/*
    Mike Poirier
    Flappy Bird Clone
    Main Sketch
    Updated: April 14, 2020
*/

var bird;
var pipes = [];

function setup() {
    createCanvas(450, 600);
    bird1 = new Bird(1);
    bird2 = new Bird(2);
    pipes.push(new Pipe());
}

function draw() {
    background(0, 200, 0);

    //display all pipes in array & check for hit (reverse order splice)
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();

        if (pipes[i].hit(bird1)) {
            console.log("hit bird 1");
        }
        if (pipes[i].hit(bird2)) {
            console.log("hit bird 2");
        }

        if (pipes[i].x < -pipes[i].w) { //remove pipe from end of the array
            //console.log("splice @ x = " + pipes[i].x)
            pipes.splice(i, 1);
        }
    }

    bird1.update();
    bird1.show();

    bird2.update();
    bird2.show();

    //add and display a new pipe every X number of frames
    if (frameCount % 170 == 0) {
        pipes.push(new Pipe());
    }
}

function keyPressed() {
    if (key === ' ') {
        bird1.up();
    }

    if (keyCode === SHIFT) {
        bird2.up();
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