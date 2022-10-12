#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    st *= 3.0;      // Scale up the space by 3
    vec2 cr = ceil(st);
    float isMiddle = floor(cr.x/2.0) * floor(cr.y/2.0);
    st = fract(st); // Wrap around 1.0

    // Now we have 9 spaces that go from 0-1

    float circles = (1.0 - isMiddle) * circle(st,0.5);
    float crosses = isMiddle * cross(st,0.5);
    color = vec3(circles + crosses);

	gl_FragColor = vec4(color,1.0);
}