# ARYAN SHARMA — SPATIAL PORTFOLIO EXHIBITION

A multidimensional, camera-driven 3D architectural portfolio experience built with **Next.js**, **React**, **TypeScript**, **Three.js**, **React Three Fiber**, **Drei**, and **GSAP ScrollTrigger**.

## Architectural Overview

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── camera/
│   ├── CameraController.tsx     # R3F perspective camera rig driven by master progress & pointer parallax
│   ├── CameraKeyframes.ts       # 12 spatial keyframes along the Z-corridor (+18m to -192m)
│   └── CameraPath.ts            # Smooth cubic Hermite interpolation across position, target, rotation & FOV
├── animation/
│   ├── MasterTimeline.ts        # GSAP ScrollTrigger + wheel, keyboard, touch & chapter jump synchronization
│   ├── ParallaxController.ts    # Multi-plane depth parallax calculator
│   ├── SceneTransitions.ts      # Continuous Z-projection, directional entry & depth-of-field blur
│   └── TypographyMotion.ts      # Overlapping monument typography & foreground lens-pass transforms
├── spatial/
│   ├── BlueprintLayer.tsx       # 3D CAD floor plans, grid matrices & elevation drawings in Three.js
│   ├── GlassPanel.tsx           # 3D translucent acrylic/glass monoliths with refractive bevel edge tint
│   ├── ImagePlane.tsx           # 3D floating architectural plates & replaceable monochrome studies
│   ├── SpatialPanel.tsx         # 3D-synchronized accessible DOM plane wrapper
│   └── TechnicalLines.tsx       # Continuous 3D perspective construction lines & datum rails
├── scenes/
│   ├── IntroScene/              # Chapter 00: Exhibition Entry & Monument Typography
│   ├── AboutScene/              # Chapter 01: Identity, IIT Madras Education & Floating Portrait Plane
│   ├── ExperienceScene/         # Chapter 02: Cinntra InfoTech, Niswa Engg, Sudarshana Foundation
│   ├── ProjectsScene/           # Chapter 03: Prometheus, Aether (~71 MB/s), Astral Network 3D Installations
│   ├── TechnicalScene/          # Chapter 04: 4-Plane Interconnected Spatial Technical Map
│   ├── ExplorationScene/        # Chapter 05: Beyond the Screen (Creative Technology & Acoustics)
│   └── ContactScene/            # Chapter 06: Deliberate Exhibition Finale & Verified Channels
├── components/
│   ├── SpatialExperience/       # Master Hybrid WebGL + DOM Stage
│   ├── SpatialNavigation/       # Top Architectural Datum Header, Chapter Stops & Live Camera Telemetry
│   └── SceneProgress/           # Right-Edge Z-Depth Vernier Scale & Diagonal Exhibition Ribbon
├── data/
│   ├── profile.ts               # Centralized editable identity, education, explorations & contact data
│   ├── experience.ts            # Centralized editable professional experience records
│   ├── projects.ts              # Centralized editable selected work & metrics
│   └── skills.ts                # Centralized editable 4-plane technical map
└── styles/
    ├── spatial.css              # Warm ivory/ink tokens, glass panels, Awwwards hover & focus rules
    ├── typography.css           # Monument, chapter index, editorial & technical monospace hierarchy
    └── textures.css             # Blueprint millimeter grids, substrate grain & registration crosshairs
```

## Running Locally

```bash
npm run dev
```

For production build and verification:

```bash
npm run build
npm run start
```
