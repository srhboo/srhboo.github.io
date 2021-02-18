let softShader;

function preload() {
  // load the shader
  softShader = loadShader("../../vert/vid.vert", "../../frag/organic1.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  // shader() sets the active shader with our shader
  shader(softShader);

  softShader.setUniform("u_resolution", [width, height]);
  softShader.setUniform("u_time", millis() / 1000.0);
  // rect gives us some geometry on the screen
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
