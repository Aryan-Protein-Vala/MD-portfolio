'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from '@/camera/CameraController';
import { CHAPTER_NAVIGATION } from '@/camera/CameraKeyframes';
import { createMasterTimeline, MasterTimelineController } from '@/animation/MasterTimeline';
import { BlueprintLayer } from '@/spatial/BlueprintLayer';
import { TechnicalLines } from '@/spatial/TechnicalLines';
import { SpatialNavigation } from '@/components/SpatialNavigation/SpatialNavigation';
import { SceneProgress } from '@/components/SceneProgress/SceneProgress';
import { IntroScene, IntroScene3D } from '@/scenes/IntroScene/IntroScene';
import { AboutScene, AboutScene3D } from '@/scenes/AboutScene/AboutScene';
import { ExperienceScene, ExperienceScene3D } from '@/scenes/ExperienceScene/ExperienceScene';
import { ProjectsScene, ProjectsScene3D } from '@/scenes/ProjectsScene/ProjectsScene';
import { TechnicalScene, TechnicalScene3D } from '@/scenes/TechnicalScene/TechnicalScene';
import { ExplorationScene, ExplorationScene3D } from '@/scenes/ExplorationScene/ExplorationScene';
import { ContactScene, ContactScene3D } from '@/scenes/ContactScene/ContactScene';

export const SpatialExperience: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<MasterTimelineController | null>(null);
  const scrollProgressRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [masterProgress, setMasterProgress] = useState<number>(0);
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  const [telemetry, setTelemetry] = useState({
    x: -0.6,
    y: 2.2,
    z: 13.5,
    fov: 40,
    chapterIndex: 0,
    chapterCode: '00 / ARCHITECTURE',
    subtitle: 'SYSTEMS ENGINEER // CREATIVE TECHNOLOGIST',
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const controller = createMasterTimeline(
      scrollContainerRef.current,
      (progress) => {
        scrollProgressRef.current = progress;
        setMasterProgress(progress);
      },
      reducedMotion
    );
    timelineRef.current = controller;

    const params = new URLSearchParams(window.location.search);
    const initialProgressParam = params.get('progress');
    if (initialProgressParam !== null) {
      const parsed = parseFloat(initialProgressParam);
      if (!Number.isNaN(parsed)) {
        controller.scrollToProgress(Math.max(0, Math.min(1, parsed)), true);
      }
    }

    return () => {
      controller.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      pointerRef.current = { x: nx, y: ny };
      setPointer({ x: nx, y: ny });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!timelineRef.current) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        timelineRef.current.scrollToProgress(
          Math.min(1, scrollProgressRef.current + 0.11)
        );
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        timelineRef.current.scrollToProgress(
          Math.max(0, scrollProgressRef.current - 0.11)
        );
      } else if (e.key >= '1' && e.key <= '7') {
        const idx = parseInt(e.key, 10) - 1;
        const target = CHAPTER_NAVIGATION[idx];
        if (target) {
          timelineRef.current.scrollToProgress(target.targetProgress);
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavigateToProgress = useCallback((targetProgress: number) => {
    if (timelineRef.current) {
      timelineRef.current.scrollToProgress(targetProgress);
    }
  }, []);

  const activeChapterIndex = (() => {
    if (masterProgress < 0.08) return 0;
    if (masterProgress < 0.20) return 1;
    if (masterProgress < 0.53) return 2;
    if (masterProgress < 0.84) return 3;
    if (masterProgress < 0.91) return 4;
    if (masterProgress < 0.97) return 5;
    return 6;
  })();

  // Shift background millimeter grid continuously as camera pans down/across the architectural map
  const bgOffsetX = Math.round(masterProgress * -240);
  const bgOffsetY = Math.round(masterProgress * -980);

  return (
    <div
      style={{
        backgroundPosition: `${bgOffsetX}px ${bgOffsetY}px`,
      }}
      className="relative min-h-screen architectural-substrate"
    >
      <a href="#chapter-00" className="skip-to-content">
        Skip to Exhibition Content
      </a>

      <div aria-hidden="true" className="paper-grain-layer" />

      <SpatialNavigation
        activeChapterIndex={activeChapterIndex}
        masterProgress={masterProgress}
        telemetry={telemetry}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onNavigateToProgress={handleNavigateToProgress}
      />

      <SceneProgress
        masterProgress={masterProgress}
        activeChapterIndex={activeChapterIndex}
        onNavigateToProgress={handleNavigateToProgress}
      />

      {/* 3D WebGL Architectural Drafting Map */}
      {webglSupported && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-10 pointer-events-none"
        >
          <Canvas
            dpr={isMobile ? [1, 1.25] : [1, 1.75]}
            camera={{ position: [-0.6, 2.2, 13.5], fov: 40, near: 0.1, far: 90 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <fog attach="fog" args={['#EAE6DF', 12, 34]} />
            <ambientLight intensity={0.95} />
            <directionalLight position={[6, 12, 14]} intensity={0.65} />

            <CameraController
              scrollProgressRef={scrollProgressRef}
              pointerRef={pointerRef}
              reducedMotion={reducedMotion}
              isMobile={isMobile}
              onTelemetryUpdate={setTelemetry}
            />

            <BlueprintLayer />
            <TechnicalLines />

            <IntroScene3D reducedMotion={reducedMotion} />
            <AboutScene3D reducedMotion={reducedMotion} />
            <ExperienceScene3D reducedMotion={reducedMotion} />
            <ProjectsScene3D reducedMotion={reducedMotion} />
            <TechnicalScene3D reducedMotion={reducedMotion} />
            <ExplorationScene3D reducedMotion={reducedMotion} />
            <ContactScene3D reducedMotion={reducedMotion} />
          </Canvas>
        </div>
      )}

      {/* Laid-Out Spatial Map Stations */}
      <main className="relative z-20">
        <IntroScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onEnterExhibition={() => handleNavigateToProgress(0.14)}
        />

        <AboutScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onNextChapter={() => handleNavigateToProgress(0.26)}
        />

        <ExperienceScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onSelectProgress={handleNavigateToProgress}
        />

        <ProjectsScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onSelectProgress={handleNavigateToProgress}
        />

        <TechnicalScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onNextChapter={() => handleNavigateToProgress(0.94)}
        />

        <ExplorationScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onNextChapter={() => handleNavigateToProgress(1.0)}
        />

        <ContactScene
          masterProgress={masterProgress}
          pointer={pointer}
          reducedMotion={reducedMotion}
          onResetJourney={() => handleNavigateToProgress(0.0)}
        />
      </main>

      <div
        ref={scrollContainerRef}
        aria-hidden="true"
        className="relative w-full h-[1100vh] pointer-events-none select-none"
      />
    </div>
  );
};
