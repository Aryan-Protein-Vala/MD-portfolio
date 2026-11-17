export interface ExperienceEntry {
  id: string;
  index: string;
  axisCode: string;
  company: string;
  fullName: string;
  role: string;
  period: string;
  isCurrent: boolean;
  isPlaceholderEditable?: boolean;
  summary: string;
  achievements: string[];
  editablePlaceholders?: {
    responsibilities: string;
    productsBuilt: string;
    technicalContributions: string;
    achievementsNote: string;
  };
  technologies: string[];
  spatialPosition: [number, number, number];
  entryDirection: 'left' | 'right' | 'top';
}

export const experienceData: ExperienceEntry[] = [
  {
    id: 'cinntra-infotech',
    index: 'EXP.01',
    axisCode: 'NODE.02A // CURRENT ROLE',
    company: 'CINNTRA INFOTECH',
    fullName: 'Cinntra InfoTech Solutions Pvt. Ltd.',
    role: 'Systems Engineer / Developer',
    period: '2026–Present',
    isCurrent: true,
    isPlaceholderEditable: true,
    summary:
      'Current engineering role focused on enterprise software systems, backend architecture, and production application infrastructure. Structured with editable fields for ongoing responsibilities and deliverables.',
    achievements: [
      '[Editable Responsibility] Core systems architecture, service reliability, and enterprise module engineering.',
      '[Editable Systems Built] Production services, internal developer tooling, and enterprise integration pipelines.',
      '[Editable Technical Contribution] Low-latency API design, database query optimization, and automated deployment workflows.',
      '[Editable Achievement] Reserved for verified production metrics and milestone outcomes as they are finalized.',
    ],
    editablePlaceholders: {
      responsibilities:
        'Editable placeholder: Define primary systems engineering and platform ownership responsibilities.',
      productsBuilt:
        'Editable placeholder: Document specific enterprise products, modules, and internal services delivered.',
      technicalContributions:
        'Editable placeholder: Detail architectural decisions, codebases, and infrastructure improvements.',
      achievementsNote:
        'No fabricated metrics. Update directly in src/data/experience.ts as verified milestones are recorded.',
    },
    technologies: [
      'Systems Engineering',
      'TypeScript',
      'Python',
      'Go / Rust (Editable)',
      'Enterprise APIs',
      'SQL / Database Systems',
    ],
    spatialPosition: [-5.2, 1.4, -52],
    entryDirection: 'left',
  },
  {
    id: 'niswa-engg',
    index: 'EXP.02',
    axisCode: 'NODE.02B // AUTOMATION & CLOUD',
    company: 'NISWA ENGG',
    fullName: 'Niswa Engineering Solutions India Pvt. Ltd.',
    role: 'Technical Consultant & Automation Engineer',
    period: 'November 2024–Present',
    isCurrent: true,
    summary:
      'Architected event-driven automation pipelines, asynchronous AI agent workflows, and high-performance web infrastructure.',
    achievements: [
      'Engineered asynchronous AI agents using TypeScript.',
      'Automated 80%+ of the content generation and media scheduling pipeline.',
      'Built and optimized the company website using Astro.',
      'Achieved a 95+ Google Lighthouse performance score.',
      'Owned cloud resource provisioning and API integrations.',
      'Transitioned manual workflows into event-driven infrastructure.',
    ],
    technologies: [
      'TypeScript',
      'Astro',
      'AI Agents',
      'Event-Driven Infrastructure',
      'Cloud Provisioning',
      'API Integrations',
    ],
    spatialPosition: [5.4, 0.2, -66],
    entryDirection: 'right',
  },
  {
    id: 'sudarshana-foundation',
    index: 'EXP.03',
    axisCode: 'NODE.02C // DATA & PORTAL INFRASTRUCTURE',
    company: 'SUDARSHANA FOUNDATION',
    fullName: 'Sudarshana Foundation',
    role: 'Full-Stack & Automation Engineer',
    period: 'February 2025–Present',
    isCurrent: true,
    summary:
      'Designed centralized digital infrastructure, structured database workflows, and high-reliability transaction pipelines.',
    achievements: [
      "Designed the foundation's first centralized web portal.",
      'Transitioned paper-based tracking into structured database workflows.',
      'Supported 5,000+ monthly data transactions.',
      'Configured CI pipelines and secure webhooks.',
      'Built reliable donation and tracking workflows.',
    ],
    technologies: [
      'Full-Stack Web',
      'Database Workflows',
      'CI/CD Pipelines',
      'Secure Webhooks',
      'Transaction Systems',
    ],
    spatialPosition: [-4.6, -0.8, -80],
    entryDirection: 'left',
  },
];
