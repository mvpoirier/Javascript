/*
    p5-js-testbed
    - This is a p5.js Javascript Testbed with Events (keyboard & mouse)
    - Easily output code to a local server using the 'Live Server' extension in vscode (open entire folder)
*/

let x = 0;
let y = 0;

function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(500, 500);
}

function draw() {
    background(0 + x, 200, 0 + y); // change backgound based on position
    let c = color(255, 255, 255);

    if (mouseIsPressed) {
        c = color(255, 0, 0); // red rect on mouse click
        background(0, 0, 0);
        textSize(32);
        fill(255, 255, 255);
        text('Go Jets Go!', 180, 200);
        fill(0, 102, 153);
        text('Go Jets Go!', 180, 240);
        fill(0, 102, 153, 51);
        text('Go Jets Go!', 180, 280);
    } else {
        c = color(255 - x, 255 - y, 255); // change color of rect based on position
    }

    //keyIsDown statements
    if (keyIsDown(RIGHT_ARROW) && x < 400) {
        x += 5;
    } else if (keyIsDown(LEFT_ARROW) && x > 0) {
        x -= 5;
    } else if (keyIsDown(DOWN_ARROW) && y < 400) {
        y += 5;
    } else if (keyIsDown(UP_ARROW) && y > 0) {
        y -= 5;
    }

    print("x = " + x);
    print("y = " + y);

    fill(c);
    rect(30 + x, 30 + y, 50, 50, (x + y) * 0.03); //last term adds rounded corners based on position
}

function keyPressed() {
    if (keyCode === 32) { // keyCode == 32 is the ASCII Code for SPACEBAR
        x = 0;
        y = 0;
    }
    return false; // Stop browser from other behavior (e.g. scrolling)
}

function keyReleased() {
    return false; // prevent any default behavior
}

function keyTyped(){
    return false; // prevent any default behavior
}