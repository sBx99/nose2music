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

function draw() {
    tint(tintCol)
    image(video, 0, 0, width, height)
    lowResDraw()
    drawPoses()
  // filter(ERODE)
  // filter(BLUR)
}