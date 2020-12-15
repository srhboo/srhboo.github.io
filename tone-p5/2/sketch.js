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
    baseUrl: "https://srhboo.github.io/tone-p5/2/samples/",
  }).toDestination();

  const distortion = new Tone.Distortion(0.9).toDestination();
  const filter = new Tone.Filter(400, "lowpass").toDestination();
  const feedbackDelay = new Tone.FeedbackDelay(0.2, 0.5).toDestination();

  // const bigLoop = new Tone.Loop((time) => {
  //   sampler.triggerAttackRelease("B4", "8");
  // });

  const loopA = new Tone.Loop((time) => {
    sampler.triggerAttackRelease("C4", "8m", time);
  }, "4n").start(0);

  const loopB = new Tone.Loop((time) => {
    sampler.triggerAttackRelease("B4", "8m", time);
  }, 3).start(0);

  Tone.loaded().then(() => {
    Tone.Transport.start();
    Tone.Transport.bpm.rampTo(200, 20).rampTo(80, 10, "+20");
  });

  // Tone.loaded().then(() => {
  //   // sampler.chain();
  //   sampler.triggerAttackRelease(["C4", "E5", "A4", "B4"], 4);
  // });
}
