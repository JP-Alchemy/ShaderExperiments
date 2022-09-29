#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0);
vec3 colorB = vec3(1);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

// Graph 01 to 07 - Row 1 function smoothing the tip
float Row_01(vec2 st, float smoothingTip) {    
    return pow(abs(st.x), smoothingTip);
}

// Graph 08 to 14 - Row 2 function smoothing the tip
float Row_02(vec2 st, float smoothingTip) {    
    return pow(cos(PI * st.x / 2.0), smoothingTip);
}

// Graph 08 to 14 - Row 2 function smoothing the tip
float Row_04(vec2 st, float smoothingTip) {    
    return pow(max(0.0, abs(st.x) * 2.0 - 1.0), smoothingTip);
}

void main() {
	vec2 st = (gl_FragCoord.xy/u_resolution - 0.5) * 2.0;

    vec3 pct = vec3(Row_01(st, 1.0));

    vec3 color = mix(colorA, colorB, pct);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));

	gl_FragColor = vec4(color,1.0);
}