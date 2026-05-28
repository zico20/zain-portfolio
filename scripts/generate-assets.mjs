/**
 * Generates on-brand SVG assets used by the site:
 *   - /public/projects/<slug>.svg  — project cover images (1200x630)
 *   - /public/og.png.svg           — OpenGraph card (saved as .svg; see note below)
 *   - /public/favicon.svg          — favicon glyph
 *
 * These are authored, deterministic SVGs (Tokyo Night palette) so covers look
 * intentional, stay tiny, and are trivial to regenerate. Run with:
 *   node scripts/generate-assets.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

const palette = {
  bg: "#0D1117",
  surface: "#161B22",
  border: "#30363D",
  accent: "#58A6FF",
  accent2: "#7EE787",
  text: "#C9D1D9",
  muted: "#8B949E",
};

/** XML-escape text destined for SVG. */
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Reusable defs: dot-grid pattern + accent radial glow. */
function defs(idSuffix, glowColor) {
  return `
  <defs>
    <radialGradient id="glow-${idSuffix}" cx="22%" cy="18%" r="80%">
      <stop offset="0%" stop-color="${glowColor}" stop-opacity="0.32"/>
      <stop offset="55%" stop-color="${glowColor}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${glowColor}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheen-${idSuffix}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <pattern id="dots-${idSuffix}" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="${palette.border}" fill-opacity="0.55"/>
    </pattern>
  </defs>`;
}

/** A single project cover. */
function projectCover({ title, tags, accent = palette.accent }) {
  const w = 1200;
  const h = 630;
  const tagFont = 26;
  const padX = 80;

  // Lay out tag pills left-to-right with rough width estimation.
  let tx = padX;
  const ty = 470;
  const pills = tags
    .map((t) => {
      const tw = Math.max(96, t.length * (tagFont * 0.62) + 44);
      const pill = `
      <g transform="translate(${tx}, ${ty})">
        <rect width="${tw}" height="48" rx="24" fill="${accent}" fill-opacity="0.14" stroke="${accent}" stroke-opacity="0.35"/>
        <text x="${tw / 2}" y="31" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="${tagFont}" fill="${accent}" text-anchor="middle">${esc(t)}</text>
      </g>`;
      tx += tw + 16;
      return pill;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  ${defs("p", accent)}
  <rect width="${w}" height="${h}" fill="${palette.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#dots-p)"/>
  <rect width="${w}" height="${h}" fill="url(#glow-p)"/>
  <rect width="${w}" height="${h}" fill="url(#sheen-p)"/>
  <rect x="0" y="0" width="${w}" height="8" fill="${accent}"/>
  <text x="${padX}" y="150" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="30" fill="${palette.muted}">&lt;project /&gt;</text>
  <text x="${padX}" y="300" font-family="Inter, system-ui, sans-serif" font-size="92" font-weight="700" fill="${palette.text}">${esc(title)}</text>
  <line x1="${padX}" y1="360" x2="${w - padX}" y2="360" stroke="${palette.border}" stroke-opacity="0.6"/>
  ${pills}
</svg>`;
}

/** OpenGraph social card. */
function ogCard() {
  const w = 1200;
  const h = 630;
  const padX = 90;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  ${defs("og", palette.accent)}
  <rect width="${w}" height="${h}" fill="${palette.bg}"/>
  <rect width="${w}" height="${h}" fill="url(#dots-og)"/>
  <rect width="${w}" height="${h}" fill="url(#glow-og)"/>
  <text x="${padX}" y="200" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="32" fill="${palette.accent}">const developer =</text>
  <text x="${padX}" y="330" font-family="Inter, system-ui, sans-serif" font-size="96" font-weight="800" fill="${palette.text}">Zain M. Al-Mawla</text>
  <text x="${padX}" y="410" font-family="Inter, system-ui, sans-serif" font-size="44" font-weight="600" fill="${palette.accent}">Fullstack Developer</text>
  <text x="${padX}" y="480" font-family="Inter, system-ui, sans-serif" font-size="32" fill="${palette.muted}">Modern web experiences &amp; AI-powered tools · Ankara, Turkey</text>
</svg>`;
}

/** Monogram favicon. */
function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img">
  <rect width="64" height="64" rx="14" fill="${palette.surface}" stroke="${palette.border}" stroke-width="2"/>
  <text x="32" y="44" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="38" font-weight="700" fill="${palette.accent}" text-anchor="middle">Z</text>
</svg>`;
}

const covers = [
  { slug: "hazardsignal", title: "HazardSignal", tags: ["Python", "PyTorch", "FastAPI", "React"], accent: "#FF7B72" },
  { slug: "numina", title: "Numina", tags: ["Python", "PyTorch", "Next.js"], accent: "#58A6FF" },
  { slug: "taskflow", title: "TaskFlow", tags: ["Next.js", "FastAPI", "PostgreSQL"], accent: "#7EE787" },
  { slug: "nexshop", title: "NexShop", tags: ["Next.js", "Supabase", "Stripe"], accent: "#D2A8FF" },
];

async function main() {
  await mkdir(join(PUBLIC, "projects"), { recursive: true });

  for (const c of covers) {
    await writeFile(
      join(PUBLIC, "projects", `${c.slug}.svg`),
      projectCover(c),
      "utf8",
    );
  }
  await writeFile(join(PUBLIC, "og.svg"), ogCard(), "utf8");
  await writeFile(join(PUBLIC, "favicon.svg"), favicon(), "utf8");

  // eslint-disable-next-line no-console
  console.log(`Generated ${covers.length} covers + og.svg + favicon.svg`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
