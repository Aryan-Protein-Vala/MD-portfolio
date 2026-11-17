export interface ProjectEntry {
  id: string;
  index: string;
  axisCode: string;
  title: string;
  subtitle: string;
  technologies: string[];
  description: string;
  highlights: string[];
  featuredMetrics?: {
    label: string;
    value: string;
    subtext: string;
  }[];
  installationType: 'prometheus-planes' | 'aether-throughput' | 'astral-ble-mesh';
  installationCaption: string;
  screenshotPlaceholder: {
    code: string;
    label: string;
    note: string;
    imageSrc?: string;
  };
  githubUrl: string;
  repoSlug: string;
  spatialPosition: [number, number, number];
}

const GITHUB_BASE = 'https://github.com/Aryan-Protein-Vala';

export const projectsData: ProjectEntry[] = [
  {
    id: 'prometheus',
    index: 'PROJ.01',
    axisCode: 'INSTALLATION.03A // MULTI-CLIENT ECOSYSTEM',
    title: 'PROMETHEUS',
    subtitle: 'Web Client, Admin Control Plane & Bare-Metal Rust Terminal Enforcer',
    technologies: ['Rust', 'Next.js', 'React', 'Supabase', 'Tailwind'],
    description:
      'A multi-client software ecosystem built around a web application, administrative dashboard and low-level Rust terminal interface.',
    highlights: [
      'Next.js web client.',
      'React-based administration dashboard.',
      'Rust-powered terminal interface.',
      'Supabase database infrastructure.',
      'Secure schema management and state synchronization.',
      'Bare-metal Rust background enforcer.',
    ],
    featuredMetrics: [
      {
        label: 'ARCHITECTURE',
        value: '3-PLANE',
        subtext: 'Web + Admin + Rust TUI/Enforcer',
      },
      {
        label: 'ENFORCEMENT LAYER',
        value: 'BARE-METAL',
        subtext: 'Rust Background Enforcer & State Sync',
      },
    ],
    installationType: 'prometheus-planes',
    installationCaption:
      'ILLUSTRATIVE ARCHITECTURAL INSTALLATION // Connected application planes: Next.js Web Client, React Admin Control Plane, Supabase State Sync, and Bare-Metal Rust Enforcer.',
    screenshotPlaceholder: {
      code: 'ARTEFACT.03A // REPLACEABLE FRAME',
      label: 'PROMETHEUS SYSTEM VIEWPORT PLACEHOLDER',
      note: 'Illustrative architectural representation — supply actual product screenshot in src/data/projects.ts',
      imageSrc: '',
    },
    githubUrl: `${GITHUB_BASE}/Prometheus`,
    repoSlug: 'Aryan-Protein-Vala/Prometheus',
    spatialPosition: [-4.8, 1.0, -98],
  },
  {
    id: 'aether',
    index: 'PROJ.02',
    axisCode: 'INSTALLATION.03B // ZERO-COPY P2P ENGINE',
    title: 'AETHER',
    subtitle: 'Zero-Copy Memory-Mapped Peer-to-Peer Data Transfer Engine',
    technologies: ['Go', 'Rust', 'mmap', 'TCP/UDP', 'QUIC'],
    description:
      'A custom peer-to-peer data transfer engine designed to reduce conventional user-space copying bottlenecks.',
    highlights: [
      'Zero-copy memory techniques.',
      'Memory-mapped file transfers.',
      'Stream multiplexing.',
      'Concurrent chunking.',
      'Thread-safe synchronization.',
      'Approximately 71 MB/s sustained transfer throughput.',
      '5 GB payload transferred in 72.11 seconds.',
    ],
    featuredMetrics: [
      {
        label: 'SUSTAINED THROUGHPUT',
        value: '~71 MB/s',
        subtext: 'Zero-copy mmap + QUIC/TCP multiplexed streams',
      },
      {
        label: 'BENCHMARK PAYLOAD',
        value: '5 GB / 72.11s',
        subtext: 'Verified end-to-end payload transfer',
      },
    ],
    installationType: 'aether-throughput',
    installationCaption:
      'ILLUSTRATIVE TELEMETRY INSTALLATION // Dual endpoint nodes with memory-mapped (mmap) buffers, concurrent multiplexed streams, and prominent ~71 MB/s (5 GB in 72.11s) transfer telemetry.',
    screenshotPlaceholder: {
      code: 'ARTEFACT.03B // REPLACEABLE FRAME',
      label: 'AETHER BENCHMARK & CLI PLACEHOLDER',
      note: 'Illustrative data-flow diagram — supply actual benchmark screenshot in src/data/projects.ts',
      imageSrc: '',
    },
    githubUrl: `${GITHUB_BASE}/AetherNet`,
    repoSlug: 'Aryan-Protein-Vala/AetherNet',
    spatialPosition: [5.0, 0.4, -114],
  },
  {
    id: 'astral-network',
    index: 'PROJ.03',
    axisCode: 'INSTALLATION.03C // OFFLINE BLE TRANSACTION SDK',
    title: 'ASTRAL NETWORK',
    subtitle: 'Cross-Platform Offline Peer-to-Peer BLE Transaction & Cryptography SDK',
    technologies: ['Swift', 'Kotlin', 'CoreBluetooth', 'Cryptography'],
    description:
      'A cross-platform offline transaction SDK that enables peer-to-peer transactions over Bluetooth Low Energy without cellular internet.',
    highlights: [
      'Offline transaction architecture.',
      'Custom packet fragmentation.',
      'Hardware MTU-aware payload handling.',
      'Asynchronous device state machines.',
      'Secure Noise Protocol sessions.',
      'Cross-platform mobile implementation.',
    ],
    featuredMetrics: [
      {
        label: 'TRANSPORT LAYER',
        value: '0-CELLULAR',
        subtext: 'Pure CoreBluetooth / Android BLE Mesh',
      },
      {
        label: 'SESSION SECURITY',
        value: 'NOISE PROTOCOL',
        subtext: 'MTU-aware fragmented cryptographic packets',
      },
    ],
    installationType: 'astral-ble-mesh',
    installationCaption:
      'ILLUSTRATIVE PROTOCOL INSTALLATION // Dual mobile device planes connected via Bluetooth Low Energy path with MTU packet fragmentation and Noise Protocol cryptographic annotations.',
    screenshotPlaceholder: {
      code: 'ARTEFACT.03C // REPLACEABLE FRAME',
      label: 'ASTRAL SDK MOBILE PLANES PLACEHOLDER',
      note: 'Illustrative BLE topology — supply actual mobile client capture in src/data/projects.ts',
      imageSrc: '',
    },
    githubUrl: `${GITHUB_BASE}/Astral-Offline`,
    repoSlug: 'Aryan-Protein-Vala/Astral-Offline',
    spatialPosition: [-4.5, -0.5, -130],
  },
];
