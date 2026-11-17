'use client';

import React from 'react';
import { computeSpatialPlaneMetrics, SpatialPlaneMetrics } from '@/animation/SceneTransitions';
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
  children:
    | React.ReactNode
    | ((metrics: SpatialPlaneMetrics) => React.ReactNode);
}

/**
 * Places each chapter on the continuous 3D tilted Architectural Drafting Map.
 * As the visitor scrolls, outgoing chapters physically travel UPWARD (-Y) and scale past the top edge of the camera,
 * while incoming chapters rise from the lower drafting map (+Y), matching the reference video (00:00 -> 00:03).
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

  // Only allow clicks on the station currently in focus
  const isInteractive = Math.abs(metrics.relativeProgress) <= 0.36;

  // Higher z-index for outgoing title at top edge, active station in middle, incoming lower on map
  const zIndex = isInteractive
    ? 30
    : metrics.relativeProgress > 0
      ? 35
      : 15;

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      style={{
        opacity: metrics.opacity,
        transform: reducedMotion
          ? 'none'
          : `perspective(1400px) translate3d(calc(${metrics.translateX}vw + ${parallax.x}px), calc(${metrics.translateY}vh + ${parallax.y}px), ${metrics.translateZ}px) rotateX(${metrics.rotateX}deg) rotateY(${metrics.rotateY}deg) rotateZ(${metrics.rotateZ}deg) scale(${metrics.scale})`,
        transformOrigin: '50% 45%',
        filter:
          metrics.blurPx > 0.2 && !reducedMotion
            ? `blur(${metrics.blurPx}px)`
            : 'none',
        pointerEvents: isInteractive ? 'auto' : 'none',
        visibility: metrics.isVisible ? 'visible' : 'hidden',
        zIndex,
      }}
      className={`fixed inset-0 flex items-center justify-center overflow-hidden will-change-transform ${className}`}
    >
      {typeof children === 'function' ? children(metrics) : children}
    </section>
  );
};
