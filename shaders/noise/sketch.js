let posNoiseShader;
let posNoiseTexture;

function preload() {
  posNoiseShader = loadShader(
    "../vert/basic.vert",
    "../frag/hsv-withnoise.frag"
  );
}

function setup() {
  createCanvas(3000, 2000, WEBGL);

  noStroke();

  posNoiseTexture = createGraphics(700, 700, WEBGL);
  posNoiseTexture.noStroke();

  pixelated1 = createA(
    `${pixelated1Content.frag}`,
    `<img src="${pixelated1Content.src}" alt="${pixelated1Content.alt}" class="sketch"/>`
  );
  pixelated1.position(10, 10).size(400, 400);
  pixelatedLabel = createDiv(pixelated1Content.description);
  pixelatedLabel.position(350, 40).class("description");
  pixelatedCode = createElement("pre", pixelated1Content.code);
  pixelatedCode.position(10, 400);
  pixelated1Dot = createImg(pixelated1Content.src2, pixelated1Content.alt2);
  pixelated1Dot.position(10, 600).size(400, 400);
}

function draw() {
  background(240);
  posNoiseTexture.shader(posNoiseShader);

  posNoiseShader.setUniform("u_resolution", [width, height]);
  posNoiseShader.setUniform("u_time", millis() / 1000.0);
  translate(-width / 2, -height / 2);
  posNoiseTexture.rect(0, 0, width, height);

  texture(posNoiseTexture);
  rect(500, 300, 300, 300);
}
