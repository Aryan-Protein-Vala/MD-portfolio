export interface SpatialPlaneMetrics {
  isVisible: boolean;
  opacity: number;
  scale: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  blurPx: number;
  relativeProgress: number; // -1 (upcoming in deep background) -> 0 (in focus) -> +1 (passed behind camera)
}

/**
 * Computes continuous 3D-like spatial projection and depth-of-field blur for DOM exhibition planes
 * so that upcoming chapters are visible in the deep background (like "02 / SPATIAL DESIGN" behind "01 / ARCHITECTURE"
 * in the reference video) and then dolly forward into sharp focus before expanding past the camera lens.
 */
export function computeSpatialPlaneMetrics(
  masterProgress: number,
  anchorProgress: number,
  activeWindow: number = 0.11,
  entryDirection: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center',
  reducedMotion: boolean = false
): SpatialPlaneMetrics {
  const delta = masterProgress - anchorProgress; // negative = ahead in Z-corridor; positive = camera dollying past it
  const normalizedDelta = delta / activeWindow;

  if (reducedMotion) {
    const isCurrent = Math.abs(delta) <= activeWindow * 0.75;
    return {
      isVisible: isCurrent,
      opacity: isCurrent ? 1 : 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      blurPx: 0,
      relativeProgress: normalizedDelta,
    };
  }

  // Visible from 1.65 windows before anchor (emerging in deep background) to 1.15 windows after anchor (passing camera)
  if (normalizedDelta < -1.65 || normalizedDelta > 1.15) {
    return {
      isVisible: false,
      opacity: 0,
      scale: 0.75,
      translateX: 0,
      translateY: 0,
      translateZ: -400,
      blurPx: 6,
      relativeProgress: normalizedDelta,
    };
  }

  let opacity = 1;
  if (normalizedDelta < -0.55) {
    // Emerging in deep background: partially visible so chapters overlap spatially
    opacity = Math.max(0, Math.min(1, (normalizedDelta + 1.65) / 1.1));
  } else if (normalizedDelta > 0.45) {
    // Passing camera lens into foreground
    opacity = Math.max(0, Math.min(1, 1 - (normalizedDelta - 0.45) / 0.7));
  }

  // Scale grows continuously as camera dollies forward (from 0.68 in background -> 1.0 at focus -> 1.48 passing lens)
  const scale =
    normalizedDelta < 0
      ? 1 + normalizedDelta * 0.22
      : 1 + normalizedDelta * 0.46;

  // Directional spatial entry offset
  let dirX = 0;
  let dirY = 0;
  if (entryDirection === 'left') dirX = -110;
  if (entryDirection === 'right') dirX = 110;
  if (entryDirection === 'top') dirY = -80;
  if (entryDirection === 'bottom') dirY = 80;

  const translateX = normalizedDelta * -dirX * 0.65;
  const translateY = normalizedDelta * -dirY * 0.65 + normalizedDelta * -28;
  const translateZ = normalizedDelta * 260;

  // Controlled depth-of-field blur (0px inside focus window, subtle blur in deep background or ultra-near foreground)
  const absDelta = Math.abs(normalizedDelta);
  const blurPx =
    absDelta < 0.36
      ? 0
      : Math.min(7, (absDelta - 0.36) * (normalizedDelta > 0 ? 6.5 : 3.2));

  return {
    isVisible: opacity > 0.01,
    opacity: Number(opacity.toFixed(3)),
    scale: Number(scale.toFixed(3)),
    translateX: Number(translateX.toFixed(1)),
    translateY: Number(translateY.toFixed(1)),
    translateZ: Number(translateZ.toFixed(1)),
    blurPx: Number(blurPx.toFixed(2)),
    relativeProgress: Number(normalizedDelta.toFixed(3)),
  };
}
