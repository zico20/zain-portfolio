"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github, Lock } from "lucide-react";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow duration-300 hover:shadow-2xl",
        project.featured ? "border-primary/40" : "border-border",
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-border bg-secondary">
        <Image
          src={project.image}
          alt={`${project.title} project cover`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {project.featured ? (
          <Badge className="absolute right-3 top-3 backdrop-blur">
            ★ Featured
          </Badge>
        ) : null}
        {/* Hover veil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="secondary">{tag}</Badge>
            </li>
          ))}
        </ul>

        {/* Actions pinned to the bottom */}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {project.liveUrl ? (
            <Button size="sm" asChild>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo (opens in new tab)`}
              >
                <ExternalLink />
                Live Demo
              </a>
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              disabled
              aria-label={`${project.title} live demo coming soon`}
            >
              <Lock />
              Coming Soon
            </Button>
          )}

          {project.repoUrl ? (
            <Button size="sm" variant="outline" asChild>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub (opens in new tab)`}
              >
                <Github />
                View Code
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
