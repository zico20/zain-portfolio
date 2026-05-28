<!-- markdownlint-disable MD033 MD041 -->

# Zain M. Al-Mawla — Brand Guidelines

> _Version 1.0 · Tokyo Night Identity_
> Personal brand guidelines extracted from the production design system at [zainalmawla.dev](https://zainalmawla.dev).
> Built with Next.js 14, Tailwind CSS, Framer Motion, and shadcn/ui-style primitives.

---

## 1. Brand Essence

| Attribute  | Value |
| ---------- | ----- |
| **Name**   | Zain M. Al-Mawla |
| **Role**   | Fullstack Developer |
| **Voice**  | Direct, technical, calm, considered |
| **Mood**   | Late-night terminal · Tokyo Night editor aesthetic |
| **Promise**| "Software crafted end-to-end, with details that read like code that's a pleasure to maintain." |

The brand sits at the intersection of **engineering rigor** and **quiet design**. It avoids loud marketing language — confidence comes from precision, whitespace, and restraint.

---

## 2. Color System

All colors are stored in [`src/app/globals.css`](src/app/globals.css) as **HSL channels** (without the `hsl()` wrapper) so Tailwind's `hsl(var(--token))` bridge works and alpha can be applied with `/ <alpha-value>`. Tailwind aliases live in [`tailwind.config.ts`](tailwind.config.ts).

### 2.1 Dark Theme (default)

The site ships with `defaultTheme="dark"`. This is the canonical Zain palette.

| Role               | Token                  | HSL              | Hex       | Usage |
| ------------------ | ---------------------- | ---------------- | --------- | ----- |
| Background         | `--background`         | `213 30% 7%`     | `#0D1117` | Page background |
| Foreground (text)  | `--foreground`         | `213 17% 83%`    | `#C9D1D9` | Primary text |
| Card / Secondary   | `--card`, `--secondary`| `215 21% 11%`    | `#161B22` | Cards, panels, code blocks |
| Muted text         | `--muted-foreground`   | `215 11% 57%`    | `#8B949E` | Captions, helper text |
| **Primary / Accent** | `--primary`, `--accent`| `212 100% 67%` | `#58A6FF` | Links, buttons, highlights |
| Primary text on accent | `--primary-foreground` | `213 30% 7%` | `#0D1117` | Text on primary buttons |
| Border             | `--border`, `--input`  | `215 14% 21%`    | `#30363D` | Hairlines, dividers, inputs |
| Ring (focus)       | `--ring`               | `212 100% 67%`   | `#58A6FF` | Focus rings |

### 2.2 Light Theme

The light theme is a clean inversion that **preserves the accent** for brand continuity.

| Role               | HSL              | Hex       |
| ------------------ | ---------------- | --------- |
| Background         | `0 0% 100%`      | `#FFFFFF` |
| Foreground (text)  | `215 28% 17%`    | `#1F2937` |
| Card               | `210 20% 99%`    | `#FBFBFD` |
| Secondary          | `210 20% 96%`    | `#F1F4F7` |
| Muted text         | `215 14% 40%`    | `#586573` |
| **Primary / Accent** | `212 92% 45%`  | `#0F76E0` |
| Primary foreground | `0 0% 100%`      | `#FFFFFF` |
| Border             | `214 20% 88%`    | `#D8DEE5` |

### 2.3 Semantic & Syntax Colors

These appear inline in components (e.g. the `developer.ts` faux-editor card in the About section, error states, status indicators). Treat them as a **secondary palette** for code highlighting and small UI cues — do not promote them to primary brand colors.

| Hue       | Hex       | Used for |
| --------- | --------- | -------- |
| Red       | `#FF7B72` | Validation errors, keywords (`const`, `return`) |
| Blue      | `#79C0FF` | Variable names, boolean literals |
| Sky       | `#A5D6FF` | String literals |
| Purple    | `#D2A8FF` | Function names |
| Green     | `#7EE787` | Decorative (project cover accent) |
| Yellow    | `#FCC624` | Decorative (Linux brand glyph) |
| Status / Live | `#2EA043` | "Available for work" badge, terminal prompt `$` |
| Coral     | `#FF7B72` | HazardSignal project accent |

### 2.4 Color Usage Rules

**Do**
- Use `#58A6FF` (primary) sparingly — for CTAs, links, focus states, and one or two emphasized words per heading (via the `text-gradient` utility).
- Pair `#0D1117` background with `#C9D1D9` text by default.
- Use `#30363D` borders at full opacity for hairlines; use `--border / 0.6` or lower for inner dividers.
- Honor `prefers-reduced-motion` — gradients still apply, but their animations stop.

**Don't**
- Don't combine more than three accent hues in a single view.
- Don't replace `#58A6FF` with a non-Tokyo-Night blue. The primary is the brand.
- Don't use the syntax colors (red/purple/green) as primary CTAs.

---

## 3. Typography

Two fonts, loaded via `next/font/google` in [`src/app/layout.tsx`](src/app/layout.tsx):

| Family            | Variable                  | Role |
| ----------------- | ------------------------- | ---- |
| **Inter**         | `--font-inter`            | Body text, headings, UI |
| **JetBrains Mono**| `--font-jetbrains-mono`   | Code, terminal text, eyebrow labels, badges |

OpenType features enabled: `rlig`, `calt` (ligatures and contextual alternates).

### 3.1 Type Scale

Tailwind size tokens used throughout the site:

| Token         | Computed   | Where it appears |
| ------------- | ---------- | ---------------- |
| `text-xs`     | 12px / 1rem| Badges, mono eyebrows, helper text |
| `text-sm`     | 14px       | Nav, captions, secondary copy |
| `text-base`   | 16px       | Body |
| `text-lg`     | 18px       | Section descriptions on `sm:`+ |
| `text-xl`     | 20px       | Card titles |
| `text-2xl`    | 24px       | Sub-section headings, stat values |
| `text-3xl`    | 30px       | Section headings (mobile) |
| `text-4xl`    | 36px       | Section headings (sm:+) |
| `text-6xl`    | 60px       | Hero (sm:) |
| `text-7xl`    | 72px       | Hero (md:+) |

### 3.2 Weight & Tracking

| Use                | Weight        | Tracking |
| ------------------ | ------------- | -------- |
| Body               | 400 (Regular) | normal |
| UI labels          | 500 (Medium)  | normal |
| Headings           | 700 (Bold)    | `tracking-tight` |
| Hero / Display     | 700–800       | `tracking-tight` |
| Mono labels (e.g. eyebrows) | 500 | `uppercase tracking-wider` for category headers |

### 3.3 Recurring Patterns

- **Section eyebrow:** `font-mono text-sm font-medium text-primary` — e.g. `01. About Me`
- **Terminal caption bar:** `font-mono text-xs text-muted-foreground` with `$` prompt in `#2EA043`
- **Heading emphasis:** Wrap the emphasized word in the `text-gradient` utility (defined in `globals.css`) — uses a `from-primary via-sky-400 to-primary` gradient with a `gradient-pan` animation.

---

## 4. Layout & Spacing

- **Container:** centered, `padding: 1.5rem`, `2xl` breakpoint at `1200px` (see `tailwind.config.ts`).
- **Section vertical rhythm:** `py-20 sm:py-28` (compact `py-16 sm:py-20`). Sections also carry `scroll-mt-20` for sticky-nav offset.
- **Card padding:** `p-5` (small cards) or `p-6` to `p-8` (forms, project cards).
- **Gaps:** `gap-3` (tight grids), `gap-6` (project grid), `gap-10` (section internals), `gap-12` to `gap-16` (two-column splits).

### 4.1 Border Radius

| Token   | Value         | Usage |
| ------- | ------------- | ----- |
| `sm`    | 6.4px         | Inputs, small buttons |
| `md`    | 8.4px         | Default buttons |
| `lg`    | 10.4px        | `--radius` base — most surfaces |
| `xl`    | 12px          | Card / project / form |
| `2xl`   | 16px          | Avatar card, hero glow |
| `full`  | pill          | Badges, location pill, available-for-work dot |

### 4.2 Responsive Breakpoints

| Range          | Width            | Notes |
| -------------- | ---------------- | ----- |
| Small phone    | 320–374 px       | Tested floor — no overflow |
| Standard phone | 375–424 px       | Mobile-first defaults |
| Large phone    | 425–767 px       | `sm:` kicks in at 640 |
| Tablet portrait| 768–1023 px      | `md:` — About goes 2-col, Skills 5-col |
| Tablet landscape | 1024–1279 px   | `lg:` — Skills 6-col, full desktop nav |
| Desktop        | 1280 px+         | Canonical layout |

---

## 5. Iconography

Two systems, used purposefully:

1. **[lucide-react](https://lucide.dev/)** — for UI icons (nav, buttons, mailto, GitHub, ArrowUp, etc.). Default size: `h-4 w-4` to `h-5 w-5`. Stroke follows currentColor.
2. **Hand-curated brand glyphs** — see [`src/components/tech-icon.tsx`](src/components/tech-icon.tsx). Each glyph is an inline 24×24 SVG path with a brand hex color. Render in monochrome (`currentColor`) for white-on-dark contexts; pass `colored` for the brand hue.

### 5.1 Favicon / Avatar Glyph

The site favicon is a monogram **`Z`** in `#58A6FF` on a `#161B22` rounded square (radius 14), centered in a 64×64 viewBox. Generated by [`scripts/generate-assets.mjs`](scripts/generate-assets.mjs).

---

## 6. Voice & Tone

### 6.1 Voice Principles

- **Direct over clever.** "I build software end to end" beats "I craft digital experiences."
- **Specific over generic.** Always name the tech: "Next.js, FastAPI, PostgreSQL" — never "modern tools."
- **Honest about scope.** Claim what was built, not what was implied. Accuracy compounds credibility.
- **No emoji in body copy.** A 🇮🇶 in the editor card is allowed; nowhere else in prose.

### 6.2 Tone by Surface

| Surface          | Tone |
| ---------------- | ---- |
| Hero             | Confident, two-word intro. "Hi, I'm Zain." |
| About            | First-person, three short paragraphs. Frames the craft. |
| Project cards    | Single sentence. Names the problem and the tools. |
| Contact          | Inviting and matter-of-fact. "My inbox is always open." |
| 404              | Terminal in-joke (`cd /that-page → no such file or directory`). |

### 6.3 Writing Don'ts

Avoid: "passionate," "innovative," "synergy," "ecosystem," "leverage," "cutting-edge," em-dashes used as full stops (`— like this. —`), tagline clichés ("turning ideas into reality").

---

## 7. Motion & Interaction

All animation runs via **Framer Motion** and respects `prefers-reduced-motion` (disabled at the global level in `globals.css`).

| Pattern              | Duration | Easing                       | Source |
| -------------------- | -------- | ---------------------------- | ------ |
| Section reveal (`fadeUp`) | 500 ms | `cubic-bezier(0.22, 1, 0.36, 1)` | `src/components/section.tsx` |
| Stagger between children | 80 ms (delay-children 50 ms) | — | same |
| Button hover         | 200 ms   | default ease                 | `ui/button.tsx` |
| Card lift on hover   | spring (stiffness 300, damping 24) | — | `project-card.tsx` |
| Skill tile lift      | spring (stiffness 400, damping 25) | — | `skills.tsx` |
| Theme toggle         | 200 ms ease-out, y/rotate swap | — | `theme-toggle.tsx` |
| Cursor-follow gradient | 300 ms opacity transition | — | `hero.tsx` |
| Floating tech icons  | 6–7 s infinite ease-in-out | — | `hero.tsx` |
| Typewriter           | 90 ms per char (type) · 45 ms (delete) · 1600 ms (pause) | — | `use-typewriter.ts` |
| Cursor blink         | 1 s step-end infinite | — | `tailwind.config.ts` |
| Gradient pan         | 6 s ease infinite | — | `tailwind.config.ts` |

**Rule:** if a new animation feels "snappy enough," it's probably in the **200–300 ms** range. Anything over 500 ms needs a reason.

---

## 8. Components — Anatomy

### 8.1 Section

Every page section uses `<Section id="…">` from `src/components/section.tsx`. It applies:

- `py-20 sm:py-28` vertical rhythm
- `scroll-mt-20` for sticky-nav offset
- `<div class="container">` wrapper
- `aria-labelledby="{id}-heading"`

Headings are rendered via `<SectionHeading>` with:

```
eyebrow="01. About Me"   ← mono, primary blue
title="..."              ← 3xl → 4xl bold
description="..."        ← optional, max-w-2xl muted
```

### 8.2 Buttons

Variants live in [`src/components/ui/button.tsx`](src/components/ui/button.tsx):

| Variant     | Use |
| ----------- | --- |
| `default`   | Primary CTA — primary background, glow on hover |
| `outline`   | Secondary CTA — bordered, gains accent border on hover |
| `secondary` | Tertiary, on secondary background |
| `ghost`     | Icon-only, nav, social icons |
| `link`      | Inline-text link |

Sizes: `sm` (h-9), `default` (h-10), `lg` (h-12), `icon` (10×10).

### 8.3 Cards

Default card surface: `bg-card` (= `#161B22` dark / `#FBFBFD` light), `border-border`, `rounded-xl`, subtle shadow. Hover state typically adds `border-primary/40` or `-translate-y-1`.

### 8.4 Badges

Pill-shaped, `font-mono`, `text-xs`. Variants:

- `default` — `bg-primary/15 text-primary` (used for tech tags)
- `secondary` — bordered on secondary background
- `outline` — bordered, muted text

---

## 9. Assets

| Asset                | Path                                  | Notes |
| -------------------- | ------------------------------------- | ----- |
| Favicon (SVG)        | `public/favicon.svg`, `src/app/icon.svg` | 64×64 monogram |
| OG image (PNG)       | `src/app/opengraph-image.tsx` (dynamic) | 1200×630 edge-rendered |
| OG image (SVG fallback) | `public/og.svg`                    | Static backup |
| Project covers       | `public/projects/{slug}.svg`         | 1200×630, generated |
| Avatar (photo)       | `public/zain.jpg`                    | 2560×2146 portrait |

All static brand assets are reproducible via:

```bash
node scripts/generate-assets.mjs
```

---

## 10. Accessibility

The brand commits to:

- **Semantic HTML:** one `<h1>`, ordered headings, ARIA labels on icon-only controls.
- **Visible focus rings:** `:focus-visible { ring-2 ring-ring ring-offset-2 }`.
- **Skip link:** `Skip to content` available to keyboard users.
- **Reduced motion:** all animations and smooth-scroll disable under `prefers-reduced-motion: reduce`.
- **Color contrast:** primary text on background is ≥ 7:1 (AAA) in both themes.
- **Touch targets:** ≥ 40×40 px for primary controls.

---

## 11. Don'ts (Brand Safety)

- Don't render the favicon `Z` monogram in any color other than `#58A6FF` (or the light-theme equivalent `#0F76E0`).
- Don't use raw `#000000` as background — always use `#0D1117`.
- Don't introduce a new sans-serif. The brand is **Inter**.
- Don't replace JetBrains Mono with a different monospace.
- Don't translate the brand identity into Arabic-only typography. Bilingual is fine; Arabic-only loses the tech-mono signal.
- Don't add a third heading font. Hierarchy is achieved by size and weight, not family.

---

## 12. License

The brand identity, screenshots, and personal likeness are © Zain M. Al-Mawla. The source code is MIT-licensed.

For collaborations or media: **contact@zainalmawla.dev**.

---

_Last updated: May 2026 · v1.0 · Generated from production source. Re-run `node scripts/generate-brand-pdf.mjs` to refresh `BRAND.pdf`._
