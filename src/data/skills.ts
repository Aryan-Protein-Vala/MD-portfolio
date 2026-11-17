export interface SkillGroup {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  planeDepth: number;
  spatialCenter: [number, number, number];
  items: {
    name: string;
    annotation: string;
    offset: [number, number, number];
  }[];
}

export const skillsDisclaimer =
  'A spatial map of languages, protocols, frameworks, and AI tooling applied across production systems and technical explorations — organized by architectural layer rather than arbitrary proficiency percentages.';

export const skillsData: SkillGroup[] = [
  {
    id: 'languages',
    code: 'MAP.04A // CORE SYNTAX &COMPILATION',
    title: 'LANGUAGES',
    subtitle: 'Systems, application, and query languages used across projects',
    planeDepth: -144,
    spatialCenter: [-5.5, 2.0, -144],
    items: [
      { name: 'Rust', annotation: 'SYS.MEM', offset: [-2.2, 1.2, 0.8] },
      { name: 'Go', annotation: 'NET.CONC', offset: [0.4, 1.5, -0.4] },
      { name: 'C++', annotation: 'LOW.LVL', offset: [2.4, 0.9, 0.6] },
      { name: 'Java', annotation: 'JVM.RT', offset: [-2.6, -0.1, -0.6] },
      { name: 'TypeScript', annotation: 'TYPE.APP', offset: [0.0, 0.2, 1.1] },
      { name: 'Swift', annotation: 'DARWIN.BLE', offset: [2.2, -0.3, -0.5] },
      { name: 'Kotlin', annotation: 'ANDROID.BLE', offset: [-1.8, -1.3, 0.4] },
      { name: 'Python', annotation: 'DATA.AI', offset: [0.6, -1.2, -0.8] },
      { name: 'SQL', annotation: 'REL.QUERY', offset: [2.5, -1.4, 0.3] },
    ],
  },
  {
    id: 'systems-networking',
    code: 'MAP.04B // TRANSPORT & KERNEL INTERFACE',
    title: 'SYSTEMS & NETWORKING',
    subtitle: 'Protocols, memory management, and concurrency primitives',
    planeDepth: -148,
    spatialCenter: [5.5, 1.6, -148],
    items: [
      { name: 'QUIC', annotation: 'UDP.MUX', offset: [-2.0, 1.3, 0.7] },
      { name: 'TCP/IP', annotation: 'L4.STREAM', offset: [0.3, 1.4, -0.5] },
      { name: 'UDP', annotation: 'DGRAM.RAW', offset: [2.3, 1.0, 0.4] },
      { name: 'BLE', annotation: 'GATT.L2CAP', offset: [-2.2, 0.1, -0.7] },
      { name: 'WebSockets', annotation: 'FULL.DUPLEX', offset: [0.2, 0.2, 0.9] },
      { name: 'mmap', annotation: 'ZERO.COPY', offset: [2.4, -0.1, -0.4] },
      { name: 'IPC', annotation: 'PROC.PIPE', offset: [-1.4, -1.2, 0.5] },
      { name: 'Multithreading', annotation: 'SYNC.LOCK', offset: [1.4, -1.3, -0.6] },
    ],
  },
  {
    id: 'frameworks-infrastructure',
    code: 'MAP.04C // APPLICATION & ENTERPRISE STACK',
    title: 'FRAMEWORKS & INFRASTRUCTURE',
    subtitle: 'Verified web, backend, database, and enterprise ecosystems',
    planeDepth: -152,
    spatialCenter: [-5.0, -1.8, -152],
    items: [
      { name: 'React', annotation: 'UI.GRAPH', offset: [-2.4, 1.2, 0.6] },
      { name: 'Next.js', annotation: 'HYBRID.SSR', offset: [0.0, 1.4, -0.5] },
      { name: 'Node.js', annotation: 'EVENT.RT', offset: [2.2, 1.1, 0.7] },
      { name: 'Astro', annotation: 'ISLAND.PERF', offset: [-2.5, 0.0, -0.4] },
      { name: 'Tailwind', annotation: 'DESIGN.SYS', offset: [-0.1, 0.1, 0.8] },
      { name: 'Supabase', annotation: 'PG.REALTIME', offset: [2.3, 0.0, -0.6] },
      { name: 'FastAPI', annotation: 'ASYNC.PY', offset: [-2.1, -1.2, 0.5] },
      { name: 'PostgreSQL', annotation: 'ACID.STORE', offset: [0.2, -1.3, -0.7] },
      { name: 'SAP Technologies', annotation: 'B1.ERP.API', offset: [2.5, -1.2, 0.4] },
    ],
  },
  {
    id: 'ai-data',
    code: 'MAP.04D // INTELLIGENT PIPELINES & RETRIEVAL',
    title: 'AI & DATA',
    subtitle: 'Applied agent workflows, retrieval architectures, and data tooling',
    planeDepth: -156,
    spatialCenter: [5.2, -2.0, -156],
    items: [
      { name: 'AI Agents', annotation: 'ASYNC.ORCH', offset: [-2.0, 1.1, 0.6] },
      { name: 'Automation', annotation: 'EVENT.PIPE', offset: [0.4, 1.2, -0.5] },
      { name: 'RAG', annotation: 'CTX.SYNTH', offset: [2.3, 0.9, 0.5] },
      { name: 'Machine Learning', annotation: 'INFER.MOD', offset: [-1.9, -0.6, -0.6] },
      { name: 'Data Processing', annotation: 'ETL.STREAM', offset: [0.3, -0.8, 0.7] },
      { name: 'Vector Search', annotation: 'EMBED.INDEX', offset: [2.4, -0.9, -0.4] },
    ],
  },
];
