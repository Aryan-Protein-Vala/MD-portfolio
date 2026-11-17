export interface SpatialPlaneMetrics {
  isVisible: boolean;
  opacity: number;
  bodyOpacity: number;
  scale: number;
  translateX: number; // in vw
  translateY: number; // in vh
  translateZ: number; // in px
  rotateX: number; // in deg (architectural drafting table tilt)
  rotateY: number; // in deg
  rotateZ: number; // in deg
  blurPx: number;
  relativeProgress: number; // negative = lower on the map (upcoming); 0 = in focus; positive = moving UP past the top of the lens
}

/**
 * Reproduces the exact spatial motion of the reference video (aaa9c1aa.mp4):
 * - Every chapter sits at its own physical coordinate on a tilted architectural drafting map.
 * - Upcoming chapter (relativeProgress < 0): sits lower on the map (+Y vh), slightly smaller (scale ~0.58),
 *   so ONLY its chapter title is glimpsed in the lower map area without colliding with the active chapter's body.
 * - Active chapter (relativeProgress ≈ 0): locks into the center-left or center-right focal plane at scale 1.0,
 *   zero blur, with a subtle architectural table perspective tilt.
 * - Outgoing chapter (relativeProgress > 0): travels UPWARD (-Y vh) and scales UP (scale 1.0 -> 1.75)
 *   right off the top edge of the viewport (like "01 / ARCHITECTURE" exiting the top of frame 00:01 in the video!),
 *   while its body copy fades out immediately so behind text NEVER overlaps the incoming chapter!
 */
export function computeSpatialPlaneMetrics(
  masterProgress: number,
  anchorProgress: number,
  stepSpan: number = 0.11,
  entryDirection: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center',
  reducedMotion: boolean = false
): SpatialPlaneMetrics {
  const delta = masterProgress - anchorProgress;
  const rel = delta / stepSpan; // -1 = one stop before; 0 = at stop; +1 = one stop after

  if (reducedMotion) {
    const active = Math.abs(rel) <= 0.5;
    return {
      isVisible: active,
      opacity: active ? 1 : 0,
      bodyOpacity: active ? 1 : 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      blurPx: 0,
      relativeProgress: rel,
    };
  }

  // Visible window: from rel = -1.15 (glimpsed lower on the map) to rel = +0.92 (exiting top edge of screen)
  if (rel < -1.15 || rel > 0.92) {
    return {
      isVisible: false,
      opacity: 0,
      bodyOpacity: 0,
      scale: 0.55,
      translateX: 0,
      translateY: rel < 0 ? 60 : -80,
      translateZ: -300,
      rotateX: 14,
      rotateY: 0,
      rotateZ: -1.5,
      blurPx: 6,
      relativeProgress: rel,
    };
  }

  // Vertical travel along the architectural map:
  // When rel = -1.0 (upcoming): sits at +44vh (lower part of the map)
  // When rel = 0.0 (active): sits at 0vh
  // When rel = +0.85 (outgoing): rises to -64vh (exiting top of viewport just like 00:01 in reference video)
  const translateY = rel < 0 ? -rel * 44 : -rel * 74;

  // Lateral travel along diagonal construction axes
  const lateralSign =
    entryDirection === 'left' ? -1 : entryDirection === 'right' ? 1 : 0;
  const translateX = rel * lateralSign * -8;

  // Scale: grows from 0.56 in deep map -> 1.0 at focal plane -> 1.68 as camera dollies over it
  const scale = rel < 0 ? Math.max(0.54, 1 + rel * 0.42) : 1 + rel * 0.72;

  // Z-depth translation
  const translateZ = rel < 0 ? rel * 240 : rel * 310;

  // Architectural drafting table tilt (lies down like a physical plan on a table, flattens near focus for legibility)
  const focusFactor = Math.min(1, Math.abs(rel));
  const rotateX = 5 + focusFactor * 11; // 5deg at focus, 16deg when entering/leaving on the table
  const rotateY = lateralSign * -3 * focusFactor;
  const rotateZ = -1.2 * focusFactor;

  // Master opacity (keeps the giant chapter title visible as it exits top or enters bottom)
  let opacity = 1;
  if (rel < -0.35) {
    opacity = Math.max(0, Math.min(0.65, (rel + 1.15) / 0.8));
  } else if (rel > 0.45) {
    opacity = Math.max(0, Math.min(1, 1 - (rel - 0.45) / 0.47));
  }

  // CRITICAL: Body & card opacity is ONLY visible when the station is in focus (-0.38 <= rel <= +0.34).
  // This guarantees two stations' paragraphs/cards NEVER overlap each other!
  let bodyOpacity = 1;
  if (rel < -0.38 || rel > 0.34) {
    bodyOpacity = 0;
  } else if (rel < -0.18) {
    bodyOpacity = (rel + 0.38) / 0.2;
  } else if (rel > 0.16) {
    bodyOpacity = 1 - (rel - 0.16) / 0.18;
  }

  // Subtle depth-of-field blur when passing under the frosted glass slab (rel > 0.28) or deep on the map (rel < -0.45)
  let blurPx = 0;
  if (rel > 0.28) {
    blurPx = Math.min(6, (rel - 0.28) * 9.5);
  } else if (rel < -0.45) {
    blurPx = Math.min(3.5, (-rel - 0.45) * 4.5);
  }

  return {
    isVisible: opacity > 0.01,
    opacity: Number(opacity.toFixed(3)),
    bodyOpacity: Number(Math.max(0, Math.min(1, bodyOpacity)).toFixed(3)),
    scale: Number(scale.toFixed(3)),
    translateX: Number(translateX.toFixed(2)),
    translateY: Number(translateY.toFixed(2)),
    translateZ: Number(translateZ.toFixed(1)),
    rotateX: Number(rotateX.toFixed(2)),
    rotateY: Number(rotateY.toFixed(2)),
    rotateZ: Number(rotateZ.toFixed(2)),
    blurPx: Number(blurPx.toFixed(2)),
    relativeProgress: Number(rel.toFixed(3)),
  };
}
