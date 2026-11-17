export interface CameraKeyframe {
  id: string;
  chapterIndex: number;
  chapterCode: string;
  chapterTitle: string;
  subtitle: string;
  progress: number; // Normalized 0..1 master scroll progress
  /**
   * Camera position over the laid-out 3D architectural drafting board.
   * Notice how the camera moves DOWN (-Y), ACROSS (X), and IN/OUT (Z) over the spatial plan,
   * just like panning & dollying over a physical architectural blueprint table.
   */
  position: [number, number, number];
  target: [number, number, number];
  rotationOffset: [number, number, number]; // pitch (X), yaw (Y), roll (Z) in radians
  fov: number;
  focalDistance: number;
  transitionEase: string;
}

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    id: 'chapter-00-intro',
    chapterIndex: 0,
    chapterCode: '00 / ARCHITECTURE',
    chapterTitle: 'ARYAN SHARMA',
    subtitle: 'SYSTEMS ENGINEER // CREATIVE TECHNOLOGIST',
    progress: 0.0,
    position: [-0.6, 2.2, 13.5],
    target: [0.0, 0.2, 0.0],
    rotationOffset: [-0.08, 0.02, -0.018],
    fov: 40,
    focalDistance: 0.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-01-about',
    chapterIndex: 1,
    chapterCode: '01 / SPATIAL IDENTITY',
    chapterTitle: 'THE PERSON BEHIND THE SYSTEMS',
    subtitle: 'IIT MADRAS // INDIA',
    progress: 0.14,
    position: [1.4, -5.8, 11.8],
    target: [0.8, -7.5, -2.0],
    rotationOffset: [-0.09, -0.03, -0.015],
    fov: 39,
    focalDistance: -2.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-cinntra',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'CINNTRA INFOTECH',
    subtitle: 'SYSTEMS ENGINEER // 2026–PRESENT',
    progress: 0.26,
    position: [-1.5, -13.8, 12.2],
    target: [-0.8, -15.5, -1.5],
    rotationOffset: [-0.08, 0.03, -0.012],
    fov: 40,
    focalDistance: -1.5,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-niswa',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'NISWA ENGG',
    subtitle: 'AUTOMATION ENGINEER // NOV 2024–PRESENT',
    progress: 0.37,
    position: [1.8, -21.8, 11.6],
    target: [1.1, -23.5, -2.0],
    rotationOffset: [-0.085, -0.035, -0.016],
    fov: 39,
    focalDistance: -2.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-02-exp-sudarshana',
    chapterIndex: 2,
    chapterCode: '02 / EXPERIENCE',
    chapterTitle: 'SUDARSHANA FOUNDATION',
    subtitle: 'FULL-STACK ENGINEER // FEB 2025–PRESENT',
    progress: 0.48,
    position: [-1.2, -29.8, 12.0],
    target: [-0.6, -31.5, -1.8],
    rotationOffset: [-0.08, 0.025, -0.014],
    fov: 40,
    focalDistance: -1.8,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-prometheus',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'PROMETHEUS',
    subtitle: 'MULTI-CLIENT RUST & NEXT.JS ECOSYSTEM',
    progress: 0.59,
    position: [1.5, -37.8, 11.5],
    target: [0.9, -39.5, -2.2],
    rotationOffset: [-0.09, -0.03, -0.018],
    fov: 38,
    focalDistance: -2.2,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-aether',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'AETHER',
    subtitle: 'ZERO-COPY P2P ENGINE // ~71 MB/S',
    progress: 0.69,
    position: [-1.6, -45.8, 11.2],
    target: [-1.0, -47.5, -2.5],
    rotationOffset: [-0.085, 0.03, -0.015],
    fov: 38,
    focalDistance: -2.5,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-03-proj-astral',
    chapterIndex: 3,
    chapterCode: '03 / SELECTED WORK',
    chapterTitle: 'ASTRAL NETWORK',
    subtitle: 'OFFLINE BLE TRANSACTION SDK',
    progress: 0.79,
    position: [1.4, -53.8, 11.6],
    target: [0.8, -55.5, -2.0],
    rotationOffset: [-0.08, -0.025, -0.014],
    fov: 39,
    focalDistance: -2.0,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-04-technical',
    chapterIndex: 4,
    chapterCode: '04 / TECHNICAL MAP',
    chapterTitle: 'THE TECHNICAL UNIVERSE',
    subtitle: 'LANGUAGES // SYSTEMS // INFRASTRUCTURE // AI',
    progress: 0.88,
    position: [-0.8, -61.8, 12.8],
    target: [-0.2, -63.5, -1.5],
    rotationOffset: [-0.075, 0.015, -0.01],
    fov: 41,
    focalDistance: -1.5,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-05-exploration',
    chapterIndex: 5,
    chapterCode: '05 / BEYOND THE SCREEN',
    chapterTitle: 'CREATIVE TECHNOLOGY',
    subtitle: 'EXPERIMENTS // AI TOOLING // ACOUSTICS',
    progress: 0.94,
    position: [1.0, -69.8, 12.2],
    target: [0.4, -71.5, -1.8],
    rotationOffset: [-0.08, -0.02, -0.012],
    fov: 40,
    focalDistance: -1.8,
    transitionEase: 'power2.inOut',
  },
  {
    id: 'chapter-06-contact',
    chapterIndex: 6,
    chapterCode: '06 / CONTACT',
    chapterTitle: "LET'S BUILD IT",
    subtitle: 'GITHUB // LINKEDIN // DIRECT TRANSMISSION',
    progress: 1.0,
    position: [0.0, -77.8, 12.0],
    target: [0.0, -79.2, -1.5],
    rotationOffset: [-0.06, 0.0, 0.0],
    fov: 39,
    focalDistance: -1.5,
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
    shortTitle: 'ARCHITECTURE',
    fullTitle: '00 / ARCHITECTURE',
    targetProgress: 0.0,
  },
  {
    chapterIndex: 1,
    code: '01',
    shortTitle: 'IDENTITY',
    fullTitle: '01 / IDENTITY',
    targetProgress: 0.14,
  },
  {
    chapterIndex: 2,
    code: '02',
    shortTitle: 'EXPERIENCE',
    fullTitle: '02 / EXPERIENCE',
    targetProgress: 0.26,
    subStops: [
      { label: '01. CINNTRA', progress: 0.26 },
      { label: '02. NISWA ENGG', progress: 0.37 },
      { label: '03. SUDARSHANA', progress: 0.48 },
    ],
  },
  {
    chapterIndex: 3,
    code: '03',
    shortTitle: 'WORK',
    fullTitle: '03 / SELECTED WORK',
    targetProgress: 0.59,
    subStops: [
      { label: '01. PROMETHEUS', progress: 0.59 },
      { label: '02. AETHER', progress: 0.69 },
      { label: '03. ASTRAL', progress: 0.79 },
    ],
  },
  {
    chapterIndex: 4,
    code: '04',
    shortTitle: 'SYSTEMS',
    fullTitle: '04 / TECHNICAL MAP',
    targetProgress: 0.88,
  },
  {
    chapterIndex: 5,
    code: '05',
    shortTitle: 'BEYOND',
    fullTitle: '05 / BEYOND',
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
