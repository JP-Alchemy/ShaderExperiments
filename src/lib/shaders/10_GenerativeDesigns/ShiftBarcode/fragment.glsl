// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main(void) {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    st.y *= 2.0; // Scale the coordinate 20system by 10
    st.x *= 10.0;
    
    vec2 ipos = floor(st);  // get the integer coords
    st.x += u_time * (ipos.y == 0.0 ? 1.0 : -1.0);
    ipos.x = floor(st.x);

    vec2 fpos = fract(st);  // get the fractional coords

    // Assign a random value based on the integer coord
    vec3 color = vec3(random( ipos ));

    float res = step(random(ipos), fpos.x);
    color = vec3(res);

    gl_FragColor = vec4(color,1.0);
}
