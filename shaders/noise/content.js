const pixelated1Content = {
  src: "../assets/hsv-pixelation-1.png",
  alt: "a pixelated transition between white and pink",
  description:
    "managed to get this pixelated effect by scaling up the canvas high enough? I wonder how that works",
  code: `// scale the canvas for noise
      vec2 pos = vec2(st * 400000.);
      float n = noise(pos);`,
};
