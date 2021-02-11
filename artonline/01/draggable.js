// Click and Drag an object
// original code by
// Daniel Shiffman <http://www.shiffman.net>
// modified to accomodate text elements

class DraggableImage {
  constructor(x, y, w, h, img) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.img = img;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      cursor(HAND);
    } else if (this.rollover) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
    image(this.img, this.x, this.y, this.w, this.h);
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class DraggableEl {
  constructor(x, y, w, h, el, pv, pl, ch, pr) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.el = el;
    // padding vertical and horizontal
    this.pv = pv;
    this.pl = pl;
    this.pr = pr || pl;
    // child height
    this.ch = ch;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      //cursor(HAND);
    } else if (this.rollover) {
      //cursor(HAND);
    } else {
      cursor(ARROW);
    }
    this.el.position(this.x, this.y)
  }

  pressed() {
    // Did I click on the rectangle but not in the text area?
    if (mouseX > this.x && mouseX < this.x + this.w && ((mouseX < this.x + this.pl || mouseX > this.x + this.w - this.pr) || (mouseY < this.y + this.pv || mouseY > this.y + this.pv + this.ch)) && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}