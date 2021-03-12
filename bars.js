class Bar {
   // basic parameters
   constructor(x, w) {
      this.x = x; // x-coordinate
      this.y = 0; // y-coordinate
      this.w = w; // width
      this.h = height; // height
      this.a = 25; // alpha
      this.note = 0; // sets which note is playing
   }

   display() {
      // fill(255, 192, 203, this.a)
      fill(255, 192, 203, 0); // no alpha
      stroke(0);
      strokeWeight(2);
      rect(this.x, this.y, this.w, this.h);
   }

   play(n) {
      this.a = 150;
      this.note = n;
   }

   notPlay() {
      this.a = 0;
      this.note = 0;
   }
}
