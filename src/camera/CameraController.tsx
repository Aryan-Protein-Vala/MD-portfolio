'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { evaluateCameraPath } from './CameraPath';

interface CameraControllerProps {
  scrollProgressRef: React.MutableRefObject<number>;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
  isMobile: boolean;
  onTelemetryUpdate?: (telemetry: {
    x: number;
    y: number;
    z: number;
    fov: number;
    chapterIndex: number;
    chapterCode: string;
    subtitle: string;
  }) => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  scrollProgressRef,
  pointerRef,
  reducedMotion,
  isMobile,
  onTelemetryUpdate,
}) => {
  const { camera } = useThree();
  const smoothedProgress = useRef(scrollProgressRef.current);
  const currentPos = useRef(new THREE.Vector3(0, 0.4, 18));
  const currentTarget = useRef(new THREE.Vector3(0, 0.2, 0));
  const lastReportedChapter = useRef<string>('');
  const frameCounter = useRef(0);

  useFrame((_, delta) => {
    const targetProgress = scrollProgressRef.current;
    const damping = reducedMotion ? 1.0 : Math.min(1, delta * 6.5);

    smoothedProgress.current = THREE.MathUtils.lerp(
      smoothedProgress.current,
      targetProgress,
      damping
    );

    const state = evaluateCameraPath(smoothedProgress.current, isMobile);

    // Subtle pointer parallax on camera rig when motion is enabled
    const parallaxX = reducedMotion || isMobile ? 0 : pointerRef.current.x * 0.45;
    const parallaxY = reducedMotion || isMobile ? 0 : pointerRef.current.y * 0.28;

    const desiredPos = state.position
      .clone()
      .add(new THREE.Vector3(parallaxX, parallaxY, 0));
    const desiredTarget = state.target
      .clone()
      .add(new THREE.Vector3(parallaxX * 0.4, parallaxY * 0.4, 0));

    currentPos.current.lerp(desiredPos, damping);
    currentTarget.current.lerp(desiredTarget, damping);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);

    if (!reducedMotion) {
      camera.rotation.x += state.rotationOffset.x;
      camera.rotation.y += state.rotationOffset.y;
      camera.rotation.z += state.rotationOffset.z;
    }

    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - state.fov) > 0.05) {
        camera.fov = THREE.MathUtils.lerp(camera.fov, state.fov, damping);
        camera.updateProjectionMatrix();
      }
    }

    frameCounter.current += 1;
    if (
      onTelemetryUpdate &&
      (frameCounter.current % 4 === 0 ||
        lastReportedChapter.current !== state.activeKeyframe.id)
    ) {
      lastReportedChapter.current = state.activeKeyframe.id;
      onTelemetryUpdate({
        x: Number(camera.position.x.toFixed(1)),
        y: Number(camera.position.y.toFixed(1)),
        z: Number(camera.position.z.toFixed(1)),
        fov: Math.round(state.fov),
        chapterIndex: state.activeKeyframe.chapterIndex,
        chapterCode: state.activeKeyframe.chapterCode,
        subtitle: state.activeKeyframe.subtitle,
      });
    }
  });

  return null;
};
