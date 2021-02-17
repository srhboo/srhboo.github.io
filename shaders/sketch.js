let shapingShader;
let shapingTexture;

let theta = 0;

let x;
let y;
let outsideRadius = 200;
let insideRadius = 100;

function preload() {
  // load the shader
  shapingShader = loadShader("vert/basic.vert", "frag/hsv1.frag");
  noiseShader = loadShader("vert/basic.vert", "frag/red-dots.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(3000, 3000, WEBGL);
  noStroke();

  // initialize the createGraphics layers
  shapingTexture = setupShaderTexture();
  noiseTexture = setupShaderTexture();

  title = createElement("h1", "shader workbook");
  title.position(100, 30).class("shader-pg-title");

  type1 = createA("shaping", "shaping");
  type1.position(100, 300).class("type1");

  noiselabel = createA("noise", "noise/random");
  noiselabel.position(400, 400).class("type1");
}

function draw() {
  // instead of just setting the active shader we are passing it to the createGraphics layer
  updateShader(shapingShader, shapingTexture);
  updateShader(noiseShader, noiseTexture);
  background(255);

  // pass the shader as a texture
  // anything drawn after this will have this texture.
  texture(shapingTexture);

  // translate(-150, 0, 0);
  theta += 0.005;
  push();
  translate(-width / 2, -height / 2, 0);
  translate(180, 300);
  rotateZ(theta);
  rotateX(theta);
  rotateY(theta);

  box(125, 125, 125);
  pop();

  texture(noiseTexture);
  push();
  translate(-width / 2, -height / 2, 0);
  translate(480, 300);
  rotateZ(theta + 10);
  rotateX(theta + 10);
  rotateY(theta + 10);
  box(90, 90, 90);
  pop();
}

function setupShaderTexture(w = 800, h = 800) {
  let temp = createGraphics(w, h, WEBGL);
  temp.noStroke();
  return temp;
}

function updateShader(shader, shaderTexture) {
  // instead of just setting the active shader we are passing it to the createGraphics layer
  shaderTexture.shader(shader);

  // here we're using setUniform() to send our uniform values to the shader
  shader.setUniform("u_resolution", [width, height]);
  shader.setUniform("u_time", millis() / 1000.0);
  shader.setUniform("mouse", [mouseX, map(mouseY, 0, height, height, 0)]);

  // passing the shapingTexture layer geometry to render on
  shaderTexture.rect(0, 0, 100, 100);
}
