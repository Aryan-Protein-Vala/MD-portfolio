'use client';

import React, { useState } from 'react';
import { experienceData, ExperienceEntry } from '@/data/experience';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';
import { Line } from '@react-three/drei';

interface ExperienceSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onSelectProgress: (progress: number) => void;
}

const EXPERIENCE_ANCHORS = [0.26, 0.37, 0.48];
const EXPERIENCE_3D_COORDS: [number, number, number][] = [
  [-0.8, -15.5, -1.5],
  [1.1, -23.5, -2.0],
  [-0.6, -31.5, -1.8],
];

export const ExperienceScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-02-experience-3d">
      <Line
        points={EXPERIENCE_3D_COORDS}
        color="#141413"
        lineWidth={1.3}
        transparent
        opacity={0.4}
      />

      {EXPERIENCE_3D_COORDS.map((pos, idx) => (
        <GlassPanel
          key={`exp-3d-${idx}`}
          position={[pos[0] + (idx % 2 === 0 ? 2.6 : -2.6), pos[1], pos[2] + 0.8]}
          size={[3.8, 2.2, 0.07]}
          rotation={[-0.12, idx % 2 === 0 ? -0.06 : 0.06, 0]}
          opacity={0.28}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

const SingleExperienceStop: React.FC<{
  entry: ExperienceEntry;
  anchorProgress: number;
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  nextProgress: number;
  nextLabel: string;
  onSelectProgress: (p: number) => void;
}> = ({
  entry,
  anchorProgress,
  masterProgress,
  pointer,
  reducedMotion,
  nextProgress,
  nextLabel,
  onSelectProgress,
}) => {
  const [expanded, setExpanded] = useState(false);
  const visibleAchievements = expanded
    ? entry.achievements
    : entry.achievements.slice(0, 3);

  return (
    <SpatialPanel
      id={`chapter-02-${entry.id}`}
      ariaLabel={`Chapter 02 Experience: ${entry.company}`}
      anchorProgress={anchorProgress}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.105}
      entryDirection={entry.entryDirection}
      parallaxDepth={0.95}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Monument Architectural Header (like "02 / SPATIAL DESIGN" & "03 / KINETIC TYPOGRAPHY" in the reference video) */}
          <div className="mb-6">
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
              02 / EXPERIENCE — {entry.index} // {entry.period}
            </div>
            <h2 className="font-display text-[clamp(2.3rem,6.2vw,6.0rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
              {entry.index} /
              <br />
              {entry.company}
            </h2>
          </div>

          {/* Clean Asymmetric Specification Card (fades out immediately when scrolling to next stop so zero overlap occurs) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-opacity duration-150"
          >
            {/* Left: Role, Summary & Technology Tags */}
            <div className="lg:col-span-5 space-y-4 border-l border-ink/30 pl-5 bg-ivory/70 backdrop-blur-[4px] py-3">
              <div>
                <div className="type-tech-micro text-ink-muted">ROLE</div>
                <div className="font-display text-xl font-bold text-ink mt-0.5">
                  {entry.role}
                </div>
              </div>

              <p className="type-body-copy text-ink-secondary">
                {entry.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 border border-ink/25 bg-ivory-light text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Crisp Engineering Log Plaque */}
            <div className="lg:col-span-7 spatial-glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-ink/15 pb-2">
                <span className="type-tech-micro text-ink font-semibold">
                  SYSTEMS &amp; DELIVERABLES // {entry.fullName.toUpperCase()}
                </span>
                {entry.achievements.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => !prev)}
                    className="font-mono text-[10px] tracking-[0.14em] text-ink underline cursor-pointer uppercase"
                  >
                    {expanded
                      ? `[ − COLLAPSE ]`
                      : `[ + ALL ${entry.achievements.length} RECORDS ]`}
                  </button>
                )}
              </div>

              <ul className="space-y-2.5">
                {visibleAchievements.map((ach, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-mono text-xs text-ink border-b border-ink/10 pb-2 last:border-none"
                  >
                    <span className="text-[10px] text-ink-muted font-bold">
                      0{idx + 1}
                    </span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {experienceData.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectProgress(EXPERIENCE_ANCHORS[i])}
                      className={`px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] border ${
                        item.id === entry.id
                          ? 'bg-ink text-ivory border-ink'
                          : 'border-ink/20 text-ink-muted hover:text-ink'
                      }`}
                    >
                      {item.index}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProgress(nextProgress)}
                  className="arch-interactive-btn"
                >
                  <span>{nextLabel}</span>
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

export const ExperienceScene: React.FC<ExperienceSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onSelectProgress,
}) => {
  return (
    <>
      <SingleExperienceStop
        entry={experienceData[0]}
        anchorProgress={EXPERIENCE_ANCHORS[0]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={EXPERIENCE_ANCHORS[1]}
        nextLabel="02.B / NISWA ENGG"
        onSelectProgress={onSelectProgress}
      />
      <SingleExperienceStop
        entry={experienceData[1]}
        anchorProgress={EXPERIENCE_ANCHORS[1]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={EXPERIENCE_ANCHORS[2]}
        nextLabel="02.C / SUDARSHANA"
        onSelectProgress={onSelectProgress}
      />
      <SingleExperienceStop
        entry={experienceData[2]}
        anchorProgress={EXPERIENCE_ANCHORS[2]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={0.59}
        nextLabel="03 / SELECTED WORK"
        onSelectProgress={onSelectProgress}
      />
    </>
  );
};
