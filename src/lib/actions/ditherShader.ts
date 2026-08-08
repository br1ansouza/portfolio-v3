export const VERTEX_SOURCE = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

export const FRAGMENT_SOURCE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uStrength;
uniform vec3 uSphere;
uniform float uPulse;
uniform float uHover;
uniform vec3 uHot;

out vec4 fragColor;

const float PIXEL = 3.0;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float valueNoise3(vec3 p) {
  vec3 cell = floor(p);
  vec3 offset = fract(p);
  vec3 smoothed = offset * offset * (3.0 - 2.0 * offset);
  float front = mix(
    mix(hash3(cell), hash3(cell + vec3(1.0, 0.0, 0.0)), smoothed.x),
    mix(hash3(cell + vec3(0.0, 1.0, 0.0)), hash3(cell + vec3(1.0, 1.0, 0.0)), smoothed.x),
    smoothed.y);
  float back = mix(
    mix(hash3(cell + vec3(0.0, 0.0, 1.0)), hash3(cell + vec3(1.0, 0.0, 1.0)), smoothed.x),
    mix(hash3(cell + vec3(0.0, 1.0, 1.0)), hash3(cell + vec3(1.0, 1.0, 1.0)), smoothed.x),
    smoothed.y);
  return mix(front, back, smoothed.z);
}

float wobble(vec3 direction) {
  vec3 p = direction * 1.9 + vec3(0.0, uTime * 0.22, uTime * 0.34);
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    total += amplitude * valueNoise3(p);
    p *= 2.07;
    amplitude *= 0.5;
  }
  return total - 0.42;
}

float ripple(vec3 direction) {
  return valueNoise3(direction * 6.4 + vec3(uTime * 0.85, 0.0, uTime * -0.6)) - 0.5;
}

vec2 sphereCenter() {
  return uSphere.xy + (uPointer - uSphere.xy) * (0.32 * uHover);
}

float sphereLight(vec2 uv, out float coverage) {
  coverage = 0.0;
  if (uSphere.z <= 0.0) return 0.0;

  vec2 rel = (uv - sphereCenter()) / uSphere.z;
  float radial = dot(rel, rel);
  if (radial > 1.9) return 0.0;

  float base = sqrt(max(1.0 - min(radial, 1.0), 0.0));
  vec3 guess = normalize(vec3(rel, base + 0.02));
  float swell = 0.19 + uHover * 0.08 + uPulse * 0.18;
  float radius = 1.0 + swell * wobble(guess) + (0.065 + uHover * 0.05) * ripple(guess);
  float depth = radius * radius - radial;
  if (depth <= 0.0) return 0.0;

  coverage = 1.0;
  vec3 normal = normalize(vec3(rel, sqrt(depth)));
  vec3 light = normalize(vec3(-0.42, 0.6, 0.68));
  float lambert = max(dot(normal, light), 0.0);
  float rim = pow(1.0 - clamp(normal.z, 0.0, 1.0), 2.4);
  return (lambert * 0.88 + rim * 0.6) * (1.0 + uHover * 0.5);
}

float valueNoise(vec2 p) {
  vec2 cell = floor(p);
  vec2 offset = fract(p);
  vec2 smoothed = offset * offset * (3.0 - 2.0 * offset);
  float a = hash(cell);
  float b = hash(cell + vec2(1.0, 0.0));
  float c = hash(cell + vec2(0.0, 1.0));
  float d = hash(cell + vec2(1.0, 1.0));
  return mix(mix(a, b, smoothed.x), mix(c, d, smoothed.x), smoothed.y);
}

float terrain(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    total += amplitude * valueNoise(p);
    p *= 2.03;
    amplitude *= 0.5;
  }
  return total;
}

float bayer2(vec2 cell) {
  cell = floor(cell);
  return fract(cell.x * 0.5 + cell.y * cell.y * 0.75);
}

float bayerThreshold(vec2 block) {
  float value = bayer2(block * 0.5) * 0.25 + bayer2(block);
  return value * 0.9375 + 0.03125;
}

void main() {
  vec2 block = floor(gl_FragCoord.xy / PIXEL);
  vec2 pixel = block * PIXEL;
  vec2 uv = (pixel - 0.5 * uResolution) / uResolution.y;

  vec2 toPointer = uv - uPointer;
  float pull = 0.06 / (dot(toPointer, toPointer) + 0.08);
  vec2 warped = uv + normalize(toPointer + 1e-5) * pull * 0.12;

  float height = terrain(warped * 2.6 + vec2(uTime * 0.035, uScroll * 0.6));
  height += 0.12 * sin(uTime * 0.25 + uv.x * 3.0);

  float rings = fract(height * 7.0);
  float contour = smoothstep(0.44, 0.5, rings) * smoothstep(0.56, 0.5, rings);

  float glow = smoothstep(0.5, 0.0, length(toPointer));
  float intensity = contour * (0.42 + glow * 1.1) * uStrength;

  float bottomFade = smoothstep(-0.55, -0.28, uv.y);
  float topFade = smoothstep(0.5, 0.32, uv.y);
  float verticalFade = bottomFade * mix(0.75, 1.0, topFade);
  float aspect = uResolution.x / uResolution.y;
  vec2 textCenter = vec2(-0.22 * aspect, -0.03);
  float textMask = smoothstep(0.18, 0.66, length((uv - textCenter) * vec2(0.58, 1.05)));
  intensity *= verticalFade * mix(0.06, 1.0, textMask) * 0.6;

  float coverage = 0.0;
  float sphere = sphereLight(uv, coverage);
  intensity *= 1.0 - coverage;

  float value = max(intensity, sphere);
  float lit = step(bayerThreshold(block), value);

  vec3 fieldColor = mix(uInk, uAccent, lit * (0.35 + glow * 0.65));
  vec3 sphereColor = mix(uInk, mix(uAccent, uHot, uHover * 0.6), lit * 0.95);
  vec3 color = mix(fieldColor, sphereColor, coverage);
  float alpha = mix((0.5 + glow * 0.5) * uStrength, 1.0, coverage);

  fragColor = vec4(color, lit * clamp(alpha, 0.0, 1.0));
}`;
