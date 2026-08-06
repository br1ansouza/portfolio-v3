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

out vec4 fragColor;

const float PIXEL = 3.0;
const float BAYER[16] = float[16](
  0.0,  8.0,  2.0, 10.0,
  12.0, 4.0, 14.0,  6.0,
  3.0, 11.0,  1.0,  9.0,
  15.0, 7.0, 13.0,  5.0
);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

float bayerThreshold(vec2 block) {
  int x = int(mod(block.x, 4.0));
  int y = int(mod(block.y, 4.0));
  return BAYER[y * 4 + x] / 16.0;
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
  float intensity = contour * (0.42 + glow * 1.1);

  float verticalFade = smoothstep(-0.6, 0.5, uv.y);
  float aspect = uResolution.x / uResolution.y;
  vec2 textCenter = vec2(-0.22 * aspect, 0.02);
  float textMask = smoothstep(0.16, 0.62, length((uv - textCenter) * vec2(0.62, 1.35)));
  intensity *= verticalFade * mix(0.12, 1.0, textMask);

  float lit = step(bayerThreshold(block), intensity);
  vec3 color = mix(uInk, uAccent, lit * (0.35 + glow * 0.65));

  fragColor = vec4(color, lit * (0.5 + glow * 0.5));
}`;
