/***
 *
 * Some additional fixes have been added to this js file so that it uses poseNet
 * in the way I wished it did during the hackathon. I was running out of time so
 * I had to keep it super simple.
 *
 ***/

// imports
import Bar from "./bars.js"

// variables
let video, poseNet, nose, leftEye, rightEye, cols, rows, noseImg, leftEyeImg, rightEyeImg;

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

   // default nose image
   noseImg = loadImage('assets/noseImg.png');
   // leftEyeImg = loadImage('assets/eyeImg.png');
   // rightEyeImg = loadImage('assets/eyeImg.png');
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

// functions to choose the images
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
   //   leftEye = pose.keypoints[1].position;
   //   rightEye = pose.keypoints[2].position;
   }

   for (let i = 0; i < poses.length; i++) {
     let pose = poses[i].pose;
     for (let j = 0; j < pose.keypoints.length; j++) {
       let keypoint = pose.keypoints[j];
       if (keypoint.score > 0.2) {
         noStroke();
         fill(255, 116, 140);
         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

         for (let k = 0; k < bars.length; k++) {
           bars[k].display();
           for (let b = 0; b < numBars; b++) {
             if (
               nose.x > bars[b].x &&
               nose.x < bars[b].x + bars[b].w
             ) {
               bars[b].play();
             } else {
               bars[b].notPlay();
             }
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
   coolTint();
   drawSkeleton();

   // Display the bars
   for (let k = 0; k < bars.length; k++) {
      bars[k].display();
   }
}
