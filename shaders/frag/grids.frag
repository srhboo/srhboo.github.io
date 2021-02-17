// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 createGrid( in vec2 st, in vec2 grid, out vec2 indices) {
    
    st *= grid;
    
    indices = floor(st);
    st = fract(st);

    return st;
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

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    //st *= 10.;
    
    vec2 indices;
    st = createGrid(st, vec2(10.), indices);
    
    
    vec3 color = vec3(0.);
   // color = vec3(row/10., st.y/column, 0.0);
	// color.r = mod(row, 2.);
	// color.g = mod(column, 2.);
    if(mod(indices.x, 2.) == 0.0 && mod(indices.y, 2.) == 0.) {
        color = vec3(0.423);
        float r = drawRectangle(st, vec2(0.5), vec2(0.5));
        color = mix(color, vec3(0., 1., 0.), r);
    } else if(mod(indices.x, 2.) == 1.0 && mod(indices.y, 2.) == 0.) {
       // color = vec3(1., 0., 0.);
        st = createGrid(st, vec2(4.0), indices);
        color = vec3(0.2);
        float r = drawRectangle(st, vec2(0.5), vec2(0.5));
        color = mix(color, vec3(1., 0., 0.), r);
    } else if(mod(indices.x, 2.) == 0.0 && mod(indices.y, 2.) == 1.) {
       // color = vec3(0., 0., 1.);
        color = vec3(0.245,0.245,0.245);
        float r = drawRectangle(st, vec2(0.5), vec2(0.5));
        color = mix(color, vec3(1., 1., 0.), r);
    }
    else {
       // color = vec3(1., 1., 0.0);
    	color = vec3(0.395,0.395,0.395);
        float r = drawRectangle(st, vec2(0.5), vec2(0.5));
        color = mix(color, vec3(0., 1., 1.), r);
    }
    gl_FragColor = vec4(color,1.0);
}