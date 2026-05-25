import type { TechIconName } from "@/components/tech-icon";

/** A single technology entry shown as a card in the Tech Stack section. */
export interface Skill {
  name: string;
  /** Key into the brand icon registry in components/tech-icon.tsx. */
  icon: TechIconName;
}

/** A named group of related skills (e.g. "Frontend"). */
export interface SkillCategory {
  /** Stable id, handy for keys and anchors. */
  id: string;
  title: string;
  skills: Skill[];
}

/**
 * Edit this array to update the Tech Stack section.
 * Categories render in the order listed here.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "PHP", icon: "php" },
      { name: "Java", icon: "java" },
      { name: "C#", icon: "csharp" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Vue", icon: "vue" },
      { name: "Angular", icon: "angular" },
      { name: "Sass", icon: "sass" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js / Express", icon: "express" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Django", icon: "django" },
      { name: ".NET", icon: "dotnet" },
      { name: "Laravel", icon: "laravel" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "SQLite", icon: "sqlite" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    id: "ai-data",
    title: "AI / Data",
    skills: [
      { name: "PyTorch", icon: "pytorch" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "Linux", icon: "linux" },
      { name: "Figma", icon: "figma" },
    ],
  },
];
