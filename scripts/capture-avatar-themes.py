"""Capture the About avatar in both dark and light themes to verify legibility."""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 1200, "height": 950}, device_scale_factor=2)
    pg = ctx.new_page()
    pg.goto(BASE, wait_until="domcontentloaded")
    pg.wait_for_selector("#hero h1")

    def shot(name):
        pg.evaluate("document.getElementById('about').scrollIntoView({block:'center'})")
        pg.wait_for_selector('#about img[alt*="Zain"]')
        pg.wait_for_timeout(1200)
        # Tightly crop to the avatar card area.
        card = pg.locator("#about").locator("xpath=.//img[contains(@alt,'Zain')]/ancestor::div[contains(@class,'relative')][1]")
        card.first.screenshot(path=f"docs/{name}.png")
        print(f"[ok] docs/{name}.png")

    # Dark (default)
    shot("avatar-dark")

    # Toggle to light
    pg.click('button[aria-label*="Switch to"]')
    pg.wait_for_timeout(500)
    cls = pg.get_attribute("html", "class") or ""
    assert "light" in cls, f"expected light, got {cls!r}"
    shot("avatar-light")

    b.close()
print("done")
