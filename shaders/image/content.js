const glass1Content = {
  src: "",
  alt: "",
  description:
    "using a large grid and then doing something else, which I will investigate below, you get a diffractive glass effect, like you've got allure to maintain",
  code: `    st = createGrid(st, vec2(100.), indices);
  vec4 tex = texture2D(tex0, uv + st / 9.);`,
  frag: "../assets/frag/glass-wall-vid.frag",
};
