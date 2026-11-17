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
    <group name="chapter-06-contact-3d" position={[0, -79.2, -1.5]}>
      <GlassPanel
        position={[0, 0, 0.5]}
        size={[5.2, 3.0, 0.07]}
        rotation={[-0.08, 0, 0]}
        opacity={0.3}
        floatIntensity={0.3}
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
  const { contact } = profileData;
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
      activeWindow={0.065}
      entryDirection="center"
      parallaxDepth={0.7}
      reducedMotion={reducedMotion}
    >
      {(metrics) => (
        <div className="relative w-full max-w-[1320px] px-6 sm:px-14 md:px-20">
          {/* Monument Closing Typography */}
          <div className="mb-8">
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase mb-1">
              06 / {contact.theme}
            </div>
            <h2 className="font-display text-[clamp(2.6rem,7.5vw,7.4rem)] font-bold tracking-[-0.04em] text-ink leading-[0.88] uppercase">
              {contact.promptHeadline}
              <br />
              {contact.promptSubheadline}
            </h2>
          </div>

          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-150"
          >
            {contact.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.id === 'email' ? undefined : '_blank'}
                rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                className="spatial-glass-panel p-5 hover:bg-ink hover:text-ivory transition-colors group block"
              >
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] opacity-70">
                  <span>{link.label}</span>
                  <span>↗</span>
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold mt-2 break-all">
                  {link.value}
                </div>
              </a>
            ))}
          </div>

          <div
            style={{ opacity: metrics.bodyOpacity }}
            className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ink/20"
          >
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
              <span>00 / RETURN TO ORIGIN</span>
              <span className="btn-arrow">↑</span>
            </button>
          </div>
        </div>
      )}
    </SpatialPanel>
  );
};
