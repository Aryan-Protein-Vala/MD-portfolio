'use client';

import React, { useState } from 'react';
import { profileData } from '@/data/profile';
import { SpatialPanel } from '@/spatial/SpatialPanel';
import { GlassPanel } from '@/spatial/GlassPanel';

interface ContactSceneProps {
  masterProgress: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  onResetJourney: () => void;
}

export const ContactScene3D: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <group name="chapter-06-contact-3d" position={[0, 0, -192]}>
      <GlassPanel
        position={[0, 0, 0]}
        size={[6.5, 3.8, 0.08]}
        rotation={[0, 0, 0]}
        opacity={0.35}
        floatIntensity={0.4}
        reducedMotion={reducedMotion}
      />
    </group>
  );
};

export const ContactScene: React.FC<ContactSceneProps> = ({
  masterProgress,
  pointer,
  reducedMotion,
  onResetJourney,
}) => {
  const { contact, name } = profileData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SpatialPanel
      id="chapter-06"
      ariaLabel="Chapter 06: Contact"
      anchorProgress={1.0}
      masterProgress={masterProgress}
      pointer={pointer}
      activeWindow={0.07}
      entryDirection="bottom"
      parallaxDepth={0.7}
      reducedMotion={reducedMotion}
    >
      <div className="relative w-full max-w-[1400px] h-full px-5 sm:px-10 md:px-16 pt-24 pb-16 flex flex-col justify-between">
        {/* Top Datum Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-ink/15 pb-2.5">
          <div className="flex items-center gap-3">
            <span className="reg-crosshair" />
            <span className="type-tech-label text-ink font-semibold">
              {contact.axisCode}
            </span>
          </div>
          <span className="type-tech-micro">
            {contact.chapterNumber} / {contact.theme} — PLANE Z: -192.0m
          </span>
        </div>

        {/* Center Quiet Architectural Exhibition Finale */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="type-tech-label text-ink-secondary">
              {contact.chapterNumber} / {contact.theme}
            </div>
            <h2 className="type-monument leading-[0.88] tracking-[-0.035em]">
              <span className="block">{contact.promptHeadline}</span>
              <span className="block text-ink-secondary">
                {contact.promptSubheadline}
              </span>
            </h2>
          </div>

          {/* Right Functional Contact Links & Direct Transmission Panel */}
          <div className="lg:col-span-5 spatial-glass-panel p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-ink/15 pb-2.5">
              <span className="type-tech-label text-ink font-semibold">
                DIRECT CHANNELS // VERIFIED LINKS
              </span>
              <span className="type-tech-micro">ACTIVE</span>
            </div>

            <div className="space-y-3">
              {contact.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel={
                    link.id === 'email' ? undefined : 'noopener noreferrer'
                  }
                  className="block p-3.5 border border-ink/25 bg-ivory-light/85 hover:bg-ink hover:text-ivory transition-colors group"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.15em] opacity-70">
                    <span>{link.label}</span>
                    <span>{link.annotation} ↗</span>
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold mt-1 break-all">
                    {link.value}
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-ink/15 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="arch-interactive-btn"
              >
                <span>
                  {copied ? 'COPIED EMAIL ADDRESS ✓' : 'COPY EMAIL ADDRESS'}
                </span>
              </button>

              <button
                type="button"
                onClick={onResetJourney}
                className="arch-interactive-btn"
              >
                <span>RETURN TO ORIGIN (Z: +18m)</span>
                <span className="btn-arrow">↑</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deliberate Exhibition Colophon */}
        <footer className="border-t border-ink/20 pt-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.16em] text-ink-muted uppercase">
          <span>{name.full} — SPATIAL PORTFOLIO EXHIBITION</span>
          <span>HYBRID THREE.JS / R3F / GSAP ARCHITECTURAL ENGINE</span>
        </footer>
      </div>
    </SpatialPanel>
  );
};
