"""Scroll to each section (triggering whileInView reveals) and screenshot it."""
from playwright.sync_api import sync_playwright

SECTIONS = ["about", "skills", "projects", "experience", "contact"]

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
    pg = ctx.new_page()
    pg.goto("http://localhost:3000", wait_until="networkidle")
    pg.wait_for_selector("#hero h1")

    for sid in SECTIONS:
        pg.evaluate(f"document.getElementById('{sid}').scrollIntoView({{behavior:'instant', block:'start'}})")
        # Let the reveal + stagger animations finish.
        pg.wait_for_timeout(1100)
        pg.screenshot(path=f"docs/section-{sid}.png")
        print(f"[ok] docs/section-{sid}.png")

    b.close()
print("done")
