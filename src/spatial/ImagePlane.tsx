'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';

interface ImagePlaneProps {
  position: [number, number, number];
  size?: [number, number];
  rotation?: [number, number, number];
  variant?: 'brutalist-arch' | 'portrait-monolith' | 'telemetry-grid' | 'ble-nodes';
  reducedMotion?: boolean;
}

/**
 * Generates a crisp procedural architectural study texture on an HTML5 Canvas
 * so floating 3D image planes look like genuine monochrome architectural photographs
 * and technical plates (like the cantilevered concrete pavilion photo at 00:00 of the reference video)
 * without fabricating product screenshots or relying on external image CDNs.
 */
function createProceduralArchTexture(variant: string): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Warm archival paper base
  ctx.fillStyle = '#E5E0D6';
  ctx.fillRect(0, 0, 512, 360);

  // Subtle sky gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 260);
  grad.addColorStop(0, '#CFCAC0');
  grad.addColorStop(1, '#E8E4DC');
  ctx.fillStyle = grad;
  ctx.fillRect(16, 16, 480, 328);

  if (variant === 'brutalist-arch') {
    // Cantilevered brutalist concrete architecture study (inspired by 00:00 frame of reference video)
    ctx.fillStyle = '#B8B3A8';
    ctx.beginPath();
    ctx.moveTo(60, 260);
    ctx.lineTo(440, 260);
    ctx.lineTo(470, 320);
    ctx.lineTo(30, 320);
    ctx.closePath();
    ctx.fill();

    // Shadowed under-structure
    ctx.fillStyle = '#383734';
    ctx.fillRect(150, 175, 195, 85);

    // Sunlit cantilevered concrete volume
    ctx.fillStyle = '#DFDBD2';
    ctx.beginPath();
    ctx.moveTo(95, 105);
    ctx.lineTo(320, 82);
    ctx.lineTo(320, 185);
    ctx.lineTo(95, 170);
    ctx.closePath();
    ctx.fill();

    // Side structural wing in medium shadow
    ctx.fillStyle = '#7E7A72';
    ctx.beginPath();
    ctx.moveTo(320, 82);
    ctx.lineTo(435, 138);
    ctx.lineTo(435, 255);
    ctx.lineTo(320, 255);
    ctx.closePath();
    ctx.fill();

    // Deep recessed aperture
    ctx.fillStyle = '#1D1D1B';
    ctx.fillRect(175, 128, 95, 38);
  } else if (variant === 'portrait-monolith') {
    // Editorial architectural silhouette placeholder for Chapter 01 Identity
    ctx.strokeStyle = 'rgba(20,20,19,0.22)';
    ctx.lineWidth = 1;
    for (let x = 24; x < 488; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 16);
      ctx.lineTo(x, 344);
      ctx.stroke();
    }
    for (let y = 24; y < 344; y += 24) {
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(496, y);
      ctx.stroke();
    }
    // Geometric proportion circles
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(256, 150, 68, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#2B2A28';
    ctx.fillRect(188, 224, 136, 95);
  } else {
    // Technical telemetry / nodal diagram plate
    ctx.strokeStyle = '#141413';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 48, 150, 110);
    ctx.strokeRect(310, 180, 150, 110);
    ctx.beginPath();
    ctx.moveTo(198, 103);
    ctx.lineTo(310, 235);
    ctx.stroke();
  }

  // Technical registration frame and label
  ctx.strokeStyle = '#141413';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(16, 16, 480, 328);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const ImagePlane: React.FC<ImagePlaneProps> = ({
  position,
  size = [3.4, 2.3],
  rotation = [0, 0, 0],
  variant = 'brutalist-arch',
  reducedMotion = false,
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => createProceduralArchTexture(variant), [variant]);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.65 + position[0]) * 0.06;
  });

  const [w, h] = size;
  const hw = w / 2;
  const hh = h / 2;
  const framePts: [number, number, number][] = [
    [-hw, -hh, 0.01],
    [hw, -hh, 0.01],
    [hw, hh, 0.01],
    [-hw, hh, 0.01],
    [-hw, -hh, 0.01],
  ];

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={new THREE.Euler(...rotation)}
    >
      <mesh>
        <planeGeometry args={[w, h]} />
        {texture ? (
          <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
        ) : (
          <meshBasicMaterial color="#DCD7CD" side={THREE.DoubleSide} />
        )}
      </mesh>
      <Line
        points={framePts}
        color="#141413"
        lineWidth={1.1}
        transparent
        opacity={0.55}
      />
    </group>
  );
};
