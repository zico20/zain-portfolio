import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Route segment config
export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamically generated OpenGraph card (real PNG, rendered at the edge).
 * Mirrors the site's Tokyo Night aesthetic. Used for og:image and twitter:image.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          // Satori (the @vercel/og renderer) has a limited CSS parser, so we use
          // a single linear-gradient here rather than layered radial gradients.
          backgroundColor: "#0D1117",
          backgroundImage:
            "linear-gradient(135deg, #0D1117 0%, #161B22 60%, #10243f 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            backgroundColor: "#58A6FF",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "#58A6FF",
            fontSize: 32,
            fontFamily: "monospace",
            marginBottom: 8,
          }}
        >
          const developer =
        </div>
        <div
          style={{
            display: "flex",
            color: "#C9D1D9",
            fontSize: 92,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            color: "#58A6FF",
            fontSize: 42,
            fontWeight: 600,
            marginTop: 12,
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            color: "#8B949E",
            fontSize: 30,
            marginTop: 18,
          }}
        >
          Modern web experiences & AI-powered tools · {siteConfig.location}
        </div>
      </div>
    ),
    { ...size },
  );
}
