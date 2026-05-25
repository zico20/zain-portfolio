"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating "back to top" button. Appears after the user scrolls past 500px and
 * smooth-scrolls to the top (respecting reduced-motion).
 *
 * It hides as the user nears the bottom of the page so it never overlaps the
 * footer (which has its own "back to top" control). The bottom proximity is
 * computed straight from scroll position — deterministic and immune to the
 * smooth-scroll / scroll-padding timing quirks an IntersectionObserver hits.
 */
const BOTTOM_GAP = 160; // px from page bottom at which we retract the button

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const pastThreshold = scrollY > 500;
      const nearBottom = viewportBottom >= pageHeight - BOTTOM_GAP;
      setVisible(pastThreshold && !nearBottom);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    // Recompute if the layout height changes (e.g. fonts load, viewport resize).
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={toTop}
          aria-label="Back to top"
          className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-lg backdrop-blur transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6 sm:h-11 sm:w-11"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
