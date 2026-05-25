"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

import { experiences } from "@/data/experience";
import { Section, SectionHeading } from "@/components/section";

export function Experience() {
  return (
    <Section id="experience" className="bg-card/30">
      <SectionHeading
        id="experience"
        eyebrow="04. Experience"
        title="Where I've worked"
        description="A timeline of roles and the impact I made along the way."
      />

      <div className="mx-auto max-w-3xl">
        <ol className="relative border-l border-border">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 ml-6 last:mb-0"
            >
              {/* Node marker */}
              <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-primary/40 bg-background ring-4 ring-background">
                <Briefcase className="h-3 w-3 text-primary" />
              </span>

              <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="font-mono text-xs text-primary">
                    {exp.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                  {exp.company}
                </p>
                <ul className="mt-4 flex flex-col gap-2">
                  {exp.points.map((point, j) => (
                    <li
                      key={j}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60"
                      />
                      <span className="text-pretty">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
