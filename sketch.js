/*
let video
let poseNet
let nose
let leftEye
let rightEye
let field = []
let res = 15
let col = '#f0a9b9'
let tintCol = '#ffc0cb'

function preload() {
  noseImg = loadImage('assets/noseImg.png')
  leftEyeImg = loadImage('assets/eyeImg.png')
  rightEyeImg = loadImage('assets/eyeImg.png')
}

function setup() {
  vidCanv = createCanvas(500, 400)
  vidCanv.parent('myVideoCanvas')
  video = createCapture(VIDEO)
  video.size(width, height)
  video.hide()
  let poseNet = ml5.poseNet(video, modelReady)
  poseNet.on('pose', gotPoses)
  lowResSetup()
}

function gotPoses(poses) {
  if (poses.length > 0) {
    let pose = poses[0].pose
    nose = pose.keypoints[0].position
    leftEye = pose.keypoints[1].position
    rightEye = pose.keypoints[2].position
  }
}

function modelReady() {
  console.log('model loaded');
}

function drawPoses() {
  if (nose) {
    image(noseImg, nose.x - 30, nose.y - 30, noseImg.width / 2, noseImg.height / 2)
    // console.log('nose detected')
  }
  if (leftEye) {
    image(leftEyeImg, leftEye.x - 30, leftEye.y - 30, leftEyeImg.width / 2, leftEyeImg.height / 2)
    // console.log('left eye detected')
  }
  if (rightEye) {
    image(rightEyeImg, rightEye.x - 30, rightEye.y - 30, rightEyeImg.width / 2, rightEyeImg.height / 2)
    // console.log('right eye detected')
  }
}

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

function lowResDraw() {
  let threshold = 245
  loadPixels()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      let c = color(
        pixels[(x+y*width) * 4],
        pixels[(x+y*width) * 4 + 1],
        pixels[(x+y*width) * 4 + 2]
      );
      let b = brightness(c);
      field[i][j] = b;
      fill(b);
      noStroke();
      rect(x, y, res, res); 
    }
  }
}

function mirrorVideo() {
  translate(width, 0)
  scale(-1, 1)
}

function draw() {
  mirrorVideo()
  tint(tintCol)
  image(video, 0, 0, width, height)
  lowResDraw()
  drawPoses()
  filter(ERODE)
  // filter(BLUR)
}
*/

let video
let poseNet
let poses = []
let trails = []
let a = 0
let nose
let leftEye
let rightEye
let cols
let rows
let field = []
let res = 15
let col = '#f0a9b9'
let tintCol = '#ffc0cb'
let w = 0
let numBars = 7
let bars = []

let synth = new Tone.PolySynth(numBars, Tone.Synth).toMaster()

let notes = ['B4', 'E4', 'G4', 'C4', 'G4', 'E4', 'B4']
let playNotes = []

// preload
function preload() {
  noseImg = loadImage('assets/noseImg.png')
  leftEyeImg = loadImage('assets/eyeImg.png')
  rightEyeImg = loadImage('assets/eyeImg.png')
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
  synth.triggerAttackRelease(playNotes, "4n");
}

function modelReady() {
  console.log("Model Is Ready!!!");
  Tone.Transport.start()
}

Tone.Transport.scheduleRepeat(triggerSynth, '4n')

function setup() {
  vidCanv = createCanvas(500, 400)
  vidCanv.parent('myVideoCanvas')
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);

  poseNet.on('pose', function(results) {
    poses = results;
  });

  lowResSetup()

  w = width / numBars;
  for (let i = 0; i < numBars; i++) {
    bars.push(new Bar(w * i, w))
  }
}

// draw

function drawKeypoints() {
  if (poses.length > 0) {
    let pose = poses[0].pose
    nose = pose.keypoints[0].position
    leftEye = pose.keypoints[1].position
    rightEye = pose.keypoints[2].position
  }
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        noStroke();
        fill(255, 116, 140)
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        for (let k = 0; k < bars.length; k++) {
          // bars[k].display();
          if (poses[0].pose.keypoints[0].position.x > bars[0].x && poses[0].pose.keypoints[0].position.x < bars[0].x + bars[0].w) {
            bars[0].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[1].x && poses[0].pose.keypoints[j].position.x < bars[1].x + bars[1].w) {
            bars[1].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[2].x && poses[0].pose.keypoints[0].position.x < bars[2].x + bars[2].w) {
            bars[2].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[3].x && poses[0].pose.keypoints[0].position.x < bars[3].x + bars[3].w) {
            bars[2].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[4].x && poses[0].pose.keypoints[0].position.x < bars[4].x + bars[4].w) {
            bars[2].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[5].x && poses[0].pose.keypoints[0].position.x < bars[5].x + bars[5].w) {
            bars[2].play();
          }
          if (poses[0].pose.keypoints[0].position.x > bars[6].x && poses[0].pose.keypoints[0].position.x < bars[6].x + bars[6].w) {
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
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function drawPoses() {
  if (nose) {
    image(noseImg, nose.x - 30, nose.y - 30, noseImg.width / 2, noseImg.height / 2)
    // console.log('nose detected')
  }
  if (leftEye) {
    image(leftEyeImg, leftEye.x - 30, leftEye.y - 30, leftEyeImg.width / 2, leftEyeImg.height / 2)
    // console.log('left eye detected')
  }
  if (rightEye) {
    image(rightEyeImg, rightEye.x - 30, rightEye.y - 30, rightEyeImg.width / 2, rightEyeImg.height / 2)
    // console.log('right eye detected')
  }
}

function lowResDraw() {
  let threshold = 245
  loadPixels()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      let c = color(
        pixels[(x + y * width) * 4],
        pixels[(x + y * width) * 4 + 1],
        pixels[(x + y * width) * 4 + 2]
      );
      let b = brightness(c);
      field[i][j] = b;
      fill(b);
      noStroke();
      rect(x, y, res, res);
    }
  }
}

function mirrorVideo() {
  translate(width, 0)
  scale(-1, 1)
}

function draw() {
  mirrorVideo()
  image(video, 0, 0, width, height);
  lowResDraw()
  drawKeypoints()
  drawSkeleton()
  lowResDraw()
  drawPoses()
  for (let k = 0; k < bars.length; k++) {
    bars[k].display();
  }
}