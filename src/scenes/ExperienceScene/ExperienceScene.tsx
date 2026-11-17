'use client';

import React from 'react';
import { experienceData, ExperienceEntry } from '@/data/experience';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';
import { Line } from '@react-three/drei';

interface ExperienceSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onSelectProgress: (progress: number) => void;
}

const EXPERIENCE_ANCHORS = [0.31, 0.41, 0.50];

/**
 * 3D spatial monoliths & architectural connection lines for Chapter 02 Experience
 * (Cinntra InfoTech at Z=-52, Niswa Engg at Z=-66, Sudarshana Foundation at Z=-80).
 */
export const ExperienceScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-02-experience-3d">
      {/* Vector trajectory connecting the 3 engineering experience nodes in 3D space */}
      <Line
        points={[
          [-5.2, 1.4, -52],
          [5.4, 0.2, -66],
          [-4.6, -0.8, -80],
        ]}
        color="#141413"
        lineWidth={1.5}
        transparent
        opacity={0.45}
      />

      {experienceData.map((exp, idx) => (
        <GlassPanel
          key={exp.id}
          position={exp.spatialPosition}
          size={[4.8, 3.0, 0.08]}
          rotation={[0, idx % 2 === 0 ? 0.12 : -0.12, 0]}
          opacity={0.32}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

const SingleExperienceInstallation: React.FC<{
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
  const titleStyle = computeKineticTitleStyle(
    masterProgress,
    anchorProgress,
    0.09,
    entry.entryDirection === 'left' ? -10 : 10,
    -5,
    reducedMotion
  );

  return (
    <SpatialPanel
      id={`chapter-02-${entry.id}`}
      ariaLabel={`Chapter 02 Experience: ${entry.company}`}
      anchorProgress={anchorProgress}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.075}
      entryDirection={entry.entryDirection}
      parallaxDepth={1.1}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1400px] h-full px-5 sm:px-10 md:px-16 pt-24 pb-14 flex flex-col justify-between">
        {/* Top Datum Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-ink text-ivory font-mono text-[10px] tracking-[0.16em]">
              02 / EXPERIENCE — {entry.index}
            </span>
            <span className="type-tech-label">{entry.axisCode}</span>
          </div>
          <div className="type-tech-micro">
            PLANE Z: {entry.spatialPosition[2]}.0m // WHERE IDEAS BECOME SYSTEMS
          </div>
        </div>

        {/* Center Spatial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto">
          {/* Company Monument Typography Column */}
          <div
            className={`lg:col-span-5 space-y-4 ${
              entry.entryDirection === 'right' ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div style={titleStyle}>
              <div className="type-tech-label text-ink-secondary mb-1">
                {entry.period}
              </div>
              <h2 className="type-chapter-index break-words">
                {entry.company}
              </h2>
              <div className="font-display text-lg sm:text-xl font-medium text-ink mt-2">
                {entry.role}
              </div>
            </div>

            <p className="type-body-copy text-ink-secondary max-w-md">
              {entry.summary}
            </p>

            {/* Technology Labels */}
            <div className="pt-2">
              <div className="type-tech-micro mb-2">
                SYSTEMS &amp; TECHNOLOGIES
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border border-ink/25 bg-ivory-light/85 text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Documentation & Achievements Glass Panel */}
          <div
            className={`lg:col-span-7 spatial-glass-panel p-5 sm:p-7 ${
              entry.entryDirection === 'right' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="flex items-center justify-between border-b border-ink/15 pb-2.5 mb-4">
              <span className="type-tech-label text-ink font-semibold">
                ENGINEERING LOG // {entry.fullName.toUpperCase()}
              </span>
              <span className="type-tech-micro">
                {entry.isPlaceholderEditable ? 'EDITABLE TEMPLATE' : 'VERIFIED RECORD'}
              </span>
            </div>

            <ul className="space-y-2.5">
              {entry.achievements.map((ach, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 border-b border-ink/10 pb-2 last:border-none"
                >
                  <span className="font-mono text-[10px] font-semibold text-ink bg-ivory-warm px-1.5 py-0.5 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="type-body-copy text-ink">{ach}</span>
                </li>
              ))}
            </ul>

            {entry.editablePlaceholders && (
              <div className="mt-4 pt-3 border-t border-ink/15 bg-ivory-light/70 p-3 space-y-1.5">
                <div className="type-tech-micro text-ink font-semibold">
                  CENTRALIZED EDITABLE SCHEMA (SRC/DATA/EXPERIENCE.TS)
                </div>
                <p className="font-mono text-[11px] text-ink-secondary">
                  {entry.editablePlaceholders.achievementsNote}
                </p>
              </div>
            )}

            <div className="mt-5 pt-3 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {experienceData.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectProgress(EXPERIENCE_ANCHORS[i])}
                    className={`px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] border transition-colors ${
                      item.id === entry.id
                        ? 'bg-ink text-ivory border-ink'
                        : 'border-ink/25 text-ink-muted hover:text-ink'
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
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Footer */}
        <div className="hidden sm:flex items-center justify-between border-t border-ink/15 pt-2 type-tech-micro">
          <span>
            INSTALLATION {entry.index} OF 03 // {entry.company}
          </span>
          <span>CONTINUOUS SPATIAL TIMELINE</span>
        </div>
      </div>
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
      <SingleExperienceInstallation
        entry={experienceData[0]}
        anchorProgress={EXPERIENCE_ANCHORS[0]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={EXPERIENCE_ANCHORS[1]}
        nextLabel="NEXT // NISWA ENGG"
        onSelectProgress={onSelectProgress}
      />
      <SingleExperienceInstallation
        entry={experienceData[1]}
        anchorProgress={EXPERIENCE_ANCHORS[1]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={EXPERIENCE_ANCHORS[2]}
        nextLabel="NEXT // SUDARSHANA FOUNDATION"
        onSelectProgress={onSelectProgress}
      />
      <SingleExperienceInstallation
        entry={experienceData[2]}
        anchorProgress={EXPERIENCE_ANCHORS[2]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={0.60}
        nextLabel="03 / SELECTED WORK EXHIBITION"
        onSelectProgress={onSelectProgress}
      />
    </>
  );
};
