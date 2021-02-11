#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

// copy over some utility functions from examples
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
    // blurry
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


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 indices;
    st = createGrid(st, vec2(5.), indices);

    // Smooth interpolation between 0.2 and 0.8 reversed
    float y = smoothstep(0.8,0.2,st.x);

    vec3 color = vec3(y);

    float pct = plot(st,y);

    // for the even numbered rows and cols
    if(mod(indices.x, 2.) == 0.0 && mod(indices.y, 2.) == 0.) {
        color = vec3(0.423,0.332,0.001);
        color = mix(color, vec3(1.000,0.521,0.357), pct);
    // for odd col even row
    } else if(mod(indices.x, 2.) == 1.0 && mod(indices.y, 2.) == 0.) {
        // rotate canvas
        st = rotate2D(st, PI * u_time/8.);
        // to scale rectangle
        vec2 st2 = createGrid(st, vec2(0.590,0.540), indices);
        color = vec3(0.2);
        float r = drawRectangle(st2, vec2(0.5), vec2(0.3));
        color = mix(color, vec3(st.x,0.933,1.000), r);
    // for even col odd rows
    } else if(mod(indices.x, 2.) == 0.0 && mod(indices.y, 2.) == 1.) {
        color = vec3(0.245,0.245,0.245);
        
        // make blurry circles that move around
        float c = drawCircle(st, vec2(0.510 + sin(u_time/2. + PI/2.) * 0.3,0.460 + sin(u_time) * 0.4), 0.2);
        float c2 = drawCircle(st, vec2(0.566 + cos(u_time/2. + PI/2.) * 0.3,0.460 + cos(u_time) * 0.4), 0.2);

        color = mix(color, vec3(0.280+st.x,0.540 ,0.360 + st.y), c);
        color = mix(color, vec3(0.520+st.x,0.760,0.686), c2);
    }
    else {
    	color = vec3(0.395,0.395,0.395);
        color = mix(color, vec3(0.517,0.726,1.000), pct);
    }
    gl_FragColor = vec4(color,1.0);
}