/*
    p5-js-testbed
    - This is a p5.js Javascript Testbed with Events (keyboard & mouse)
    - Easily output code to a local server using the 'Live Server' extension in vscode (open entire folder)
*/

//Player 1
var x1 = 0;
var y1 = 0;

//Player2
var x2 = 250;
var y2 = 250;

/*
    Disable user keys from scrolling from browser
    https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
*/
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault(); // prevents default browser behaviour when interacting with p5.js
    }
}, false);

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(500, 500);
}

function draw() {
    //background(0 + x1, 200, 0 + y1); // change backgound based on position
    var c = color(255, 255, 255);

    if (mouseIsPressed) {
        c = color(255, 0, 0); // red rect on mouse click
        background(0, 0, 0);
        textSize(32);
        for (let i = 0; i < 3; i++){
            fill(255, 255, 255);
            text('Go Jets Go!', 180, 200 + i*40);
        }
    } else {
        c = color(255 - x1, 255 - y1, 255); // change color of rect based on position
    }

    // Player 1 - arrow keys
    if (keyIsDown(RIGHT_ARROW) && x1 < 400) {
        x1 += 5;
    } if (keyIsDown(LEFT_ARROW) && x1 > 0) {
        x1 -= 5;
    } if (keyIsDown(DOWN_ARROW) && y1 < 400) {
        y1 += 5;
    } if (keyIsDown(UP_ARROW) && y1 > 0) {
        y1 -= 5;
    }

    /*
    // Player 2 - wasd keys
    if (keyIsDown(68) && x2 < 400) {
        x2 += 5; //right with 'd'
    } if (keyIsDown(65) && x2 > 0) {
        x2 -= 5; //left with 'a'
    } if (keyIsDown(83) && y2 < 400) {
        y2 += 5; //up with 'w'
    } if (keyIsDown(87) && y2 > 0) {
        y2 -= 5; //down with 's'
    }
    */

    fill(c);
    rect(30 + x1, 30 + y1, 50, 50, (x1 + y1) * 0.03); //last term adds rounded corners based on position
    
    x2 = mouseX;
    y2 = mouseY;
    ellipse(x2, y2, 60, 30); // player 2
}

function keyPressed() {
    if (keyCode === 32) { // keyCode == 32 is the ASCII Code for SPACEBAR
        x1 = 0;
        y1 = 0;
        x2 = 250;
        y2 = 250;
        background(0 + x1, 200, 0 + y1);
    }
    //print(event);
    return false; // Stop browser from other behavior (e.g. scrolling)
}

function keyReleased() {
    return false; // prevent any default behavior
}

function keyTyped(){
    return false; // prevent any default behavior
}