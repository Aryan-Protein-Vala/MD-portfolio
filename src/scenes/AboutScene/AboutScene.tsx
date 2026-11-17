'use client';

import React from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { computeKineticTitleStyle } from '@/animation/TypographyMotion';
import { GlassPanel } from '@/spatial/GlassPanel';
import { ImagePlane } from '@/spatial/ImagePlane';

interface AboutSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onNextChapter: () => void;
}

export const AboutScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-01-3d" position={[0, 0, -26]}>
      {/* Floating Portrait Monolith Plane in 3D space */}
      <ImagePlane
        position={[-4.2, 0.5, 1.5]}
        size={[3.1, 4.0]}
        rotation={[0, 0.14, 0]}
        variant="portrait-monolith"
        reducedMotion={reducedMotion}
      />

      {/* Translucent glass plane overlapping the identity installation */}
      <GlassPanel
        position={[2.4, -0.6, 2.2]}
        size={[4.4, 2.8, 0.08]}
        rotation={[0, -0.08, 0]}
        opacity={0.34}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export const AboutScene: React.FC<AboutSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onNextChapter,
}) => {
  const { about } = profileData;

  const titleStyle = computeKineticTitleStyle(
    masterProgress,
    0.18,
    0.11,
    10,
    -6,
    reducedMotion
  );

  return (
    <SpatialPanel
      id="chapter-01"
      ariaLabel="Chapter 01: The Person Behind The Systems"
      anchorProgress={0.18}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.1}
      entryDirection="left"
      parallaxDepth={1.15}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1400px] h-full px-5 sm:px-10 md:px-16 pt-20 pb-14 flex flex-col justify-between">
        {/* Top Chapter Coordinate Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="reg-crosshair" />
            <span className="type-tech-label text-ink font-semibold">
              {about.axisCode}
            </span>
          </div>
          <span className="type-tech-micro">
            THEME // {about.theme} — PLANE Z: -26.0m
          </span>
        </div>

        {/* Main Asymmetric Spatial Composition: Left Floating Portrait Plane + Right Typography & Education Planes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center my-auto py-2">
          {/* Left Column: Floating Portrait Image Plane Placeholder + Metadata Annotations */}
          <div className="lg:col-span-4 space-y-4">
            <div className="spatial-glass-panel p-4 blueprint-subgrid relative">
              <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-3">
                <span className="type-tech-micro font-semibold text-ink">
                  {about.portraitPlaceholder.label}
                </span>
                <span className="type-tech-micro">
                  {about.portraitPlaceholder.aspectRatio}
                </span>
              </div>

              {/* Architectural Portrait Frame */}
              <div className="relative aspect-[4/4.5] max-h-[260px] w-full border border-ink/30 bg-ivory-warm/70 flex flex-col items-center justify-center p-4 overflow-hidden">
                {/* Geometric construction lines inside portrait plane */}
                <svg
                  viewBox="0 0 240 270"
                  className="w-full h-full stroke-ink/45 fill-none"
                  aria-hidden="true"
                >
                  <line x1="0" y1="0" x2="240" y2="270" strokeWidth="0.75" />
                  <line x1="240" y1="0" x2="0" y2="270" strokeWidth="0.75" />
                  <circle cx="120" cy="105" r="46" strokeWidth="1.2" />
                  <circle
                    cx="120"
                    cy="105"
                    r="68"
                    strokeWidth="0.6"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 56 245 C 56 185, 184 185, 184 245"
                    strokeWidth="1.4"
                  />
                  <rect
                    x="18"
                    y="18"
                    width="204"
                    height="234"
                    strokeWidth="1"
                  />
                </svg>
                <div className="absolute bottom-3 left-3 right-3 bg-ivory/90 border border-ink/20 px-2.5 py-1.5">
                  <div className="type-tech-micro text-ink font-semibold">
                    ARYAN SHARMA // INDIA
                  </div>
                  <div className="text-[10px] font-mono text-ink-muted">
                    {about.portraitPlaceholder.caption}
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              <dl className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-ink/15">
                {about.metadata.map((m) => (
                  <div key={m.key} className="col-span-1">
                    <dt className="type-tech-micro">{m.key}</dt>
                    <dd className="font-mono text-[11px] font-semibold text-ink truncate">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Column: Kinetic Chapter Typography + Personal Philosophy + Editable IIT Madras Education Panel */}
          <div className="lg:col-span-8 space-y-5">
            <div style={titleStyle}>
              <div className="type-tech-label mb-1">
                {about.chapterNumber} / {about.theme}
              </div>
              <h2 className="type-chapter-index">{about.chapterTitle}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* Introductory Copy Plane */}
              <div className="md:col-span-7 spatial-glass-panel p-5 sm:p-6 space-y-3">
                <div className="type-tech-micro border-b border-ink/15 pb-1.5">
                  NARRATIVE PLANE // EDITABLE IN SRC/DATA/PROFILE.TS
                </div>
                {about.copy.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'type-body-lead font-medium text-ink'
                        : 'type-body-copy text-ink-secondary'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Education Spatial Plane */}
              <div className="md:col-span-5 spatial-glass-panel p-5 flex flex-col justify-between bg-ivory-light/85">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-ink/15 pb-1.5">
                    <span className="type-tech-micro text-ink font-semibold">
                      ACADEMIC FOUNDATION
                    </span>
                    <span className="type-tech-micro">EDITABLE</span>
                  </div>

                  <div>
                    <div className="type-tech-micro">INSTITUTION</div>
                    <h3 className="font-display text-lg font-bold text-ink leading-tight mt-0.5">
                      {about.education.institution}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="type-tech-micro">PROGRAMS</div>
                    <ul className="space-y-1.5">
                      {about.education.degrees.map((deg) => (
                        <li
                          key={deg}
                          className="font-mono text-xs text-ink border-l-2 border-ink pl-2.5 py-0.5"
                        >
                          {deg}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-ink/15 space-y-1">
                    <div className="font-mono text-[11px] text-ink font-medium">
                      {about.education.period}
                    </div>
                    <div className="font-mono text-[10px] text-ink-muted">
                      {about.education.status}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-ink/15 flex justify-end">
                  <button
                    type="button"
                    onClick={onNextChapter}
                    className="arch-interactive-btn w-full justify-between"
                  >
                    <span>02 / EXPLORE EXPERIENCE</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Connection Bar */}
        <div className="hidden sm:flex items-center justify-between border-t border-ink/15 pt-2 type-tech-micro">
          <span>LOCATION: {about.location.toUpperCase()}</span>
          <span>NEXT VECTOR: CHAPTER 02 // WHERE IDEAS BECOME SYSTEMS</span>
        </div>
      </div>
    </SpatialPanel>
  );
};
