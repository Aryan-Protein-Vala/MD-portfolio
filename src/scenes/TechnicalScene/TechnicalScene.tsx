'use client';

import React, { useState } from 'react';
import { skillsData } from '@/data/skills';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';

interface TechnicalSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onNextChapter: () => void;
}

export const TechnicalScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-04-technical-3d" position={[-0.2, -63.5, -1.5]}>
      <GlassPanel
        position={[3.2, 0.6, 0.8]}
        size={[4.0, 2.4, 0.06]}
        rotation={[-0.12, -0.05, 0]}
        opacity={0.28}
        reducedMotion={reducedMotion}
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
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(0);

  return (
    <SpatialPanel
      id="chapter-04"
      ariaLabel="Chapter 04: The Technical Universe"
      anchorProgress={0.88}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.075}
      entryDirection="left"
      parallaxDepth={0.95}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Monument Chapter Header on the Architectural Plan */}
          <div className="mb-6">
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
              AXIS.04 // THE TOOLS BEHIND THE WORK
            </div>
            <h2 className="font-display text-[clamp(2.4rem,6.2vw,6.0rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
              04 /
              <br />
              TECHNICAL UNIVERSE
            </h2>
          </div>

          {/* Architectural Map Selector + Focused Plane View (instant readability, zero wall-of-boxes clutter) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-opacity duration-150"
          >
            {/* Left: 4 Architectural Layer Selectors */}
            <div className="lg:col-span-5 space-y-2">
              <div className="type-tech-micro text-ink-muted mb-2">
                SELECT ARCHITECTURAL LAYER (OR VIEW ALL BELOW):
              </div>
              {skillsData.map((group, idx) => {
                const isSelected = activeLayerIdx === idx;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveLayerIdx(idx)}
                    className={`w-full text-left p-3.5 border transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-ink text-ivory border-ink'
                        : 'bg-ivory/75 text-ink border-ink/25 hover:border-ink'
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.16em] opacity-70">
                        0{idx + 1} // {group.code.split('//')[0]}
                      </div>
                      <div className="font-display text-base font-bold mt-0.5">
                        {group.title}
                      </div>
                    </div>
                    <span className="font-mono text-[10px]">
                      [{group.items.length}] →
                    </span>
                  </button>
                );
              })}

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onNextChapter}
                  className="arch-interactive-btn"
                >
                  <span>05 / BEYOND THE SCREEN</span>
                  <span className="btn-arrow">↓</span>
                </button>
              </div>
            </div>

            {/* Right: Active Spatial Map Plane with Interconnected Nodes */}
            <div className="lg:col-span-7 spatial-glass-panel p-6 blueprint-subgrid space-y-5">
              <div className="flex items-center justify-between border-b border-ink/20 pb-2.5">
                <div>
                  <div className="type-tech-micro text-ink font-semibold">
                    {skillsData[activeLayerIdx].code}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink mt-0.5">
                    {skillsData[activeLayerIdx].title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 border border-ink/30 bg-ivory">
                  LAYER 0{activeLayerIdx + 1} / 04
                </span>
              </div>

              <p className="font-mono text-xs text-ink-secondary">
                {skillsData[activeLayerIdx].subtitle}
              </p>

              {/* Connected Node Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {skillsData[activeLayerIdx].items.map((item, i) => (
                  <div
                    key={item.name}
                    className="border border-ink/35 bg-ivory/95 p-3 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] text-ink-muted">
                      <span>NODE.0{i + 1}</span>
                      <span>{item.annotation}</span>
                    </div>
                    <div className="font-mono text-sm font-bold text-ink mt-2">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compact Index of All 4 Layers for Quick Reference */}
              <div className="pt-3 border-t border-ink/15 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[10px] text-ink-muted">
                {skillsData.map((g) => (
                  <span key={g.id}>
                    <strong className="text-ink">{g.title}:</strong>{' '}
                    {g.items.map((it) => it.name).join(' · ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};
