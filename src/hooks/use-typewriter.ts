"use client";

import * as React from "react";

interface TypewriterOptions {
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while deleting. */
  deleteSpeed?: number;
  /** ms to hold a fully-typed word before deleting. */
  pauseMs?: number;
}

/**
 * Cycles through `words` with a type/delete animation.
 *
 * Honors `prefers-reduced-motion`: when reduced motion is requested it skips
 * the animation entirely and returns the first word, fully typed.
 */
export function useTypewriter(
  words: string[],
  { typeSpeed = 90, deleteSpeed = 45, pauseMs = 1600 }: TypewriterOptions = {},
) {
  const [text, setText] = React.useState("");
  const [reduced, setReduced] = React.useState(false);

  // Detect reduced-motion once on mount (and react to changes).
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (words.length === 0) return;

    if (reduced) {
      setText(words[0] ?? "");
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[wordIndex] ?? "";

      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeout = setTimeout(tick, pauseMs);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeout = setTimeout(tick, typeSpeed);
          return;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    timeout = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeout);
    // Re-run if the word list identity or motion preference changes.
  }, [words, reduced, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
