#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float smoothCirlce(float min, float max, vec2 st, float anim) {
    float pct = distance(st,vec2(0.5)) * 2.0;
    pct += fract(u_time * 10.0) * anim;
    return smoothstep(min, max, pct);
}

float smoothCirlce(float min, float max, vec2 st, vec2 pos) {
    float pct = distance(st,pos) * 2.0;
    return smoothstep(min, max, pct);
}

float fastCircle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

float distance2(vec2 st, vec2 a) {
    return distance(st,a) * 2.0;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    pct = distance2(st,vec2(0.4)) + distance2(st,vec2(0.6));
    // pct = distance2(st,vec2(0.4)) * distance2(st,vec2(0.6));
    // pct = min(distance2(st,vec2(0.4)),distance2(st,vec2(0.6)));
    // pct = max(distance2(st,vec2(0.4)),distance2(st,vec2(0.6)));
    // pct = pow(distance2(st,vec2(0.4)),distance2(st,vec2(0.6)));
    pct = smoothstep(0.85, 0.9, pct);

    vec3 color = vec3(pct) * vec3(1.0, 0.5, 0.0);

	gl_FragColor = vec4( color, 1.0 );
}
