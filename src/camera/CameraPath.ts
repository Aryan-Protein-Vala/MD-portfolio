import * as THREE from 'three';
import { CAMERA_KEYFRAMES, CameraKeyframe } from './CameraKeyframes';

export interface InterpolatedCameraState {
  position: THREE.Vector3;
  target: THREE.Vector3;
  rotationOffset: THREE.Euler;
  fov: number;
  focalDistance: number;
  activeKeyframe: CameraKeyframe;
  nextKeyframe: CameraKeyframe;
  segmentProgress: number;
}

/**
 * Smoothly interpolates between camera keyframes using cubic Hermite / smoothstep easing
 * so camera movement feels like a fluid physical dolly & pan along an architectural track.
 */
function smootherStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
}

export function evaluateCameraPath(
  masterProgress: number,
  isMobile: boolean = false
): InterpolatedCameraState {
  const p = Math.max(0, Math.min(1, masterProgress));

  let startIdx = 0;
  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (p >= CAMERA_KEYFRAMES[i].progress && p <= CAMERA_KEYFRAMES[i + 1].progress) {
      startIdx = i;
      break;
    }
  }
  if (p >= CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1].progress) {
    startIdx = CAMERA_KEYFRAMES.length - 2;
  }

  const kfA = CAMERA_KEYFRAMES[startIdx];
  const kfB = CAMERA_KEYFRAMES[startIdx + 1] || kfA;

  const span = Math.max(0.0001, kfB.progress - kfA.progress);
  const rawLocalT = Math.max(0, Math.min(1, (p - kfA.progress) / span));
  const t = smootherStep(rawLocalT);

  // Mobile lateral attenuation so compositions stay framed on narrow viewports
  const lateralScale = isMobile ? 0.38 : 1.0;
  const fovOffset = isMobile ? 10 : 0;

  const posA = new THREE.Vector3(
    kfA.position[0] * lateralScale,
    kfA.position[1],
    kfA.position[2]
  );
  const posB = new THREE.Vector3(
    kfB.position[0] * lateralScale,
    kfB.position[1],
    kfB.position[2]
  );

  const targetA = new THREE.Vector3(
    kfA.target[0] * lateralScale,
    kfA.target[1],
    kfA.target[2]
  );
  const targetB = new THREE.Vector3(
    kfB.target[0] * lateralScale,
    kfB.target[1],
    kfB.target[2]
  );

  const position = posA.lerp(posB, t);
  const target = targetA.lerp(targetB, t);

  const rotX = THREE.MathUtils.lerp(kfA.rotationOffset[0], kfB.rotationOffset[0], t);
  const rotY = THREE.MathUtils.lerp(kfA.rotationOffset[1], kfB.rotationOffset[1], t);
  const rotZ = THREE.MathUtils.lerp(
    kfA.rotationOffset[2],
    kfB.rotationOffset[2],
    t
  ) * (isMobile ? 0.4 : 1.0);

  const rotationOffset = new THREE.Euler(rotX, rotY, rotZ, 'XYZ');
  const fov = THREE.MathUtils.lerp(kfA.fov, kfB.fov, t) + fovOffset;
  const focalDistance = THREE.MathUtils.lerp(kfA.focalDistance, kfB.focalDistance, t);

  const activeKeyframe = rawLocalT < 0.5 ? kfA : kfB;

  return {
    position,
    target,
    rotationOffset,
    fov,
    focalDistance,
    activeKeyframe,
    nextKeyframe: kfB,
    segmentProgress: rawLocalT,
  };
}
