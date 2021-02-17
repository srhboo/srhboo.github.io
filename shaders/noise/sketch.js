function setup() {
  createCanvas(3000, 2000);

  pixelated1 = createImg(pixelated1Content.src, pixelated1Content.alt);
  pixelated1.position(10, 10).size(400, 400);
  pixelatedLabel = createDiv(pixelated1Content.description);
  pixelatedLabel.position(400, 10).class("description");
  pixelatedCode = createElement("pre", pixelated1Content.code);
  pixelatedCode.position(300, 100);
}

function draw() {
  background(240);
}
