"""
Responsive audit across all target breakpoints.

For each width:
  - loads the page, scrolls through to trigger reveals
  - measures document scrollWidth vs viewport (detects horizontal overflow)
  - finds any element wider than the viewport (the usual overflow culprit)
  - captures a full-page screenshot

Run with the dev server already up. Override port via BASE env.
"""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")

# (label, width, height) — boundary widths of each requested range.
VIEWPORTS = [
    ("320-small-min", 320, 800),
    ("374-small-max", 374, 800),
    ("375-std-min", 375, 812),
    ("424-std-max", 424, 850),
    ("425-large-min", 425, 900),
    ("767-large-max", 767, 1024),
    ("768-tablet-port", 768, 1024),
    ("1023-tablet-port-max", 1023, 1024),
    ("1024-tablet-land", 1024, 800),
    ("1279-tablet-land-max", 1279, 800),
    ("1280-desktop", 1280, 900),
    ("1440-desktop", 1440, 900),
]

OVERFLOW_JS = """
() => {
  const docEl = document.documentElement;
  const vw = docEl.clientWidth;
  const scrollW = Math.max(document.body.scrollWidth, docEl.scrollWidth);
  const offenders = [];
  if (scrollW > vw + 1) {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const r = el.getBoundingClientRect();
      // element extends past the right edge of the viewport
      if (r.right > vw + 1 && r.width > 0 && r.height > 0) {
        // skip elements that are intentionally off-screen (sr-only / honeypot)
        const cs = getComputedStyle(el);
        if (cs.position === 'absolute' && (r.left < -1000)) continue;
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.toString) ? el.className.toString().slice(0,80) : '',
          right: Math.round(r.right),
          width: Math.round(r.width),
        });
      }
    }
  }
  return { vw, scrollW, overflow: scrollW - vw, offenders: offenders.slice(0, 12) };
}
"""

def main():
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        any_overflow = False
        for label, w, h in VIEWPORTS:
            ctx = b.new_context(viewport={"width": w, "height": h},
                                device_scale_factor=1,
                                is_mobile=w < 768)
            pg = ctx.new_page()
            pg.goto(BASE, wait_until="domcontentloaded")
            pg.wait_for_selector("#hero h1")
            # Scroll through to trigger all whileInView reveals before measuring.
            for sid in ["about", "skills", "projects", "experience", "contact"]:
                pg.evaluate(f"document.getElementById('{sid}')?.scrollIntoView()")
                pg.wait_for_timeout(150)
            pg.evaluate("window.scrollTo(0,0)")
            pg.wait_for_timeout(300)

            res = pg.evaluate(OVERFLOW_JS)
            status = "OK" if res["overflow"] <= 1 else f"OVERFLOW +{res['overflow']}px"
            if res["overflow"] > 1:
                any_overflow = True
            print(f"[{status:>14}] {label:<22} vw={res['vw']} scrollW={res['scrollW']}")
            for o in res["offenders"]:
                print(f"                 ↳ <{o['tag']}> w={o['width']} right={o['right']}  .{o['cls']}")

            pg.screenshot(path=f"docs/rwd-{label}.png", full_page=True)
            ctx.close()
        b.close()

        print("\n" + ("[!] Horizontal overflow found at one or more widths."
                       if any_overflow else "[OK] No horizontal overflow at any width."))

if __name__ == "__main__":
    main()
