"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function MorphingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth follow toward target rotation (mouse-driven)
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    targetRotation.current = {
      x: e.uv ? (e.uv.y - 0.5) * 0.4 : 0,
      y: e.uv ? (e.uv.x - 0.5) * 0.4 : 0,
    };
  };

  const handlePointerLeave = () => {
    targetRotation.current = { x: 0, y: 0 };
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.4, 4]} />
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.42}
            speed={1.6}
            roughness={0.15}
            metalness={0.65}
          />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[2.4, 1, -1]}>
          <torusGeometry args={[0.32, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#60A5FA"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh position={[-2.2, -0.8, -0.5]}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial
            color="#1E40AF"
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#60A5FA" />
      <Suspense fallback={null}>
        <MorphingShape />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
