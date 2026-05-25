"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/** Shared fade-up reveal used by section headers and content blocks. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Staggered container: children using `fadeUp` animate in sequence. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Anchor id (used by the navbar / smooth scroll). */
  id: string;
  /** Tighten vertical rhythm when nested or stacked. */
  compact?: boolean;
}

/**
 * A semantic <section> with consistent vertical rhythm and a container.
 * Renders an accessible landmark; pair with a heading inside.
 */
export function Section({
  id,
  className,
  compact,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-20",
        compact ? "py-16 sm:py-20" : "py-20 sm:py-28",
        className,
      )}
      {...props}
    >
      <div className="container">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  /** Matches the parent Section id so aria-labelledby resolves. */
  id: string;
  /** Small mono label above the title, e.g. "01. About". */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

/** Animated heading block shared by every section. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "mb-12 flex flex-col gap-3 sm:mb-16",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          variants={fadeUp}
          className="font-mono text-sm font-medium text-primary"
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <motion.h2
        id={`${id}-heading`}
        variants={fadeUp}
        className="text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-2xl text-base text-muted-foreground sm:text-lg",
            align === "center" ? "mx-auto" : "",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
