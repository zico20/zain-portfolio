import { NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";

/**
 * POST /api/contact
 *
 * Validates a contact submission server-side, then delivers it by email via
 * Resend. If Resend isn't configured (no RESEND_API_KEY — e.g. local dev),
 * it falls back to logging the submission so the form still "works" without
 * crashing.
 *
 * Required env (production): see .env.example
 *   - RESEND_API_KEY   — your Resend API key
 *   - CONTACT_TO_EMAIL — where submissions are delivered (defaults to siteConfig.email)
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { company, ...data } = parsed.data;

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;

  // No API key configured (e.g. local dev) — log and succeed gracefully.
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.info("[contact] RESEND_API_KEY not set — logging only", {
        name: data.name,
        email: data.email,
        at: new Date().toISOString(),
      });
    }
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // The verified Resend test sender; swap for your domain once verified.
      from: `${siteConfig.name} Portfolio <onboarding@resend.dev>`,
      to: [toEmail],
      replyTo: data.email,
      subject: `New portfolio message from ${data.name}`,
      text: [
        `Name:  ${data.name}`,
        `Email: ${data.email}`,
        "",
        data.message,
      ].join("\n"),
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[contact] Resend returned an error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact] Unexpected send failure:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 500 },
    );
  }
}

/** Reject non-POST methods with a clear 405. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
