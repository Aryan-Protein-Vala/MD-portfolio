'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';
import { ImagePlane } from '@/spatial/ImagePlane';

interface IntroSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onEnterExhibition: () => void;
}

/**
 * 3D WebGL plates for Chapter 00 (Y = 0.2):
 * Brutalist concrete pavilion architectural photo card (top-left of center) + foreground glass slab,
 * directly matching Frame 00:00 of aaa9c1aa.mp4.
 */
export const IntroScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-00-3d" position={[0, 0.2, 0]}>
      {/* Brutalist concrete study plate (top-left of center, matching 00:00 reference video) */}
      <ImagePlane
        position={[-1.5, 1.45, -0.6]}
        size={[3.2, 1.95]}
        rotation={[-0.12, 0.04, -0.01]}
        variant="brutalist-arch"
        reducedMotion={reducedMotion}
      />

      {/* Foreground translucent glass slab below main title */}
      <GlassPanel
        position={[-0.4, -2.1, 2.4]}
        size={[3.5, 1.8, 0.08]}
        rotation={[-0.1, 0.02, -0.01]}
        opacity={0.32}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export const IntroScene: React.FC<IntroSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onEnterExhibition,
}) => {
  const { name, positioning, intro } = profileData;

  return (
    <SpatialPanel
      id="chapter-00"
      ariaLabel="Chapter 00: Exhibition Introduction"
      anchorProgress={0.0}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.13}
      entryDirection="center"
      parallaxDepth={0.9}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1360px] px-6 sm:px-14 md:px-20 select-none">
          {/* Top-center subtle architectural frame annotation (fades out immediately on scroll) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="flex items-center justify-between max-w-[780px] mx-auto mb-6 font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase"
          >
            <span>AXIS.00 // ARCHITECTURAL MONOGRAPH</span>
            <span>EDITION 2026</span>
          </div>

          {/* Primary Monument Typography lying on the architectural drafting plane (matches "01 / ARCHITECTURE" in 00:00 of reference video) */}
          <div className="relative z-20">
            <div className="font-display text-[clamp(2.2rem,5.5vw,5.2rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88]">
              00 /
            </div>
            <h1 className="font-display text-[clamp(3.3rem,10.2vw,10.4rem)] font-bold tracking-[-0.045em] text-ink leading-[0.86] uppercase select-text">
              {name.first} {name.last}
            </h1>
          </div>

          {/* Clean, breathable editorial plaque below the monument title (ONLY visible when station is in focus) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start select-text transition-opacity duration-150"
          >
            {/* Left: 3 Role tags */}
            <div className="md:col-span-5 flex flex-wrap gap-2 pt-1">
              {intro.roles.map((role) => (
                <span
                  key={role}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 border border-ink/35 bg-ivory/80 text-ink font-medium"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Right: Concise positioning statement + single clean action */}
            <div className="md:col-span-7 max-w-xl space-y-4 border-l border-ink/25 pl-5 bg-ivory/65 backdrop-blur-[4px] py-2">
              <p className="type-body-lead font-medium text-ink">
                {positioning}
              </p>
              <p className="type-body-copy text-ink-secondary">
                {intro.statement}
              </p>
              <div className="pt-1 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onEnterExhibition}
                  className="arch-interactive-btn"
                >
                  <span>01 / IDENTITY &amp; SYSTEMS</span>
                  <span className="btn-arrow">↓</span>
                </button>
                <span className="font-mono text-[9px] tracking-[0.18em] text-ink-muted uppercase">
                  SCROLL TO TRAVERSE PLAN
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};
