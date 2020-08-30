console.log('ml5 version:', ml5.version);
var x, y

function setup() {
    var canvasDiv = document.getElementById('myCanvas')
    var sketchCanvas = createCanvas(windowWidth, windowHeight)

    sketchCanvas.parent('myCanvas')
    background(0)
    x = random(50, windowWidth - 50)
    y = random(50, windowHeight - 50)
}

function draw() {
    // background(200)
}

function mouseMoved() {
    noFill()
    stroke('#ff69b4')
    strokeWeight(2)
    ellipse(mouseX, mouseY, 50, 50)
}

function keyPressed() {
    background(0)
}