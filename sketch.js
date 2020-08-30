var x, y

function setup() {
    var canvasDiv = document.getElementById('myCanvas')
    var sketchCanvas = createCanvas(windowWidth, windowHeight)

    sketchCanvas.parent('myCanvas')
    background(0)
}

function draw() {
    // x = random(50, windowWidth - 50)
    // y = random(50, windowHeight - 50)

    noFill()
    stroke('#ff69b4')
    strokeWeight(1.5)
    ellipse(mouseX, mouseY, 50, 50)
}

function keyPressed() {
    background(0)
}