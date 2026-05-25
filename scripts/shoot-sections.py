"""
Capture each section as a viewport-cropped, readable screenshot at a given width.
Usage: BASE=http://localhost:3000 W=320 python scripts/shoot-sections.py
"""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")
W = int(os.environ.get("W", "320"))
H = int(os.environ.get("H", "740"))
TAG = os.environ.get("TAG", str(W))

SECTIONS = ["hero", "about", "skills", "projects", "experience", "contact"]

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": W, "height": H},
                        device_scale_factor=2, is_mobile=W < 768)
    pg = ctx.new_page()
    pg.goto(BASE, wait_until="domcontentloaded")
    pg.wait_for_selector("#hero h1")
    # warm reveals
    for sid in SECTIONS:
        pg.evaluate(f"document.getElementById('{sid}')?.scrollIntoView()")
        pg.wait_for_timeout(120)
    pg.evaluate("window.scrollTo(0,0)")
    pg.wait_for_timeout(300)

    for sid in SECTIONS:
        el = pg.locator(f"#{sid}")
        # Scroll section to top of viewport, then shoot just the viewport.
        pg.evaluate(f"document.getElementById('{sid}').scrollIntoView({{block:'start'}})")
        pg.wait_for_timeout(700)
        pg.screenshot(path=f"docs/s-{TAG}-{sid}.png")  # viewport only
        print(f"[ok] docs/s-{TAG}-{sid}.png")
    b.close()
print("done")
