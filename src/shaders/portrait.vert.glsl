uniform float uScroll;
uniform float uTime;
varying vec2 vUv;
varying float vDispersal;

void main() {
  vUv = uv;
  vec3 pos = position;

  float distFromCenter = length(uv - vec2(0.5));
  float angle = atan(uv.y - 0.5, uv.x - 0.5);

  float swirl = uScroll * 3.8;
  float spread = uScroll * 3.2;

  pos.x += cos(angle + swirl) * distFromCenter * spread + sin(pos.y * 8.0 + uTime) * uScroll * 0.35;
  pos.y += sin(angle + swirl) * distFromCenter * spread + cos(pos.x * 8.0 + uTime) * uScroll * 0.35;
  pos.z += uScroll * (sin(distFromCenter * 12.0 - uTime * 2.0) * 1.2);

  vDispersal = uScroll;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
