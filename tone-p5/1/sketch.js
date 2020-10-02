let overCircle = false;
let cx, cy;
let circleRadius = 100;
let locked = false;
let xOffset = 0;
let yOffset = 0;
let currentNote = 110;
let loop;
let startButton, stopButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cx = windowWidth / 2;
  cy = windowHeight / 2;
  strokeWeight(2);
  startButton = createButton("okay")
    .position(100, 100)
    .mousePressed(() => {
      if (loop) {
        loop.dispose();
      }
      loop = myFirstSound();
      startButton.hide();
      stopButton.show();
    });
  stopButton = createButton("stop")
    .position(100, 100)
    .mousePressed(() => {
      loop.dispose();
      stopButton.hide();
      startButton.show();
    })
    .hide();
}

function pointIsInsideCircle({ xp, xc, yp, yc, r }) {
  // compare (xp−xc)2+(yp−yc)2  with r2 to determine if point is inside circle
  const dSquared = (xp - xc) ** 2 + (yp - yc) ** 2;
  return dSquared < r ** 2;
}

function mapCoordToColour({ x, y }) {
  const r = map(x, 0, windowWidth, 0, 255);
  const g = map(y, 0, windowWidth, 0, 255);
  const b = 50;
  return { r, g, b };
}

function draw() {
  const mouseInsideCircle = pointIsInsideCircle({
    xp: mouseX,
    yp: mouseY,
    xc: cx,
    yc: cy,
    r: circleRadius,
  });
  if (mouseInsideCircle) {
    overCircle = true;
    cursor("grab");
  } else {
    overCircle = false;
    cursor(ARROW);
  }
  const { r, g, b } = mapCoordToColour({ x: cx, y: cy });
  background(r, g, b);
  fill(255);
  stroke(0);
  const knob = circle(cx, cy, 100);
}

function mousePressed() {
  if (overCircle) {
    locked = true;
  } else {
    locked = false;
  }
  xOffset = mouseX - cx;
  yOffset = mouseY - cy;
}

function mouseDragged() {
  if (locked) {
    cx = mouseX - xOffset;
    cy = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}
// convert circle coordinates into frequency and colour

function mapCoordToFreq({ x, y }) {
  return map(x, 0, windowWidth, 55, 700);
}

function myFirstSound() {
  // create two monophonic synths
  const synthA = new Tone.FMSynth().toDestination();
  //play a note every quarter-note
  const loopA = new Tone.Loop((time) => {
    const freq = mapCoordToFreq({ x: cx, y: cy });
    synthA.triggerAttackRelease(freq, "8n", time);
  }, "4n").start(0);
  // the loops start when the Transport is started
  Tone.Transport.start();
  return loopA;
}
