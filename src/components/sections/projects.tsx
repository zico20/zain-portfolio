"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

import { projects } from "@/data/projects";
import { siteConfig } from "@/lib/site";
import { Section, SectionHeading, stagger } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="03. Featured Projects"
        title="Things I've built"
        description="A selection of projects spanning machine learning, real-time apps, and developer tooling. Code and demos linked where available."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 flex justify-center"
      >
        <Button variant="outline" asChild>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            See more on GitHub
          </a>
        </Button>
      </motion.div>
    </Section>
  );
}
