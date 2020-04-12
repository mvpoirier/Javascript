function setup() {
    //createCanvas(windowWidth, windowHeight);
    createCanvas(800, 600);
}

function draw() {
    //background (R, G, B)
    background(0, 200, 100);
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