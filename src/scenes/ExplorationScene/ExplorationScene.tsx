'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';

interface ExplorationSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onNextChapter: () => void;
}

export const ExplorationScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-05-exploration-3d">
      {profileData.explorations.items.map((item, idx) => (
        <GlassPanel
          key={item.id}
          position={item.coordinates}
          size={[3.6, 2.2, 0.07]}
          rotation={[0, idx % 2 === 0 ? 0.14 : -0.14, 0]}
          opacity={0.32}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

export const ExplorationScene: React.FC<ExplorationSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onNextChapter,
}) => {
  const { explorations } = profileData;
  const titleStyle = computeKineticTitleStyle(
    masterProgress,
    0.94,
    0.08,
    8,
    -4,
    reducedMotion
  );

  return (
    <SpatialPanel
      id="chapter-05"
      ariaLabel="Chapter 05: Beyond The Screen"
      anchorProgress={0.94}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.065}
      entryDirection="right"
      parallaxDepth={1.2}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1440px] h-full px-5 sm:px-10 md:px-16 pt-24 pb-14 flex flex-col justify-between">
        {/* Top Datum Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2">
          <div className="flex items-center gap-3">
            <span className="reg-crosshair" />
            <span className="type-tech-label text-ink font-semibold">
              {explorations.axisCode}
            </span>
          </div>
          <span className="type-tech-micro">
            THEME // {explorations.theme} — PLANE Z: -168.0m
          </span>
        </div>

        {/* Center Experimental Spatial Composition */}
        <div className="my-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7" style={titleStyle}>
              <div className="type-tech-label">
                {explorations.chapterNumber} / {explorations.theme}
              </div>
              <h2 className="type-chapter-index mt-0.5">
                {explorations.chapterTitle}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="type-body-copy text-ink-secondary">
                {explorations.intro}
              </p>
            </div>
          </div>

          {/* Staggered Asymmetric Exploration Artefacts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {explorations.items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  transform: reducedMotion
                    ? 'none'
                    : `translateY(${idx % 2 === 1 ? '14px' : '-6px'})`,
                }}
                className="spatial-glass-panel p-5 flex flex-col justify-between min-h-[230px]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-ink/15 pb-2">
                    <span className="type-tech-micro text-ink font-semibold">
                      {item.code}
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-ink text-ivory">
                      {item.artefactType}
                    </span>
                  </div>

                  <div className="type-tech-micro text-ink-muted">
                    {item.category}
                  </div>

                  <h3 className="font-display text-lg font-bold text-ink leading-snug">
                    {item.title}
                  </h3>

                  <p className="type-body-copy text-xs text-ink-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-ink/10 flex items-center justify-between font-mono text-[10px] text-ink-muted">
                  <span>Z: {item.coordinates[2]}m</span>
                  <span>EDITABLE FIELD</span>
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
              <span>06 / FINAL CHAPTER: CONTACT</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Architectural Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-ink/15 pt-2 type-tech-micro">
          <span>PERSONAL EXPLORATIONS &amp; CREATIVE TECHNOLOGY</span>
          <span>EDITABLE IN SRC/DATA/PROFILE.TS</span>
        </div>
      </div>
    </SpatialPanel>
  );
};
