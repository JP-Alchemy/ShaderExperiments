#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

#define blue1 vec3(0.74,0.95,1.00)
#define blue2 vec3(0.87,0.98,1.00)

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
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

float boxOutline(in vec2 _st, in vec2 _size){
    return 1.0 - (box(_st, _size) + (1.0 - box(_st, _size + 0.01)));
}

float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

float triangle(in vec2 _st) {
    // Remap the space to -1. to 1.
  vec2 st = _st *2.-1.;

  // Number of sides of your shape
  int N = 3;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);

  // Shaping function that modulate the distance
  float d = cos(floor(.5+a/r)*r-a)*length(st);

   return 1.0-smoothstep(.4,.41,d);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // move space from the center to the vec2(0.0)
    st -= vec2(0.5);
    st = scale( vec2(sin(u_time) * 0.25 + 1.0) ) * st;
    st += vec2(0.5);

    // Show the coordinates of the space on the background
    color = vec3(0.0, 0.0,0.0);

    // Add the shape on the foreground
    color += boxOutline(st, vec2(0.05)) * blue1 * ((sin(u_time)*.3)+0.75);
    
    st -= vec2(0.5);
    st = rotate2d( sin(u_time)*PI ) * st;
    st += vec2(0.5);

    color += boxOutline(st, vec2(0.1)) * blue2 * ((sin(u_time+st.x+st.y)*.6)+0.9);

    gl_FragColor = vec4(color,1.0);
}