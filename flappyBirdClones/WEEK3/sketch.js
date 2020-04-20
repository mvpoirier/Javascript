/*
    Mike Poirier
    https://mvpoirier.github.io/

    Flappy Bird Clone - Week 3 Progress
    Updated: April 20, 2020
*/

/*
    Sound License:
    The sound effect is permitted for non-commercial use under license
    Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)
    http://www.orangefreesounds.com/
*/

var bird;
var pipes = [];
var score;
var maxScore;
var newMaxScore;
var firstPlayThrough;
var gameOver;
var timerStart;

var birdSound;
var bellSound;
var bongSound;
var duckSound;

/*
    Preload all p5.js sound files
    Documentation: https://p5js.org/reference/#/p5.SoundFile
*/
function preload() {
    soundFormats('mp3');
    birdSound = loadSound('boing');
    bellSound = loadSound('bell');
    bongSound = loadSound('bong');
    duckSound = loadSound('ducks');

    bellSound.playMode('untilDone');
    bongSound.playMode('untilDone');
    duckSound.playMode('untilDone');
}

function setup() {
    createCanvas(450, 600);
    birdSound.setVolume(0.10);
    bellSound.setVolume(0.20);
    bongSound.setVolume(0.20);
    duckSound.setVolume(0.20);
    bird = new Bird();
    maxScore = 0;
    gameOver = true;
    firstPlayThrough = true;
}

function draw() {
    background(120, 230, 180);

    if (gameOver) {
        //initial welcome message
        textSize(32);
        fill(0);
        text("Mr. Poirier's", 125, 250);
        fill(0, 0, 255);
        text("Flappy Bird Clone", 90, 300);
        fill(255, 0, 0);
        text("Spacebar to Start & Flap!", 40, 350);
        duckSound.play();
    } else {

        //display all pipes in array & check for hit (reverse order splice)
        for (var i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            pipes[i].show();

            //if the pipe hits the bird; stop the game & display msg
            if (pipes[i].hit(bird)) {
                noLoop();
                gameOver = true;
                bongSound.play();

                fill(255);
                rect(100, 250, 250, 60);

                textSize(20);
                fill(0, 0, 255);
                text("Game Over!", 160, 275);
                fill(255, 0, 0);
                text('Spacebar to Try Again', 120, 300);
            }

            if (pipes[i].pass(bird)) {
                score += 10;
            }

            //remove pipe from end of the array
            if (pipes[i].x < -pipes[i].w) {
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
    fill(255);
    rect(235, 0, width - 235, 65);

    textSize(32);
    fill(0, 0, 255);
    text('current: ' + score, 242, 25);

    //determine if there is new highscore
    if (score > maxScore) {
        maxScore = score;

        if (!firstPlayThrough) {
            bellSound.play();
            textSize(20);
            fill(255, 0, 0);
            text("New Record!", 160, 275);
        }
    }

    if (!firstPlayThrough) {
        textSize(32);
        fill(255, 0, 0);
        text('record: ' + maxScore, 251, 60);
    }
}

function keyPressed() {
    //if the game is over, reset the game
    if (key === ' ' && !gameOver) {
        bird.up();
        birdSound.play();
    } else if (key === ' ' && gameOver) {
        resetGame();
    }
}

function resetGame() {
    //pop all current pipes, and push a new pipe
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes.pop();
    }
    pipes.push(new Pipe());

    //reset current score and start again
    score = 0;
    if (maxScore != 0) {
        firstPlayThrough = false;
    }
    frameCount = 0;
    gameOver = false;
    loop();
}

/*
    Disable user keys from scrolling from browser
    https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
*/
window.addEventListener("keydown", function (e) {
    // spacebar = 32
    if ([32].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);