/** A single role in the Experience timeline. */
export interface ExperienceItem {
  /** Stable id for React keys. */
  id: string;
  role: string;
  company: string;
  /** Human-readable date range, e.g. "2023 — Present". */
  period: string;
  /** Short accomplishment bullets. */
  points: string[];
}

/**
 * Edit this array to update the Experience timeline.
 * Entries render newest-first (top to bottom).
 */
export const experiences: ExperienceItem[] = [
  {
    id: "freelance-fullstack",
    role: "Freelance Fullstack Developer",
    company: "Self-Employed",
    period: "2023 — Present",
    points: [
      "Design and ship end-to-end web apps for clients across MENA and Europe, using Next.js, TypeScript, FastAPI, and PostgreSQL.",
      "Own the full delivery cycle: scoping, technical architecture, UI/UX implementation, deployment, and post-launch iteration.",
      "Translate Figma designs into pixel-accurate, mobile-first interfaces with Tailwind CSS, shadcn/ui, and Framer Motion.",
      "Build production REST and server-side APIs with authentication, role-based access, payments (Stripe), and email delivery (Resend).",
      "Tune performance and SEO — image optimization, route caching, edge rendering, and Lighthouse scores in the 95+ range.",
      "Deploy to Vercel with custom domains, environment-specific configs, and CI that runs typecheck, lint, and build on every push.",
    ],
  },
];
