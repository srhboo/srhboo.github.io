let noteIos;
let note1;
let note2;
let note3;
let note4;
let note5;
let note6;

let noteIosText;
let note1Text;
let note2Text;
let note3Text;
let note4Text;
let note5Text;
let note6Text;

let noteIosDraggable;
let note1Draggable;
let note2Draggable;
let note3Draggable;
let note4Draggable;
let note5Draggable;
let note6Draggable;

let topIndex = 0;

let c1, c2;

function setup() {
  createCanvas(windowWidth, 1400);
  c1 = color(38, 145, 106);
  c2 = color(0);
  setGradient(c1, c2);

  // main text
  noteIosText = createDiv(main)
    .class("note-ios-text")
    .style("max-height", `${649 - 160}px`);
  noteIos = createDiv().size(300, 649).class("note-ios").child(noteIosText);
  noteIosDraggable = new DraggableEl(
    53,
    12,
    300,
    649,
    noteIos,
    80,
    20,
    noteIosText.size().height
  );
  attachMouse(noteIos, noteIosDraggable);

  // sources
  note1Text = createDiv(sources)
    .class("note-1-text")
    .style("max-height", `${189 - 100}px`);
  note1 = createDiv().size(900, 189).class("note-1").child(note1Text);
  note1Draggable = new DraggableEl(
    35,
    909,
    900,
    189,
    note1,
    70,
    10,
    note1Text.size().height
  );
  attachMouse(note1, note1Draggable);

  // context
  note2Text = createDiv(context)
    .class("note-2-text")
    .style("max-height", `${350 - 120}px`);
  note2 = createDiv().size(265, 350).class("note-2").child(note2Text);
  note2Draggable = new DraggableEl(
    801,
    13,
    265,
    350,
    note2,
    70,
    10,
    note2Text.size().height
  );
  attachMouse(note2, note2Draggable);

  // reflections
  note3Text = createDiv(reflection)
    .class("note-3-text")
    .style("max-height", `${416 - 75}px`);
  note3 = createDiv().size(650, 416).class("note-3").child(note3Text);
  note3Draggable = new DraggableEl(
    459,
    377,
    650,
    416,
    note3,
    65,
    430,
    note3Text.size().height,
    10
  );
  attachMouse(note3, note3Draggable);

  // more reflection
  note4Text = createDiv(reflection2)
    .class("note-2-text")
    .style("max-height", `${350 - 120}px`);
  note4 = createDiv().size(265, 350).class("note-2").child(note4Text);
  note4Draggable = new DraggableEl(
    414,
    124,
    265,
    350,
    note4,
    70,
    10,
    note4Text.size().height
  );
  attachMouse(note4, note4Draggable);

  // artists
  note5Text = createDiv(artists)
    .class("note-1-text")
    .style("max-height", `${189 - 100}px`);
  note5 = createDiv().size(900, 189).class("note-1").child(note5Text);
  note5Draggable = new DraggableEl(
    186,
    771,
    900,
    189,
    note5,
    70,
    10,
    note5Text.size().height
  );
  attachMouse(note5, note5Draggable);

  // words
  note6Text = createDiv(words)
    .class("note-2-text")
    .style("max-height", `${350 - 120}px`);
  note6 = createDiv().size(265, 350).class("note-2").child(note6Text);
  note6Draggable = new DraggableEl(
    26,
    543,
    265,
    350,
    note6,
    70,
    10,
    note6Text.size().height
  );
  attachMouse(note6, note6Draggable);
}

function draw() {
  // background(255);
  noteIosDraggable.over();
  noteIosDraggable.update();
  noteIosDraggable.show();

  note1Draggable.over();
  note1Draggable.update();
  note1Draggable.show();

  note2Draggable.over();
  note2Draggable.update();
  note2Draggable.show();

  note3Draggable.over();
  note3Draggable.update();
  note3Draggable.show();

  note4Draggable.over();
  note4Draggable.update();
  note4Draggable.show();

  note5Draggable.over();
  note5Draggable.update();
  note5Draggable.show();

  note6Draggable.over();
  note6Draggable.update();
  note6Draggable.show();
}

function attachMouse(el, draggable) {
  el.mousePressed(() => {
    // check if it's already the top window
    let curr = el.style("z-index");
    if (curr != topIndex) {
      // if not give it the biggest z
      topIndex += 1;
      el.style("z-index", topIndex);
    }
    draggable.pressed();
  });
  el.mouseReleased(() => draggable.released());
}

// from https://editor.p5js.org/REAS/sketches/S1TNUPzim
function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 1400);
  setGradient(c1, c2);
}
