export type SkillCategory = 'languages' | 'cloud-tools' | 'competencies';

export type ProficiencyLevel = 1 | 2 | 3 | 4;

export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
  1: "Learning",
  2: "Comfortable",
  3: "Strong",
  4: "Expert",
};

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: ProficiencyLevel;
  ringScore: number; // 1 to 4
  statusNote: string;
  context: string;
  iconName?: string;
  connections: string[]; // IDs of related skills or projects
}

export const skillsData: Skill[] = [
  // Languages
  {
    id: "python",
    name: "Python",
    category: "languages",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Primary language for AI/ML foundations, data manipulation, scripting, and algorithmic problem solving.",
    connections: ["gcp", "snapshare", "architecture"],
  },
  {
    id: "c-lang",
    name: "C",
    category: "languages",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Core academic foundation in memory management, pointers, and low-level data structures.",
    connections: ["cpp", "architecture"],
  },
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    level: 2,
    ringScore: 2,
    statusNote: "Comfortable",
    context: "Object-oriented programming, STL containers, and competitive algorithmic challenges.",
    connections: ["c-lang", "python"],
  },
  {
    id: "html-css",
    name: "HTML5 & CSS3",
    category: "languages",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Modern semantic markup, responsive flex/grid layouts, CSS custom properties, and UI styling.",
    connections: ["javascript", "snapshare", "portfolio"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    level: 2,
    ringScore: 2,
    statusNote: "Basic → Growing",
    context: "Honest label: actively transitioning from fundamentals to full-stack Node.js/Express in SnapShare.",
    connections: ["html-css", "snapshare", "postman"],
  },

  // Cloud & Tools
  {
    id: "gcp",
    name: "Google Cloud Platform",
    category: "cloud-tools",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Hands-on cloud labs via Google Cloud Arcade (2025); Cloud Storage, Compute, and Identity fundamentals.",
    connections: ["snapshare", "architecture"],
  },
  {
    id: "postman",
    name: "Postman",
    category: "cloud-tools",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Certified Postman API Fundamentals Student Expert; REST collection testing, mock servers, and auth headers.",
    connections: ["javascript", "snapshare"],
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "cloud-tools",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Version control workflows, branching, pull requests, collaboration, and repository governance.",
    connections: ["snapshare", "project-management"],
  },
  {
    id: "vscode",
    name: "VS Code",
    category: "cloud-tools",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Primary development IDE configured with linting, debugging, container extensions, and shortcuts.",
    connections: ["git-github", "python", "javascript"],
  },

  // Core Competencies
  {
    id: "architecture",
    name: "System Architecture",
    category: "competencies",
    level: 2,
    ringScore: 2,
    statusNote: "Comfortable",
    context: "Designing multi-tier client-server pipelines, REST API contracts, and scalable database schemas.",
    connections: ["snapshare", "gcp", "postman"],
  },
  {
    id: "project-management",
    name: "Project Management",
    category: "competencies",
    level: 3,
    ringScore: 3,
    statusNote: "Strong",
    context: "Roadmapping deliverables, milestone tracking, and task delegation across teams and technical projects.",
    connections: ["team-coordination", "event-planning"],
  },
  {
    id: "team-coordination",
    name: "Team Coordination",
    category: "competencies",
    level: 4,
    ringScore: 4,
    statusNote: "Expert",
    context: "Liaison between college administration, external organizations (Unstop/UNLOX), and student committees.",
    connections: ["event-planning", "project-management"],
  },
  {
    id: "event-planning",
    name: "Event Planning & Leadership",
    category: "competencies",
    level: 4,
    ringScore: 4,
    statusNote: "Expert",
    context: "Co-Head of Cultural Committee 2k26; ISTE technical workshops concept-to-execution for hundreds of students.",
    connections: ["team-coordination", "project-management"],
  },
];
