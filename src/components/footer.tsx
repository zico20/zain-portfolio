"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { scrollToSection } from "@/lib/scroll";
import { Button } from "@/components/ui/button";

const socials = [
  { label: "GitHub", href: siteConfig.links.github, icon: Github },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="container flex flex-col items-center gap-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <button
            onClick={() => scrollToSection("hero")}
            className="font-mono text-sm font-bold tracking-tight transition-colors hover:text-primary"
          >
            {"<zain />"}
          </button>
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {year} {siteConfig.name}. Built with Next.js and Tailwind.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <Button key={label} variant="ghost" size="icon" asChild>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                aria-label={label}
              >
                <Icon />
              </a>
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            aria-label="Back to top"
            onClick={() => scrollToSection("hero")}
          >
            <ArrowUp />
          </Button>
        </div>
      </div>
    </footer>
  );
}
