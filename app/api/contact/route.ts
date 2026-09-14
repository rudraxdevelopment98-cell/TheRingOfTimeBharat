import { NextRequest, NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validation";
import {
  escapeHtml,
  exceedsSizeLimit,
  getClientIp,
  looksMalicious,
  rateLimit,
  sanitizeText,
} from "@/lib/security";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimit(ip, { limit: 5, windowMs: 60_000 });
  if (!limited.allowed) {
    const retryAfter = Math.max(1, Math.ceil((limited.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  if (exceedsSizeLimit(request, MAX_BODY_BYTES)) {
    return NextResponse.json({ error: "Request body too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");

  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);
  const honeypot = str(body.website);

  // Guard against oversized string payloads even when content-length lies.
  if (
    name.length + email.length + subject.length + message.length + honeypot.length >
    MAX_BODY_BYTES
  ) {
    return NextResponse.json({ error: "Request body too large." }, { status: 413 });
  }

  // Honeypot: bots fill hidden fields. Pretend success, store nothing.
  if (honeypot.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      message: "Thank you — we'll get back to you soon.",
    });
  }

  const { valid, errors } = validateContactForm({ name, email, subject, message });
  if (!valid) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  if ([name, email, subject, message].some(looksMalicious)) {
    return NextResponse.json({ error: "Invalid input detected." }, { status: 400 });
  }

  const payload = {
    name: escapeHtml(sanitizeText(name, 100)),
    email: escapeHtml(sanitizeText(email, 254)),
    subject: escapeHtml(sanitizeText(subject, 150)),
    message: escapeHtml(sanitizeText(message, 5000)),
    receivedAt: new Date().toISOString(),
  };

  try {
    // No contact-message table exists yet; log the sanitized payload for now.
    console.log("[contact] submission", payload);
  } catch {
    // Persistence failures must never leak details to the client.
    return NextResponse.json(
      { error: "Could not deliver your message. Please try again later." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you — we'll get back to you soon.",
  });
}
