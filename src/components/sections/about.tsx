"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Section, fadeUp, stagger } from "@/components/section";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Shipped" },
  { value: "5+", label: "Tech Stacks" },
  { value: "Open", label: "to Remote" },
];

const paragraphs = [
  "I’m Zain — a fullstack developer based in Ankara, Turkey. I build software end to end, from database schemas and APIs to the pixels users actually touch.",
  "Day to day I work across the stack with Next.js, React, and TypeScript on the frontend, and Python, FastAPI, and Node on the backend. Lately I’ve been training and fine-tuning ML and AI models for real problems — a wildfire-risk model trained on Google Earth Engine data, and a math assistant fine-tuned from Qwen.",
  "What drives me is the craft: clean, accessible interfaces, code that’s a pleasure to maintain, and products that feel fast and considered. I care about the details most people never notice — because they’re what separate good from great.",
];

export function About() {
  return (
    <Section id="about">
      {/* 2-column from tablet portrait (md, 768px) up; stacked on phones. */}
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* Left: avatar */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <AvatarCard />
        </motion.div>

        {/* Right: bio */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 flex flex-col gap-5 md:order-2"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-sm font-medium text-primary"
          >
            01. About Me
          </motion.span>
          <motion.h2
            id="about-heading"
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A developer who sweats the details.
          </motion.h2>

          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-pretty leading-relaxed text-muted-foreground"
            >
              {p}
            </motion.p>
          ))}

          {/* Stats — 2x2 on phones/tablet (narrower column), 4-across on desktop. */}
          <motion.dl
            variants={fadeUp}
            className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 bg-card px-3 py-5 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold text-primary sm:text-3xl">
                  {s.value}
                </dd>
                <dd className="text-xs leading-tight text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </Section>
  );
}

/** Headshot avatar with an accent ring, glow, and a dev-flavored caption bar. */
function AvatarCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mx-0">
      {/* Glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[2rem] bg-primary/15 blur-3xl"
      />

      {/* Decorative gradient ring */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/60 via-primary/10 to-transparent p-[1.5px] shadow-2xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {/* Photo */}
          <div className="relative aspect-square">
            <Image
              src="/zain.jpg"
              alt="Portrait of Zain M. Al-Mawla"
              fill
              priority
              sizes="(min-width: 768px) 384px, 100vw"
              className="object-cover"
            />
            {/* Subtle dark scrim at the very bottom — keeps the photo intact
                (no white-wash in light mode) while easing into the caption bar. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent"
            />
          </div>

          {/* Terminal-style caption bar (opaque so it stays legible in both themes) */}
          <div className="flex items-center gap-2 border-t border-border bg-secondary px-4 py-3 font-mono text-xs">
            <span className="font-semibold text-[#2EA043]">$</span>
            <span className="text-muted-foreground">whoami</span>
            <span className="ml-auto font-semibold text-foreground">
              zain@ankara
            </span>
          </div>
        </div>
      </div>

      {/* "Available for work" badge — sits BELOW the card (no overlap). */}
      <div className="mt-4 flex justify-center lg:justify-start">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2EA043] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2EA043]" />
          </span>
          <span className="text-xs font-semibold text-foreground">
            Available for work
          </span>
        </div>
      </div>

      {/* Floating accent chip top-left */}
      <div className="absolute -left-3 -top-3 hidden items-center gap-1.5 rounded-full border border-primary/40 bg-card px-3 py-1.5 shadow-lg sm:flex">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-xs font-semibold text-primary">
          builds AI
        </span>
      </div>
    </div>
  );
}
