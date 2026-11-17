'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

interface GlassPanel3DProps {
  position: [number, number, number];
  size?: [number, number, number];
  rotation?: [number, number, number];
  tint?: string;
  opacity?: number;
  floatIntensity?: number;
  reducedMotion?: boolean;
}

/**
 * 3D Translucent Architectural Acrylic/Glass Slab with refractive bevel edge highlights.
 * Directly reproduces the floating rectangular glass panel with subtle cyan/emerald refraction edge
 * seen at 00:00–00:02 of the supplied reference video.
 */
export const GlassPanel: React.FC<GlassPanel3DProps> = ({
  position,
  size = [3.6, 2.2, 0.08],
  rotation = [0, 0, 0],
  tint = '#F4F2EC',
  opacity = 0.34,
  floatIntensity = 1.0,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [w, h, d] = size;

  useFrame(({ clock }) => {
    if (!groupRef.current || reducedMotion || floatIntensity === 0) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y =
      position[1] + Math.sin(t * 0.8 + position[2] * 0.1) * 0.08 * floatIntensity;
    groupRef.current.rotation.y =
      rotation[1] + Math.cos(t * 0.5 + position[0]) * 0.025 * floatIntensity;
  });

  const hw = w / 2;
  const hh = h / 2;
  const borderPts: [number, number, number][] = [
    [-hw, -hh, d / 2 + 0.002],
    [hw, -hh, d / 2 + 0.002],
    [hw, hh, d / 2 + 0.002],
    [-hw, hh, d / 2 + 0.002],
    [-hw, -hh, d / 2 + 0.002],
  ];

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={new THREE.Euler(...rotation)}
    >
      {/* Translucent glass body */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshPhysicalMaterial
          color={tint}
          transparent
          opacity={opacity}
          roughness={0.18}
          metalness={0.02}
          reflectivity={0.65}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Subtle refractive glass bottom-edge tint strip (matching the glass edge in 00:01–00:02 of reference video) */}
      <mesh position={[0, -hh + 0.035, d / 2 + 0.001]}>
        <planeGeometry args={[w * 0.98, 0.06]} />
        <meshBasicMaterial
          color="#5F8D8B"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </mesh>

      {/* Crisp hairline architectural frame */}
      <Line
        points={borderPts}
        color="#141413"
        lineWidth={0.9}
        transparent
        opacity={0.36}
      />
    </group>
  );
};
