'use client';

import React from 'react';
import { CHAPTER_NAVIGATION } from '@/camera/CameraKeyframes';

interface SpatialNavigationProps {
  activeChapterIndex: number;
  masterProgress: number;
  telemetry: {
    x: number;
    y: number;
    z: number;
    fov: number;
    chapterCode: string;
    subtitle: string;
  };
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onNavigateToProgress: (targetProgress: number) => void;
}

/**
 * Ultra-clean, restrained architectural HUD top strip.
 * Preserves open warm-ivory paper space at the top of the viewport just like the reference video,
 * using tiny technical annotations (AXIS.0X, AWWWARDS / EDITION 2026) and a compact chapter selector.
 */
export const SpatialNavigation: React.FC<SpatialNavigationProps> = ({
  activeChapterIndex,
  masterProgress,
  telemetry,
  reducedMotion,
  onToggleReducedMotion,
  onNavigateToProgress,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-5 sm:px-10 pt-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Top-left technical axis label (matching "AXIS.03" in top-left of reference video) */}
        <div className="pointer-events-auto flex items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigateToProgress(0)}
            className="text-left group cursor-pointer"
            aria-label="Return to Origin"
          >
            <div className="font-mono text-[10px] font-semibold tracking-[0.2em] text-ink uppercase">
              AXIS.0{activeChapterIndex} // ARYAN SHARMA
            </div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-ink-subtle uppercase mt-0.5">
              {telemetry.subtitle}
            </div>
          </button>
        </div>

        {/* Center-top compact chapter index strip */}
        <nav
          aria-label="Architectural Plan Chapters"
          className="pointer-events-auto flex items-center gap-1 bg-ivory/75 backdrop-blur-sm border border-ink/15 px-1.5 py-1"
        >
          {CHAPTER_NAVIGATION.map((item) => {
            const isActive = activeChapterIndex === item.chapterIndex;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onNavigateToProgress(item.targetProgress)}
                className={`px-2 py-1 font-mono text-[9px] tracking-[0.16em] uppercase transition-colors ${
                  isActive
                    ? 'bg-ink text-ivory font-semibold'
                    : 'text-ink-muted hover:text-ink'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                {item.code}
                <span className="hidden md:inline ml-1">/{item.shortTitle}</span>
              </button>
            );
          })}
        </nav>

        {/* Top-right sub-stops (for Experience & Projects) + Motion toggle */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-2">
          {(activeChapterIndex === 2 || activeChapterIndex === 3) &&
            CHAPTER_NAVIGATION[activeChapterIndex]?.subStops?.map((stop) => {
              const isNear = Math.abs(masterProgress - stop.progress) < 0.045;
              return (
                <button
                  key={stop.label}
                  type="button"
                  onClick={() => onNavigateToProgress(stop.progress)}
                  className={`px-2 py-1 font-mono text-[9px] tracking-[0.14em] uppercase border transition-colors ${
                    isNear
                      ? 'bg-ink text-ivory border-ink'
                      : 'bg-ivory/60 text-ink-muted border-ink/20 hover:border-ink hover:text-ink'
                  }`}
                >
                  {stop.label}
                </button>
              );
            })}

          <button
            type="button"
            onClick={onToggleReducedMotion}
            className="px-2.5 py-1 border border-ink/20 bg-ivory/70 font-mono text-[9px] tracking-[0.15em] text-ink-muted hover:text-ink uppercase"
            aria-pressed={reducedMotion}
          >
            {reducedMotion ? 'PLAN: FLAT' : 'PLAN: 3D'}
          </button>
        </div>
      </div>
    </header>
  );
};
