"""
Visual + interaction smoke test for the portfolio.
Assumes the dev server is already running at http://localhost:3000.

Captures screenshots into docs/ and asserts a few interactive behaviors:
  - page loads, hero heading present
  - dark (default) and light theme both render
  - desktop + mobile layouts
  - contact form client-side validation fires
  - submitting valid data shows a success toast
"""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
OUT = "docs"


def main() -> int:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # ---- Desktop, dark (default) ----
        ctx = browser.new_context(viewport={"width": 1440, "height": 900},
                                  device_scale_factor=2)
        page = ctx.new_page()
        errors: list[str] = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))

        page.goto(BASE, wait_until="networkidle")
        page.wait_for_selector("#hero h1")
        assert "Hi, I" in page.inner_text("#hero h1"), "hero heading missing"

        # Let the hero entrance animation settle.
        page.wait_for_timeout(1200)
        page.screenshot(path=f"{OUT}/hero.png")
        print("[ok] captured docs/hero.png (desktop, dark)")

        # Full-page dark capture
        page.screenshot(path=f"{OUT}/full-dark.png", full_page=True)
        print("[ok] captured docs/full-dark.png")

        # html should carry the dark class by default
        html_class = page.get_attribute("html", "class") or ""
        assert "light" not in html_class, f"expected dark default, got: {html_class!r}"
        print("[ok] dark theme is default")

        # ---- Toggle to light ----
        page.click('button[aria-label*="Switch to"]')
        page.wait_for_timeout(500)
        html_class = page.get_attribute("html", "class") or ""
        assert "light" in html_class, f"light theme did not apply, got: {html_class!r}"
        page.screenshot(path=f"{OUT}/hero-light.png")
        print("[ok] light theme toggles + captured docs/hero-light.png")

        ctx.close()

        # ---- Mobile (375px), dark ----
        m = browser.new_context(viewport={"width": 375, "height": 812},
                                device_scale_factor=2, is_mobile=True)
        mp = m.new_page()
        mp.goto(BASE, wait_until="networkidle")
        mp.wait_for_selector("#hero h1")
        mp.wait_for_timeout(1000)
        mp.screenshot(path=f"{OUT}/mobile-hero.png")
        print("[ok] captured docs/mobile-hero.png (375px)")

        # Mobile menu opens. After clicking, the trigger's aria-label flips to
        # "Close menu" — assert on that (unambiguous) rather than button text.
        mp.click('button[aria-label="Open menu"]')
        mp.wait_for_timeout(400)
        assert mp.locator('button[aria-label="Close menu"]').count() == 1, (
            "mobile menu trigger did not toggle to Close"
        )
        # The nav links render twice (hidden desktop nav + visible mobile panel);
        # the visible one is last in DOM order.
        assert mp.locator("text=Projects").last.is_visible(), (
            "mobile menu links not visible"
        )
        mp.screenshot(path=f"{OUT}/mobile-menu.png")
        print("[ok] mobile menu opens + captured docs/mobile-menu.png")
        m.close()

        # ---- Contact form validation ----
        c = browser.new_context(viewport={"width": 1024, "height": 1400})
        cp = c.new_page()
        cp.goto(BASE, wait_until="networkidle")
        # Jump to contact and submit empty -> expect validation errors
        cp.evaluate("document.getElementById('contact').scrollIntoView()")
        cp.wait_for_timeout(600)
        cp.click('button[type="submit"]')
        cp.wait_for_timeout(600)
        # zod messages should appear as alerts
        alert_count = cp.locator('[role="alert"]').count()
        assert alert_count >= 1, f"expected validation errors, found {alert_count}"
        print(f"[ok] contact validation fires ({alert_count} field errors)")

        # Fill valid data and submit -> success toast
        cp.fill("#name", "Ada Lovelace")
        cp.fill("#email", "ada@example.com")
        cp.fill("#message", "Hello Zain, I love this portfolio and want to chat!")
        cp.click('button[type="submit"]')
        cp.wait_for_selector("text=Message sent!", timeout=8000)
        print("[ok] contact submit shows success toast")
        cp.screenshot(path=f"{OUT}/contact-success.png")
        c.close()

        browser.close()

        # Filter out benign noise (favicon/font 404s don't apply here).
        real_errors = [e for e in errors if "favicon" not in e.lower()]
        if real_errors:
            print("\n[WARN] console/page errors observed:")
            for e in real_errors[:15]:
                print("   -", e)
        else:
            print("[ok] no console errors")

    print("\nAll UI checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
