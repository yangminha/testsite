var srcWidth = 128;
var srcHeight = 128;
var pixelScale = 8.5;
var rotationSpeed = 2.5;
var drawingRange = 90;
var drawingAlpha = 100; //0 ~ 100
var drawingMode = "rect"; //"rect" //"ellipse"

var src;
var pixelSrc;
function preload() {
  src = loadImage("flower1920.jpg");
}

function setup() {
  createCanvas(1920, 1080);
  imageMode(CENTER);
}

function draw() {
  //background(255);
  drawPixels(drawingMode);
}


function drawPixels(mode) {
  imageMode(CENTER);
  rectMode(CENTER);
  src.loadPixels();
  let index = 0;
  let magX = src.width/srcWidth;
  let magY = src.height/srcHeight;
  let magScreenX = width/srcWidth;
  let magScreenY = height/srcHeight;
  noStroke();
  for (let y=0; y<srcHeight; y++) {
    for (let x=0; x<srcWidth; x++) {
      index = parseInt(x*magX) + parseInt(y*magY)*src.width;               
      let cR = src.pixels[index*4];
      let cG = src.pixels[index*4+1];
      let cB = src.pixels[index*4+2];
      let cA = min(255.0, max(0.0, 255*(drawingAlpha/100.0)));
      let _x = (x+0.5)*magScreenX;
      let _y = (y+0.5)*magScreenY; 
      let sc = (sqrt((mouseX-_x)*(mouseX-_x) + (mouseY-_y)*(mouseY-_y)));
      if (sc<drawingRange) {
        sc = ((drawingRange-sc)/drawingRange)*magScreenX*pixelScale;
      } else {
        sc = 0.0;//0.5*magScreenX;
      }
      let rot = ((frameCount*0.03) + x*0.01 + y*0.09)*rotationSpeed;
      if (sc>0) {
      fill(cR, cG, cB, cA);
        push();
        translate(_x, _y);
        let xplus = noise(_x+(frameCount*0.03) + x*0.01, _y+(frameCount*0.03) + y*0.01)*25;
        rotate(rot);
        if (mode =="ellipse") {
          ellipse(xplus, 0, sc, sc);
        } else if (mode =="rect") {
          rect(xplus, 0, sc, sc);
        }
        pop();
      }
    }
  }
  src.updatePixels();
}

function touchStarted(event) {
  console.log(event);
  return false;
}







