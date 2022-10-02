#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float stepBox(float borders, vec2 st) {
    vec2 bl = step(vec2(borders), st);
    vec2 tr = step(vec2(borders), 1.0 - st);
    return bl.x * bl.y * tr.x * tr.y;
}

// Draws box with position in mind from bottom left to top right
float stepBox(vec2 _blPos, vec2 _trPos, vec2 st) {
    vec2 bl = step(_blPos, st);
    vec2 tr = step(1.0 - vec2(_trPos), 1.0 - st);
    return bl.x * bl.y * tr.x * tr.y;
}

float outlineBox(float borders, float thickness, vec2 st) {
    float pct = stepBox(borders, st);
    return abs(pct - stepBox(borders + thickness, st));
}

// Draws a box outline with position in mind from bottom left to top right
float outlineBox(vec2 _blPos, vec2 _trPos, float thickness, vec2 st) {
    float pct = stepBox(_blPos, _trPos, st);
    return abs(pct - stepBox(_blPos + thickness, _trPos - thickness, st));
}

float smoothBox(float borders, float blur, vec2 st) {
    float bb = blur * 0.5;
    vec2 bl = smoothstep(vec2(borders - bb), vec2(borders + bb), st);
    vec2 tr = smoothstep(vec2(borders - bb), vec2(borders + bb), 1.0 - st);
    return bl.x * bl.y * tr.x * tr.y;
}

float floorBox(float borders, vec2 st) {
    vec2 bl = floor(st + borders);
    vec2 tr = floor((1.0 - st) + borders);
    return bl.x * bl.y * tr.x * tr.y;
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.97f, 0.94f, 0.87f); // Background color

    vec3 pct = vec3(0.0, 0.0, 0.);
    vec3 redBox = stepBox(vec2(-1.0,0.75), vec2(0.25,1.2), st) * vec3(1.,0.,0.);
    vec3 blueBox = stepBox(vec2(0.95,0.75), vec2(1.2,1.2), st) * vec3(0.,0.,1.);
    vec3 yellowBox = stepBox(vec2(0.85,-1.), vec2(1.2,0.15), st) * vec3(1.0, 1.0, 0.2);
    // Add all the color masks together
    pct += redBox + blueBox + yellowBox;

    // Make background colors for outlines to go ontop
    pct = (vec3(1.0 - ceil((pct.r + pct.g + pct.b) / 3.0)) * color) + pct; // make a mask for the skin color background to appear

    // Draws the outlines
    pct *= vec3(1.0 - outlineBox(vec2(0.85,-1.), vec2(1.2,0.15), 0.01, st));
    pct *= vec3(1.0 - outlineBox(vec2(-1.0,0.75), vec2(0.25,1.2), 0.01, st));
    pct *= vec3(1.0 - outlineBox(vec2(-1.0,0.75), vec2(1.2,0.875), 0.01, st));
    pct *= vec3(1.0 - outlineBox(vec2(-1.0,-1.0), vec2(0.25,0.875), 0.01, st));
    pct *= vec3(1.0 - outlineBox(vec2(0.85,-1.0), vec2(0.95,1.2), 0.01, st));

    gl_FragColor = vec4(pct, 1.0);
}