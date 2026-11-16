import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
uniform sampler2D uTexture;
uniform vec2 uCursor;
uniform float uRadius;
uniform float uStrength;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec4 col = texture2D(uTexture, vUv);

  float luma = dot(col.rgb, vec3(0.299, 0.587, 0.114));
  bool isBlackBg = (col.r < 0.08 && col.g < 0.08 && col.b < 0.08 && col.a > 0.9);
  if (isBlackBg) discard;

  float contrast = pow(luma, 1.08) * 1.04;
  vec3 bw = clamp(vec3(contrast), 0.0, 1.0);

  float dist = distance(vUv, uCursor);
  float reveal = smoothstep(uRadius, uRadius * 0.2, dist) * uStrength;

  gl_FragColor = vec4(mix(bw, col.rgb, reveal), 1.0);
}
`;

const PortraitMesh = ({ cursor, strength }) => {
  const uniforms = useMemo(() => ({
    uTexture: { value: new THREE.TextureLoader().load("/portrait-cutout.png", (t) => { t.minFilter = THREE.LinearFilter; }) },
    uCursor: { value: new THREE.Vector2(0.5, 0.5) },
    uRadius: { value: 0.28 },
    uStrength: { value: 0.0 },
    uTime: { value: 0.0 },
  }), []);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    uniforms.uCursor.value.lerp(new THREE.Vector2(cursor.current.x, cursor.current.y), 0.12);
    uniforms.uStrength.value = THREE.MathUtils.lerp(uniforms.uStrength.value, strength.current, 0.1);
  });

  return (
    <mesh position={[0, -0.15, 0]}>
      <planeGeometry args={[2.85, 3.85, 1, 1]} />
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

const FallbackPortrait = ({ containerRef }) => {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [show, setShow] = useState(false);

  const onMove = (e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    setShow(true);
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={() => setShow(false)} className="relative w-full h-full overflow-hidden">
      <img
        src="/portrait-cutout.png"
        alt="Sumit Aggarwal"
        className="w-full h-full object-contain object-top filter grayscale contrast-110"
        style={{
          maskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      />
      {show && (
        <img
          src="/portrait-cutout.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain object-top pointer-events-none transition-opacity duration-300"
          style={{
            maskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%), linear-gradient(to bottom, black 80%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 120px at ${pos.x}px ${pos.y}px, black 30%, transparent 100%), linear-gradient(to bottom, black 80%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
};

export const PortraitParticleCanvas = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef({ x: 0.5, y: 0.5 });
  const strengthRef = useRef(0);
  const [useWebGL, setUseWebGL] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowEnd = navigator.hardwareConcurrency <= 2;
    const mobile = window.innerWidth < 768;
    if (reduced || (lowEnd && mobile)) setUseWebGL(false);
  }, []);

  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    cursorRef.current = {
      x: (clientX - r.left) / r.width,
      y: 1 - (clientY - r.top) / r.height,
    };
    strengthRef.current = 1.0;
  };

  const handleLeave = () => {
    strengthRef.current = 0.0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleLeave}
      onTouchMove={(e) => { e.preventDefault(); if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchEnd={handleLeave}
      className="relative w-full h-full select-none"
      style={{ touchAction: "none" }}
    >
      {useWebGL ? (
        <Suspense fallback={<FallbackPortrait containerRef={containerRef} />}>
          <Canvas
            camera={{ position: [0, -0.08, 3.15], fov: 48 }}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            className="w-full h-full"
            style={{
              maskImage: "linear-gradient(to bottom, black 84%, transparent 100%), linear-gradient(to right, black 95%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 84%, transparent 100%), linear-gradient(to right, black 95%, transparent 100%)",
            }}
          >
            <PortraitMesh cursor={cursorRef} strength={strengthRef} />
          </Canvas>
        </Suspense>
      ) : (
        <FallbackPortrait containerRef={containerRef} />
      )}
    </div>
  );
};
