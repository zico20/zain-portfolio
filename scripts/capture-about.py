"""Capture the About section (desktop + mobile) to verify the photo avatar."""
import os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:3000")

with sync_playwright() as p:
    b = p.chromium.launch(headless=True)

    # Desktop
    ctx = b.new_context(viewport={"width": 1440, "height": 950}, device_scale_factor=2)
    pg = ctx.new_page()
    pg.goto(BASE, wait_until="domcontentloaded")
    pg.wait_for_selector("#hero h1")
    pg.evaluate("document.getElementById('about').scrollIntoView({block:'start'})")
    pg.wait_for_selector('#about img[alt*="Zain"]')
    pg.wait_for_timeout(1400)
    pg.screenshot(path="docs/section-about.png")
    print("[ok] docs/section-about.png (desktop)")
    ctx.close()

    # Mobile
    m = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True)
    mp = m.new_page()
    mp.goto(BASE, wait_until="domcontentloaded")
    mp.wait_for_selector("#hero h1")
    mp.evaluate("document.getElementById('about').scrollIntoView({block:'start'})")
    mp.wait_for_selector('#about img[alt*="Zain"]')
    mp.wait_for_timeout(1400)
    mp.screenshot(path="docs/mobile-about.png", full_page=False)
    print("[ok] docs/mobile-about.png (390px)")
    m.close()

    b.close()
print("done")
