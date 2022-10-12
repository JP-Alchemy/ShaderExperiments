uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle) {
    _st -= 0.5;
    _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges) {
    _size = vec2(0.5) - _size * 0.5;
    vec2 aa = vec2(_smoothEdges * 0.5);
    vec2 uv = smoothstep(_size, _size + aa, _st);
    uv *= smoothstep(_size, _size + aa, vec2(1.0) - _st);
    return uv.x * uv.y;
}

vec2 offset(vec2 _st, vec2 _offset) {
    vec2 uv;

    if(_st.x > _offset.x) {
        uv.x = _st.x - _offset.x;
    } else {
        uv.x = _st.x + _offset.x;
    }

    if(_st.y > _offset.y) {
        uv.y = _st.y - _offset.y;
    } else {
        uv.y = _st.y + _offset.y;
    }

    return uv;
}

void main(void) {
    // vec2 st = gl_FragCoord.xy / u_resolution.xy;
    // vec3 color = vec3(0.0);

    // vec2 translate = vec2(cos(u_time),sin(u_time));
    // st += translate*0.1;

    // // Divide the space in 4
    // st = tile(st, 4.0);

    // // Use a matrix to rotate the space 45 degrees
    // st = rotate2D(st, PI * 0.25 + cos(u_time) * PI);

    // // Draw a square
    // color = vec3(box(st, vec2(0.7), 0.01));
    // color *= vec3(abs(sin(st.x + u_time)), abs(cos(st.y + u_time)), st.y * st.x);

    // gl_FragColor = vec4(color, 1.0);

    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.y *= u_resolution.y / u_resolution.x;

    st = tile(st, 10.);

    vec2 offsetSt = offset(st, vec2(0.5));

    st = rotate2D(st, PI * 0.25);

    float box1 = box(offsetSt, vec2(0.95), 0.01);
    float box2 = box(st, vec2(0.3), 0.01);
    float box3 = box(st, vec2(0.2), 0.01);

    vec3 color = vec3(box1 - box2 + (2. * box3));

    gl_FragColor = vec4(color, 1.0);
}
