'use client';

import React from 'react';
import { skillsData, skillsDisclaimer } from '@/data/skills';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';
import { Line } from '@react-three/drei';

interface TechnicalSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onNextChapter: () => void;
}

/**
 * 3D Constellation & Architectural Planes for Chapter 04 (The Technical Universe)
 * Renders 4 staggered spatial planes at Z=-144, -148, -152, -156 connected by vector lines.
 */
export const TechnicalScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-04-technical-3d">
      {skillsData.map((group, idx) => (
        <GlassPanel
          key={group.id}
          position={group.spatialCenter}
          size={[4.6, 2.6, 0.06]}
          rotation={[0, idx % 2 === 0 ? 0.1 : -0.1, 0]}
          opacity={0.3}
          reducedMotion={reducedMotion}
        />
      ))}

      {/* Inter-plane architectural connection vectors */}
      <Line
        points={[
          [-5.5, 2.0, -144],
          [5.5, 1.6, -148],
          [-5.0, -1.8, -152],
          [5.2, -2.0, -156],
          [-5.5, 2.0, -144],
        ]}
        color="#141413"
        lineWidth={1.2}
        transparent
        opacity={0.42}
      />
    </group>
  );
};

export const TechnicalScene: React.FC<TechnicalSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onNextChapter,
}) => {
  const titleStyle = computeKineticTitleStyle(
    masterProgress,
    0.87,
    0.09,
    -6,
    -4,
    reducedMotion
  );

  return (
    <SpatialPanel
      id="chapter-04"
      ariaLabel="Chapter 04: The Technical Universe"
      anchorProgress={0.87}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.08}
      entryDirection="top"
      parallaxDepth={1.05}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1440px] h-full px-5 sm:px-10 md:px-16 pt-24 pb-14 flex flex-col justify-between">
        {/* Top Datum Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2">
          <div className="flex items-center gap-3">
            <span className="reg-crosshair" />
            <span className="type-tech-label text-ink font-semibold">
              AXIS.04 // SPATIAL TECHNICAL TOPOLOGY
            </span>
          </div>
          <span className="type-tech-micro">
            PLANE Z: -144.0m TO -156.0m // THE TOOLS BEHIND THE WORK
          </span>
        </div>

        {/* Title & Architectural Note */}
        <div className="my-auto space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div style={titleStyle}>
              <div className="type-tech-label">
                04 / THE TOOLS BEHIND THE WORK
              </div>
              <h2 className="type-chapter-index mt-0.5">
                THE TECHNICAL UNIVERSE
              </h2>
            </div>

            <p className="type-body-copy text-ink-secondary max-w-xl">
              {skillsDisclaimer}
            </p>
          </div>

          {/* 4 Staggered Spatial Planes with Interconnected Architectural Lines */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {/* Background SVG connector vectors across the 4 planes */}
            <svg
              viewBox="0 0 1000 500"
              className="pointer-events-none absolute inset-0 w-full h-full stroke-ink/20 fill-none hidden md:block"
              aria-hidden="true"
            >
              <line x1="250" y1="120" x2="750" y2="140" strokeWidth="1" />
              <line x1="750" y1="140" x2="250" y2="380" strokeWidth="1" />
              <line x1="250" y1="380" x2="750" y2="390" strokeWidth="1" />
              <line
                x1="250"
                y1="120"
                x2="750"
                y2="390"
                strokeWidth="0.75"
                strokeDasharray="4 4"
              />
            </svg>

            {skillsData.map((group, idx) => (
              <div
                key={group.id}
                style={{
                  transform: reducedMotion
                    ? 'none'
                    : `translate3d(0px, ${(idx % 2 === 1 ? 10 : -6)}px, ${(idx * -12)}px)`,
                }}
                className="spatial-glass-panel p-5 blueprint-subgrid relative z-10"
              >
                <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-3">
                  <div>
                    <div className="type-tech-micro text-ink font-semibold">
                      {group.code}
                    </div>
                    <h3 className="font-display text-lg font-bold text-ink tracking-tight">
                      {group.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-ink/25 bg-ivory">
                    Z: {group.planeDepth}m
                  </span>
                </div>

                <p className="font-mono text-[11px] text-ink-muted mb-3">
                  {group.subtitle}
                </p>

                {/* Spatial Technical Nodes */}
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-ink/30 bg-ivory/90"
                    >
                      <span className="w-1.5 h-1.5 bg-ink inline-block" />
                      <span className="font-mono text-xs font-semibold text-ink">
                        {item.name}
                      </span>
                      <span className="font-mono text-[9px] tracking-wider text-ink-muted border-l border-ink/20 pl-1.5">
                        {item.annotation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onNextChapter}
              className="arch-interactive-btn"
            >
              <span>05 / BEYOND THE SCREEN</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Architectural Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-ink/15 pt-2 type-tech-micro">
          <span>04 SPATIAL PLANES // 32 INTERCONNECTED NODES</span>
          <span>EDITABLE IN SRC/DATA/SKILLS.TS</span>
        </div>
      </div>
    </SpatialPanel>
  );
};
