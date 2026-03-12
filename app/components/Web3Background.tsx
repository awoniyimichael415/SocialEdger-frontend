"use client";

import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

/* Soft glowing sphere */
function GlowSphere() {
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <mesh position={[3, 2, -4]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial
          color="#6d5cff"
          emissive="#6d5cff"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
    </Float>
  );
}

/* Gradient donut ring */
function NeonDonut() {
  const material = new THREE.MeshStandardMaterial({
    color: "#9b5cff",
    emissive: "#4fd1ff",
    emissiveIntensity: 1.2,
    metalness: 0.8,
    roughness: 0.2,
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[-1.5, -2.5, -3]} material={material}>
        <torusGeometry args={[1.2, 0.35, 64, 200]} />
      </mesh>
    </Float>
  );
}

export default function Web3Background() {
  return (
    <div className="fixed inset-0 -z-10">

      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} />

        {/* Space particles */}
        <Stars
          radius={120}
          depth={80}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Shapes */}
        <GlowSphere />
        <NeonDonut />

      </Canvas>

    </div>
  );
}