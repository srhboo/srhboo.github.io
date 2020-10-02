let startButton, stopButton, now;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  startButton = createButton("start")
    .position(100, 100)
    .mousePressed(startTone);
  stopButton = createButton("stop").position(200, 100).mousePressed(stopTone);
}

function startTone() {
  myFirstSound();
}

function stopTone() {}

function myFirstSound() {
  const sampler = new Tone.Sampler({
    urls: {
      C4: "c4.mp3",
      "D#4": "ds4.mp3",
      "F#4": "fs4.mp3",
      A4: "a4.mp3",
      B4: "b4.mp3",
      E4: "e4.mp3",
      E5: "e5.mp3",
    },
    release: 1,
    baseUrl: "/tone-p5/2/samples/",
  }).toDestination();

  Tone.loaded().then(() => {
    sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
  });
}
