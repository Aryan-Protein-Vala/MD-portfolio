'use client';

import React, { useRef } from 'react';
import { projectsData, ProjectEntry } from '@/data/projects';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectsSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onSelectProgress: (progress: number) => void;
}

const PROJECT_ANCHORS = [0.60, 0.69, 0.78];

/**
 * 3D Architectural Installations for each Selected Work project:
 * 1. PROMETHEUS (Z=-98): Multi-plane connected application architecture (Web Client + Admin Control Plane + Bare-Metal Rust Enforcer)
 * 2. AETHER (Z=-114): Dual endpoint nodes with multiplexed QUIC/mmap zero-copy data stream lines
 * 3. ASTRAL NETWORK (Z=-130): Dual mobile-device planes connected via Bluetooth Low Energy packet path
 */
export const ProjectsScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  const aetherPulseRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!aetherPulseRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    aetherPulseRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
  });

  return (
    <group name="chapter-03-projects-3d">
      {/* INSTALLATION 01: PROMETHEUS — 3 Connected Application Planes */}
      <group position={[-4.8, 1.0, -98]}>
        <GlassPanel
          position={[-1.4, 0.9, 0.8]}
          size={[2.8, 1.7, 0.06]}
          rotation={[0, 0.18, 0]}
          opacity={0.36}
          reducedMotion={reducedMotion}
        />
        <GlassPanel
          position={[0.2, 0.0, 0.0]}
          size={[3.0, 1.8, 0.06]}
          rotation={[0, 0.14, 0]}
          opacity={0.34}
          reducedMotion={reducedMotion}
        />
        <GlassPanel
          position={[1.6, -0.9, -0.8]}
          size={[2.8, 1.7, 0.06]}
          rotation={[0, 0.1, 0]}
          opacity={0.4}
          reducedMotion={reducedMotion}
        />
        <Line
          points={[
            [-1.4, 0.9, 0.85],
            [0.2, 0.0, 0.05],
            [1.6, -0.9, -0.75],
          ]}
          color="#141413"
          lineWidth={1.6}
        />
      </group>

      {/* INSTALLATION 02: AETHER — Dual Endpoint Zero-Copy Transfer Bridge */}
      <group ref={aetherPulseRef} position={[5.0, 0.4, -114]}>
        <GlassPanel
          position={[-2.2, 0.4, 0.4]}
          size={[2.1, 2.5, 0.08]}
          rotation={[0, -0.15, 0]}
          opacity={0.38}
          reducedMotion={reducedMotion}
        />
        <GlassPanel
          position={[2.2, -0.2, -0.4]}
          size={[2.1, 2.5, 0.08]}
          rotation={[0, -0.15, 0]}
          opacity={0.38}
          reducedMotion={reducedMotion}
        />
        {/* Multiplexed QUIC / mmap stream lines connecting the two endpoints */}
        {[-0.4, -0.15, 0.1, 0.35].map((yOffset, i) => (
          <Line
            key={`stream-${i}`}
            points={[
              [-1.1, yOffset + 0.2, 0.2],
              [0.0, yOffset + (i % 2 === 0 ? 0.25 : -0.15), 0.0],
              [1.1, yOffset, -0.2],
            ]}
            color="#141413"
            lineWidth={1.3}
            transparent
            opacity={0.55}
          />
        ))}
      </group>

      {/* INSTALLATION 03: ASTRAL NETWORK — Dual Mobile Planes with BLE Mesh Path */}
      <group position={[-4.5, -0.5, -130]}>
        <GlassPanel
          position={[-1.8, 0.2, 0.5]}
          size={[1.6, 3.1, 0.07]}
          rotation={[0, 0.2, -0.04]}
          opacity={0.38}
          reducedMotion={reducedMotion}
        />
        <GlassPanel
          position={[1.8, -0.1, -0.3]}
          size={[1.6, 3.1, 0.07]}
          rotation={[0, -0.12, 0.04]}
          opacity={0.38}
          reducedMotion={reducedMotion}
        />
        <Line
          points={[
            [-1.0, 0.4, 0.4],
            [-0.3, 0.9, 0.2],
            [0.4, -0.5, 0.0],
            [1.0, 0.1, -0.2],
          ]}
          color="#141413"
          lineWidth={1.5}
        />
      </group>
    </group>
  );
};

/**
 * Custom Architectural Technical Diagram SVG per project installation
 */
const ProjectArchitectureDiagram: React.FC<{
  type: ProjectEntry['installationType'];
}> = ({ type }) => {
  if (type === 'prometheus-planes') {
    return (
      <svg
        viewBox="0 0 520 220"
        className="w-full h-44 stroke-ink fill-none"
        role="img"
        aria-label="Prometheus Multi-Plane Architecture Diagram"
      >
        {/* Plane 1: Next.js Web Client */}
        <rect
          x="18"
          y="24"
          width="135"
          height="78"
          strokeWidth="1.2"
          fill="rgba(243,240,234,0.75)"
        />
        <text
          x="28"
          y="44"
          className="fill-ink font-mono text-[9px] tracking-widest"
          stroke="none"
        >
          PLANE 01 // WEB
        </text>
        <text
          x="28"
          y="64"
          className="fill-ink font-mono text-[11px] font-bold"
          stroke="none"
        >
          NEXT.JS CLIENT
        </text>
        <text
          x="28"
          y="82"
          className="fill-ink-muted font-mono text-[8px]"
          stroke="none"
        >
          SSR + TAILWIND UI
        </text>

        {/* Plane 2: React Admin Control Plane */}
        <rect
          x="192"
          y="24"
          width="135"
          height="78"
          strokeWidth="1.2"
          fill="rgba(243,240,234,0.75)"
        />
        <text
          x="202"
          y="44"
          className="fill-ink font-mono text-[9px] tracking-widest"
          stroke="none"
        >
          PLANE 02 // ADMIN
        </text>
        <text
          x="202"
          y="64"
          className="fill-ink font-mono text-[11px] font-bold"
          stroke="none"
        >
          REACT DASHBOARD
        </text>
        <text
          x="202"
          y="82"
          className="fill-ink-muted font-mono text-[8px]"
          stroke="none"
        >
          FLEET &amp; POLICY CONTROL
        </text>

        {/* Plane 3: Rust Terminal & Bare-Metal Enforcer */}
        <rect
          x="366"
          y="24"
          width="136"
          height="78"
          strokeWidth="1.5"
          fill="rgba(20,20,19,0.06)"
        />
        <text
          x="376"
          y="44"
          className="fill-ink font-mono text-[9px] tracking-widest"
          stroke="none"
        >
          PLANE 03 // LOW-LEVEL
        </text>
        <text
          x="376"
          y="64"
          className="fill-ink font-mono text-[11px] font-bold"
          stroke="none"
        >
          RUST TUI &amp; DAEMON
        </text>
        <text
          x="376"
          y="82"
          className="fill-ink-muted font-mono text-[8px]"
          stroke="none"
        >
          BARE-METAL ENFORCER
        </text>

        {/* Bottom Shared Infrastructure Plane: Supabase State Sync */}
        <rect
          x="70"
          y="144"
          width="380"
          height="54"
          strokeWidth="1.2"
          fill="rgba(243,240,234,0.85)"
        />
        <text
          x="260"
          y="168"
          textAnchor="middle"
          className="fill-ink font-mono text-[10px] font-bold tracking-widest"
          stroke="none"
        >
          SUPABASE INFRASTRUCTURE // SECURE SCHEMA &amp; REALTIME STATE SYNC
        </text>
        <text
          x="260"
          y="184"
          textAnchor="middle"
          className="fill-ink-muted font-mono text-[8px] tracking-wider"
          stroke="none"
        >
          POSTGRESQL + RLS + MULTI-CLIENT EVENT DISPATCH
        </text>

        {/* Connection vectors */}
        <line x1="85" y1="102" x2="160" y2="144" strokeWidth="1" />
        <line x1="260" y1="102" x2="260" y2="144" strokeWidth="1" />
        <line x1="434" y1="102" x2="360" y2="144" strokeWidth="1.2" />
      </svg>
    );
  }

  if (type === 'aether-throughput') {
    return (
      <svg
        viewBox="0 0 520 220"
        className="w-full h-44 stroke-ink fill-none"
        role="img"
        aria-label="Aether Zero-Copy Peer-to-Peer Data Transfer Diagram"
      >
        {/* Endpoint A */}
        <rect
          x="18"
          y="36"
          width="124"
          height="148"
          strokeWidth="1.3"
          fill="rgba(243,240,234,0.8)"
        />
        <text
          x="30"
          y="58"
          className="fill-ink font-mono text-[9px] font-bold"
          stroke="none"
        >
          NODE.A // SOURCE
        </text>
        <rect x="30" y="72" width="100" height="36" strokeWidth="0.9" />
        <text
          x="38"
          y="94"
          className="fill-ink font-mono text-[9px]"
          stroke="none"
        >
          mmap() KERNEL BUF
        </text>
        <rect x="30" y="120" width="100" height="44" strokeWidth="0.9" />
        <text
          x="38"
          y="142"
          className="fill-ink font-mono text-[8px]"
          stroke="none"
        >
          ZERO USER-SPACE COPY
        </text>

        {/* Multiplexed Streams Center */}
        <line
          x1="142"
          y1="72"
          x2="378"
          y2="72"
          strokeWidth="1.4"
          strokeDasharray="6 3"
        />
        <line x1="142" y1="102" x2="378" y2="102" strokeWidth="1.8" />
        <line
          x1="142"
          y1="132"
          x2="378"
          y2="132"
          strokeWidth="1.4"
          strokeDasharray="4 4"
        />
        <line x1="142" y1="162" x2="378" y2="162" strokeWidth="1.1" />

        <rect
          x="182"
          y="78"
          width="156"
          height="64"
          fill="#141413"
          stroke="none"
        />
        <text
          x="260"
          y="105"
          textAnchor="middle"
          className="fill-ivory font-mono text-[15px] font-bold tracking-wider"
          stroke="none"
        >
          ~71 MB/s
        </text>
        <text
          x="260"
          y="126"
          textAnchor="middle"
          className="fill-ivory/80 font-mono text-[9px] tracking-widest"
          stroke="none"
        >
          5 GB IN 72.11 SECONDS
        </text>

        <text
          x="260"
          y="56"
          textAnchor="middle"
          className="fill-ink font-mono text-[8px] tracking-widest"
          stroke="none"
        >
          QUIC / TCP STREAM MULTIPLEXING + CONCURRENT CHUNKING
        </text>

        {/* Endpoint B */}
        <rect
          x="378"
          y="36"
          width="124"
          height="148"
          strokeWidth="1.3"
          fill="rgba(243,240,234,0.8)"
        />
        <text
          x="390"
          y="58"
          className="fill-ink font-mono text-[9px] font-bold"
          stroke="none"
        >
          NODE.B // PEER SINK
        </text>
        <rect x="390" y="72" width="100" height="36" strokeWidth="0.9" />
        <text
          x="398"
          y="94"
          className="fill-ink font-mono text-[9px]"
          stroke="none"
        >
          THREAD-SAFE SYNC
        </text>
        <rect x="390" y="120" width="100" height="44" strokeWidth="0.9" />
        <text
          x="398"
          y="142"
          className="fill-ink font-mono text-[8px]"
          stroke="none"
        >
          DIRECT DISK COMMIT
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 520 220"
      className="w-full h-44 stroke-ink fill-none"
      role="img"
      aria-label="Astral Network Offline BLE Transaction Topology"
    >
      {/* Mobile Device Plane 1 (Swift / CoreBluetooth) */}
      <rect
        x="28"
        y="22"
        width="116"
        height="176"
        rx="6"
        strokeWidth="1.4"
        fill="rgba(243,240,234,0.82)"
      />
      <text
        x="86"
        y="46"
        textAnchor="middle"
        className="fill-ink font-mono text-[9px] font-bold"
        stroke="none"
      >
        DEVICE PLANE A
      </text>
      <text
        x="86"
        y="62"
        textAnchor="middle"
        className="fill-ink-muted font-mono text-[8px]"
        stroke="none"
      >
        SWIFT // COREBLUETOOTH
      </text>
      <rect x="42" y="78" width="88" height="42" strokeWidth="0.8" />
      <text
        x="86"
        y="102"
        textAnchor="middle"
        className="fill-ink font-mono text-[8px]"
        stroke="none"
      >
        ASYNC STATE MACHINE
      </text>
      <rect x="42" y="132" width="88" height="44" strokeWidth="0.8" />
      <text
        x="86"
        y="156"
        textAnchor="middle"
        className="fill-ink font-mono text-[8px]"
        stroke="none"
      >
        MTU FRAGMENTER
      </text>

      {/* BLE Radio & Noise Protocol Session Channel */}
      <path
        d="M 144 82 Q 260 38, 376 82"
        strokeWidth="1.3"
        strokeDasharray="4 3"
      />
      <path d="M 144 114 L 376 114" strokeWidth="1.5" />
      <path
        d="M 144 146 Q 260 190, 376 146"
        strokeWidth="1.3"
        strokeDasharray="4 3"
      />

      <rect
        x="178"
        y="86"
        width="164"
        height="54"
        fill="rgba(243,240,234,0.95)"
        stroke="#141413"
        strokeWidth="1.2"
      />
      <text
        x="260"
        y="108"
        textAnchor="middle"
        className="fill-ink font-mono text-[10px] font-bold"
        stroke="none"
      >
        NOISE PROTOCOL SESSION
      </text>
      <text
        x="260"
        y="126"
        textAnchor="middle"
        className="fill-ink-muted font-mono text-[8px]"
        stroke="none"
      >
        HARDWARE MTU-AWARE PACKETS // 0-CELLULAR
      </text>

      {/* Mobile Device Plane 2 (Kotlin / Android BLE) */}
      <rect
        x="376"
        y="22"
        width="116"
        height="176"
        rx="6"
        strokeWidth="1.4"
        fill="rgba(243,240,234,0.82)"
      />
      <text
        x="434"
        y="46"
        textAnchor="middle"
        className="fill-ink font-mono text-[9px] font-bold"
        stroke="none"
      >
        DEVICE PLANE B
      </text>
      <text
        x="434"
        y="62"
        textAnchor="middle"
        className="fill-ink-muted font-mono text-[8px]"
        stroke="none"
      >
        KOTLIN // ANDROID BLE
      </text>
      <rect x="390" y="78" width="88" height="42" strokeWidth="0.8" />
      <text
        x="434"
        y="102"
        textAnchor="middle"
        className="fill-ink font-mono text-[8px]"
        stroke="none"
      >
        PACKET REASSEMBLY
      </text>
      <rect x="390" y="132" width="88" height="44" strokeWidth="0.8" />
      <text
        x="434"
        y="156"
        textAnchor="middle"
        className="fill-ink font-mono text-[8px]"
        stroke="none"
      >
        OFFLINE LEDGER ACK
      </text>
    </svg>
  );
};

const SingleProjectInstallation: React.FC<{
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
  const isRightAligned = project.id === 'aether';
  const titleStyle = computeKineticTitleStyle(
    masterProgress,
    anchorProgress,
    0.09,
    isRightAligned ? 10 : -10,
    -5,
    reducedMotion
  );

  return (
    <SpatialPanel
      id={`chapter-03-${project.id}`}
      ariaLabel={`Chapter 03 Selected Work: ${project.title}`}
      anchorProgress={anchorProgress}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.075}
      entryDirection={isRightAligned ? 'right' : 'left'}
      parallaxDepth={1.15}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1440px] h-full px-5 sm:px-10 md:px-16 pt-24 pb-14 flex flex-col justify-between">
        {/* Top Datum Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-ink text-ivory font-mono text-[10px] tracking-[0.16em]">
              03 / SELECTED WORK — {project.index}
            </span>
            <span className="type-tech-label">{project.axisCode}</span>
          </div>
          <span className="type-tech-micro">
            PLANE Z: {project.spatialPosition[2]}.0m // THINGS I HAVE BUILT
          </span>
        </div>

        {/* Main Exhibition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
          {/* Left/Right Project Identity, Prominent Metrics & GitHub Repository Action */}
          <div
            className={`lg:col-span-5 space-y-4 ${
              isRightAligned ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <div style={titleStyle}>
              <div className="type-tech-label text-ink-secondary">
                {project.index} // TECHNICAL INSTALLATION
              </div>
              <h2 className="type-chapter-index mt-0.5">{project.title}</h2>
              <p className="font-mono text-xs text-ink-secondary mt-1">
                {project.subtitle}
              </p>
            </div>

            <p className="type-body-copy text-ink">{project.description}</p>

            {/* Prominent Telemetry Metrics (Especially Aether ~71 MB/s & 5 GB / 72.11s) */}
            {project.featuredMetrics && (
              <div className="grid grid-cols-2 gap-3 pt-1">
                {project.featuredMetrics.map((m) => (
                  <div
                    key={m.label}
                    className="border border-ink bg-ivory-light/90 p-3"
                  >
                    <div className="type-tech-micro text-ink-muted">
                      {m.label}
                    </div>
                    <div className="font-display text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-0.5">
                      {m.value}
                    </div>
                    <div className="font-mono text-[10px] text-ink-secondary mt-0.5">
                      {m.subtext}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Technology Stack Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 bg-ink text-ivory"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Functional GitHub Repository Link + Next Installation Control */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="arch-interactive-btn"
              >
                <span>GITHUB // {project.repoSlug}</span>
                <span className="btn-arrow">↗</span>
              </a>

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

          {/* Spatial Installation Diagram & Replaceable Screenshot Artefact Panel */}
          <div
            className={`lg:col-span-7 spatial-glass-panel p-5 sm:p-6 space-y-4 ${
              isRightAligned ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2 gap-2">
              <span className="type-tech-label text-ink font-semibold">
                {project.screenshotPlaceholder.code}
              </span>
              <span className="type-tech-micro">
                ILLUSTRATIVE ARCHITECTURAL DIAGRAM (REPLACEABLE PLACEHOLDER)
              </span>
            </div>

            {/* Custom SVG Architectural Topology */}
            <div className="border border-ink/25 bg-ivory/75 p-3 blueprint-subgrid">
              <ProjectArchitectureDiagram type={project.installationType} />
              <div className="mt-2 pt-2 border-t border-ink/15 flex items-center justify-between text-[10px] font-mono text-ink-muted">
                <span>{project.screenshotPlaceholder.label}</span>
                <span>{project.screenshotPlaceholder.note}</span>
              </div>
            </div>

            {/* Highlights List */}
            <div>
              <div className="type-tech-micro mb-2 text-ink font-semibold">
                VERIFIED ARCHITECTURAL HIGHLIGHTS
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-mono text-xs text-ink border-l border-ink/35 pl-2.5 py-0.5"
                  >
                    <span className="text-[10px] text-ink-muted">
                      0{i + 1}.
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Switcher */}
        <div className="hidden sm:flex items-center justify-between border-t border-ink/15 pt-2 type-tech-micro">
          <div className="flex items-center gap-2">
            <span>EXHIBITION INSTALLATIONS:</span>
            {projectsData.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProgress(PROJECT_ANCHORS[idx])}
                className={`px-2 py-0.5 font-mono text-[10px] border ${
                  p.id === project.id
                    ? 'bg-ink text-ivory border-ink'
                    : 'border-ink/20 text-ink-muted hover:text-ink'
                }`}
              >
                {p.index} // {p.title}
              </button>
            ))}
          </div>
          <span>Editable in src/data/projects.ts</span>
        </div>
      </div>
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
      <SingleProjectInstallation
        project={projectsData[0]}
        anchorProgress={PROJECT_ANCHORS[0]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={PROJECT_ANCHORS[1]}
        nextLabel="NEXT // AETHER (~71 MB/S)"
        onSelectProgress={onSelectProgress}
      />
      <SingleProjectInstallation
        project={projectsData[1]}
        anchorProgress={PROJECT_ANCHORS[1]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={PROJECT_ANCHORS[2]}
        nextLabel="NEXT // ASTRAL NETWORK"
        onSelectProgress={onSelectProgress}
      />
      <SingleProjectInstallation
        project={projectsData[2]}
        anchorProgress={PROJECT_ANCHORS[2]}
        masterProgress={masterProgress}
        pointer={pointer}
        reducedMotion={reducedMotion}
        nextProgress={0.87}
        nextLabel="04 / TECHNICAL UNIVERSE"
        onSelectProgress={onSelectProgress}
      />
    </>
  );
};
