precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
uniform float time;
uniform float frequency;
uniform float amplitude;

vec2 createGrid( in vec2 st, in vec2 grid, out vec2 indices) {
    
    st *= grid;
    
    indices = floor(st);
    st = fract(st);

    return st;
}

void main() {

    vec2 uv = vTexCoord;
    // the texture is loaded upside down and backwards by default so lets flip it
    uv = 1.0 - uv;
    vec2 st = uv;
    vec2 indices;
    st = createGrid(st, vec2(100.), indices);


    // add the distortion to our texture coordinates
    vec4 tex = texture2D(tex0, uv + st / 9.);

    gl_FragColor = tex;
}