uniform sampler2D uTexture;
uniform vec2 uCursor;
uniform float uRadius;
uniform float uStrength;
uniform float uScroll;
uniform float uTime;
varying vec2 vUv;
varying float vDispersal;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);

  float luma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
  if (texColor.a < 0.05 || (luma < 0.02 && texColor.a > 0.95)) {
    discard;
  }

  float gray = pow(luma, 1.15);

  float grain = (fract(sin(dot(vUv * (uTime * 0.4 + 1.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.035;
  vec3 bwColor = clamp(vec3(gray) + grain, 0.0, 1.0);

  float dist = distance(vUv, uCursor);
  float reveal = smoothstep(uRadius, uRadius * 0.25, dist) * uStrength;

  vec3 finalColor = mix(bwColor, texColor.rgb, reveal);
  float alpha = texColor.a * (1.0 - smoothstep(0.4, 0.95, vDispersal));

  gl_FragColor = vec4(finalColor, alpha);
}
