export interface ArchitectureNode {
  id: string;
  label: string;
  role: string;
  icon: string;
  tech: string;
  type: 'client' | 'api' | 'auth' | 'database' | 'storage';
}

export interface ArchitectureFlow {
  from: string;
  to: string;
  protocol: string;
  data: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  status: 'in-progress' | 'live' | 'upcoming';
  progressPercentage: number;
  summary: string;
  description: string;
  stack: string[];
  links: {
    live?: string;
    code?: string;
  };
  features: string[];
  challenges?: string[];
  roadmap?: {
    milestone: string;
    completed: boolean;
    current?: boolean;
  }[];
  architecture?: {
    nodes: ArchitectureNode[];
    flows: ArchitectureFlow[];
  };
  metrics?: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    slug: "snapshare",
    title: "SnapShare",
    subtitle: "Real-Time Image Sharing & Social Web Application",
    status: "in-progress",
    progressPercentage: 68,
    summary:
      "An Instagram/Snapchat-inspired photo-sharing web application featuring secure user authentication, responsive feed streams, cloud-based media storage, and profile management.",
    description:
      "SnapShare was born out of a desire to deeply understand how modern multimedia applications handle binary uploads, secure tokens, and scalable storage pipelines. Instead of relying on turn-key BaaS black boxes, Vivek designed a hybrid architecture pairing Express.js micro-endpoints with MongoDB for relational metadata and Cloud Storage for CDN-ready asset persistence.",
    stack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase Auth",
      "Cloud Storage",
      "JavaScript",
      "HTML5 / CSS3",
    ],
    links: {
      code: "https://github.com/vivekpalhal/snapshare",
      live: "https://snapshare-demo.web.app",
    },
    features: [
      "Secure Firebase Auth token verification on Express middleware",
      "Direct multipart image pipeline with MIME validation & auto-resizing",
      "Optimized MongoDB indexing for chronological feed retrieval",
      "User profile customization, image captions, and like/reaction counts",
      "Fully responsive mobile-first UI with smooth client-side interactions",
    ],
    challenges: [
      "Managing upload payload buffers efficiently without exhausting server memory on large images.",
      "Synchronizing Firebase client credentials with backend JWT middleware validations.",
      "Structuring MongoDB schemas for fast feed query pagination and subdocument queries.",
    ],
    roadmap: [
      { milestone: "Core REST API & MongoDB Schema Design", completed: true },
      { milestone: "Firebase Auth & User Session Security", completed: true },
      { milestone: "Cloud Storage Upload Stream & Thumbnail Generation", completed: true, current: true },
      { milestone: "Real-Time Activity Feed & Follower System", completed: false },
      { milestone: "Direct Message Ephemeral Image Snaps", completed: false },
    ],
    architecture: {
      nodes: [
        { id: "client", label: "Web Client", role: "UI & Upload Picker", icon: "Monitor", tech: "HTML5 / CSS / Vanilla JS", type: "client" },
        { id: "auth", label: "Firebase Auth", role: "OAuth & JWT Provider", icon: "Key", tech: "Firebase SDK / Identity", type: "auth" },
        { id: "api", label: "Express API Server", role: "Business Logic & Routes", icon: "Server", tech: "Node.js + Express.js", type: "api" },
        { id: "storage", label: "Cloud Media Bucket", role: "Binary Image Blobs", icon: "HardDrive", tech: "Cloud Storage / CDN", type: "storage" },
        { id: "db", label: "MongoDB Database", role: "Users, Feeds & Metadata", icon: "Database", tech: "MongoDB Atlas / Mongoose", type: "database" },
      ],
      flows: [
        { from: "client", to: "auth", protocol: "OAuth 2.0 / HTTPS", data: "User Credentials & ID Tokens" },
        { from: "client", to: "api", protocol: "REST / HTTPS (Bearer)", data: "Multipart FormData & Token" },
        { from: "api", to: "auth", protocol: "Admin SDK", data: "Verify Token Signature" },
        { from: "api", to: "storage", protocol: "Signed URL / S3 API", data: "Processed Image Buffer" },
        { from: "api", to: "db", protocol: "Mongo Wire Protocol", data: "Post Document + Asset URL" },
      ],
    },
    metrics: [
      { label: "Target Latency", value: "< 240ms" },
      { label: "Media Pipeline", value: "Cloud Stored" },
      { label: "Auth Flow", value: "OAuth + JWT" },
    ],
  },
  {
    slug: "neural-nocturne",
    title: "Neural Nocturne",
    subtitle: "Living Neural Network Creative Portfolio",
    status: "live",
    progressPercentage: 100,
    summary:
      "A creative-coding portfolio where every skill, project, and leadership milestone is a bioluminescent node in an interactive canvas network.",
    description:
      "Created to challenge static resume websites. Features a 60 FPS spatial neural mesh that reacts to cursor proximity, physics-backed skills constellation, zero-slop typographic discipline, and a high-efficiency Quick Scan recruiter mode.",
    stack: [
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "HTML5 Canvas 2D",
      "Lucide Icons",
      "Web Audio API",
    ],
    links: {
      code: "https://github.com/vivekpalhal/neural-nocturne",
      live: "#origin",
    },
    features: [
      "Interactive neural network particle canvas with cursor gravitational pull and click shockwaves",
      "Honest proficiency ring system mapping directly to verified competencies",
      "Quick Scan mode for 60-second recruiter review with zero animation overhead",
      "Full Command Palette (Cmd+K) with fuzzy search and developer easter eggs",
      "Synthesized gentle ambient UI audio via Web Audio API without external assets",
    ],
    challenges: [
      "Maintaining a consistent 60 FPS render loop across mobile and high-refresh desktop displays.",
      "Designing responsive canvas coordinates that recalibrate seamlessly during window resize.",
      "Strict zero-pill and anti-AI-slop typography adherence.",
    ],
    roadmap: [
      { milestone: "Core Neural Network Engine & Particle Physics", completed: true },
      { milestone: "Skills Constellation & Architecture Diagram", completed: true },
      { milestone: "Command Palette & Recruiter Quick Scan Mode", completed: true },
      { milestone: "Web Audio Synthesizer Integration", completed: true },
    ],
    metrics: [
      { label: "FPS Budget", value: "Solid 60" },
      { label: "Asset Dependencies", value: "Zero Bloat" },
      { label: "Keyboard Nav", value: "100% WCAG" },
    ],
  },
  {
    slug: "api-prober",
    title: "API Flow Prober",
    subtitle: "Automated Contract Testing & Spec Validator",
    status: "upcoming",
    progressPercentage: 45,
    summary:
      "Postman-driven automated testing suite and documentation harness verifying REST contract integrity, status codes, and JSON schemas.",
    description:
      "Synthesizing lessons from the Postman API Fundamentals certification and Google Cloud Arcade. Generates automated health probes and contract assertion tests for developer microservices.",
    stack: [
      "Postman",
      "JavaScript",
      "Node.js",
      "Newman CLI",
      "GCP Cloud Run",
    ],
    links: {
      code: "https://github.com/vivekpalhal/api-flow-prober",
    },
    features: [
      "Pre-request script JWT injection and refresh automation",
      "Response time threshold assertions and contract schema validation",
      "Automated Newman CI/CD reporting and mock server stubs",
    ],
    metrics: [
      { label: "Test Assertions", value: "100% Coverage" },
      { label: "Integration", value: "Postman Newman" },
    ],
  },
];
