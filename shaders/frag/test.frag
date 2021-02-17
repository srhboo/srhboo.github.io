#ifdef GL_ES
precision mediump float;
#endif
 
uniform vec2 u_resolution;
uniform float u_time;
// Function from Iñigo Quiles
// https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb(in vec3 c){
vec3 rgb=clamp(abs(mod(c.x*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);
rgb=rgb*rgb*(3.-2.*rgb);
return c.z*mix(vec3(1.),rgb,c.y);
}
void main(){
vec2 st=gl_FragCoord.xy/u_resolution;
vec3 color=vec3(0.);
vec2 toCenter=vec2(.5)-st*exp(sin(u_time*st.x));
float angle=max(toCenter.y,toCenter.x);
float radius=length(toCenter)*0.5;
color=hsb2rgb(vec3((angle/6.)+u_time*0.15,radius,1.));
gl_FragColor=vec4(color,1.);
}