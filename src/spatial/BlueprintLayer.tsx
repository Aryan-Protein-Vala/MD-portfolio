'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface BlueprintFloorPlanProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  variant?: 'architectural-plan' | 'grid-matrix' | 'section-elevation';
}

/**
 * 3D Architectural Floor Plans, Millimeter Grid Sheets & Section Elevations
 * Laid out flat/angled along the continuous vertical & diagonal drafting map (Y: +3 to -82).
 */
export const BlueprintFloorPlan: React.FC<BlueprintFloorPlanProps> = ({
  position,
  rotation = [-0.14, 0, -0.02],
  scale = 1,
  variant = 'architectural-plan',
}) => {
  const { outerFrame, innerLines, gridLines } = useMemo(() => {
    const w = 4.4 * scale;
    const h = 3.1 * scale;
    const hw = w / 2;
    const hh = h / 2;

    const outer: [number, number, number][] = [
      [-hw, -hh, 0],
      [hw, -hh, 0],
      [hw, hh, 0],
      [-hw, hh, 0],
      [-hw, -hh, 0],
    ];

    const grid: [number, number, number][][] = [];
    const cols = variant === 'grid-matrix' ? 16 : 8;
    const rows = variant === 'grid-matrix' ? 12 : 6;

    for (let i = 1; i < cols; i++) {
      const x = -hw + (w / cols) * i;
      grid.push([
        [x, -hh, 0],
        [x, hh, 0],
      ]);
    }
    for (let j = 1; j < rows; j++) {
      const y = -hh + (h / rows) * j;
      grid.push([
        [-hw, y, 0],
        [hw, y, 0],
      ]);
    }

    const inner: [number, number, number][][] = [];
    if (variant === 'architectural-plan') {
      // Detailed architectural floor plan walls, doorways & room divisions (matching 00:01–00:02 right side of reference video)
      inner.push(
        [
          [-hw * 0.84, -hh * 0.8, 0.01],
          [hw * 0.84, -hh * 0.8, 0.01],
          [hw * 0.84, hh * 0.8, 0.01],
          [-hw * 0.84, hh * 0.8, 0.01],
          [-hw * 0.84, -hh * 0.8, 0.01],
        ],
        [
          [-hw * 0.18, -hh * 0.8, 0.01],
          [-hw * 0.18, hh * 0.8, 0.01],
        ],
        [
          [hw * 0.3, -hh * 0.8, 0.01],
          [hw * 0.3, hh * 0.35, 0.01],
        ],
        [
          [-hw * 0.84, hh * 0.15, 0.01],
          [hw * 0.84, hh * 0.15, 0.01],
        ],
        [
          [-hw * 0.84, -hh * 0.3, 0.01],
          [-hw * 0.18, -hh * 0.3, 0.01],
        ],
        [
          [hw * 0.3, -hh * 0.25, 0.01],
          [hw * 0.84, -hh * 0.25, 0.01],
        ]
      );
    } else if (variant === 'section-elevation') {
      inner.push(
        [
          [-hw, -hh, 0.01],
          [hw, hh, 0.01],
        ],
        [
          [-hw, hh * 0.35, 0.01],
          [hw, hh * 0.35, 0.01],
        ],
        [
          [-hw * 0.45, -hh, 0.01],
          [0, hh * 0.35, 0.01],
          [hw * 0.45, -hh, 0.01],
        ]
      );
    }

    return { outerFrame: outer, innerLines: inner, gridLines: grid };
  }, [scale, variant]);

  return (
    <group position={position} rotation={new THREE.Euler(...rotation)}>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[4.4 * scale, 3.1 * scale]} />
        <meshBasicMaterial
          color="#EAE5DC"
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>

      {gridLines.map((pts, idx) => (
        <Line
          key={`grid-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={0.5}
          transparent
          opacity={0.14}
        />
      ))}

      {innerLines.map((pts, idx) => (
        <Line
          key={`inner-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={1.15}
          transparent
          opacity={0.48}
        />
      ))}

      <Line
        points={outerFrame}
        color="#141413"
        lineWidth={1.0}
        transparent
        opacity={0.38}
      />
    </group>
  );
};

export const BlueprintLayer: React.FC = () => {
  const plans = useMemo(
    () => [
      // Stop 00: Intro (millimeter grid sheet top-right + architectural floor plan bottom-right, matching 00:00–00:01)
      {
        pos: [2.1, 1.5, -0.8] as [number, number, number],
        rot: [-0.14, -0.04, -0.015] as [number, number, number],
        scale: 0.78,
        variant: 'grid-matrix' as const,
      },
      {
        pos: [4.5, -2.8, -1.5] as [number, number, number],
        rot: [-0.14, -0.05, -0.02] as [number, number, number],
        scale: 0.88,
        variant: 'architectural-plan' as const,
      },
      // Stop 01: Identity (Y = -7.5)
      {
        pos: [4.4, -6.8, -2.2] as [number, number, number],
        rot: [-0.14, -0.04, -0.015] as [number, number, number],
        scale: 0.9,
        variant: 'architectural-plan' as const,
      },
      {
        pos: [-4.6, -9.2, -2.8] as [number, number, number],
        rot: [-0.14, 0.04, 0.015] as [number, number, number],
        scale: 0.76,
        variant: 'grid-matrix' as const,
      },
      // Stop 02.A: Cinntra (Y = -15.5)
      {
        pos: [4.2, -14.8, -2.2] as [number, number, number],
        rot: [-0.14, -0.05, -0.02] as [number, number, number],
        scale: 0.88,
        variant: 'section-elevation' as const,
      },
      // Stop 02.B: Niswa (Y = -23.5)
      {
        pos: [-4.2, -22.8, -2.4] as [number, number, number],
        rot: [-0.14, 0.05, 0.02] as [number, number, number],
        scale: 0.9,
        variant: 'architectural-plan' as const,
      },
      // Stop 02.C: Sudarshana (Y = -31.5)
      {
        pos: [4.4, -30.8, -2.2] as [number, number, number],
        rot: [-0.14, -0.04, -0.015] as [number, number, number],
        scale: 0.86,
        variant: 'grid-matrix' as const,
      },
      // Stop 03.A: Prometheus (Y = -39.5)
      {
        pos: [-4.5, -38.8, -2.5] as [number, number, number],
        rot: [-0.14, 0.05, 0.015] as [number, number, number],
        scale: 0.92,
        variant: 'architectural-plan' as const,
      },
      // Stop 03.B: Aether (Y = -47.5)
      {
        pos: [4.3, -46.8, -2.6] as [number, number, number],
        rot: [-0.14, -0.04, -0.02] as [number, number, number],
        scale: 0.9,
        variant: 'grid-matrix' as const,
      },
      // Stop 03.C: Astral Network (Y = -55.5)
      {
        pos: [-4.4, -54.8, -2.4] as [number, number, number],
        rot: [-0.14, 0.04, 0.015] as [number, number, number],
        scale: 0.88,
        variant: 'section-elevation' as const,
      },
      // Stop 04: Technical Map (Y = -63.5)
      {
        pos: [4.6, -62.8, -2.6] as [number, number, number],
        rot: [-0.14, -0.03, -0.01] as [number, number, number],
        scale: 0.95,
        variant: 'grid-matrix' as const,
      },
      // Stop 05: Beyond the Screen (Y = -71.5)
      {
        pos: [-4.4, -70.8, -2.4] as [number, number, number],
        rot: [-0.14, 0.04, 0.015] as [number, number, number],
        scale: 0.88,
        variant: 'architectural-plan' as const,
      },
      // Stop 06: Contact (Y = -79.2)
      {
        pos: [3.8, -78.8, -2.5] as [number, number, number],
        rot: [-0.12, -0.02, 0] as [number, number, number],
        scale: 1.0,
        variant: 'architectural-plan' as const,
      },
    ],
    []
  );

  return (
    <group name="blueprint-layer">
      {plans.map((p, idx) => (
        <BlueprintFloorPlan
          key={`bp-${idx}`}
          position={p.pos}
          rotation={p.rot}
          scale={p.scale}
          variant={p.variant}
        />
      ))}
    </group>
  );
};
