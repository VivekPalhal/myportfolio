export interface Profile {
  name: string;
  tagline: string;
  roles: string[];
  location: string;
  coordinates: string;
  email: string;
  availability: string;
  summary: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    period: string;
    semesters: {
      name: string;
      cgpa?: number;
      status: 'completed' | 'in-progress' | 'future';
      note?: string;
    }[];
  };
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const profileData: Profile = {
  name: "Vivek Palhal",
  tagline: "Aspiring Software Engineer · AI & Data Science Student · Web Developer",
  roles: [
    "AI & Data Science Student",
    "Full-Stack Web Developer",
    "Cloud & API Learner",
    "Campus Leader & Connector",
    "Aspiring Software Engineer"
  ],
  location: "Chhatrapati Sambhajinagar, Maharashtra, India",
  coordinates: "19.8762° N, 75.3433° E",
  email: "vivekpalhal07@gmail.com",
  availability: "Open to internships — 2026/27",
  summary:
    "Second-year B.Tech student in Artificial Intelligence & Data Science with hands-on experience in cloud computing, programming fundamentals, and API development. Campus leader with a proven record in event management, team coordination, and cross-functional communication across multiple student organizations. Passionate about architecting scalable systems and fostering collaborative tech communities.",
  socials: {
    linkedin: "https://linkedin.com/in/vivekpalhal",
    github: "https://github.com/vivekpalhal",
    email: "mailto:vivekpalhal07@gmail.com",
  },
  education: {
    institution: "CSMSS Chh. Shahu College of Engineering",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Artificial Intelligence & Data Science",
    period: "July 2025 – July 2029",
    semesters: [
      { name: "Sem 1", cgpa: 7.54, status: "completed", note: "Solid foundation in engineering calculus, mechanics, & C" },
      { name: "Sem 2", cgpa: 8.00, status: "completed", note: "Upward trajectory: Data structures, OOP, & digital systems" },
      { name: "Sem 3", status: "in-progress", note: "Current: Advanced algorithms, Python for Data Science" },
      { name: "Sem 4", status: "future", note: "Upcoming: Database systems & Operating Systems" },
      { name: "Sem 5-8", status: "future", note: "Upcoming: Deep Learning, Distributed Systems, Cloud Arch" },
    ],
  },
  stats: [
    { label: "Semesters Completed", value: "2", detail: "8.00 CGPA upward curve" },
    { label: "Campus Leadership Roles", value: "6", detail: "Unstop, ISTE, UNLOX, Cultural" },
    { label: "Certifications Earned", value: "5", detail: "Google Cloud, Postman, Deloitte" },
    { label: "Production Apps", value: "2", detail: "SnapShare & Neural Nocturne" },
  ],
};
