/**
 * Kinetic Typography Motion Engine
 * Reproduces the signature reference video behavior where giant chapter titles
 * ("01 / ARCHITECTURE", "02 / SPATIAL DESIGN", "03 / KINETIC TYPOGRAPHY")
 * exist simultaneously on staggered spatial planes, overlap, scale into the foreground
 * and bleed past the viewport edge as the camera dollies forward.
 */
export interface KineticTitleTransform {
  transform: string;
  opacity: number;
  filter: string;
  zIndex: number;
}

export function computeKineticTitleStyle(
  masterProgress: number,
  anchorProgress: number,
  windowSpan: number = 0.12,
  horizontalShiftVw: number = -12,
  verticalShiftVh: number = -8,
  reducedMotion: boolean = false
): KineticTitleTransform {
  const delta = (masterProgress - anchorProgress) / windowSpan;

  if (reducedMotion) {
    const visible = Math.abs(delta) <= 0.7;
    return {
      transform: 'translate3d(0px, 0px, 0px) scale(1)',
      opacity: visible ? 1 : 0,
      filter: 'none',
      zIndex: visible ? 20 : 1,
    };
  }

  // Visible early in background (-1.8) so next chapter title overlaps behind current chapter title
  if (delta < -1.8 || delta > 1.25) {
    return {
      transform: 'translate3d(0px, 0px, 0px) scale(0.5)',
      opacity: 0,
      filter: 'blur(4px)',
      zIndex: 1,
    };
  }

  // As delta goes from -1.5 (background) -> 0 (in focus) -> +1.1 (enormous foreground bleed)
  const scale = delta < 0 ? Math.max(0.52, 1 + delta * 0.32) : 1 + Math.pow(delta, 1.15) * 1.35;
  const xVw = delta * horizontalShiftVw;
  const yVh = delta * verticalShiftVh;

  let opacity = 1;
  if (delta < -0.45) {
    opacity = Math.max(0, Math.min(0.78, (delta + 1.8) / 1.35));
  } else if (delta > 0.35) {
    opacity = Math.max(0, Math.min(1, 1 - (delta - 0.35) / 0.85));
  }

  const blur =
    Math.abs(delta) < 0.32
      ? 0
      : Math.min(6, (Math.abs(delta) - 0.32) * (delta > 0 ? 5.5 : 2.2));

  const zIndex = Math.round(30 + delta * 15);

  return {
    transform: `translate3d(${xVw.toFixed(2)}vw, ${yVh.toFixed(2)}vh, 0px) scale(${scale.toFixed(3)})`,
    opacity: Number(opacity.toFixed(3)),
    filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : 'none',
    zIndex,
  };
}
