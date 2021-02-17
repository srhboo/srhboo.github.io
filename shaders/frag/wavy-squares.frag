// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float drawRectangle(vec2 st, vec2 size) {
    float result = 1.0;
    vec2 border = (1.0 - size) / 2.0;
    
    result = step(border.x, st.x);
    result *= step(border.x, 1.0 - st.x);
    result *= step(border.y, st.y);
    result *= step(border.y, 1.0  -st.y);
    return result;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    st.x += sin(st.y * 17. + u_time) * 0.1;
    st.y += cos(st.x * 17. + u_time) * 0.1;
    
	vec2 size = vec2(0.800,0.500);
    float border = 0.034;
	// float border = 0.034 + (sin(st.x * 20.0 + u_time * 2.0) * 0.5 + 0.5) * 0.1;
	// border += 0.034 + (sin(st.y * 20.0 + u_time * 2.0) * 0.5 + 0.5) * 0.1;
    vec3 color = vec3(0.);
    
    color.g = drawRectangle(st, size);
    color.g -= drawRectangle(st, size-vec2(border));
    
    color.r = drawRectangle(st, vec2(0.9,0.9));    
     color.r -= drawRectangle(st, vec2(0.8,0.8));
    //color.b = drawRectangle(st, vec2(0.200,0.630));

    
    gl_FragColor = vec4(color,1.0);
}