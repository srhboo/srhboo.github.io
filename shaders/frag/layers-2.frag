#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// from earlier examples
float drawCircle(vec2 st, vec2 pos, float size) {
    float result = distance(st, vec2(pos));
    result = 1.0 - step(size, result);
    return result;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    // bg color to use to make curved lines as well
    vec3 bg = vec3(0.454 + sin(u_time/3.)*0.5,0.625,0.544);

    vec3 color = bg;

    // solid colour
    vec3 colorA = vec3(0.700,0.625,0.363);
    
    // gradients
    vec3 colorB = vec3(st.x/3. + cos(u_time / 2. + 0.1) / 2. + -0.116, st.y + sin(u_time / 2. + 0.5)/3., 0.5);
    vec3 colorC = vec3((cos(st.x + u_time / 2.)) * 0.516 + 0.108, sin(u_time / 2.) * 0.472, 0.336);
    
    // create circles
    float circleA = drawCircle(st, vec2(0.300,0.270), 0.15);
    
    float circleB = drawCircle(st, vec2(0.4), 0.17);
    float circleC = drawCircle(st, vec2(0.440,0.430), 0.15);
    float circleD = drawCircle(st, vec2(0.470,0.460), 0.13);
    float circleE = drawCircle(st, vec2(0.490,0.470), 0.11);
    float circleJ = drawCircle(st, vec2(0.550,0.480), 0.09);
    float circleK = drawCircle(st, vec2(0.580,0.470), 0.062);
    
    float circleF = drawCircle(st, vec2(0.390,-0.130), 0.4);
    float circleG = drawCircle(st, vec2(0.390,-0.160), 0.4);
    float circleH = drawCircle(st, vec2(0.470,0.470), 0.496);
    float circleI = drawCircle(st, vec2(0.410,0.470), 0.520);    
    
    // mix together in correct order to conceal circles and create shapes
    color = mix(color, colorC, circleH);
    color = mix(color, bg, circleI);
    color = mix(color, colorB, circleF);
    color = mix(color, bg, circleG);
    color = mix(color, colorB, circleA);
    color = mix(color, colorC, circleB);
    color = mix(color, colorA, circleC);
    color = mix(color, colorC, circleD);
    color = mix(color, colorA, circleE);
    color = mix(color, colorC, circleJ);
    color = mix(color, colorA, circleK);
    
    gl_FragColor = vec4(color,1.0);
}