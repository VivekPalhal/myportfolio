export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
  verifyUrl?: string;
  summary: string;
}

export const certificationsData: Certification[] = [
  {
    id: "gcp-digital",
    title: "Digital Transformation with Google Cloud",
    issuer: "Google",
    date: "2025",
    skills: ["Cloud Architecture", "Digital Transformation", "GCP Fundamentals"],
    summary: "Comprehensive understanding of cloud infrastructure, data modernizations, and cloud security governance.",
    verifyUrl: "https://cloud.google.com",
  },
  {
    id: "postman-api",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "2026",
    skills: ["REST APIs", "Automated Testing", "API Design", "Postman Collections"],
    summary: "Certified proficiency in authoring REST test suites, automating test scripts, and chaining API requests.",
    verifyUrl: "https://badgr.com",
  },
  {
    id: "deloitte-tech",
    title: "Deloitte Australia — Technology Job Simulation",
    issuer: "Deloitte (Forage)",
    date: "2026",
    skills: ["Enterprise Architecture", "Consulting", "System Optimization"],
    summary: "Hands-on virtual simulation resolving cloud strategy, technology governance, and feasibility studies.",
    verifyUrl: "https://www.theforage.com",
  },
  {
    id: "java-programming",
    title: "A Complete Guide to Java Programming with Examples",
    issuer: "Certification Authority",
    date: "2025",
    skills: ["Java", "OOP Principles", "Data Structures", "Exception Handling"],
    summary: "End-to-end coursework covering class hierarchies, polymorphism, memory lifecycle, and multithreading.",
    verifyUrl: "#",
  },
  {
    id: "deepseek-ai",
    title: "Deepseek AI: Automate Tasks & Write Code Effortlessly",
    issuer: "AI Educational Program",
    date: "2026",
    skills: ["Prompt Engineering", "Developer Productivity", "AI-Assisted Workflow"],
    summary: "Harnessing state-of-the-art open-weights reasoning models to streamline coding, debugging, and testing.",
    verifyUrl: "#",
  },
];
