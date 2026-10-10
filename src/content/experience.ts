export type ExperienceCategory = 'leadership' | 'tech' | 'program';

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  category: ExperienceCategory;
  isCurrent: boolean;
  location?: string;
  badge?: string;
  description: string;
  bullets: string[];
  skillsApplied: string[];
  metrics?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "unstop",
    role: "Campus Champion",
    org: "Unstop",
    period: "Aug 2026 – Present",
    category: "leadership",
    isCurrent: true,
    location: "Campus Liaison",
    badge: "Champion",
    description: "Driving student participation in national hackathons, coding contests, and career acceleration programs.",
    bullets: [
      "Serves as the primary institutional link connecting 500+ college peers with premier national engineering hackathons and hiring challenges.",
      "Organized orientation sessions explaining platform mechanics, resume review pipelines, and competitive coding best practices.",
      "Facilitates student team formations for cross-campus collegiate engineering competitions.",
    ],
    skillsApplied: ["Leadership", "Community Outreach", "Public Speaking", "Cross-Functional Coordination"],
    metrics: "500+ Students Reached",
  },
  {
    id: "unlox",
    role: "Campus Ambassador",
    org: "UNLOX®",
    period: "Jul 2026 – Present",
    category: "leadership",
    isCurrent: true,
    location: "Remote / Campus",
    badge: "Ambassador",
    description: "Spearheading brand presence and tech program awareness across the student community.",
    bullets: [
      "Promotes technical empowerment cohorts, skill bootcamps, and early-career development opportunities.",
      "Acts as a direct communication bridge between corporate leadership and undergraduate engineering cohorts.",
      "Gathers student feedback on curriculum needs and transmits insights back to organizational coordinators.",
    ],
    skillsApplied: ["Brand Representation", "Strategic Communication", "Student Engagement"],
    metrics: "Active Campus Representative",
  },
  {
    id: "iste",
    role: "Student Coordinator",
    org: "ISTE, CSMSS Chh. Shahu College of Engineering",
    period: "Apr 2026 – Present",
    category: "leadership",
    isCurrent: true,
    location: "Chhatrapati Sambhajinagar",
    badge: "Technical Coordinator",
    description: "Coordinating technical workshops, coding bootcamps, and engineering symposiums.",
    bullets: [
      "Manages cross-functional student committees across logistics, technical content curation, and venue operations.",
      "Oversees concept-to-delivery planning for technical workshops covering modern software development tools.",
      "Coordinates guest speaker engagements and hands-on laboratory breakout sessions.",
    ],
    skillsApplied: ["Event Management", "Technical Workshop Coordination", "Team Leadership"],
    metrics: "Multiple Technical Events Coordinated",
  },
  {
    id: "deloitte",
    role: "Technology Job Simulation",
    org: "Deloitte (Virtual Simulation)",
    period: "Jul 2026",
    category: "tech",
    isCurrent: false,
    location: "Virtual",
    badge: "Simulation Completed",
    description: "Practical enterprise technology consulting problem-solving and software architecture case analysis.",
    bullets: [
      "Completed real-world business scenarios focusing on cloud migration feasibility, data privacy compliance, and IT advisory.",
      "Analyzed client business requirements and authored architectural recommendation briefs.",
      "Evaluated trade-offs between legacy monolithic infrastructure and cloud-native microservice solutions.",
    ],
    skillsApplied: ["Technology Consulting", "Client Problem Solving", "Cloud Migration Analysis"],
    metrics: "100% Practical Scenarios Solved",
  },
  {
    id: "cultural-committee",
    role: "Co-Head, Cultural Committee",
    org: "CSMSS Chh. Shahu College of Engineering",
    period: "Mar 2026 – May 2026",
    category: "leadership",
    isCurrent: false,
    location: "Campus",
    badge: "Co-Head 2k26",
    description: "Co-directed the flagship annual college cultural festival '2k26', orchestrating logistics, schedules, and a multi-tiered student volunteer workforce.",
    bullets: [
      "Co-led a 40+ member volunteer committee overseeing stage management, budget allocations, schedules, and sound systems.",
      "Successfully delivered the 3-day multi-tier festival on-time and with zero incident escalations.",
      "Mediated stakeholder conflicts between faculty administration and student event performers under tight deadlines.",
    ],
    skillsApplied: ["Event Operations", "Crisis Resolution", "Logistics Management", "Team Governance"],
    metrics: "40+ Committee Members Led · 3-Day Festival",
  },
  {
    id: "gcp-arcade",
    role: "Google Cloud Arcade Program",
    org: "Google (Virtual)",
    period: "Jun 2025 – Dec 2025",
    category: "program",
    isCurrent: false,
    location: "Cloud Labs",
    badge: "Arcade Milestone",
    description: "Rigorous hands-on cloud computing challenges spanning GCP infrastructure, security, and computing modules.",
    bullets: [
      "Completed multiple Google Cloud skills badges spanning Compute Engine, Cloud Storage buckets, and IAM roles.",
      "Configured virtual networks, ingress/egress firewall rules, and container deployments via Cloud Console and gcloud CLI.",
      "Cultivated foundational proficiency in enterprise cloud cost modeling and elasticity best practices.",
    ],
    skillsApplied: ["Google Cloud Platform", "IAM Security", "Compute Engine", "Cloud Storage"],
    metrics: "Multiple GCP Skill Badges Earned",
  },
];
