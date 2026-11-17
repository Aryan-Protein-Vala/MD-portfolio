export interface ProfileData {
  name: {
    first: string;
    last: string;
    full: string;
  };
  positioning: string;
  dimensions: string[];
  intro: {
    axisCode: string;
    chapterLabel: string;
    roles: string[];
    statement: string;
    coordinates: string;
    exhibitionRef: string;
  };
  about: {
    axisCode: string;
    chapterNumber: string;
    chapterTitle: string;
    theme: string;
    location: string;
    education: {
      institution: string;
      degrees: string[];
      period: string;
      status: string;
      note: string;
    };
    copy: string[];
    portraitPlaceholder: {
      label: string;
      aspectRatio: string;
      caption: string;
      imageSrc?: string;
    };
    metadata: { key: string; value: string }[];
  };
  explorations: {
    axisCode: string;
    chapterNumber: string;
    chapterTitle: string;
    theme: string;
    intro: string;
    items: {
      id: string;
      code: string;
      title: string;
      category: string;
      description: string;
      artefactType: string;
      coordinates: [number, number, number];
    }[];
  };
  contact: {
    axisCode: string;
    chapterNumber: string;
    chapterTitle: string;
    theme: string;
    promptHeadline: string;
    promptSubheadline: string;
    email: string;
    links: {
      id: string;
      label: string;
      value: string;
      href: string;
      annotation: string;
    }[];
  };
}

export const profileData: ProfileData = {
  name: {
    first: 'ARYAN',
    last: 'SHARMA',
    full: 'Aryan Sharma',
  },
  positioning:
    'Systems engineer. Creative technologist. Builder of intelligent infrastructure and unconventional digital experiences.',
  dimensions: [
    'I build systems that work at a deep technical level.',
    'I build products and experiences that people can interact with.',
    'I explore the intersection of engineering, creativity, AI and technology.',
  ],
  intro: {
    axisCode: 'AXIS.00 // ORIGIN',
    chapterLabel: '00 / ARCHITECTURE & SYSTEMS',
    roles: ['SYSTEMS ENGINEER', 'CREATIVE TECHNOLOGIST', 'BUILDER / EXPLORER'],
    statement:
      'I build intelligent systems, explore unconventional ideas and turn complex technical concepts into real experiences.',
    coordinates: 'DATUM.00 // X:00.0 Y:01.2 Z:16.0 // SCALE 1:100',
    exhibitionRef: 'ARCH.FOLIO // EDITION 2026 // SPATIAL MONOGRAPH',
  },
  about: {
    axisCode: 'AXIS.01 // IDENTITY PLANE',
    chapterNumber: '01',
    chapterTitle: 'THE PERSON BEHIND THE SYSTEMS',
    theme: 'IDENTITY / ABOUT',
    location: 'India',
    education: {
      institution: 'Indian Institute of Technology Madras',
      degrees: [
        'BS in Data Science and Applications',
        'BSc in Data Science and Programming',
      ],
      period: 'Editable Dates (e.g., 2023–Present)',
      status: 'Current Status: In Progress (Editable)',
      note: 'Education dates and current status remain editable in src/data/profile.ts.',
    },
    copy: [
      "I'm interested in understanding how things work beneath the surface.",
      'From distributed networking and low-level systems to AI infrastructure and interactive experiences, I enjoy taking complex ideas and turning them into working systems.',
      'My work sits at the intersection of engineering, experimentation and creative problem-solving.',
    ],
    portraitPlaceholder: {
      label: 'PORTRAIT PLANE // ARTEFACT 01.A',
      aspectRatio: '3:4 SPATIAL MONOLITH',
      caption: 'Replaceable floating portrait plane — supply portrait URL in src/data/profile.ts',
      imageSrc: '',
    },
    metadata: [
      { key: 'NAME', value: 'Aryan Sharma' },
      { key: 'LOCATION', value: 'India' },
      { key: 'DISCIPLINE', value: 'Systems Engineer & Creative Technologist' },
      { key: 'EDUCATION', value: 'Indian Institute of Technology Madras' },
      { key: 'DEGREES', value: 'BS & BSc in Data Science' },
    ],
  },
  explorations: {
    axisCode: 'AXIS.05 // OPEN LABORATORY',
    chapterNumber: '05',
    chapterTitle: 'BEYOND THE SCREEN',
    theme: 'EXPERIMENTATION / CREATIVE TECHNOLOGY',
    intro:
      'An editable spatial study of personal explorations beyond conventional engineering assignments.',
    items: [
      {
        id: 'exp-lab-01',
        code: 'LAB.01 // INTERACTIVE',
        title: 'Interactive & Visual Experiments',
        category: 'CREATIVE CODING',
        description:
          'Camera-driven spatial environments, procedural architectural drawings, and kinetic typography studies exploring unconventional digital interfaces.',
        artefactType: 'VIEWPORT STUDY',
        coordinates: [-5.5, 2.2, -162],
      },
      {
        id: 'exp-lab-02',
        code: 'LAB.02 // AI TOOLING',
        title: 'AI-Powered Tools & Infrastructure',
        category: 'INTELLIGENT SYSTEMS',
        description:
          'Experimental agent workflows, automated media pipelines, and developer tooling built to bridge reasoning models with real-time execution.',
        artefactType: 'SYSTEM PROTOTYPE',
        coordinates: [5.8, 1.4, -166],
      },
      {
        id: 'exp-lab-03',
        code: 'LAB.03 // DISTRIBUTED',
        title: 'Distributed Systems & Protocol Design',
        category: 'SYSTEMS EXPLORATION',
        description:
          'Low-level networking experiments, memory-mapped I/O architectures, and offline peer-to-peer communication topologies.',
        artefactType: 'PROTOCOL TOPOLOGY',
        coordinates: [-4.2, -1.8, -170],
      },
      {
        id: 'exp-lab-04',
        code: 'LAB.04 // PERFORMANCE',
        title: 'Music & Performance-Related Creative Work',
        category: 'ARTISTIC PRACTICE',
        description:
          'Instrumental and vocal musical exploration, rhythm and movement choreography, and cinematic visual composition.',
        artefactType: 'TEMPORAL STUDY',
        coordinates: [4.6, -2.1, -174],
      },
    ],
  },
  contact: {
    axisCode: 'AXIS.06 // TERMINAL PLANE',
    chapterNumber: '06',
    chapterTitle: 'CONTACT',
    theme: "LET'S BUILD SOMETHING UNCONVENTIONAL.",
    promptHeadline: 'HAVE AN IDEA?',
    promptSubheadline: "LET'S BUILD IT.",
    email: 'aryansharma24112003@gmail.com',
    links: [
      {
        id: 'github',
        label: 'GITHUB',
        value: 'https://github.com/Aryan-Protein-Vala',
        href: 'https://github.com/Aryan-Protein-Vala',
        annotation: 'EXT.01 // SOURCE ARCHIVE',
      },
      {
        id: 'linkedin',
        label: 'LINKEDIN',
        value: 'https://linkedin.com/in/aryannnn/',
        href: 'https://linkedin.com/in/aryannnn/',
        annotation: 'EXT.02 // PROFESSIONAL GRAPH',
      },
      {
        id: 'email',
        label: 'EMAIL',
        value: 'aryansharma24112003@gmail.com',
        href: 'mailto:aryansharma24112003@gmail.com',
        annotation: 'EXT.03 // DIRECT TRANSMISSION',
      },
    ],
  },
};
