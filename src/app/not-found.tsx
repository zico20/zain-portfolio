import type { Metadata } from "next";
import Link from "next/link";
import { Home, Terminal } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
      {/* Ambient background to match the hero */}
      <div className="glow-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-lg">
        <div className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-2xl backdrop-blur">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
            <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              zsh — error
            </span>
          </div>

          <div className="flex flex-col items-center gap-5 p-8 text-center sm:p-10">
            <p className="font-mono text-7xl font-bold text-gradient sm:text-8xl">
              404
            </p>
            <div className="font-mono text-sm text-muted-foreground">
              <p>
                <span className="text-primary">$</span> cd /that-page
              </p>
              <p className="text-[#FF7B72]">
                cd: no such file or directory
              </p>
            </div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              This page doesn&apos;t exist.
            </h1>
            <p className="text-pretty text-sm text-muted-foreground">
              The link may be broken, or the page may have been moved. Let&apos;s
              get you back home.
            </p>
            <Button asChild size="lg" className="mt-1">
              <Link href="/">
                <Home />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
