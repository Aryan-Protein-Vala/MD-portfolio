'use client';

import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';

/**
 * Renders the continuous 3D architectural construction lines, diagonal perspective vectors,
 * and spatial datum axes connecting all chapters from Z=+16 to Z=-200.
 * Matches the bold diagonal construction lines and vertical plumb lines in the reference video.
 */
export const TechnicalLines: React.FC = () => {
  const { primaryDiagonals, corridorRails, datumCrossbars, accentBlocks } =
    useMemo(() => {
      const diagonals: [number, number, number][][] = [
        // Signature diagonal perspective axes cutting across the composition (matching 00:00–00:03)
        [
          [-14, -8, 6],
          [14, 9, -24],
        ],
        [
          [-12, 8, 4],
          [16, -7, -28],
        ],
        [
          [4, 10, 8],
          [12, -9, -18],
        ],
        // Deep corridor diagonal trajectories connecting chapters
        [
          [-12, 6, -15],
          [12, -5, -58],
        ],
        [
          [12, 5, -45],
          [-12, -6, -88],
        ],
        [
          [-11, 6, -82],
          [11, -5, -135],
        ],
        [
          [12, 6, -128],
          [-12, -6, -175],
        ],
        [
          [-10, -5, -160],
          [10, 5, -198],
        ],
      ];

      // Continuous Z-axis architectural datum rails
      const rails: [number, number, number][][] = [
        [
          [-8.5, 4.5, 16],
          [-8.5, 4.5, -200],
        ],
        [
          [8.5, 4.5, 16],
          [8.5, 4.5, -200],
        ],
        [
          [-8.5, -4.5, 16],
          [-8.5, -4.5, -200],
        ],
        [
          [8.5, -4.5, 16],
          [8.5, -4.5, -200],
        ],
        [
          [0, -4.5, 16],
          [0, -4.5, -200],
        ],
      ];

      // Crossbar frames every 14 units in Z
      const crossbars: [number, number, number][][] = [];
      for (let z = 10; z >= -196; z -= 14) {
        crossbars.push(
          [
            [-11, 0, z],
            [11, 0, z],
          ],
          [
            [0, -6.5, z],
            [0, 6.5, z],
          ],
          [
            [-8.5, -4.5, z],
            [8.5, -4.5, z],
            [8.5, 4.5, z],
            [-8.5, 4.5, z],
            [-8.5, -4.5, z],
          ]
        );
      }

      // Small black architectural registration rectangles scattered in 3D space (matching reference video markers)
      const blocks: { pos: [number, number, number]; size: [number, number] }[] = [
        { pos: [-4.8, 1.3, 2.0], size: [0.16, 0.28] },
        { pos: [4.6, 0.4, -1.5], size: [0.14, 0.45] },
        { pos: [-3.2, -1.4, -18.0], size: [0.22, 0.14] },
        { pos: [3.8, 1.9, -24.0], size: [0.15, 0.35] },
        { pos: [-4.5, 2.1, -48.0], size: [0.18, 0.3] },
        { pos: [4.9, -1.2, -62.0], size: [0.24, 0.16] },
        { pos: [-3.9, 1.5, -94.0], size: [0.16, 0.36] },
        { pos: [4.4, -1.4, -110.0], size: [0.2, 0.28] },
        { pos: [-4.2, 1.8, -142.0], size: [0.18, 0.32] },
        { pos: [3.6, -1.5, -166.0], size: [0.22, 0.18] },
      ];

      return {
        primaryDiagonals: diagonals,
        corridorRails: rails,
        datumCrossbars: crossbars,
        accentBlocks: blocks,
      };
    }, []);

  return (
    <group name="technical-construction-lines">
      {primaryDiagonals.map((pts, idx) => (
        <Line
          key={`diag-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={1.35}
          transparent
          opacity={0.48}
        />
      ))}

      {corridorRails.map((pts, idx) => (
        <Line
          key={`rail-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={0.75}
          transparent
          opacity={0.18}
        />
      ))}

      {datumCrossbars.map((pts, idx) => (
        <Line
          key={`cross-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={0.6}
          transparent
          opacity={0.13}
        />
      ))}

      {accentBlocks.map((b, idx) => (
        <mesh key={`blk-${idx}`} position={b.pos}>
          <planeGeometry args={b.size} />
          <meshBasicMaterial color="#141413" />
        </mesh>
      ))}
    </group>
  );
};
