// https://editor.p5js.org/

let x = 0;
let y = 0;
let n = 1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255,0,0);
  ellipse(x, 40, 40, 40);
  ellipse(x, 80, 40, 40);
  ellipse(x, 120, 40, 40);
  fill(0,255,0);
  ellipse(40, y, 40, 40);
  ellipse(80, y, 40, 40);
  ellipse(120, y, 40, 40);

  beginShape();
  fill (255,255,255);
  vertex(30, 20);
  bezierVertex(x, 0, 80, 75, 30, 75);
  bezierVertex(50, y, 60, 25, 30, 20);
  endShape();
  
  fill(0,0,255)
  ellipse(mouseX, mouseY, 5, 5);
  
  x += 2 * n;
  y += 2 * n;
  
  if (x > 400){
    //x = 0;
    //y = 0;
    n = -1;
  }
  if (x < 0){
    //x = 0;
    //y = 0;
    n = 1;
  }
}