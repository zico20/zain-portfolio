/** A single role in the Experience timeline. */
export interface ExperienceItem {
  /** Stable id for React keys. */
  id: string;
  role: string;
  company: string;
  /** Human-readable date range, e.g. "2023 — Present". */
  period: string;
  /** 2-3 short accomplishment bullets. */
  points: string[];
}

/**
 * Edit this array to update the Experience timeline.
 * Entries render newest-first (top to bottom).
 *
 * NOTE: Placeholder content — replace with real roles.
 */
export const experiences: ExperienceItem[] = [
  {
    id: "freelance-fullstack",
    role: "Freelance Fullstack Developer",
    company: "Self-Employed",
    period: "2023 — Present",
    points: [
      "Design and ship end-to-end web apps for clients across MENA and Europe using Next.js, FastAPI, and PostgreSQL.",
      "Built AI-powered features — from a wildfire risk model to a math-solving assistant — by training and serving custom PyTorch models.",
      "Own the full delivery cycle: scoping, architecture, implementation, and Vercel deployment.",
    ],
  },
  {
    id: "backend-engineer",
    role: "Backend Engineer",
    company: "Tech Startup",
    period: "2022 — 2023",
    points: [
      "Developed REST APIs in Django and Express serving 10k+ monthly active users.",
      "Optimized slow PostgreSQL queries and added caching, cutting median response time by ~40%.",
      "Containerized services with Docker and set up CI to make deploys repeatable.",
    ],
  },
  {
    id: "frontend-developer",
    role: "Frontend Developer",
    company: "Digital Agency",
    period: "2021 — 2022",
    points: [
      "Built responsive, accessible marketing sites and dashboards in React and Vue.",
      "Translated Figma designs into pixel-accurate, mobile-first interfaces.",
      "Collaborated with designers to establish a reusable component library.",
    ],
  },
];
