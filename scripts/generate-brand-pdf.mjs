/**
 * Generates BRAND.pdf — a designer-facing brand guidelines document.
 *
 * Renders a standalone HTML template (no relation to the site) through
 * Playwright Chromium, then prints it to PDF.
 *
 * Run with:
 *   node scripts/generate-brand-pdf.mjs
 *
 * Requires `playwright` to be installed in the project; it already is via
 * Python in this repo, so the install step below ensures the Node binding
 * exists (no-op on subsequent runs).
 */
import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_HTML = join(ROOT, "scripts", "_brand-preview.html");
const OUT_PDF = join(ROOT, "BRAND.pdf");

// ─────────────────────────────────────────────────────────────
// 1) Ensure the Node Playwright binding is installed.
// ─────────────────────────────────────────────────────────────
async function ensurePlaywright() {
  try {
    await import("playwright");
  } catch {
    // eslint-disable-next-line no-console
    console.log("Installing playwright (Node) on the fly…");
    const r = spawnSync("npm", ["install", "--no-save", "playwright"], {
      stdio: "inherit",
      shell: true,
      cwd: ROOT,
    });
    if (r.status !== 0) throw new Error("Failed to install playwright");
  }
}

// ─────────────────────────────────────────────────────────────
// 2) Brand data (mirrors BRAND.md so the PDF stays a reference).
// ─────────────────────────────────────────────────────────────
const palette = {
  background: { hex: "#0D1117", hsl: "213 30% 7%", role: "Background" },
  foreground: { hex: "#C9D1D9", hsl: "213 17% 83%", role: "Foreground" },
  card: { hex: "#161B22", hsl: "215 21% 11%", role: "Card / Secondary" },
  muted: { hex: "#8B949E", hsl: "215 11% 57%", role: "Muted text" },
  primary: { hex: "#58A6FF", hsl: "212 100% 67%", role: "Primary / Accent" },
  border: { hex: "#30363D", hsl: "215 14% 21%", role: "Border" },
};

const lightPalette = {
  background: { hex: "#FFFFFF", role: "Background" },
  foreground: { hex: "#1F2937", role: "Foreground" },
  card: { hex: "#FBFBFD", role: "Card" },
  muted: { hex: "#586573", role: "Muted text" },
  primary: { hex: "#0F76E0", role: "Primary" },
  border: { hex: "#D8DEE5", role: "Border" },
};

const semantic = [
  { name: "Red — errors / keywords", hex: "#FF7B72" },
  { name: "Blue — variables / booleans", hex: "#79C0FF" },
  { name: "Sky — strings", hex: "#A5D6FF" },
  { name: "Purple — functions", hex: "#D2A8FF" },
  { name: "Green — decorative", hex: "#7EE787" },
  { name: "Yellow — Linux brand", hex: "#FCC624" },
  { name: "Status / Live", hex: "#2EA043" },
  { name: "Coral — HazardSignal", hex: "#FF7B72" },
];

// ─────────────────────────────────────────────────────────────
// 3) The HTML template — print-styled, A4, designed standalone.
// ─────────────────────────────────────────────────────────────
function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function swatch(c) {
  // Choose readable text color based on bg luminance.
  const r = parseInt(c.hex.slice(1, 3), 16);
  const g = parseInt(c.hex.slice(3, 5), 16);
  const b = parseInt(c.hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  const fg = lum > 0.5 ? "#0D1117" : "#C9D1D9";
  return `
    <div class="swatch" style="background:${c.hex};color:${fg};">
      <div class="swatch-name">${escape(c.role || c.name)}</div>
      <div class="swatch-hex">${c.hex}</div>
      ${c.hsl ? `<div class="swatch-hsl">hsl(${c.hsl})</div>` : ""}
    </div>
  `;
}

function buildHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Zain M. Al-Mawla — Brand Guidelines</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }
  :root {
    --bg: #0D1117;
    --fg: #C9D1D9;
    --muted: #8B949E;
    --card: #161B22;
    --border: #30363D;
    --primary: #58A6FF;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--fg);
    font-family: 'Inter', system-ui, -apple-system, Segoe UI, sans-serif;
    font-size: 11pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 18mm 16mm;
    page-break-after: always;
    position: relative;
    overflow: hidden;
  }
  .page:last-child { page-break-after: auto; }

  /* dotted bg pattern, very subtle, matches the site */
  .page::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 1px 1px, rgba(48,54,61,0.5) 1px, transparent 0);
    background-size: 32px 32px;
    opacity: 0.4;
    z-index: 0;
    pointer-events: none;
  }
  .page > * { position: relative; z-index: 1; }

  /* ─── Cover ─── */
  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30mm 16mm;
  }
  .cover::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: var(--primary);
  }
  .cover .eyebrow {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    color: var(--primary);
    font-size: 11pt;
    margin-bottom: 8mm;
    letter-spacing: 0.5px;
  }
  .cover h1 {
    font-size: 44pt;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin: 0 0 4mm 0;
    line-height: 1.05;
  }
  .cover .accent { color: var(--primary); }
  .cover .subtitle {
    font-size: 16pt;
    color: var(--muted);
    margin: 0 0 14mm 0;
    max-width: 130mm;
  }
  .cover .meta {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 9.5pt;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 6mm;
    margin-top: 10mm;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4mm 12mm;
  }
  .cover .meta b { color: var(--fg); font-weight: 500; }

  /* ─── Section heading ─── */
  h2.section {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 0 0 2mm 0;
  }
  .section-eyebrow {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    color: var(--primary);
    font-size: 9.5pt;
    margin-bottom: 2mm;
    letter-spacing: 0.5px;
  }
  .section-rule {
    height: 1px;
    background: var(--border);
    margin: 4mm 0 8mm 0;
  }
  h3 {
    font-size: 12.5pt;
    font-weight: 600;
    margin: 6mm 0 3mm 0;
    color: var(--fg);
  }
  p, li { color: var(--fg); }
  .muted { color: var(--muted); }
  .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

  /* ─── Swatches ─── */
  .swatch-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4mm;
  }
  .swatch-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  .swatch-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
  .swatch {
    border-radius: 4mm;
    padding: 8mm 6mm 7mm 6mm;
    min-height: 28mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .swatch-name { font-size: 9pt; font-weight: 600; opacity: 0.9; }
  .swatch-hex {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 11pt;
    font-weight: 600;
  }
  .swatch-hsl {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 8pt;
    opacity: 0.75;
  }

  /* ─── Typography spec ─── */
  .type-spec {
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--card);
    padding: 6mm;
    margin-bottom: 4mm;
  }
  .type-spec .label {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 8.5pt;
    color: var(--primary);
    margin-bottom: 3mm;
  }
  .type-spec .sample-inter { font-family: 'Inter', sans-serif; }
  .type-spec .sample-mono  { font-family: 'JetBrains Mono', ui-monospace, monospace; }

  /* ─── Tables ─── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 3mm 0 6mm 0;
    font-size: 10pt;
  }
  th, td {
    text-align: left;
    padding: 3mm 3mm;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  th { color: var(--muted); font-weight: 500; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.6px; }
  td.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 9.5pt; }

  /* ─── Code editor card (sample) ─── */
  .editor {
    border-radius: 8px;
    border: 1px solid var(--border);
    background: var(--card);
    overflow: hidden;
    margin: 4mm 0;
  }
  .editor .title-bar {
    display: flex;
    align-items: center;
    gap: 2mm;
    padding: 2.5mm 4mm;
    background: rgba(22,27,34,0.6);
    border-bottom: 1px solid var(--border);
  }
  .dot { width: 3mm; height: 3mm; border-radius: 50%; display: inline-block; }
  .editor .filename {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 8pt;
    color: var(--muted);
    margin-left: 2mm;
  }
  .editor pre {
    margin: 0;
    padding: 5mm;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 9.5pt;
    line-height: 1.7;
    color: var(--fg);
  }
  .k { color: #FF7B72; }
  .v { color: #79C0FF; }
  .s { color: #A5D6FF; }
  .f { color: #D2A8FF; }
  .o { color: var(--muted); }

  /* ─── Buttons preview ─── */
  .btn-row { display: flex; gap: 4mm; flex-wrap: wrap; margin: 3mm 0 6mm 0; }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 2mm;
    padding: 3mm 6mm;
    border-radius: 5px;
    font-family: 'Inter', sans-serif;
    font-size: 10pt;
    font-weight: 500;
  }
  .btn-primary { background: var(--primary); color: var(--bg); }
  .btn-outline { background: transparent; color: var(--fg); border: 1px solid var(--border); }
  .btn-ghost { background: transparent; color: var(--fg); }

  /* ─── Logo / monogram ─── */
  .monogram {
    width: 28mm; height: 28mm;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 6mm;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 18pt;
    font-weight: 700;
    color: var(--primary);
  }

  /* ─── Page footer ─── */
  .footer {
    position: absolute;
    bottom: 8mm;
    left: 16mm;
    right: 16mm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 8pt;
    color: var(--muted);
    border-top: 1px solid var(--border);
    padding-top: 3mm;
  }

  ul { margin: 0 0 6mm 5mm; padding: 0; }
  li { margin-bottom: 2mm; }

  /* ─── Light theme strip (visual demo) ─── */
  .light-strip {
    background: #FFFFFF;
    color: #1F2937;
    border-radius: 6px;
    padding: 6mm;
    margin: 4mm 0;
    border: 1px solid #D8DEE5;
  }
  .light-strip .accent { color: #0F76E0; }

  .callout {
    background: rgba(88,166,255,0.08);
    border-left: 3px solid var(--primary);
    padding: 4mm 5mm;
    border-radius: 0 4px 4px 0;
    margin: 4mm 0;
    font-size: 10pt;
  }
</style>
</head>
<body>

<!-- ═══════════ PAGE 1 — COVER ═══════════ -->
<section class="page cover">
  <div class="eyebrow">// brand guidelines · v1.0</div>
  <h1>Zain <span class="accent">M.</span> Al-Mawla<span class="accent">.</span></h1>
  <p class="subtitle">A personal brand built in the late-night editor — Tokyo Night, JetBrains Mono, restraint over noise.</p>
  <div style="margin: 14mm 0;">
    <div class="monogram">Z</div>
  </div>
  <div class="meta">
    <div><b>Discipline</b><br/>Fullstack Developer</div>
    <div><b>Base</b><br/>Thi-Qar, Iraq</div>
    <div><b>Site</b><br/>zainalmawla.dev</div>
    <div><b>Contact</b><br/>contact@zainalmawla.dev</div>
    <div><b>Stack</b><br/>Next.js · React · TS · Node · FastAPI</div>
    <div><b>Issued</b><br/>May 2026 · v1.0</div>
  </div>
  <div class="footer">
    <span>Zain M. Al-Mawla — Brand Guidelines v1.0</span>
    <span>1 / 4</span>
  </div>
</section>

<!-- ═══════════ PAGE 2 — COLOR ═══════════ -->
<section class="page">
  <div class="section-eyebrow">01. COLOR</div>
  <h2 class="section">The Tokyo Night Palette</h2>
  <div class="section-rule"></div>

  <p class="muted">
    Stored as HSL channels in <span class="mono">src/app/globals.css</span> so Tailwind's
    <span class="mono">hsl(var(--token))</span> bridge works and alpha applies via <span class="mono">/ &lt;alpha-value&gt;</span>.
  </p>

  <h3>Dark theme — default</h3>
  <div class="swatch-grid">
    ${Object.values(palette).map(swatch).join("")}
  </div>

  <h3 style="margin-top: 10mm;">Light theme — accent-preserving inversion</h3>
  <div class="light-strip">
    <div style="display:flex; justify-content:space-between; align-items:baseline;">
      <strong>The accent <span class="accent">#0F76E0</span> stays close to the dark-theme blue.</strong>
      <span class="mono" style="font-size: 9pt;">light only</span>
    </div>
    <p style="margin: 3mm 0 0 0; color: #586573;">Use the same hierarchy — primary is rare, muted is most copy, foreground is the workhorse.</p>
  </div>
  <div class="swatch-grid cols-3">
    ${Object.values(lightPalette).map(swatch).join("")}
  </div>

  <h3 style="margin-top: 10mm;">Semantic & syntax — secondary palette</h3>
  <p class="muted">For code, status, and small UI cues. Never promote these to primary CTAs.</p>
  <div class="swatch-grid cols-4">
    ${semantic.map(c => `
      <div class="swatch" style="background:${c.hex};color:#0D1117;min-height:22mm;padding:5mm;">
        <div class="swatch-name" style="font-size:8.5pt;">${escape(c.name)}</div>
        <div class="swatch-hex" style="font-size:10pt;">${c.hex}</div>
      </div>
    `).join("")}
  </div>

  <div class="callout">
    <strong>Rule:</strong> use the primary blue sparingly — one or two emphasized words per heading, plus CTAs and links.
    Never combine more than three accent hues in a single view.
  </div>

  <div class="footer">
    <span>01 · Color</span>
    <span>2 / 4</span>
  </div>
</section>

<!-- ═══════════ PAGE 3 — TYPOGRAPHY ═══════════ -->
<section class="page">
  <div class="section-eyebrow">02. TYPOGRAPHY</div>
  <h2 class="section">Two voices: Inter & JetBrains Mono</h2>
  <div class="section-rule"></div>

  <div class="type-spec">
    <div class="label">// Inter — body & headings</div>
    <div class="sample-inter" style="font-size:32pt; font-weight:800; letter-spacing:-0.02em; line-height:1.1;">Hi, I&apos;m <span style="color:var(--primary);">Zain.</span></div>
    <div class="sample-inter" style="font-size:14pt; color:var(--muted); margin-top:3mm;">I design and build modern full-stack web experiences.</div>
    <div class="sample-inter" style="font-size:10pt; color:var(--fg); margin-top:3mm;">Body copy at 11pt — direct, technical, calm. Bold for headings, regular for prose.</div>
  </div>

  <div class="type-spec">
    <div class="label">// JetBrains Mono — code, eyebrows, badges</div>
    <div class="sample-mono" style="font-size:16pt; color:var(--fg);">$ whoami → <span style="color:var(--primary);">zain@thiqar</span></div>
    <div class="sample-mono" style="font-size:9pt; color:var(--muted); margin-top:3mm;">01. ABOUT · 02. TECH STACK · 03. PROJECTS · 04. EXPERIENCE · 05. CONTACT</div>
  </div>

  <h3>Type scale</h3>
  <table>
    <thead>
      <tr><th style="width:25%">Token</th><th style="width:20%">Computed</th><th>Used for</th></tr>
    </thead>
    <tbody>
      <tr><td class="mono">text-xs</td><td class="mono">12 px</td><td>Badges, mono eyebrows, helper text</td></tr>
      <tr><td class="mono">text-sm</td><td class="mono">14 px</td><td>Nav, captions, secondary copy</td></tr>
      <tr><td class="mono">text-base</td><td class="mono">16 px</td><td>Body</td></tr>
      <tr><td class="mono">text-lg</td><td class="mono">18 px</td><td>Section descriptions on sm:+</td></tr>
      <tr><td class="mono">text-xl</td><td class="mono">20 px</td><td>Card titles</td></tr>
      <tr><td class="mono">text-3xl / 4xl</td><td class="mono">30–36 px</td><td>Section headings (mobile → desktop)</td></tr>
      <tr><td class="mono">text-6xl / 7xl</td><td class="mono">60–72 px</td><td>Hero display</td></tr>
    </tbody>
  </table>

  <h3>The editor card pattern</h3>
  <div class="editor">
    <div class="title-bar">
      <span class="dot" style="background:#FF5F56"></span>
      <span class="dot" style="background:#FFBD2E"></span>
      <span class="dot" style="background:#27C93F"></span>
      <span class="filename">developer.ts</span>
    </div>
    <pre><span class="k">const</span> <span class="v">zain</span> <span class="o">=</span> {
  name<span class="o">:</span> <span class="s">&apos;Zain M. Al-Mawla&apos;</span>,
  role<span class="o">:</span> <span class="s">&apos;Fullstack Developer&apos;</span>,
  stack<span class="o">:</span> [<span class="s">&apos;Next.js&apos;</span>, <span class="s">&apos;FastAPI&apos;</span>, <span class="s">&apos;PostgreSQL&apos;</span>],
  <span class="f">available</span><span class="o">:</span> <span class="v">true</span>,
}</pre>
  </div>

  <div class="footer">
    <span>02 · Typography</span>
    <span>3 / 4</span>
  </div>
</section>

<!-- ═══════════ PAGE 4 — COMPONENTS, MOTION, VOICE ═══════════ -->
<section class="page">
  <div class="section-eyebrow">03. SYSTEM</div>
  <h2 class="section">Components, motion & voice</h2>
  <div class="section-rule"></div>

  <h3>Buttons</h3>
  <div class="btn-row">
    <span class="btn btn-primary">View My Work ↓</span>
    <span class="btn btn-outline">✉ Get In Touch</span>
    <span class="btn btn-ghost">Cancel</span>
  </div>
  <p class="muted" style="font-size: 9.5pt;">Variants: <span class="mono">default</span> · <span class="mono">outline</span> · <span class="mono">secondary</span> · <span class="mono">ghost</span> · <span class="mono">link</span>. Sizes: sm (h-9) · default (h-10) · lg (h-12) · icon (10×10).</p>

  <h3>Motion timing</h3>
  <table>
    <thead><tr><th>Pattern</th><th>Duration</th><th>Curve</th></tr></thead>
    <tbody>
      <tr><td>Section reveal (fadeUp)</td><td class="mono">500 ms</td><td class="mono">cubic-bezier(0.22, 1, 0.36, 1)</td></tr>
      <tr><td>Button / hover transitions</td><td class="mono">200 ms</td><td class="mono">default ease</td></tr>
      <tr><td>Card lift (spring)</td><td class="mono">stiffness 300</td><td class="mono">damping 24</td></tr>
      <tr><td>Typewriter</td><td class="mono">90 ms / char</td><td class="mono">1600 ms pause</td></tr>
      <tr><td>Gradient pan</td><td class="mono">6 s</td><td class="mono">ease infinite</td></tr>
    </tbody>
  </table>
  <div class="callout">All animation honors <span class="mono">prefers-reduced-motion</span>. If a new animation isn&apos;t in the 200–300 ms range, it needs a reason.</div>

  <h3>Voice — do / don&apos;t</h3>
  <table>
    <thead><tr><th style="width:50%;color:#7EE787;">DO</th><th style="color:#FF7B72;">DON&apos;T</th></tr></thead>
    <tbody>
      <tr>
        <td>“I build software end to end.”</td>
        <td>“I craft digital experiences.”</td>
      </tr>
      <tr>
        <td>“shipped end-to-end with Next.js + FastAPI”</td>
        <td>“delivered a digital transformation”</td>
      </tr>
      <tr>
        <td>Name the tech: Next.js, FastAPI, PostgreSQL.</td>
        <td>Vague tooling: “modern stack,” “cutting-edge.”</td>
      </tr>
      <tr>
        <td>Claim what was built, not what was implied.</td>
        <td>Inflate scope. Skip past the credibility check.</td>
      </tr>
    </tbody>
  </table>

  <h3>Brand safety</h3>
  <ul>
    <li>Don&apos;t render the <span class="mono">Z</span> monogram in any color other than <span class="mono">#58A6FF</span> (light: <span class="mono">#0F76E0</span>).</li>
    <li>Don&apos;t use raw <span class="mono">#000000</span> — always <span class="mono">#0D1117</span>.</li>
    <li>Don&apos;t introduce a new sans or mono. Inter + JetBrains Mono only.</li>
    <li>Don&apos;t add a third heading font. Hierarchy is size + weight, not family.</li>
  </ul>

  <div class="footer">
    <span>03 · System</span>
    <span>4 / 4</span>
  </div>
</section>

</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// 4) Run.
// ─────────────────────────────────────────────────────────────
async function main() {
  await ensurePlaywright();
  const { chromium } = await import("playwright");

  await mkdir(dirname(OUT_HTML), { recursive: true });
  await writeFile(OUT_HTML, buildHtml(), "utf8");

  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto("file://" + OUT_HTML.replace(/\\/g, "/"), { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: OUT_PDF,
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();
  // eslint-disable-next-line no-console
  console.log("Generated:", OUT_PDF);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
