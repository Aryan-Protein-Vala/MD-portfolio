'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface MasterTimelineController {
  scrollToProgress: (targetProgress: number, immediate?: boolean) => void;
  destroy: () => void;
}

/**
 * Central Master Timeline synchronizing document scroll with normalized 0..1 progress.
 * Supports wheel, trackpad, touch, keyboard arrows, and smooth programmatic chapter jumps.
 */
export function createMasterTimeline(
  containerElement: HTMLElement,
  onProgress: (progress: number) => void,
  reducedMotion: boolean = false
): MasterTimelineController {
  const computeProgress = () => {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const raw = window.scrollY / maxScroll;
    return Math.max(0, Math.min(1, raw));
  };

  const handleScroll = () => {
    onProgress(computeProgress());
  };

  const trigger = ScrollTrigger.create({
    trigger: containerElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: reducedMotion ? false : 0.4,
    onUpdate: (self) => {
      onProgress(Math.max(0, Math.min(1, self.progress)));
    },
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });

  // Initial sync
  handleScroll();

  const scrollToProgress = (targetProgress: number, immediate: boolean = false) => {
    const clamped = Math.max(0, Math.min(1, targetProgress));
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const targetY = clamped * maxScroll;

    if (immediate || reducedMotion) {
      window.scrollTo({ top: targetY, behavior: 'auto' });
      onProgress(clamped);
    } else {
      const proxy = { y: window.scrollY };
      gsap.to(proxy, {
        y: targetY,
        duration: 1.25,
        ease: 'expo.out',
        onUpdate: () => {
          window.scrollTo(0, proxy.y);
          onProgress(computeProgress());
        },
      });
    }
  };

  return {
    scrollToProgress,
    destroy: () => {
      trigger.kill();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    },
  };
}
