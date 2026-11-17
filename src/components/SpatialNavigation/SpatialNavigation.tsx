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

export const SpatialNavigation: React.FC<SpatialNavigationProps> = ({
  activeChapterIndex,
  masterProgress,
  telemetry,
  reducedMotion,
  onToggleReducedMotion,
  onNavigateToProgress,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top architectural datum bar */}
      <div className="mx-auto flex flex-wrap items-center justify-between border-b border-ink/15 bg-ivory/80 backdrop-blur-md px-4 py-2.5 md:px-8 pointer-events-auto">
        {/* Brand / Exhibition Identifier */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigateToProgress(0)}
            className="text-left group cursor-pointer py-1"
            aria-label="Return to Chapter 00 Exhibition Entry"
          >
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-ink" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-ink">
                ARYAN SHARMA // SPATIAL MONOGRAPH
              </span>
            </div>
            <div className="font-mono text-[9px] tracking-[0.16em] text-ink-subtle hidden sm:block">
              {telemetry.chapterCode} — {telemetry.subtitle}
            </div>
          </button>
        </div>

        {/* Chapter Index Buttons */}
        <nav
          aria-label="Exhibition Chapters"
          className="flex items-center gap-1 overflow-x-auto max-w-full py-1"
        >
          {CHAPTER_NAVIGATION.map((item) => {
            const isActive = activeChapterIndex === item.chapterIndex;
            return (
              <div key={item.code} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => onNavigateToProgress(item.targetProgress)}
                  className={`min-h-[34px] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors border ${
                    isActive
                      ? 'bg-ink text-ivory border-ink font-semibold'
                      : 'bg-transparent text-ink-muted border-transparent hover:border-ink/30 hover:text-ink'
                  }`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span className="opacity-65 mr-1">{item.code}/</span>
                  <span>{item.shortTitle}</span>
                </button>
              </div>
            );
          })}
        </nav>

        {/* Camera Telemetry & Motion Mode Toggle */}
        <div className="hidden xl:flex items-center gap-5 font-mono text-[10px] tracking-[0.14em] text-ink-muted">
          <div className="flex items-center gap-3 border-l border-ink/15 pl-4">
            <span>CAM.X: {telemetry.x.toFixed(1)}</span>
            <span>CAM.Y: {telemetry.y.toFixed(1)}</span>
            <span>CAM.Z: {telemetry.z.toFixed(1)}</span>
            <span>FOV: {telemetry.fov}°</span>
          </div>
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className="min-h-[32px] px-2.5 py-1 border border-ink/25 text-ink hover:bg-ink hover:text-ivory transition-colors uppercase text-[10px] tracking-[0.14em]"
            aria-pressed={reducedMotion}
            title="Toggle camera motion or static architectural reader mode"
          >
            MOTION: {reducedMotion ? 'STATIC' : 'SPATIAL 3D'}
          </button>
        </div>
      </div>

      {/* Sub-navigation bar when in Experience (Ch 02) or Selected Work (Ch 03) */}
      {(activeChapterIndex === 2 || activeChapterIndex === 3) && (
        <div className="flex items-center justify-center md:justify-end gap-2 px-4 md:px-8 py-1.5 bg-ivory-light/75 border-b border-ink/10 backdrop-blur-sm pointer-events-auto">
          <span className="font-mono text-[9px] tracking-[0.18em] text-ink-subtle uppercase mr-2">
            INSTALLATION STOPS:
          </span>
          {CHAPTER_NAVIGATION[activeChapterIndex]?.subStops?.map((stop) => {
            const isNear = Math.abs(masterProgress - stop.progress) < 0.048;
            return (
              <button
                key={stop.label}
                type="button"
                onClick={() => onNavigateToProgress(stop.progress)}
                className={`min-h-[28px] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase border transition-colors ${
                  isNear
                    ? 'bg-ink text-ivory border-ink'
                    : 'bg-ivory/70 text-ink-muted border-ink/20 hover:border-ink hover:text-ink'
                }`}
              >
                {stop.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
