// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 movingTiles(vec2 _st, float _zoom) {
    _st *= _zoom;

    float odd = round(mod(u_time,1.0));

    if(odd == 1.0) {
        float odd_y = round(mod(_st.y * 0.5,1.0));
        _st.x += odd_y * fract(u_time) * 2.0;
        _st.x -= (1.0 - odd_y) * fract(u_time) * 2.0;
    } else {
        if(fract(_st.x * 0.5) > 0.5) {
            _st.y += fract(u_time) * 2.0;
        } else {
            _st.y -= fract(u_time) * 2.0;
        }
    }
    return fract(_st);
}

float circle(vec2 _st, float _radius) {
    vec2 pos = vec2(0.5) - _st;
    return smoothstep(1.0 - _radius, 1.0 - _radius + _radius * 0.2, 1. - dot(pos, pos) * 3.14);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    st = movingTiles(st, 10.);

    vec3 color = vec3(1.0 - circle(st, 0.3));

    gl_FragColor = vec4(color, 1.0);
}