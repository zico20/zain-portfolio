/**
 * Smooth-scroll to an in-page section by id, accounting for the sticky navbar.
 * Falls back to the native hash if the element isn't found.
 *
 * Respects `prefers-reduced-motion` by jumping instantly.
 */
export function scrollToSection(id: string) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) {
    window.location.hash = id;
    return;
  }

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });

  // Move focus for keyboard/screen-reader users without an extra visible jump.
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}
