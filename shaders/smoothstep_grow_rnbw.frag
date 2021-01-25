#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // Smooth interpolation between 0.1 and 0.9
    float y = smoothstep(0.8,0.2,st.x);

    vec3 color = vec3(y);

    float pct = plot(st,y);
    color = (1.-(pct * sin(u_time)))*color+pct*vec3(0.7,sin(u_time)/2.+1.,0.84)* cos(u_time*y);

    gl_FragColor = vec4(color,1.0);
}
