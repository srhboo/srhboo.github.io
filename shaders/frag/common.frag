#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 createGrid( in vec2 st, in vec2 grid, out vec2 indices) {
    
    st *= grid;
    
    indices = floor(st);
    st = fract(st);

    return st;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.060, pct * st.x * 1.240, st.y * 1.152);
}

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

float drawCircle(vec2 st, vec2 pos, float size) {
    float result = distance(st, vec2(pos));
    result = 1.0 - smoothstep(size - 0.3, size + 0.676, result);    
    return result;
}


float drawRectangle(vec2 st, vec2 pos, vec2 size) {
    float result = 1.0;
    vec2 border = (1.0 - size) / 2.0;
    
    result = step(border.x, st.x);
    result *= step(border.x, 1.0 - st.x);
    result *= step(border.y, st.y);
    result *= step(border.y, 1.0  -st.y);
    return result;
}