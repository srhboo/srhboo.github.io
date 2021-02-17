// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float drawCircle(vec2 st, vec2 pos, float size) {
    float result = distance(st, vec2(pos));
    result = 1.0 - step(size, result);    
    
    
    return result;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    //color = vec3(st.x,st.y,abs(sin(u_time)));
    
//     float dx = distance( st.x, 0.5);
//     color.r = dx;
    
//     float dy = distance(st.y, 0.5);
//     color.g = dy;
    
//     float d = distance(st, vec2(0.5));
//     d = 1.0 - step(0.116, d);
    
//     color.r = d;
    
    vec2 pos = u_mouse / u_resolution;
    
    color.g = drawCircle(st, pos, 0.260);
    color.r = drawCircle(st, pos, 0.4);
    
    gl_FragColor = vec4(color,1.0);
}