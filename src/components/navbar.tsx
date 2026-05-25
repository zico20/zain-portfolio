"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("");

  // Shrink the navbar once the user scrolls past a small threshold.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in view.
  React.useEffect(() => {
    const ids = navItems.map((i) => i.href);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-20",
        )}
      >
        {/* Brand / home */}
        <button
          onClick={() => scrollToSection("hero")}
          className="group flex items-center gap-2 rounded-md font-mono text-base font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Zain Al-Mawla — back to top"
        >
          <span className="text-primary transition-transform duration-200 group-hover:-translate-y-0.5">
            {"<"}
          </span>
          <span>zain</span>
          <span className="text-primary transition-transform duration-200 group-hover:translate-y-0.5">
            {"/>"}
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <button
                onClick={() => handleNav(item.href)}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active === item.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <span className="font-mono text-xs text-primary/70">
                  0{i + 1}.
                </span>{" "}
                {item.label}
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <Github />
            </a>
          </Button>
          <ThemeToggle />
          <div className="hidden md:block">
            <Button size="sm" onClick={() => handleNav("contact")}>
              Get in touch
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNav(item.href)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <span className="font-mono text-xs text-primary/70">
                      0{i + 1}.
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  className="w-full"
                  onClick={() => handleNav("contact")}
                >
                  Get in touch
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
