'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
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
    <group name="chapter-05-exploration-3d" position={[0.4, -71.5, -1.8]}>
      <GlassPanel
        position={[-2.8, 0.5, 0.9]}
        size={[3.8, 2.2, 0.07]}
        rotation={[-0.12, 0.05, 0]}
        opacity={0.28}
        reducedMotion={reducedMotion}
      />
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

  return (
    <SpatialPanel
      id="chapter-05"
      ariaLabel="Chapter 05: Beyond The Screen"
      anchorProgress={0.94}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.055}
      entryDirection="right"
      parallaxDepth={0.95}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Monument Header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
                {explorations.axisCode} // {explorations.theme}
              </div>
              <h2 className="font-display text-[clamp(2.4rem,6.2vw,6.0rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
                05 /
                <br />
                BEYOND THE SCREEN
              </h2>
            </div>

            <button
              type="button"
              style={{ opacity: metrics.bodyOpacity }}
              onClick={onNextChapter}
              className="arch-interactive-btn"
            >
              <span>06 / CONTACT</span>
              <span className="btn-arrow">↓</span>
            </button>
          </div>

          {/* Clean 4-Column Architectural Blueprint Strip */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-150"
          >
            {explorations.items.map((item) => (
              <div
                key={item.id}
                className="spatial-glass-panel p-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="font-mono text-[9px] tracking-[0.16em] text-ink-muted border-b border-ink/15 pb-1.5">
                    {item.code}
                  </div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {item.title}
                  </h3>
                  <p className="type-body-copy text-xs text-ink-secondary">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-ink/10 font-mono text-[9px] text-ink-muted uppercase">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};
