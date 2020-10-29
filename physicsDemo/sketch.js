/*
    NAME:       Mike Poirier
    DATE:       October 24, 2020
    PURPOSE:    Develop a physics demonstration with p5.js and matter.js
                Based on Coding Train episode: https://www.youtube.com/watch?v=TDQzoe9nslY
                
                Additional Links:
                https://www.youtube.com/watch?v=urR596FsU68 
                https://www.youtube.com/watch?v=TDQzoe9nslY 
*/

let myBox;

function setup() {
    createCanvas(800, 600);
    background(0);
    
    myBox = new Box (20, 20, 15, 15);
}

function draw() {
    background(0);

    if (keyIsDown(RIGHT_ARROW)) {
        myBox.x = myBox.x + 5;
        if (myBox.x > 800){
            myBox.x = 0;
        }
    }
    if (keyIsDown(LEFT_ARROW)) {
        myBox.x = myBox.x - 5;
        if (myBox.x < 0){
            myBox.x = 800;
        }
    }
    
    myBox.show();
}

/*
    Disable user keys from scrolling from browser
    https://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
*/
window.addEventListener("keydown", function (e) {
    // spacebar (32) and arrow keys (37-40)
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault(); // prevents default browser behaviour when interacting with p5.js
    }
}, false);