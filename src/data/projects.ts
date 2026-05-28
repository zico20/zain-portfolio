/** A featured project card. Swap in real data / links as projects ship. */
export interface Project {
  /** Stable slug, used for keys and as the cover image filename. */
  slug: string;
  title: string;
  /** One-line description shown on the card. */
  description: string;
  /** Tech tags rendered as badges. */
  tags: string[];
  /** Path to the cover image in /public (1200x630, SVG). */
  image: string;
  /** Live demo URL, or null to hide the button until deployed. */
  liveUrl: string | null;
  /** Source code URL, or null to hide the button. */
  repoUrl: string | null;
  /** Highlight the card with an accent ring + "Featured" tag. */
  featured?: boolean;
}

/**
 * Edit this array to update the Featured Projects section.
 * Cover images live in /public/projects/<slug>.svg.
 */
export const projects: Project[] = [
  {
    slug: "hazardsignal",
    title: "HazardSignal",
    description:
      "A wildfire risk web platform for Antalya — interactive risk maps, daily forecasts, and a public API. Built with a FastAPI backend, a React frontend, and a PostgreSQL data layer.",
    tags: ["React", "FastAPI", "PostgreSQL", "Mapbox"],
    image: "/projects/hazardsignal.svg",
    liveUrl: "https://hazardsignal.com",
    repoUrl: "https://github.com/zico20/Hazardsignal",
    featured: true,
  },
  {
    slug: "numina",
    title: "Numina",
    description:
      "A smart scientific calculator web app that parses natural-language math expressions and walks through the solution step by step, with a clean Next.js interface and a FastAPI compute layer.",
    tags: ["Next.js", "TypeScript", "FastAPI", "Tailwind"],
    image: "/projects/numina.svg",
    liveUrl: null,
    repoUrl: "https://github.com/zico20",
  },
  {
    slug: "taskflow",
    title: "TaskFlow",
    description:
      "A real-time collaborative task manager with live updates, drag-and-drop boards, and team workspaces.",
    tags: ["Next.js", "FastAPI", "PostgreSQL"],
    image: "/projects/taskflow.svg",
    liveUrl: null,
    repoUrl: "https://github.com/zico20",
  },
  {
    slug: "nexshop",
    title: "NexShop",
    description:
      "A headless e-commerce starter kit with product catalog, cart, and Stripe checkout, ready to fork and customize.",
    tags: ["Next.js", "Supabase", "Stripe"],
    image: "/projects/nexshop.svg",
    liveUrl: null,
    repoUrl: "https://github.com/zico20",
  },
];
