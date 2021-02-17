let glassWallShader;
let glassWallTexture;
let cam;

function preload() {
  glassWallShader = loadShader(
    "../vert/vid.vert",
    "../frag/glass-wall-vid.frag"
  );
}

function setup() {
  createCanvas(3000, 2000, WEBGL);

  noStroke();

  // initialize the webcam at the window size
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);

  // hide the html element that createCapture adds to the screen
  cam.hide();

  glassWallTexture = createGraphics(700, 700, WEBGL);
  glassWallTexture.noStroke();

  glassWallLabel = createDiv(glass1Content.description);
  glassWallLabel.position(350, 40).class("description");
  glassWallCode = createElement("pre", glass1Content.code);
  glassWallCode.position(10, 400);
}

function draw() {
  background(240);
  glassWallTexture.shader(glassWallShader);
  glassWallShader.setUniform("tex0", cam);
  glassWallShader.setUniform("time", frameCount + 0.01);
  let freq = map(mouseX, 0, width, 0, 10.0);
  let amp = map(mouseY, 0, height, 0, 0.25);
  glassWallShader.setUniform("frequency", freq);
  glassWallShader.setUniform("amplitude", amp);
  translate(-width / 2, -height / 2);
  glassWallTexture.rect(0, 0, width, height);

  texture(glassWallTexture);
  rect(10, 10, 300, 300);
}
