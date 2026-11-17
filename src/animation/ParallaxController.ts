export interface ParallaxLayerOffset {
  x: number;
  y: number;
}

/**
 * Computes multi-plane parallax offsets from pointer coordinates and scroll progress
 * so background drawings, floating glass panels, imagery, and typography travel at distinct rates.
 */
export function computeLayerParallax(
  pointer: { x: number; y: number },
  scrollProgress: number,
  depthFactor: number, // e.g., -0.5 for deep blueprint, 1.0 for mid panel, 1.8 for foreground glass
  reducedMotion: boolean = false
): ParallaxLayerOffset {
  if (reducedMotion) {
    return { x: 0, y: 0 };
  }

  const x = pointer.x * 18 * depthFactor;
  const y = pointer.y * 12 * depthFactor + Math.sin(scrollProgress * Math.PI * 4) * 6 * depthFactor;

  return {
    x: Number(x.toFixed(2)),
    y: Number(y.toFixed(2)),
  };
}
