const pixelated1Content = {
  src: "../assets/hsv-pixelation-1.png",
  alt:
    "a pixelated washed of colours that has a blob of black on the bottom, which blends into a salmon pink dotted with dark green pixels, which blends into a blinding white blob on the right side",
  description:
    "below is a noise applied to the position. the four corners of each unit area have a pseudorandom time dependent value, and are mixed together for the area. to the left is the result when the canvas is scaled by 40 before adding noise, so the mixing is done per smaller area units. it creates a pixelated effect. pixelation occurs when there is data missing. the interpolation of the data is often an average or a sample of the available data. when starting from ideal mathematical equations like in this shader, there are infinite data points. so this artificial loss of data is kind of funny.",
  code: `// scale the canvas for noise
      vec2 pos = vec2(st * 40.);
      float n = noise(pos);`,
  frag: "../frag/hsv-withnoise.frag",
  src2: "../assets/hsv-dots-1.png",
  alt2:
    "a black background with a glowing bluish blob at the bottom and top, and a dimmer circular blob in the middle. there is a noisy texture like sand which is coloured blue all across. ",
};
