#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// random and noise code from https://thebookofshaders.com/11/
float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    // if you add time component to just one, it is a texture instead of white noise
    float a = random(i + cos(u_time / 4.));
    float b = random(i + cos(u_time / 4.) + vec2(1.0, 0.0));
    float c = random(i+ cos(u_time / 4.) + vec2(0.0, 1.0));
    float d = random(i+ cos(u_time / 4.) + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.1, pct, st.y) -
          smoothstep( pct, pct+0.5, st.y);
}

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    // fSmooth interpolation between 0.1 and 0.9
    float y = sin(PI*st.x+u_time/40.)/0.8 + cos(PI*st.y+ u_time/40.)/2.;
    float yz = sin(PI*st.x+u_time/30.)/1. + cos(PI*st.y+ u_time/10.)/0.8;

    vec3 color = vec3(y);
    vec3 colorA = vec3(0.3961, 0.451, 0.5451);
    vec3 colorB = vec3(0.6667, 0.2353, 0.3451);
    vec3 colorC = vec3(0.0118, 0.2078, 0.0549);
    vec3 colorD = vec3(0.0706, 0.2784, 0.3059);
    float pct = plot(st,y);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;
    // circle equation
    float z = radius * 10.*sin(u_time/2.+ atan(st.y, st.x));

    // scale the canvas for noise
    vec2 pos = vec2(st * 400000.);
    float n = noise(pos);

    // now mix it all
    color = mix(colorA, colorB, n);
    color = mix(color, colorC, yz);
    color = mix(color, colorD, z);
    vec3 hsbtemp = rgb2hsb(color);
    color = hsb2rgb(vec3(hsbtemp[0], hsbtemp[1]*0.5, hsbtemp[2]*0.5));

    gl_FragColor = vec4(color,1.0);
}
