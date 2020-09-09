class Bar {
    constructor(x, w) {
      this.x = x
      this.y = 0
      this.w = w
      this.h = height
      this.a = 25
      this.note = 0
    }

    display() {
      fill(255, 192, 203, this.a)
      stroke(0)
      strokeWeight(2)
      rect(this.x, this.y, this.w, this.h)
    }

    play(n) {
      this.a = 150
      this.note = n
    }

    notPlay() {
      this.a = 0
      this.note = 0
    }
}