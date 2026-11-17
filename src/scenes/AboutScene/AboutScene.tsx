'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';
import { ImagePlane } from '@/spatial/ImagePlane';

interface AboutSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onNextChapter: () => void;
}

export const AboutScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-01-3d" position={[0.8, -7.5, -2.0]}>
      <ImagePlane
        position={[-3.2, 0.8, 0.4]}
        size={[2.6, 3.2]}
        rotation={[-0.12, 0.08, -0.01]}
        variant="portrait-monolith"
        reducedMotion={reducedMotion}
      />
      <GlassPanel
        position={[2.2, -0.8, 1.2]}
        size={[3.6, 2.1, 0.07]}
        rotation={[-0.1, -0.05, 0]}
        opacity={0.3}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export const AboutScene: React.FC<AboutSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onNextChapter,
}) => {
  const { about } = profileData;

  return (
    <SpatialPanel
      id="chapter-01"
      ariaLabel="Chapter 01: Identity and About"
      anchorProgress={0.14}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.11}
      entryDirection="left"
      parallaxDepth={0.95}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Monument Chapter Header on the Architectural Plan (matches "02 / SPATIAL DESIGN" in 00:01 of reference video) */}
          <div className="mb-6">
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
              {about.axisCode} // {about.location}
            </div>
            <h2 className="font-display text-[clamp(2.4rem,6.4vw,6.2rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
              01 /
              <br />
              IDENTITY &amp; SYSTEMS
            </h2>
          </div>

          {/* Focused Two-Plane Architectural Layout (only visible when station is in focus) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-opacity duration-150"
          >
            {/* Left: Narrative Statement + Replaceable Portrait Plate */}
            <div className="lg:col-span-7 space-y-4 bg-ivory/75 backdrop-blur-[6px] border border-ink/20 p-6">
              <div className="flex items-center justify-between border-b border-ink/15 pb-2 font-mono text-[10px] tracking-[0.16em] text-ink-muted">
                <span>PERSON BEHIND THE SYSTEMS</span>
                <span>INDIA // IIT MADRAS</span>
              </div>

              <p className="type-body-lead font-medium text-ink">
                {about.copy[0]}
              </p>
              <p className="type-body-copy text-ink-secondary">
                {about.copy[1]} {about.copy[2]}
              </p>

              {/* Compact Portrait Placeholder Strip */}
              <div className="pt-3 border-t border-ink/15 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-12 border border-ink/40 blueprint-subgrid flex items-center justify-center font-mono text-[9px] text-ink">
                    3:4
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-semibold text-ink">
                      {about.portraitPlaceholder.label}
                    </div>
                    <div className="font-mono text-[9px] text-ink-muted">
                      {about.portraitPlaceholder.caption}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: IIT Madras Academic Specification Plaque */}
            <div className="lg:col-span-5 spatial-glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-ink/15 pb-2">
                <span className="type-tech-micro text-ink font-semibold">
                  EDUCATION // EDITABLE RECORD
                </span>
                <span className="type-tech-micro">{about.education.period}</span>
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-ink leading-tight">
                  {about.education.institution}
                </h3>
                <div className="font-mono text-[10px] text-ink-muted mt-1">
                  {about.education.status}
                </div>
              </div>

              <ul className="space-y-2 border-l-2 border-ink pl-3">
                {about.education.degrees.map((deg) => (
                  <li key={deg} className="font-mono text-xs text-ink font-medium">
                    {deg}
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-ink/15 flex justify-end">
                <button
                  type="button"
                  onClick={onNextChapter}
                  className="arch-interactive-btn"
                >
                  <span>02 / EXPERIENCE TIMELINE</span>
                  <span className="btn-arrow">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};
