function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
}

function draw() {
  
  let r = map(mouseX, 0, width, 0, 255);
  let g = 155 + 100*(r/255);
  let b = map(mouseY, 0, width, 0, 255);
  fill(r, g, b, 100);
  stroke(r/2, g/2, b/2, 30);
  ellipse(mouseX, mouseY, 300, 300);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}