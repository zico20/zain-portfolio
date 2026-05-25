"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { TechIcon, type TechIconName } from "@/components/tech-icon";

const ROLES = ["Fullstack Developer", "AI Enthusiast", "Problem Solver"];

/** Subtle floating icons in the background. Positions are percentage-based. */
const FLOATERS: { name: TechIconName; top: string; left: string; size: number; delay: number }[] = [
  { name: "react", top: "18%", left: "8%", size: 46, delay: 0 },
  { name: "python", top: "65%", left: "12%", size: 40, delay: 0.6 },
  { name: "nextjs", top: "28%", left: "85%", size: 44, delay: 1.1 },
  { name: "pytorch", top: "72%", left: "80%", size: 38, delay: 0.3 },
  { name: "docker", top: "12%", left: "60%", size: 34, delay: 0.9 },
  { name: "fastapi", top: "82%", left: "45%", size: 36, delay: 1.4 },
];

export function Hero() {
  const typed = useTypewriter(ROLES);
  const ref = React.useRef<HTMLDivElement>(null);

  // Cursor-follow radial gradient: write pointer position to CSS vars (no re-render).
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      {/* Layer 1: dot grid */}
      <div className="glow-grid absolute inset-0 opacity-40" aria-hidden="true" />

      {/* Layer 2: cursor-follow gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      {/* Layer 3: ambient top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[820px] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]"
      />

      {/* Layer 4: floating tech icons */}
      <div aria-hidden="true" className="absolute inset-0 hidden sm:block">
        {FLOATERS.map((f) => (
          <motion.div
            key={f.name}
            className="absolute text-muted-foreground/[0.08]"
            style={{ top: f.top, left: f.left }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -14, 0] }}
            transition={{
              opacity: { duration: 1, delay: f.delay },
              y: {
                duration: 6 + f.delay,
                repeat: Infinity,
                ease: "easeInOut",
                delay: f.delay,
              },
            }}
          >
            <TechIcon name={f.name} style={{ width: f.size, height: f.size }} />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-sm text-muted-foreground backdrop-blur"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {siteConfig.location}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            Hi, I&apos;m <span className="text-gradient animate-gradient-pan">Zain.</span>
          </motion.h1>

          {/* Typewriter line — reserve height to avoid layout shift. */}
          <motion.div
            variants={item}
            className="mt-4 flex h-9 items-center justify-center sm:h-11"
          >
            <span className="font-mono text-xl text-foreground sm:text-2xl">
              <span className="text-muted-foreground">{"> "}</span>
              {typed}
              <span
                className="ml-0.5 inline-block w-[2px] animate-blink bg-primary align-middle"
                style={{ height: "1.1em" }}
                aria-hidden="true"
              />
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <ArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("contact")}
            >
              <Mail />
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to about section"
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.8 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
