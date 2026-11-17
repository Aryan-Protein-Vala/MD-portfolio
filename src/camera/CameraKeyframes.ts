export interface CameraKeyframe {
  id: string;
  chapterIndex: number;
  chapterCode: string;
  chapterTitle: string;
  subtitle: string;
  progress: number; // Normalized 0..1 master scroll progress
  position: [number, number, number];
  target: [number, number, number];
  rotationOffset: [number, number, number]; // subtle pitch, yaw, roll in radians
  fov: number;
  focalDistance: number; // Z-plane currently in sharp focus
  transitionEase: string;
}

/**
 * Master Camera Keyframes defining the continuous 3D exhibition journey.
 * Each keyframe corresponds to a spatial composition along the Z-corridor (from Z=+18 to Z=-196),
 * with deliberate lateral (X), vertical (Y), dolly (Z), and rotational choreography inspired by the reference video.
 */
export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    id: 'chapter-00-intro',
    chapterIndex: 0,
    chapterCode: '00 / ARCHITECTURE',
    chapterTitle: 'THE INTRODUCTION',
    subtitle: 'EXHIBITION ENTRY // SPATIAL MONOGRAPH',
    progress: 0.0,
    position: [0.0, 0.4, 18.0],
    target: [0.0, 0.2, 0.0],
    rotationOffset: [0.0, 0.0, 0.0],
    fov: 44,
    focalDistance: 0.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-00-dolly',
    chapterIndex: 0,
    chapterCode: '00 / ARCHITECTURE',
    chapterTitle: 'THE INTRODUCTION',
    subtitle: 'DOLLY THROUGH MONUMENT TYPOGRAPHY',
    progress: 0.08,
    position: [-1.4, 0.1, 6.5],
    target: [-0.6, 0.1, -8.0],
    rotationOffset: [0.01, -0.02, -0.008],
    fov: 42,
    focalDistance: -6.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-01-about',
    chapterIndex: 1,
    chapterCode: '01 / IDENTITY',
    chapterTitle: 'THE PERSON BEHIND THE SYSTEMS',
    subtitle: 'IDENTITY / ABOUT // IIT MADRAS',
    progress: 0.18,
    position: [-3.2, 0.6, -14.0],
    target: [-0.8, 0.3, -28.0],
    rotationOffset: [-0.01, 0.04, 0.012],
    fov: 40,
    focalDistance: -26.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-cinntra',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'WHERE IDEAS BECOME SYSTEMS',
    subtitle: '02.A // CINNTRA INFOTECH (2026–PRESENT)',
    progress: 0.31,
    position: [-2.8, 1.1, -38.0],
    target: [-3.8, 0.8, -52.0],
    rotationOffset: [-0.015, -0.035, -0.01],
    fov: 42,
    focalDistance: -52.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-niswa',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'WHERE IDEAS BECOME SYSTEMS',
    subtitle: '02.B // NISWA ENGG (NOV 2024–PRESENT)',
    progress: 0.41,
    position: [3.1, 0.2, -52.0],
    target: [4.0, 0.1, -66.0],
    rotationOffset: [0.01, 0.04, 0.014],
    fov: 41,
    focalDistance: -66.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-sudarshana',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'WHERE IDEAS BECOME SYSTEMS',
    subtitle: '02.C // SUDARSHANA FOUNDATION (FEB 2025–PRESENT)',
    progress: 0.50,
    position: [-2.5, -0.5, -66.0],
    target: [-3.4, -0.6, -80.0],
    rotationOffset: [0.012, -0.03, -0.01],
    fov: 42,
    focalDistance: -80.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-prometheus',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'THINGS I HAVE BUILT',
    subtitle: '03.A // PROMETHEUS ECOSYSTEM',
    progress: 0.60,
    position: [-2.6, 0.8, -84.0],
    target: [-3.6, 0.6, -98.0],
    rotationOffset: [-0.01, -0.03, -0.008],
    fov: 40,
    focalDistance: -98.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-aether',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'THINGS I HAVE BUILT',
    subtitle: '03.B // AETHER ZERO-COPY ENGINE (~71 MB/S)',
    progress: 0.69,
    position: [2.9, 0.3, -100.0],
    target: [3.8, 0.2, -114.0],
    rotationOffset: [0.01, 0.035, 0.012],
    fov: 39,
    focalDistance: -114.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-astral',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'THINGS I HAVE BUILT',
    subtitle: '03.C // ASTRAL NETWORK OFFLINE BLE SDK',
    progress: 0.78,
    position: [-2.4, -0.3, -116.0],
    target: [-3.2, -0.4, -130.0],
    rotationOffset: [0.008, -0.028, -0.01],
    fov: 40,
    focalDistance: -130.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-04-technical',
    chapterIndex: 4,
    chapterCode: '04 / TECHNICAL UNIVERSE',
    chapterTitle: 'THE TOOLS BEHIND THE WORK',
    subtitle: 'SPATIAL TECHNICAL MAP // 4 PLANES',
    progress: 0.87,
    position: [0.0, 0.2, -134.0],
    target: [0.0, 0.0, -150.0],
    rotationOffset: [0.0, 0.0, 0.0],
    fov: 46,
    focalDistance: -150.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-05-exploration',
    chapterIndex: 5,
    chapterCode: '05 / BEYOND THE SCREEN',
    chapterTitle: 'EXPERIMENTATION & CREATIVE TECH',
    subtitle: 'OPEN LABORATORY // INTERACTIVE & ACOUSTIC',
    progress: 0.94,
    position: [1.2, 0.4, -154.0],
    target: [0.2, 0.0, -168.0],
    rotationOffset: [-0.008, 0.02, 0.006],
    fov: 44,
    focalDistance: -168.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-06-contact',
    chapterIndex: 6,
    chapterCode: '06 / CONTACT',
    chapterTitle: "LET'S BUILD SOMETHING UNCONVENTIONAL",
    subtitle: 'TERMINAL EXHIBITION PLANE',
    progress: 1.0,
    position: [0.0, 0.0, -176.0],
    target: [0.0, 0.0, -192.0],
    rotationOffset: [0.0, 0.0, 0.0],
    fov: 42,
    focalDistance: -192.0,
    transitionEase: 'power2.out',
  },
];

export interface ChapterNavItem {
  chapterIndex: number;
  code: string;
  shortTitle: string;
  fullTitle: string;
  targetProgress: number;
  subStops?: {
    label: string;
    progress: number;
  }[];
}

export const CHAPTER_NAVIGATION: ChapterNavItem[] = [
  {
    chapterIndex: 0,
    code: '00',
    shortTitle: 'INTRO',
    fullTitle: '00 / INTRODUCTION',
    targetProgress: 0.0,
  },
  {
    chapterIndex: 1,
    code: '01',
    shortTitle: 'IDENTITY',
    fullTitle: '01 / IDENTITY & ABOUT',
    targetProgress: 0.18,
  },
  {
    chapterIndex: 2,
    code: '02',
    shortTitle: 'EXPERIENCE',
    fullTitle: '02 / EXPERIENCE',
    targetProgress: 0.31,
    subStops: [
      { label: 'CINNTRA INFOTECH', progress: 0.31 },
      { label: 'NISWA ENGG', progress: 0.41 },
      { label: 'SUDARSHANA', progress: 0.50 },
    ],
  },
  {
    chapterIndex: 3,
    code: '03',
    shortTitle: 'WORK',
    fullTitle: '03 / SELECTED WORK',
    targetProgress: 0.60,
    subStops: [
      { label: 'PROMETHEUS', progress: 0.60 },
      { label: 'AETHER', progress: 0.69 },
      { label: 'ASTRAL NETWORK', progress: 0.78 },
    ],
  },
  {
    chapterIndex: 4,
    code: '04',
    shortTitle: 'SYSTEMS MAP',
    fullTitle: '04 / TECHNICAL UNIVERSE',
    targetProgress: 0.87,
  },
  {
    chapterIndex: 5,
    code: '05',
    shortTitle: 'BEYOND',
    fullTitle: '05 / BEYOND THE SCREEN',
    targetProgress: 0.94,
  },
  {
    chapterIndex: 6,
    code: '06',
    shortTitle: 'CONTACT',
    fullTitle: '06 / CONTACT',
    targetProgress: 1.0,
  },
];
