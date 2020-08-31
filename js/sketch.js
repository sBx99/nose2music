// instance mode - https://www.youtube.com/watch?v=Su792jEauZg&t=765s

var sketch1 = function(p) {
    p.x, p.y, p.video
    p.showCapture = true

    var col = '#f0a9b9'
    var tintCol = '#ffc0cb'

    p.drawCapture = function() {
        p.tint(tintCol)
        // p.filter(POSTERIZE)
        p.image(p.video, 0, 0, 500, 400)
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
        p.background(col)
        p.push()
        p.translate(p.width, 0)
        p.scale(-1, 1)

        if (p.showCapture) {
            p.drawCapture()
        }
        p.pop()
    }
}

var vid = new p5(sketch1)