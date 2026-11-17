'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';
import { ImagePlane } from '@/spatial/ImagePlane';

interface IntroSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onEnterExhibition: () => void;
}

/**
 * 3D WebGL artifacts for Chapter 00 (Introduction):
 * Reproduces the floating brutalist architectural photo plane, grid sheet, and foreground translucent glass slab
 * from 00:00–00:01 of the reference video.
 */
export const IntroScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-00-3d" position={[0, 0, 0]}>
      {/* Brutalist architectural study image plane (top-left of center, matching 00:00 reference) */}
      <ImagePlane
        position={[-1.45, 1.35, -1.8]}
        size={[3.5, 2.15]}
        rotation={[0, 0.04, 0]}
        variant="brutalist-arch"
        reducedMotion={reducedMotion}
      />

      {/* Foreground translucent glass slab with subtle cyan/emerald bottom edge refraction (matching 00:00–00:02) */}
      <GlassPanel
        position={[-0.5, -1.55, 3.2]}
        size={[3.8, 2.1, 0.09]}
        rotation={[-0.03, 0.05, 0]}
        opacity={0.38}
        reducedMotion={reducedMotion}
      />

      {/* Secondary deep glass plane on right */}
      <GlassPanel
        position={[3.6, 0.4, -4.2]}
        size={[3.2, 2.4, 0.06]}
        rotation={[0, -0.1, 0]}
        opacity={0.28}
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
  const { name, positioning, dimensions, intro } = profileData;

  // Kinetic title transform that scales past the camera lens as the visitor scrolls from 0.00 -> 0.12
  const monumentStyle = computeKineticTitleStyle(
    masterProgress,
    0.0,
    0.1,
    -8,
    -5,
    reducedMotion
  );

  // Secondary background title ("01 / IDENTITY & SYSTEMS") visible in deep space behind the intro (like "02 / SPATIAL DESIGN" in 00:00 of the reference video)
  const nextChapterGhostStyle = computeKineticTitleStyle(
    masterProgress,
    0.09,
    0.1,
    -4,
    -2,
    reducedMotion
  );

  return (
    <SpatialPanel
      id="chapter-00"
      ariaLabel="Chapter 00: Exhibition Introduction"
      anchorProgress={0.02}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.11}
      entryDirection="center"
      parallaxDepth={1.0}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1440px] h-full px-5 sm:px-10 md:px-16 pt-20 pb-14 flex flex-col justify-between select-none">
        {/* Top asymmetric technical annotations */}
        <div className="grid grid-cols-12 gap-4 items-start border-b border-ink/15 pb-3">
          <div className="col-span-6 sm:col-span-4">
            <div className="type-tech-label text-ink font-semibold">
              {intro.axisCode}
            </div>
            <div className="type-tech-micro mt-0.5">{intro.coordinates}</div>
          </div>

          <div className="col-span-6 sm:col-span-4 text-right sm:text-center">
            <span className="type-tech-label px-2 py-0.5 border border-ink/25 bg-ivory-light/70">
              {intro.exhibitionRef}
            </span>
          </div>

          <div className="hidden sm:flex sm:col-span-4 justify-end items-center gap-2">
            {intro.roles.map((role, idx) => (
              <span
                key={role}
                className="type-tech-micro px-2 py-0.5 border border-ink/20 bg-ivory/80"
              >
                0{idx + 1} // {role}
              </span>
            ))}
          </div>
        </div>

        {/* Center Spatial Stage: Overlapping Monument Typography + Background Chapter Preview */}
        <div className="relative my-auto py-4">
          {/* Deep-plane overlapping next chapter indicator (directly inspired by "02 / SPATIAL DESIGN" nested behind "01 / ARCHITECTURE" in 00:00 of the reference video) */}
          <div
            aria-hidden="true"
            style={nextChapterGhostStyle}
            className="pointer-events-none absolute left-[28%] sm:left-[34%] top-[24%] z-10 opacity-70"
          >
            <div className="font-display text-[clamp(1.35rem,3.2vw,3.1rem)] font-bold leading-[0.9] tracking-[-0.03em] text-ink/75 uppercase">
              01 /
              <br />
              IDENTITY &amp;
              <br />
              SYSTEMS
            </div>
          </div>

          {/* Primary Foreground Monument Typography */}
          <div style={monumentStyle} className="relative z-20">
            <div className="flex items-baseline gap-4 mb-1">
              <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-[-0.03em] text-ink leading-none">
                00 /
              </span>
              <span className="type-tech-label tracking-[0.22em] text-ink-secondary">
                ARCHITECTURAL PORTFOLIO EXHIBITION
              </span>
            </div>

            <h1 className="type-monument tracking-[-0.04em] select-text">
              <span className="block">{name.first}</span>
              <span className="block pl-[6vw] sm:pl-[12vw] -mt-[0.08em]">
                {name.last}
              </span>
            </h1>
          </div>
        </div>

        {/* Bottom Asymmetric Architectural Information Plane & Glass Statement Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end z-30 select-text">
          {/* Left Role Labels & Positioning */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              {intro.roles.map((role) => (
                <span
                  key={role}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase px-2.5 py-1 bg-ink text-ivory font-medium"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="type-body-lead font-medium text-ink max-w-xl">
              {positioning}
            </p>
          </div>

          {/* Center-Right Translucent Glass Panel with Statement & 3 Exhibition Dimensions */}
          <div className="lg:col-span-7 spatial-glass-panel p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-ink/15 pb-2 mb-3">
              <span className="type-tech-micro">
                STATEMENT // SPATIAL EXHIBITION MANIFESTO
              </span>
              <span className="type-tech-micro text-ink font-semibold">
                PLANE Z: +0.00m
              </span>
            </div>

            <p className="type-body-copy text-ink font-medium mb-4">
              &ldquo;{intro.statement}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-ink/15">
              {dimensions.map((dim, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="type-tech-micro text-ink font-semibold">
                    DIMENSION 0{idx + 1}
                  </div>
                  <p className="text-xs leading-relaxed text-ink-secondary">
                    {dim}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-ink/10 flex flex-wrap items-center justify-between gap-3">
              <span className="type-tech-micro">
                SCROLL CONTINUOUSLY TO DOLLY CAMERA THROUGH 06 EXHIBITION CHAPTERS
              </span>
              <button
                type="button"
                onClick={onEnterExhibition}
                className="arch-interactive-btn"
              >
                <span>ENTER CHAPTER 01 // IDENTITY</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </SpatialPanel>
  );
};
