var body = document.getElementById("body");
var slider = document.getElementById("hueRotate");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value;

slider.oninput = function () {
   const filterStyle = `${this.value}deg`;
   body.setAttribute("style", `filter: hue-rotate(${filterStyle})`);
   // output.innerHTML = this.value;
};
