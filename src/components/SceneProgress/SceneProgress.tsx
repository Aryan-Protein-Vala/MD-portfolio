'use client';

import React from 'react';
import { CHAPTER_NAVIGATION } from '@/camera/CameraKeyframes';

interface SceneProgressProps {
  masterProgress: number;
  activeChapterIndex: number;
  onNavigateToProgress: (targetProgress: number) => void;
}

/**
 * Architectural vernier depth ruler on the right edge, bottom technical telemetry footer,
 * and the signature diagonal typographic ribbon from the reference video (00:01–00:03).
 */
export const SceneProgress: React.FC<SceneProgressProps> = ({
  masterProgress,
  activeChapterIndex,
  onNavigateToProgress,
}) => {
  const percent = Math.round(masterProgress * 100);
  const zMeters = (18 - masterProgress * 210).toFixed(1);

  return (
    <>
      {/* Signature Diagonal Architectural Ribbon across the exhibition plane (matching 00:02–00:03 of reference video) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-10 overflow-hidden hidden md:block"
      >
        <div
          style={{
            transform: `translate3d(${(masterProgress * -180).toFixed(1)}px, ${(masterProgress * 90).toFixed(1)}px, 0) rotate(26deg)`,
          }}
          className="absolute top-[56%] -right-[18%] w-[140%] border-t border-ink/25 pt-1.5 flex items-center justify-around type-diagonal-ribbon"
        >
          <span>
            DESIGN &amp; FUNCTION — SYSTEMS ARCHITECTURE &amp; SPATIAL COMPUTING — ARYAN SHARMA
          </span>
          <span>
            AXIS.03 // ZERO-COPY INFRASTRUCTURE — DISTRIBUTED NETWORKS — KINETIC TYPOGRAPHY
          </span>
          <span>
            EXHIBITION MONOGRAPH // EDITION 2026 — INDIA
          </span>
        </div>

        {/* Left vertical architectural label ("STRUCTURAL FORM" in 00:00–00:01 of reference video) */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6">
          <span className="reg-crosshair" />
          <div
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="font-mono text-[10px] tracking-[0.22em] text-ink-muted uppercase"
          >
            STRUCTURAL FORM // AXIS.0{activeChapterIndex}
          </div>
          <div className="w-[1px] h-24 bg-ink/25" />
          {/* Bottom-left geometric registration symbols from 00:03 of reference video */}
          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-4 h-4 rounded-full bg-ink text-ivory flex items-center justify-center text-[10px] font-mono leading-none">
              +
            </span>
            <span className="w-4 h-4 rounded-full border border-ink/60 inline-block" />
            <span className="w-4 h-4 border border-ink/60 bg-ivory-light inline-block" />
            <span className="w-4 h-4 bg-ink inline-block" />
          </div>
        </div>
      </div>

      {/* Right-Edge Vertical Architectural Depth Scale */}
      <aside
        aria-label="Spatial Depth Progress"
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2 pointer-events-auto"
      >
        <div className="font-mono text-[9px] tracking-[0.18em] text-ink-subtle uppercase mb-1">
          Z-DEPTH // {zMeters}m
        </div>

        <div className="relative h-64 w-6 flex flex-col justify-between items-end py-1 border-r border-ink/25 pr-2">
          {/* Active progress fill indicator */}
          <div
            style={{ height: `${percent}%` }}
            className="absolute right-[-1.5px] top-0 w-[3px] bg-ink transition-all duration-150"
          />

          {CHAPTER_NAVIGATION.map((ch) => {
            const active = activeChapterIndex === ch.chapterIndex;
            return (
              <button
                key={ch.code}
                type="button"
                onClick={() => onNavigateToProgress(ch.targetProgress)}
                className="group flex items-center gap-2 text-right py-0.5 cursor-pointer"
                title={`Jump to ${ch.fullTitle}`}
              >
                <span
                  className={`font-mono text-[9px] tracking-[0.14em] transition-opacity ${
                    active
                      ? 'opacity-100 font-bold text-ink'
                      : 'opacity-45 group-hover:opacity-100 text-ink-muted'
                  }`}
                >
                  {ch.code}
                </span>
                <span
                  className={`block h-[1px] transition-all ${
                    active ? 'w-4 bg-ink h-[2px]' : 'w-2 bg-ink/40 group-hover:w-3'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="font-mono text-[10px] font-semibold tracking-[0.16em] text-ink mt-1">
          {String(percent).padStart(3, '0')}%
        </div>
      </aside>

      {/* Bottom HUD Status Strip */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none flex items-center justify-between px-4 md:px-8 py-2 border-t border-ink/10 bg-ivory/75 backdrop-blur-sm font-mono text-[10px] tracking-[0.15em] text-ink-muted uppercase">
        <div className="flex items-center gap-3">
          <span>SECTION.0{activeChapterIndex}</span>
          <span className="opacity-40">//</span>
          <span>SCROLL OR USE KEYS [↑/↓] TO TRAVERSE</span>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            type="button"
            onClick={() =>
              onNavigateToProgress(Math.max(0, masterProgress - 0.12))
            }
            className="px-2 py-0.5 border border-ink/20 hover:bg-ink hover:text-ivory transition-colors"
            aria-label="Previous Spatial Composition"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={() =>
              onNavigateToProgress(Math.min(1, masterProgress + 0.12))
            }
            className="px-2 py-0.5 border border-ink/20 hover:bg-ink hover:text-ivory transition-colors"
            aria-label="Next Spatial Composition"
          >
            NEXT →
          </button>
        </div>
      </div>
    </>
  );
};
