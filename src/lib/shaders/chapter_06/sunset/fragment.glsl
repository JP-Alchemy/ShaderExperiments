#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.0f, 0.37f, 0.12f);
float animSpeed = 2.0;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float verticalGrad(float y) {
    float offset = (y - 0.5f) * 2.0f;
    return pow(abs(offset + 0.33), 0.5);
}

float horizontalGrad(float x) {
    return smoothstep(0.0,1.0, x);
}

float animatBottom() {
    return abs(-sin(u_time * animSpeed)) - 0.2;
}

float animatTop() {
    return abs(sin(u_time * animSpeed)) + 0.2;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(animatBottom(), animatTop(), horizontalGrad(st.x) * verticalGrad(st.y)); // Limit to quarter limit
    // pct.g = sin(st.x*PI);
    pct.b = pow(st.x, 0.5 + abs(sin(u_time * animSpeed)));

    color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}