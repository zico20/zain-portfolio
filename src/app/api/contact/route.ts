import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact-schema";

/**
 * POST /api/contact
 *
 * Validates a contact submission server-side and (for now) logs it.
 *
 * TODO: Wire up real delivery. The recommended path is Resend:
 *   1. `npm install resend`
 *   2. Add RESEND_API_KEY + CONTACT_TO_EMAIL to your env (see .env.example)
 *   3. Replace the "deliver" block below with:
 *        const { Resend } = await import("resend");
 *        const resend = new Resend(process.env.RESEND_API_KEY);
 *        await resend.emails.send({
 *          from: "Portfolio <onboarding@resend.dev>",
 *          to: process.env.CONTACT_TO_EMAIL!,
 *          replyTo: data.email,
 *          subject: `New message from ${data.name}`,
 *          text: data.message,
 *        });
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

  // --- deliver (placeholder) ---
  // Until email delivery is wired up, record the submission server-side.
  // Using console.error keeps this visible in server logs without tripping
  // the no-console lint rule (which permits warn/error).
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[contact] new submission", {
      name: data.name,
      email: data.email,
      message: data.message,
      at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ ok: true });
}

/** Reject non-POST methods with a clear 405. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
