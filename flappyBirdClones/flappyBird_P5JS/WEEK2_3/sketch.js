/*
    Mike Poirier
    Flappy Bird Clone
    Main Sketch
    Updated: April 16, 2020
*/

var bird;
var pipes = [];
var score;
var maxScore;
var gameOver;

function setup() {
    createCanvas(450, 600);
    bird = new Bird(1);
    //bird2 = newBird(2); //player2
    maxScore = 0;
    gameOver = true;
}

function draw() {
    background(0, 200, 0);

    if (gameOver) {
        textSize(32);
        text("Mr. Poirier Flappy Clone", 50, 100)
        text('Space to Start', 100, 200);
    } else {

        //display all pipes in array & check for hit (reverse order splice)
        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            pipes[i].show();

            if (pipes[i].hit(bird)) {
                noLoop();
                fill(255, 0, 0);
                text("Game Over!", 110, 200)
                text('Space to Try Again', 80, 300);
                gameOver = true;
            }

            if (pipes[i].pass(bird)) {
                score += 10;
            }

            if (pipes[i].x < -pipes[i].w) { //remove pipe from end of the array
                pipes.splice(i, 1);
            }
        }

        bird.update();
        bird.show();

        //add and display a new pipe every X number of frames
        if (frameCount % 170 == 0) {
            pipes.push(new Pipe());
        }

        showScores();
    }
}

function showScores() {
    fill(0);
    textSize(32);
    text('current: ' + score, 242, 32);

    if (score > maxScore) {
        maxScore = score;
    }

    text('record: ' + maxScore, 251, 64);
}

function keyPressed() {
    if (key === ' ' && !gameOver) {
        bird.up();
    } else if (key === ' ' && gameOver) {
        resetGame();
    }

    /*
        if (keyCode === SHIFT) {
            bird2.up();
        }
    */
}

function resetGame() {
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes.pop();
    }
    pipes.push(new Pipe());
    score = 0;
    gameOver = false;
    frameCount = 0;
    loop();
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