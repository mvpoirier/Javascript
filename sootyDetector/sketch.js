/*
    Mike Poirier
    October 24, 2020
    Using p5.js, ml5.js, and COCO-SSD to detect our cat Sooty.
    Could be extended for real-time video feed via webcam.
*/

/*
    Coding Train: Object Detection with COCO-SSD
    https://www.youtube.com/watch?v=QEzRxnuaZCk
    https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
*/

const img = [];
const NUM = 9; // number of total images
let choice = 0;
let detector;
let time;
//let currentChoice;

function preload() {

    // Load all sooty#.jpg images from 1 to NUM
    for (let i = 0; i < NUM; i++){
        img[i] = loadImage('sooty'  + (i + 1) + '.jpg');
    }

    // Initiate COCO-SSD object detector through ml5.js framework
    detector = ml5.objectDetector('cocossd');
}

function gotDetections(error, results){
    
    let foundSooty = false;
    
    if (error){
        console.error(error);
    }
    console.log(results);

    // Iterate through each found object (results) and check if we found a cat (Sooty)
    for (let i = 0; i < results.length; i++){
        let object = results[i];
        
        if (object.label == "cat"){
            stroke(0, 255, 0);
            strokeWeight(2);
            noFill();
            rect(object.x, object.y, object.width, object.height);
            
            noStroke();
            fill(0,255,0);
            textSize(14);
            text("Sooty! " + round(object.confidence*100, 0) + "%", object.x + 10, object.y + 24);
            foundSooty = true;
        }
        else{
            stroke(255, 0, 0);
            strokeWeight(2);
            noFill();
            rect(object.x, object.y, object.width, object.height);
            
            noStroke();
            fill(255,0,0);
            textSize(14);
            text(object.label + ": " + round(object.confidence*100, 0) + "%", object.x + 10, object.y + 24);

        }
    }

    // Display results based on what was in the image
    if (foundSooty){
        fill(0,0,255);
        text("SOOTY FOUND! :-)", 10, 48);
    }
    else{
        fill(255,0,0);
        text("CAN'T FIND SOOTY :-(", 10, 48);
    }
    fill(0,0,0);
    text("Time taken: " + round(((millis()-time)/1000), 1) + " seconds. New image in 10 seconds...", 10, 72);
}

function setup() {
    /*
    console.log('ml5.js version:', ml5.version, "(March 13, 2020)");
    console.log('p5.js version: 1.1.9 (July 22, 2020)');
    console.log('COCO-SSSD:', detector);
    
    choice = int(random(0, img.length)); //choose random index from img[] array
    currentChoice = choice;
    */

    createCanvas(800, 600);
    img[choice].resize(0,600);
    background(0, 0, 0);
    image(img[choice], 0, 0);

    noStroke();
    fill(255,255,255);
    rect(0, 0, window.width, 80);
    
    fill(0,0,0);
    textSize(14);
    text("Where's Sooty? Detecting (Image " + (choice + 1) + " out of " + NUM + ")...", 10, 24);
    
    time = millis();
    detector.detect(img[choice], gotDetections);
}

function draw() {
    if (((millis()-time) / 10000) > 1){ // Change image after every 10 seconds (10000 ms)
        time = millis();
        
        // Iterate from 0 to NUM-1 and loop back to 0 once completed.
        choice = (choice + 1) % NUM

        /*
        // Avoid choosing the same random image twice
        choice = int(random(0, img.length));
        while (choice == currentChoice){
            choice = int(random(0, img.length));
        }
        currentChoice = choice;
        */

        img[choice].resize(0,600);
        background(0, 0, 0);
        image(img[choice], 0, 0);
        
        noStroke();
        fill(255,255,255);
        rect(0, 0, window.width, 80);
        
        fill(0,0,0);
        textSize(14);
        text("Where's Sooty? Detecting (Image " + (choice + 1) + " out of " + NUM + ")...", 10, 24);
        
        detector.detect(img[choice], gotDetections);
    }
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