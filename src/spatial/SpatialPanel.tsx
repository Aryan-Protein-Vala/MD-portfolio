'use client';

import React from 'react';
import { computeSpatialPlaneMetrics } from '@/animation/SceneTransitions';
import { computeLayerParallax } from '@/animation/ParallaxController';

interface SpatialPanelProps {
  anchorProgress: number;
  masterProgress: number;
  pointer: { x: number; y: number };
  activeWindow?: number;
  entryDirection?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  parallaxDepth?: number;
  reducedMotion?: boolean;
  className?: string;
  id?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

/**
 * Hybrid DOM Spatial Wrapper that synchronizes HTML content panels with the 3D camera journey.
 * Applies continuous 3D perspective transforms, parallax, and depth-of-field blur while remaining
 * sharp, accessible, and responsive across desktop (1440px+) and mobile (390px) viewports.
 */
export const SpatialPanel: React.FC<SpatialPanelProps> = ({
  anchorProgress,
  masterProgress,
  pointer,
  activeWindow = 0.11,
  entryDirection = 'center',
  parallaxDepth = 1.0,
  reducedMotion = false,
  className = '',
  id,
  ariaLabel,
  children,
}) => {
  const metrics = computeSpatialPlaneMetrics(
    masterProgress,
    anchorProgress,
    activeWindow,
    entryDirection,
    reducedMotion
  );
  const parallax = computeLayerParallax(
    pointer,
    masterProgress,
    parallaxDepth,
    reducedMotion
  );

  const tx = metrics.translateX + parallax.x;
  const ty = metrics.translateY + parallax.y;

  // Enable pointer events when chapter is in or near the active focal window
  const isInteractive = Math.abs(metrics.relativeProgress) <= 0.58;

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      style={{
        opacity: metrics.opacity,
        transform: reducedMotion
          ? 'none'
          : `perspective(1200px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, ${metrics.translateZ.toFixed(1)}px) scale(${metrics.scale})`,
        filter:
          metrics.blurPx > 0.25 && !reducedMotion
            ? `blur(${metrics.blurPx}px)`
            : 'none',
        pointerEvents: isInteractive ? 'auto' : 'none',
        visibility: metrics.isVisible ? 'visible' : 'hidden',
        zIndex: isInteractive ? 35 : 15,
      }}
      className={`fixed inset-0 flex items-center justify-center overflow-y-auto overflow-x-hidden transition-opacity duration-150 will-change-transform ${className}`}
    >
      {children}
    </section>
  );
};
