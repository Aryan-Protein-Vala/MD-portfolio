'use client';

import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';

/**
 * Renders the continuous 3D architectural construction lines, diagonal perspective vectors,
 * horizontal station datum lines, and small black registration rectangles across the entire
 * laid-out drafting map (from Y = +8 down to Y = -86).
 */
export const TechnicalLines: React.FC = () => {
  const { primaryDiagonals, verticalColumns, horizontalDatums, accentBlocks } =
    useMemo(() => {
      // Long diagonal architectural axes cutting across the drafting board (matching 00:00–00:03 of reference video)
      const diagonals: [number, number, number][][] = [
        [
          [-10, 6, 1.5],
          [11, -12, -1.5],
        ],
        [
          [6, 7, 1.0],
          [-9, -14, -1.5],
        ],
        [
          [-9, -6, 0.5],
          [10, -28, -1.8],
        ],
        [
          [9, -18, 0.5],
          [-10, -42, -1.8],
        ],
        [
          [-9, -32, 0.5],
          [10, -56, -1.8],
        ],
        [
          [9, -46, 0.5],
          [-10, -70, -1.8],
        ],
        [
          [-9, -60, 0.5],
          [10, -84, -1.8],
        ],
      ];

      // Continuous vertical plumb lines running the full length of the architectural map
      const verticals: [number, number, number][][] = [
        [
          [-6.2, 8, -1.0],
          [-6.2, -86, -1.0],
        ],
        [
          [-2.4, 8, -1.2],
          [-2.4, -86, -1.2],
        ],
        [
          [2.4, 8, -1.2],
          [2.4, -86, -1.2],
        ],
        [
          [6.2, 8, -1.0],
          [6.2, -86, -1.0],
        ],
      ];

      // Horizontal station datum lines every 4 units down the map
      const horizontals: [number, number, number][][] = [];
      for (let y = 4; y >= -84; y -= 4) {
        horizontals.push([
          [-12, y, -1.2],
          [12, y, -1.2],
        ]);
      }

      // Small solid black registration rectangles scattered along the construction lines (matching reference video)
      const blocks: { pos: [number, number, number]; size: [number, number] }[] = [];
      for (let i = 0; i < 12; i++) {
        const y = 1.5 - i * 7.2;
        blocks.push(
          { pos: [-4.6, y, 0.5], size: [0.12, 0.28] },
          { pos: [4.8, y - 2.4, 0.2], size: [0.1, 0.42] },
          { pos: [-1.8, y - 3.8, 0.4], size: [0.22, 0.1] }
        );
      }

      return {
        primaryDiagonals: diagonals,
        verticalColumns: verticals,
        horizontalDatums: horizontals,
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
          lineWidth={1.25}
          transparent
          opacity={0.42}
        />
      ))}

      {verticalColumns.map((pts, idx) => (
        <Line
          key={`vert-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={0.7}
          transparent
          opacity={0.16}
        />
      ))}

      {horizontalDatums.map((pts, idx) => (
        <Line
          key={`horiz-${idx}`}
          points={pts}
          color="#141413"
          lineWidth={0.6}
          transparent
          opacity={0.14}
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
