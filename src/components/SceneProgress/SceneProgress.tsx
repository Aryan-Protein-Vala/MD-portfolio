'use client';

import React from 'react';
import { CHAPTER_NAVIGATION } from '@/camera/CameraKeyframes';

interface SceneProgressProps {
  masterProgress: number;
  activeChapterIndex: number;
  onNavigateToProgress: (targetProgress: number) => void;
}

/**
 * Reproduces the exact peripheral architectural overlays from aaa9c1aa.mp4:
 * 1. The sliding translucent frosted glass slab with cyan/emerald refractive bottom edge (00:01–00:02)
 *    that passes vertically through the viewport during transitions between chapters.
 * 2. The angled diagonal typography ruler line ("DESIGN & FUNCTION - SYSTEMS & INFRASTRUCTURE").
 * 3. The left-edge vertical "STRUCTURAL FORM" label and bottom-left "+ ○ □ ■" registration symbols (00:03).
 * 4. A minimal right-edge map coordinate scale.
 */
export const SceneProgress: React.FC<SceneProgressProps> = ({
  masterProgress,
  activeChapterIndex,
  onNavigateToProgress,
}) => {
  const percent = Math.round(masterProgress * 100);

  // Compute cyclic transition phase so the translucent refractive glass slab glides upward across the screen
  // during transitions between stations (exactly like 00:01 -> 00:02 of the reference video!)
  const stationCycle = (masterProgress * 10) % 1; // 0..1 across each station transition
  const glassY = 58 - stationCycle * 115; // glides from +58vh (bottom) up to -57vh (top)

  return (
    <>
      {/* Moving Translucent Frosted Glass Slab with Cyan/Emerald Refractive Edge (matching 00:01–00:02 of reference video) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-25 overflow-hidden"
      >
        <div
          style={{
            transform: `perspective(1200px) translate3d(-6vw, ${glassY.toFixed(1)}vh, 40px) rotateX(8deg) rotateZ(-1deg)`,
          }}
          className="mx-auto w-[280px] sm:w-[390px] h-[155px] sm:h-[205px] bg-ivory-light/30 backdrop-blur-[6px] border border-ink/20 shadow-[0_18px_40px_rgba(20,20,19,0.06)] relative"
        >
          {/* Top specular glass highlight */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/75" />
          {/* Corner registration ticks */}
          <div className="absolute top-2 left-2.5 font-mono text-[8px] tracking-[0.18em] text-ink/45">
            AXIS.0{activeChapterIndex}
          </div>
          {/* Signature cyan/teal refractive glass bottom edge from 00:01–00:02 of video */}
          <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#4A7C7A]/35 via-[#3B8EA5]/50 to-[#4A7C7A]/30 border-t border-white/60" />
        </div>

        {/* Signature Diagonal Architectural Ribbon (matching 00:01–00:03 of reference video) */}
        <div
          style={{
            transform: `translate3d(${(masterProgress * -120).toFixed(1)}px, ${(masterProgress * -60).toFixed(1)}px, 0) rotate(27deg)`,
          }}
          className="absolute top-[58%] -right-[15%] w-[130%] border-t border-ink/35 pt-1.5 hidden md:flex items-center justify-around type-diagonal-ribbon"
        >
          <span>
            DESIGN &amp; FUNCTION — SYSTEMS ARCHITECTURE &amp; INFRASTRUCTURE — ARYAN SHARMA
          </span>
          <span>
            SPATIAL MONOGRAPH // EDITION 2026 — ZERO-COPY &amp; DISTRIBUTED SYSTEMS
          </span>
        </div>

        {/* Left Vertical Label "STRUCTURAL FORM" + Bottom-Left "+ ○ □ ■" Symbols (exact match to 00:00 & 00:03) */}
        <div className="hidden sm:flex fixed left-5 bottom-8 flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <div className="w-[1px] h-28 bg-ink/30" />
            <div
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              className="font-mono text-[9px] tracking-[0.22em] text-ink-muted uppercase"
            >
              STRUCTURAL FORM
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-2">
            <span className="w-3.5 h-3.5 rounded-full bg-ink text-ivory flex items-center justify-center text-[9px] font-mono leading-none">
              +
            </span>
            <span className="w-3.5 h-3.5 rounded-full border border-ink/60 inline-block" />
            <span className="w-3.5 h-3.5 border border-ink/60 bg-ivory-light inline-block" />
            <span className="w-3.5 h-3.5 bg-ink inline-block" />
          </div>
        </div>
      </div>

      {/* Minimal Right-Edge Vernier Scale */}
      <aside
        aria-label="Drafting Map Progress"
        className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-1.5 pointer-events-auto"
      >
        <div className="relative h-48 w-5 flex flex-col justify-between items-end py-1 border-r border-ink/25 pr-1.5">
          <div
            style={{ height: `${percent}%` }}
            className="absolute right-[-1px] top-0 w-[2px] bg-ink transition-all duration-150"
          />

          {CHAPTER_NAVIGATION.map((ch) => {
            const active = activeChapterIndex === ch.chapterIndex;
            return (
              <button
                key={ch.code}
                type="button"
                onClick={() => onNavigateToProgress(ch.targetProgress)}
                className="group flex items-center gap-1.5 text-right cursor-pointer"
                title={ch.fullTitle}
              >
                <span
                  className={`font-mono text-[8px] tracking-[0.14em] ${
                    active
                      ? 'font-bold text-ink opacity-100'
                      : 'text-ink-muted opacity-40 group-hover:opacity-100'
                  }`}
                >
                  {ch.code}
                </span>
                <span
                  className={`block h-[1px] ${
                    active ? 'w-3 bg-ink' : 'w-1.5 bg-ink/35'
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="font-mono text-[9px] tracking-[0.16em] text-ink-muted">
          SECTION.0{activeChapterIndex}
        </div>
      </aside>
    </>
  );
};
