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
 * Renders 3D architectural floor plans, elevation grids, and CAD construction blueprints
 * directly in the Three.js scene, matching the floor plans & grid cards in the reference video.
 */
export const BlueprintFloorPlan: React.FC<BlueprintFloorPlanProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  variant = 'architectural-plan',
}) => {
  const { outerFrame, innerLines, gridLines } = useMemo(() => {
    const w = 4.6 * scale;
    const h = 3.2 * scale;
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
    const cols = variant === 'grid-matrix' ? 14 : 8;
    const rows = variant === 'grid-matrix' ? 10 : 6;

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
      // Interior architectural room partitions, doorways, and structural columns
      inner.push(
        [
          [-hw * 0.85, -hh * 0.82, 0.01],
          [hw * 0.85, -hh * 0.82, 0.01],
          [hw * 0.85, hh * 0.82, 0.01],
          [-hw * 0.85, hh * 0.82, 0.01],
          [-hw * 0.85, -hh * 0.82, 0.01],
        ],
        [
          [-hw * 0.2, -hh * 0.82, 0.01],
          [-hw * 0.2, hh * 0.82, 0.01],
        ],
        [
          [hw * 0.32, -hh * 0.82, 0.01],
          [hw * 0.32, hh * 0.35, 0.01],
        ],
        [
          [-hw * 0.85, hh * 0.12, 0.01],
          [hw * 0.85, hh * 0.12, 0.01],
        ],
        [
          [-hw * 0.85, -hh * 0.32, 0.01],
          [-hw * 0.2, -hh * 0.32, 0.01],
        ]
      );
    } else if (variant === 'section-elevation') {
      // Structural elevation truss and datum diagonals
      inner.push(
        [
          [-hw, -hh, 0.01],
          [hw, hh, 0.01],
        ],
        [
          [-hw, hh * 0.4, 0.01],
          [hw, hh * 0.4, 0.01],
        ],
        [
          [-hw * 0.5, -hh, 0.01],
          [0, hh * 0.4, 0.01],
          [hw * 0.5, -hh, 0.01],
        ]
      );
    }

    return { outerFrame: outer, innerLines: inner, gridLines: grid };
  }, [scale, variant]);

  return (
    <group position={position} rotation={new THREE.Euler(...rotation)}>
      {/* Paper backing plane */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[4.6 * scale, 3.2 * scale]} />
        <meshBasicMaterial
          color="#EFECE6"
          transparent
          opacity={0.76}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Fine grid lines */}
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

      {/* Inner architectural walls / structural partitions */}
      {innerLines.map((pts, idx) => (
        <Line
          key={`inner-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={1.25}
          transparent
          opacity={0.52}
        />
      ))}

      {/* Outer crisp border */}
      <Line
        points={outerFrame}
        color="#141413"
        lineWidth={1.1}
        transparent
        opacity={0.42}
      />
    </group>
  );
};

export const BlueprintLayer: React.FC = () => {
  const plans = useMemo(
    () => [
      // Chapter 00 & 01 architectural floor plans and grid sheets (matching 00:00–00:02 of reference video)
      {
        pos: [2.8, 1.3, -2.5] as [number, number, number],
        rot: [0, -0.08, 0] as [number, number, number],
        scale: 0.95,
        variant: 'grid-matrix' as const,
      },
      {
        pos: [5.4, -0.6, -6.5] as [number, number, number],
        rot: [0, -0.12, 0] as [number, number, number],
        scale: 1.05,
        variant: 'architectural-plan' as const,
      },
      {
        pos: [-5.8, 2.2, -10.0] as [number, number, number],
        rot: [0, 0.08, 0] as [number, number, number],
        scale: 0.9,
        variant: 'section-elevation' as const,
      },
      // Chapter 01 Identity planes
      {
        pos: [4.2, 1.6, -26.0] as [number, number, number],
        rot: [0, -0.15, 0] as [number, number, number],
        scale: 1.1,
        variant: 'architectural-plan' as const,
      },
      {
        pos: [-6.4, -1.8, -31.0] as [number, number, number],
        rot: [0, 0.1, 0] as [number, number, number],
        scale: 0.85,
        variant: 'grid-matrix' as const,
      },
      // Chapter 02 Experience planes
      {
        pos: [-6.2, 1.8, -54.0] as [number, number, number],
        rot: [0, 0.14, 0] as [number, number, number],
        scale: 1.15,
        variant: 'section-elevation' as const,
      },
      {
        pos: [6.4, -0.4, -68.0] as [number, number, number],
        rot: [0, -0.14, 0] as [number, number, number],
        scale: 1.1,
        variant: 'architectural-plan' as const,
      },
      {
        pos: [-5.6, -1.5, -82.0] as [number, number, number],
        rot: [0, 0.12, 0] as [number, number, number],
        scale: 1.0,
        variant: 'grid-matrix' as const,
      },
      // Chapter 03 Projects planes
      {
        pos: [-6.0, 1.4, -100.0] as [number, number, number],
        rot: [0, 0.16, 0] as [number, number, number],
        scale: 1.2,
        variant: 'architectural-plan' as const,
      },
      {
        pos: [6.2, 0.8, -116.0] as [number, number, number],
        rot: [0, -0.16, 0] as [number, number, number],
        scale: 1.15,
        variant: 'grid-matrix' as const,
      },
      {
        pos: [-5.8, -1.1, -132.0] as [number, number, number],
        rot: [0, 0.14, 0] as [number, number, number],
        scale: 1.1,
        variant: 'section-elevation' as const,
      },
      // Chapter 04 Technical Universe planes
      {
        pos: [-6.8, 2.4, -148.0] as [number, number, number],
        rot: [0, 0.1, 0] as [number, number, number],
        scale: 1.2,
        variant: 'grid-matrix' as const,
      },
      {
        pos: [6.8, -2.0, -154.0] as [number, number, number],
        rot: [0, -0.1, 0] as [number, number, number],
        scale: 1.2,
        variant: 'architectural-plan' as const,
      },
      // Chapter 05 & 06
      {
        pos: [-5.4, 1.8, -170.0] as [number, number, number],
        rot: [0, 0.12, 0] as [number, number, number],
        scale: 1.0,
        variant: 'section-elevation' as const,
      },
      {
        pos: [0.0, 0.0, -195.0] as [number, number, number],
        rot: [0, 0, 0] as [number, number, number],
        scale: 1.6,
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
