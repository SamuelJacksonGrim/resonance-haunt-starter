precision highp float;

attribute vec3 position;
attribute float aPhase;
attribute float aRadius;
attribute float aRes;
attribute vec3 aColorBias;

uniform float uTime;
uniform vec3 uCenter;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 vColor;

void main() {
  float angle = aPhase + uTime * (0.4 + aRes * 0.6);
  float bob = sin(uTime * 0.8 + aPhase) * 0.02 * (0.5 + aRes);

  vec3 orbit = uCenter + vec3(
    cos(angle) * aRadius,
    bob,
    sin(angle) * aRadius
  );

  float jitter = sin((uTime + aPhase) * 3.1415) * 0.01;
  orbit += normalize(orbit - uCenter) * jitter;

  vColor = mix(vec3(0.4, 0.7, 1.0), aColorBias, aRes);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(orbit + position * (0.02 + aRes * 0.03), 1.0);
}
