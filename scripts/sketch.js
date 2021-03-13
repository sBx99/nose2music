// variables
let video, poseNet, cols, rows, nose, noseImg, img1, img2, img3, btn1, btn2, btn3;

let poses = [];
let trails = [];
let field = [];
let bars = [];

let a = 0;
let w = 0;
let numBars = 7;
let res = 15;

let notes = ["Db4", "F4", "A4", "C5", "Eb4", "D3", "F5"];
let playNotes = [];

let synth = new Tone.PolySynth(numBars, Tone.Synth).toMaster();

// preload
function preload() {
   img1 = loadImage("assets/face1.png");
   img2 = loadImage("assets/cowboy.png");
   img3 = loadImage("assets/face2.png");

   // default noseImg
   noseImg = loadImage("assets/face2.png");
}

// setup

function lowResSetup() {
   cols = width / res;
   rows = height / res;
   for (let i = 0; i < cols; i++) {
      let k = [];
      for (let j = 0; j < rows; j++) {
         k.push(0);
      }
      field.push(k);
   }
}

function triggerSynth(time) {
   for (let i = 0; i < numBars; i++) {
      if (bars[i].note != 0) {
         playNotes[i] = notes[i];
      } else {
         playNotes[i] = 0;
      }
   }
   console.log(playNotes);
   synth.triggerAttackRelease(playNotes, "8n");
}

function modelReady() {
   console.log("Model Is Ready!!!");
   Tone.Transport.start();
}

Tone.Transport.scheduleRepeat(triggerSynth, "4n");

// choose image
function chooseImg1() {
   noseImg = img1;
}

function chooseImg2() {
   noseImg = img2;
}

function chooseImg3() {
   noseImg = img3;
}

function setup() {
   // canvas
   vidCanv = createCanvas(450, 450, WEBGL);
   vidCanv.parent("myVideoCanvas");
   video = createCapture(VIDEO);
   video.size(450, 450);
   video.size(width, height);
   video.hide();
   poseNet = ml5.poseNet(video, modelReady);

   //buttons
   btn1 = select("#btn1");
   btn2 = select("#btn2");
   btn3 = select("#btn3");

   btn1.mousePressed(chooseImg1);
   btn2.mousePressed(chooseImg2);
   btn3.mousePressed(chooseImg3);

   poseNet.on("pose", function (results) {
      poses = results;
   });

   lowResSetup();

   w = width / numBars;
   for (let i = 0; i < numBars; i++) {
      bars.push(new Bar(w * i, w)); // the "Bar" class is initialized here
   }
}

// draw

function drawKeypoints() {
   if (poses.length > 0) {
      let pose = poses[0].pose;
      nose = pose.keypoints[0].position;
   }
   for (let i = 0; i < poses.length; i++) {
      let pose = poses[i].pose;
      for (let j = 0; j < pose.keypoints.length; j++) {
         let keypoint = pose.keypoints[j];
         if (keypoint.score > 0.2) {
            noStroke();
            noFill();
            ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
            for (let k = 0; k < bars.length; k++) {
               bars[k].display();
               if (
                  poses[0].pose.keypoints[0].position.x > bars[0].x &&
                  poses[0].pose.keypoints[0].position.x < bars[0].x + bars[0].w
               ) {
                  bars[0].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[1].x &&
                  poses[0].pose.keypoints[j].position.x < bars[1].x + bars[1].w
               ) {
                  bars[1].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[2].x &&
                  poses[0].pose.keypoints[0].position.x < bars[2].x + bars[2].w
               ) {
                  bars[2].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[3].x &&
                  poses[0].pose.keypoints[0].position.x < bars[3].x + bars[3].w
               ) {
                  bars[3].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[4].x &&
                  poses[0].pose.keypoints[0].position.x < bars[4].x + bars[4].w
               ) {
                  bars[4].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[5].x &&
                  poses[0].pose.keypoints[0].position.x < bars[5].x + bars[5].w
               ) {
                  bars[5].play();
               }
               if (
                  poses[0].pose.keypoints[0].position.x > bars[6].x &&
                  poses[0].pose.keypoints[0].position.x < bars[6].x + bars[6].w
               ) {
                  bars[6].play();
               } else {
                  bars[k].notPlay();
               }
            }
         }
      }
   }
}

function drawSkeleton() {
   for (let i = 0; i < poses.length; i++) {
      let skeleton = poses[i].skeleton;
      for (let j = 0; j < skeleton.length; j++) {
         let partA = skeleton[j][0];
         let partB = skeleton[j][1];
         stroke("#BFE6F6");
         line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
   }
}

function drawPoses() {
   if (nose) {
      image(noseImg, nose.x - 30, nose.y - 30, noseImg.width / 2, noseImg.height / 2);
      // console.log('nose detected')
   }
}

function lowResDraw() {
   // let threshold = 245;
   loadPixels();
   for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
         let x = i * res;
         let y = j * res;
         let c = color(
            pixels[(x + y * width) * 4],
            pixels[(x + y * width) * 4 + 1],
            pixels[(x + y * width) * 4 + 2],
         );
         let b = brightness(c);
         field[i][j] = b;
         fill(200, b, 200, 150);
         noStroke();
         rect(x, y, res, res);
      }
   }
}

function mirrorVideo() {
   translate(width, 0, 0);
   scale(-1, 1, 0);
}

function coolTint() {
   // fill(206, 158, 255, 60)
   noStroke();
   rect(20, 20, width, height);
}

function draw() {
   translate(-width / 2, -height / 2, 0);
   mirrorVideo();
   image(video, 0, 0, width, height);
   lowResDraw();
   drawKeypoints();
   drawPoses();
   /* coolTint();
   drawSkeleton(); */
}
