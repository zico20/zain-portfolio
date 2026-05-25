"use client";

import { motion } from "framer-motion";

import { skillCategories } from "@/data/skills";
import { Section, SectionHeading, fadeUp, stagger } from "@/components/section";
import { TechIcon } from "@/components/tech-icon";

export function Skills() {
  return (
    <Section id="skills" className="bg-card/30">
      <SectionHeading
        id="skills"
        eyebrow="02. Tech Stack"
        title="Tools I build with"
        description="A toolkit spanning the full stack — from typed frontends to AI model training. Hover any card to bring it to life."
      />

      <div className="flex flex-col gap-10">
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.h3
              variants={fadeUp}
              className="mb-4 flex items-center gap-3 font-mono text-sm font-medium uppercase tracking-wider text-muted-foreground"
            >
              <span className="text-primary">#</span>
              {category.title}
              <span className="h-px flex-1 bg-border" />
            </motion.h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-colors duration-200 hover:border-primary/50"
                >
                  {/* Glow on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: "0 0 28px -6px hsl(var(--primary) / 0.45)",
                    }}
                  />
                  <TechIcon
                    name={skill.icon}
                    colored
                    className="h-9 w-9 transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
