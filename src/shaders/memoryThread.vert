precision highp float;

attribute vec3 position;
attribute vec3 tangent;
attribute float uOffset;
attribute float uWidth;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uBaseWidth;
uniform float uFlow;
uniform float uNoiseAmp;
uniform float uNoiseFreq;

varying float vAlpha;
varying float vPhase;
varying vec3 vPos;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  float a = hash(i.xy);
  float b = hash(i.xy + vec2(1.0, 0.0));
  float c = hash(i.xy + vec2(0.0, 1.0));
  float d = hash(i.xy + vec2(1.0, 1.0));
  vec2 u = f.xy * f.xy * (3.0 - 2.0 * f.xy);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  vec3 n = normalize(cross(tangent, vec3(0.0, 1.0, 0.0)));
  if (length(n) < 0.001) n = normalize(cross(tangent, vec3(1.0, 0.0, 0.0)));

  float phase = uTime * uFlow + uOffset;
  float wob = (noise(vec3(position * uNoiseFreq + phase)) - 0.5) * uNoiseAmp;

  vec3 pos = position + n * (uBaseWidth * uWidth) + n * wob;

  vAlpha = smoothstep(0.05, 0.2, uOffset) * smoothstep(0.95, 0.8, uOffset);
  vPhase = phase;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
