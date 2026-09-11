"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Capa ambiental muy discreta detrás del hero: una nube de puntos que
 * deriva lentamente, como polvo suspendido en un almacén. No es
 * decoración gratuita — refuerza "espacio físico, inventario en
 * movimiento" sin competir con la tipografía ni con la foto.
 *
 * Se desmonta entero con prefers-reduced-motion (el padre decide si
 * renderiza este componente) y usa muy pocos puntos + sin postprocesado
 * para no pesar en el hero, que es la sección más cara de la página.
 */
function DustField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 220;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d8e7f5"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true, antialias: false }}
      dpr={[1, 1.5]}
    >
      <DustField />
    </Canvas>
  );
}
