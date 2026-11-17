'use client';

import React, { useState } from 'react';
import { projectsData, ProjectEntry } from '@/data/projects';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';
import { Line } from '@react-three/drei';

interface ProjectsSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onSelectProgress: (progress: number) => void;
}

const PROJECT_ANCHORS = [0.59, 0.69, 0.79];
const PROJECT_3D_COORDS: [number, number, number][] = [
  [0.9, -39.5, -2.2],
  [-1.0, -47.5, -2.5],
  [0.8, -55.5, -2.0],
];

export const ProjectsScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-03-projects-3d">
      <Line
        points={PROJECT_3D_COORDS}
        color="#141413"
        lineWidth={1.3}
        transparent
        opacity={0.4}
      />
      {PROJECT_3D_COORDS.map((pos, idx) => (
        <GlassPanel
          key={`proj-3d-${idx}`}
          position={[pos[0] + (idx % 2 === 0 ? -2.8 : 2.8), pos[1], pos[2] + 0.9]}
          size={[4.0, 2.3, 0.08]}
          rotation={[-0.12, idx % 2 === 0 ? 0.06 : -0.06, 0]}
          opacity={0.3}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
};

/**
 * Clean, single-glance architectural schematic for each project installation
 */
const ProjectSchematicSVG: React.FC<{
  type: ProjectEntry['installationType'];
}> = ({ type }) => {
  if (type === 'prometheus-planes') {
    return (
      <svg
        viewBox="0 0 460 120"
        className="w-full h-28 stroke-ink fill-none"
        role="img"
        aria-label="Prometheus 3-Plane Architecture"
      >
        <rect x="10" y="16" width="120" height="52" strokeWidth="1.2" />
        <text x="20" y="38" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          01. NEXT.JS WEB
        </text>
        <text x="20" y="54" className="fill-ink-muted font-mono text-[8px]" stroke="none">
          CLIENT INTERFACE
        </text>

        <rect x="170" y="16" width="120" height="52" strokeWidth="1.2" />
        <text x="180" y="38" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          02. REACT ADMIN
        </text>
        <text x="180" y="54" className="fill-ink-muted font-mono text-[8px]" stroke="none">
          CONTROL DASHBOARD
        </text>

        <rect x="330" y="16" width="120" height="52" strokeWidth="1.5" />
        <text x="340" y="38" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          03. RUST TUI
        </text>
        <text x="340" y="54" className="fill-ink-muted font-mono text-[8px]" stroke="none">
          BARE-METAL ENFORCER
        </text>

        <line x1="70" y1="68" x2="230" y2="98" strokeWidth="1" />
        <line x1="230" y1="68" x2="230" y2="98" strokeWidth="1" />
        <line x1="390" y1="68" x2="230" y2="98" strokeWidth="1" />
        <text x="230" y="112" textAnchor="middle" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          SUPABASE SCHEMA &amp; STATE SYNCHRONIZATION
        </text>
      </svg>
    );
  }

  if (type === 'aether-throughput') {
    return (
      <svg
        viewBox="0 0 460 120"
        className="w-full h-28 stroke-ink fill-none"
        role="img"
        aria-label="Aether Zero-Copy P2P Engine"
      >
        <rect x="12" y="24" width="105" height="72" strokeWidth="1.2" />
        <text x="22" y="52" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          SOURCE NODE
        </text>
        <text x="22" y="70" className="fill-ink-muted font-mono text-[8px]" stroke="none">
          mmap() ZERO-COPY
        </text>

        <line x1="117" y1="45" x2="343" y2="45" strokeWidth="1.2" strokeDasharray="5 3" />
        <line x1="117" y1="60" x2="343" y2="60" strokeWidth="1.8" />
        <line x1="117" y1="75" x2="343" y2="75" strokeWidth="1.2" strokeDasharray="5 3" />

        <rect x="162" y="34" width="136" height="52" fill="#141413" stroke="none" />
        <text x="230" y="58" textAnchor="middle" className="fill-ivory font-mono text-[13px] font-bold" stroke="none">
          ~71 MB/s
        </text>
        <text x="230" y="74" textAnchor="middle" className="fill-ivory/80 font-mono text-[8px]" stroke="none">
          5 GB IN 72.11s // QUIC
        </text>

        <rect x="343" y="24" width="105" height="72" strokeWidth="1.2" />
        <text x="353" y="52" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
          PEER SINK
        </text>
        <text x="353" y="70" className="fill-ink-muted font-mono text-[8px]" stroke="none">
          CONCURRENT CHUNKS
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 460 120"
      className="w-full h-28 stroke-ink fill-none"
      role="img"
      aria-label="Astral Network BLE Mesh"
    >
      <rect x="14" y="20" width="110" height="80" rx="4" strokeWidth="1.2" />
      <text x="26" y="50" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
        SWIFT // iOS
      </text>
      <text x="26" y="68" className="fill-ink-muted font-mono text-[8px]" stroke="none">
        COREBLUETOOTH
      </text>

      <path d="M 124 45 Q 230 18, 336 45" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1="124" y1="60" x2="336" y2="60" strokeWidth="1.4" />
      <path d="M 124 75 Q 230 102, 336 75" strokeWidth="1.2" strokeDasharray="4 3" />

      <rect x="155" y="42" width="150" height="36" fill="#F3F0EA" stroke="#141413" strokeWidth="1.1" />
      <text x="230" y="63" textAnchor="middle" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
        NOISE PROTOCOL + MTU
      </text>

      <rect x="336" y="20" width="110" height="80" rx="4" strokeWidth="1.2" />
      <text x="348" y="50" className="fill-ink font-mono text-[9px] font-bold" stroke="none">
        KOTLIN // ANDROID
      </text>
      <text x="348" y="68" className="fill-ink-muted font-mono text-[8px]" stroke="none">
        OFFLINE BLE SDK
      </text>
    </svg>
  );
};

const SingleProjectStop: React.FC<{
  project: ProjectEntry;
  anchorProgress: number;
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  nextProgress: number;
  nextLabel: string;
  onSelectProgress: (p: number) => void;
}> = ({
  project,
  anchorProgress,
  masterProgress,
  pointer,
  reducedMotion,
  nextProgress,
  nextLabel,
  onSelectProgress,
}) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const visibleHighlights = showAllHighlights
    ? project.highlights
    : project.highlights.slice(0, 4);

  return (
    <SpatialPanel
      id={`chapter-03-${project.id}`}
      ariaLabel={`Chapter 03 Project: ${project.title}`}
      anchorProgress={anchorProgress}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.095}
      entryDirection={project.id === 'aether' ? 'right' : 'left'}
      parallaxDepth={0.95}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Giant Monument Project Header on the Architectural Plan */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
                03 / SELECTED WORK — {project.index}
              </div>
              <h2 className="font-display text-[clamp(2.5rem,6.6vw,6.4rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
                {project.index} /
                <br />
                {project.title}
              </h2>
            </div>

            {/* Prominent Telemetry Badges */}
            {project.featuredMetrics && (
              <div
                style={{ opacity: metrics.bodyOpacity }}
                className="flex gap-3 transition-opacity duration-150"
              >
                {project.featuredMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="border border-ink bg-ivory/90 px-4 py-2.5"
                  >
                    <div className="font-mono text-[9px] tracking-[0.14em] text-ink-muted">
                      {m.label}
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-ink leading-none mt-1">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Focused 2-Column Architectural Installation (fades cleanly when leaving station) */}
          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-opacity duration-150"
          >
            {/* Left: Description, Stack & GitHub Link */}
            <div className="lg:col-span-5 space-y-4 border-l border-ink/30 pl-5 bg-ivory/70 backdrop-blur-[4px] py-3">
              <p className="type-body-lead font-medium text-ink">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-0.5 bg-ink text-ivory"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arch-interactive-btn"
                >
                  <span>GITHUB // SOURCE</span>
                  <span className="btn-arrow">↗</span>
                </a>
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

            {/* Right: Architectural Schematic Plate + Key Highlights */}
            <div className="lg:col-span-7 spatial-glass-panel p-5 space-y-4">
              <div className="border border-ink/20 bg-ivory/80 p-3 blueprint-subgrid">
                <ProjectSchematicSVG type={project.installationType} />
                <div className="mt-1 pt-1.5 border-t border-ink/15 flex items-center justify-between font-mono text-[9px] text-ink-muted">
                  <span>{project.screenshotPlaceholder.label}</span>
                  <span>REPLACEABLE SCREENSHOT PLACEHOLDER</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="type-tech-micro text-ink font-semibold">
                  ARCHITECTURAL SPECIFICATIONS
                </span>
                {project.highlights.length > 4 && (
                  <button
                    type="button"
                    onClick={() => setShowAllHighlights((prev) => !prev)}
                    className="font-mono text-[9px] tracking-[0.14em] text-ink underline uppercase cursor-pointer"
                  >
                    {showAllHighlights
                      ? '[ − COMPACT VIEW ]'
                      : `[ + ALL ${project.highlights.length} SPECS ]`}
                  </button>
                )}
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {visibleHighlights.map((h, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs text-ink border-l border-ink/35 pl-2.5 py-0.5"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};

export const ProjectsScene: React.FC<ProjectsSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onSelectProgress,
}) => {
  return (
    <>
      <SingleProjectStop
        project={projectsData[0]}
        anchorProgress={PROJECT_ANCHORS[0]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={PROJECT_ANCHORS[1]}
        nextLabel="03.B / AETHER (~71 MB/S)"
        onSelectProgress={onSelectProgress}
      />
      <SingleProjectStop
        project={projectsData[1]}
        anchorProgress={PROJECT_ANCHORS[1]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={PROJECT_ANCHORS[2]}
        nextLabel="03.C / ASTRAL NETWORK"
        onSelectProgress={onSelectProgress}
      />
      <SingleProjectStop
        project={projectsData[2]}
        anchorProgress={PROJECT_ANCHORS[2]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={0.88}
        nextLabel="04 / TECHNICAL UNIVERSE"
        onSelectProgress={onSelectProgress}
      />
    </>
  );
};
