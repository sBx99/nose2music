// instance mode - https://www.youtube.com/watch?v=Su792jEauZg&t=765s

var sketch1 = function(p) {
    p.x, p.y, p.video
    p.showCapture = true

    p.drawCapture = function() {
        // p.tint('#ff69b4')
        // p.filter(POSTERIZE)
        p.tint('#F4BFCB')
        p.image(p.video, 0, 0, 500, 400)
        // p.filter(POSTERIZE)
        // p.showCapture = false
    }

    // p.preload = function() {}

    p.setup = function() {
        p.videoCanvas = p.createCanvas(500, 400)

        p.video = p.createCapture(p.VIDEO)
        p.video.size(p.width, p.height)
        p.video.hide()

        p.videoCanvas.parent("myVideoCanvas")
    }

    p.draw = function() {
        p.background('#F4BFCB')
        p.push()
        p.translate(p.width, 0)
        p.scale(-1, 1)

        if (p.showCapture) {
            p.drawCapture()
        }
        p.pop()
    }
}

var sketch2 = function(c) {
    c.setup = function() {
        c.sketchCanvas = c.createCanvas(500, 400)
        c.sketchCanvas.parent('mySketchCanvas')
    }

    c.draw = function() {
        c.background('#F4BFCB')
        // c.x = c.random(50, c.width)
        // c.y = c.random(50, c.height)

        c.fill(255, 105, 180, 80)
        // c.stroke('')
        c.stroke('#000')
        c.strokeWeight(2)
        c.ellipse(c.mouseX, c.mouseY, 50, 50)
    }

    c.keyPressed = function() {
        c.background('#F4BFCB')
    }
}

/*
var sketch3 = function(b) {
    b.setup = function() {
        b.createCanvas(b.windowWidth - 12, 300)
    }

    b.draw = function() {
        b.background('#fae6eb')
        b.fill(255, 105, 180, 50)
        b.stroke('#000')
        b.strokeWeight(2)
        b.ellipse(b.mouseX, b.mouseY, 50, 50)
    }
} 
var back = new p5(sketch3)
*/

var vid = new p5(sketch1)
var canv = new p5(sketch2)