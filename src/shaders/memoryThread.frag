precision highp float;

uniform vec3 uColorCore;
uniform vec3 uColorEdge;
uniform float uPulse;

varying float vAlpha;
varying float vPhase;
varying vec3 vPos;

void main() {
  float glow = 0.5 + 0.5 * sin(vPhase * 6.2831);
  float intensity = mix(0.6, 1.2, uPulse) * glow;

  vec3 color = mix(uColorEdge, uColorCore, intensity);
  float alpha = clamp(vAlpha * intensity, 0.0, 1.0);

  gl_FragColor = vec4(color, alpha);
}
