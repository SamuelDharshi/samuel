"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, Environment } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ACCENT = "#ffffff";

// Pointer tracked on window (the canvas layer ignores pointer events so the page stays clickable)
const mouse = { x: 0, y: 0 };

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/** A procedural robotics "agent": head, visor, torso, floating arms and orbital rings. */
function Robot({ reduced, narrow }: { reduced: boolean; narrow: boolean }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const eye = useRef<THREE.MeshStandardMaterial>(null);
  const smooth = useRef(0);

  useEffect(() => {
    const on = (e: PointerEvent) => { mouse.x = (e.clientX / window.innerWidth) * 2 - 1; mouse.y = -((e.clientY / window.innerHeight) * 2 - 1); };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const target = reduced ? 0 : scrollProgress();
    smooth.current = THREE.MathUtils.damp(smooth.current, target, 4, dt);
    const p = smooth.current;

    if (root.current) {
      // Choreography: right of hero -> left in about/skills -> centre in projects -> right again at contact.
      const side = narrow ? 0 : Math.cos(p * Math.PI * 3) * state.viewport.width * 0.22;
      root.current.position.x = THREE.MathUtils.damp(root.current.position.x, side, 3, dt);
      root.current.position.y = (narrow ? 0.6 : -0.45) + (narrow ? 0 : Math.sin(p * Math.PI * 2) * 0.35);
      root.current.rotation.y = p * Math.PI * 4 + (reduced ? 0 : mouse.x * 0.3);
      const s = narrow ? 0.55 : 1 - Math.sin(p * Math.PI) * 0.15;
      root.current.scale.setScalar(s);
    }
    if (head.current) {
      const mx = reduced ? 0 : mouse.x, my = reduced ? 0 : mouse.y;
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, mx * 0.9, 6, dt);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -my * 0.5, 6, dt);
      head.current.rotation.z = THREE.MathUtils.damp(head.current.rotation.z, -mx * 0.12, 6, dt);
      head.current.position.x = THREE.MathUtils.damp(head.current.position.x, mx * 0.12, 6, dt);
    }
    if (armL.current) armL.current.rotation.z = 0.5 + Math.sin(t * 1.4) * 0.12;
    if (armR.current) armR.current.rotation.z = -0.5 - Math.sin(t * 1.4 + 1) * 0.12;
    if (eye.current) eye.current.emissiveIntensity = 1.6 + Math.sin(t * 3) * 0.5;
  });

  const steel = { color: "#2a312e", metalness: 0.9, roughness: 0.25 } as const;
  return (
    <group ref={root}>
      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.8}>
        <group ref={head} position={[0, 0.98, 0]}>
          <RoundedBox args={[1.3, 1.0, 1.1]} radius={0.22} smoothness={5}>
            <meshStandardMaterial {...steel} />
          </RoundedBox>
          <RoundedBox args={[1.05, 0.45, 0.1]} radius={0.12} position={[0, 0.02, 0.56]}>
            <meshStandardMaterial ref={eye} color="#f5f5f5" emissive={ACCENT} emissiveIntensity={1.8} />
          </RoundedBox>
          <mesh position={[0, 0.72, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial {...steel} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <sphereGeometry args={[0.09, 24, 24]} />
            <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2.5} />
          </mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.2, 0.2, 0.14, 24]} />
              <meshStandardMaterial {...steel} />
            </mesh>
          ))}
        </group>

        <RoundedBox args={[1.1, 1.0, 0.8]} radius={0.25} smoothness={5} position={[0, -0.1, 0]}>
          <meshStandardMaterial {...steel} />
        </RoundedBox>
        <mesh position={[0, -0.05, 0.42]}>
          <circleGeometry args={[0.16, 32]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2} />
        </mesh>

        <group ref={armL} position={[-0.85, 0.1, 0]}>
          <RoundedBox args={[0.28, 0.9, 0.28]} radius={0.12} position={[-0.1, -0.35, 0]}><meshStandardMaterial {...steel} /></RoundedBox>
        </group>
        <group ref={armR} position={[0.85, 0.1, 0]}>
          <RoundedBox args={[0.28, 0.9, 0.28]} radius={0.12} position={[0.1, -0.35, 0]}><meshStandardMaterial {...steel} /></RoundedBox>
        </group>

      </Float>
    </group>
  );
}

export default function Scene3D() {
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => { setReduced(mq.matches); setNarrow(window.innerWidth < 768); };
    upd();
    mq.addEventListener("change", upd);
    window.addEventListener("resize", upd);
    return () => { mq.removeEventListener("change", upd); window.removeEventListener("resize", upd); };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas dpr={[1, narrow ? 1 : 1.75]} camera={{ position: [0, 0.8, 7], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 5]} intensity={1.6} />
        <pointLight position={[-4, 0, 3]} intensity={12} color={ACCENT} />
        <Environment preset="studio" />
        <Robot reduced={reduced} narrow={narrow} />
        <Sparkles count={narrow ? 30 : 80} scale={[14, 9, 6]} size={2} speed={reduced ? 0 : 0.3} color="#8a8a8a" opacity={0.7} />
      </Canvas>
    </div>
  );
}
