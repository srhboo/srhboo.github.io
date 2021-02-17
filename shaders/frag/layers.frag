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

    vec3 color = vec3(1., 0., 0.);

    float c = drawCircle(st, vec2(0.5, 0.5), 0.4);
    float c2 = drawCircle(st, vec2(0.7, 0.5), 0.4);
    
    color = mix(color, vec3(0.0, 0.0, 1.0), c * 0.3);
    color = mix(color, vec3(0.0, 1.0, 0.0), c2 * 0.3);

    gl_FragColor = vec4(color,1.0);
}