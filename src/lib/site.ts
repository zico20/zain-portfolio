/**
 * Central site configuration: identity, links, and navigation.
 * Edit here to update the whole site (metadata, navbar, footer, contact).
 */
export const siteConfig = {
  name: "Zain M. Al-Mawla",
  shortName: "Zain Al-Mawla",
  role: "Fullstack Developer",
  location: "Ankara, Turkey",
  tagline:
    "I build modern web experiences and AI-powered tools from Ankara, Turkey.",
  description:
    "Zain M. Al-Mawla is a fullstack developer based in Ankara, Turkey, building modern web experiences and AI-powered tools with Next.js, React, Python, and PyTorch.",
  // Resolved from NEXT_PUBLIC_SITE_URL at build time; falls back to localhost.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.png",
  email: "contact@zainalmawla.dev",
  links: {
    github: "https://github.com/zico20",
    // TODO: replace with the real LinkedIn profile URL when available.
    linkedin: "https://www.linkedin.com/in/zain-almawla-dev/",
  },
} as const;

export type NavItem = {
  label: string;
  /** In-page anchor id (without the leading #). */
  href: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Projects", href: "projects" },
  { label: "Experience", href: "experience" },
  { label: "Contact", href: "contact" },
];
