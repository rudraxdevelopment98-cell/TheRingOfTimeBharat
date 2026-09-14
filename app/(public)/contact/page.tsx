"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  Shield,
  User,
} from "lucide-react";
import {
  MESSAGE_MAX,
  validateContactForm,
  validateEmail,
  validateMessage,
  validateName,
  validateSubject,
  type FieldError,
} from "@/lib/validation";

type FieldName = "name" | "email" | "subject" | "message";

const VALIDATORS: Record<FieldName, (value: string) => FieldError> = {
  name: validateName,
  email: validateEmail,
  subject: validateSubject,
  message: validateMessage,
};

const EMPTY_VALUES: Record<FieldName, string> = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMPTY_ERRORS: Record<FieldName, FieldError> = {
  name: null,
  email: null,
  subject: null,
  message: null,
};

const DANGER = "var(--danger)";

const INFO_CARDS = [
  {
    icon: Mail,
    title: "Email us",
    body: "hello@bibliosphere.app — for partnerships, catalogue corrections, or anything else on your mind.",
  },
  {
    icon: Clock,
    title: "Response time",
    body: "We read every message and reply within 2 business days. Longer research questions may take a little more.",
  },
  {
    icon: AlertCircle,
    title: "Report an issue",
    body: "Found a broken page, a wrong attribution, or a quote misascribed? Tell us the book and we will correct the record.",
  },
  {
    icon: Shield,
    title: "Your privacy",
    body: "We use what you send only to answer you. No newsletters, no resale, no tracking pixels.",
  },
];

export default function ContactPage() {
  const [values, setValues] = useState<Record<FieldName, string>>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Record<FieldName, FieldError>>(EMPTY_ERRORS);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [honeypot, setHoneypot] = useState("");
  const [focused, setFocused] = useState<FieldName | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const formValid = useMemo(() => validateContactForm(values).valid, [values]);

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](value) }));
    }
    if (formError) setFormError(null);
  }

  function handleBlur(field: FieldName) {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: VALIDATORS[field](values[field]) }));
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors(EMPTY_ERRORS);
    setTouched({ name: false, email: false, subject: false, message: false });
    setHoneypot("");
    setFormError(null);
    setSucceeded(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const result = validateContactForm(values);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!result.valid) {
      setErrors(result.errors as Record<FieldName, FieldError>);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });

      let data: {
        ok?: boolean;
        error?: string;
        errors?: Record<string, string | null>;
      } = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setSucceeded(true);
        return;
      }

      if (response.status === 400 && data.errors) {
        const mapped = { ...EMPTY_ERRORS };
        (Object.keys(EMPTY_ERRORS) as FieldName[]).forEach((field) => {
          mapped[field] = data.errors?.[field] ?? null;
        });
        setErrors(mapped);
        setFormError("Please correct the highlighted fields.");
        return;
      }

      if (response.status === 429) {
        setFormError(data.error ?? "Too many requests. Please try again in a minute.");
        return;
      }

      setFormError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function fieldStyle(field: FieldName): React.CSSProperties {
    const invalid = Boolean(errors[field]);
    const borderColor = invalid
      ? DANGER
      : focused === field
        ? "var(--accent-primary)"
        : "var(--border)";
    return {
      backgroundColor: "var(--bg-elevated)",
      border: `1px solid ${borderColor}`,
      color: "var(--text-primary)",
      fontFamily: "var(--font-dm-sans)",
      outline: "none",
    };
  }

  const labelClass = "mb-2 block text-xs uppercase tracking-wide";
  const labelStyle = {
    color: "var(--text-muted)",
    fontFamily: "var(--font-dm-sans)",
  } as const;
  const inputClass = "w-full rounded-xl px-4 py-3 text-sm transition-colors";

  return (
    <div style={{ backgroundColor: "var(--bg-base)" }}>
      <section
        className="border-b py-12"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-surface)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-3">
            <MessageSquare className="h-5 w-5" style={{ color: "var(--accent-primary)" }} />
            <p
              className="text-xs uppercase tracking-widest font-medium"
              style={{ color: "var(--accent-gold-text)" }}
            >
              Contact Us
            </p>
          </div>
          <h1
            className="mb-4 text-4xl md:text-5xl font-light"
            style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-primary)" }}
          >
            Get in touch
          </h1>
          <p
            className="max-w-2xl text-base"
            style={{ fontFamily: "var(--font-source-serif)", color: "var(--text-muted)" }}
          >
            Every library is built by its readers. Tell us what you are looking for, what we
            have got wrong, or which book deserves a place on these shelves — a real person
            reads every note.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {succeeded ? (
              <div
                className="rounded-2xl border p-8"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <CheckCircle className="mb-4 h-8 w-8" style={{ color: "var(--accent-primary)" }} />
                <h2
                  className="mb-3 text-3xl font-light"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--text-primary)",
                  }}
                >
                  Message received
                </h2>
                <p
                  className="mb-6 text-sm"
                  style={{
                    fontFamily: "var(--font-source-serif)",
                    color: "var(--text-muted)",
                  }}
                >
                  Thank you — we&apos;ll get back to you soon, usually within two business days.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl px-5 py-3 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "var(--on-accent-primary, #ffffff)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border p-6 sm:p-8"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                {/* Honeypot — hidden from humans, irresistible to bots. */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass} style={labelStyle}>
                      Your name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={values.name}
                      maxLength={100}
                      className={inputClass}
                      style={fieldStyle("name")}
                      onFocus={() => setFocused("name")}
                      onBlur={() => handleBlur("name")}
                      onChange={(e) => handleChange("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name ? (
                      <p
                        id="name-error"
                        className="mt-2 text-xs"
                        style={{ color: DANGER, fontFamily: "var(--font-dm-sans)" }}
                      >
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass} style={labelStyle}>
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      maxLength={254}
                      className={inputClass}
                      style={fieldStyle("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => handleBlur("email")}
                      onChange={(e) => handleChange("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email ? (
                      <p
                        id="email-error"
                        className="mt-2 text-xs"
                        style={{ color: DANGER, fontFamily: "var(--font-dm-sans)" }}
                      >
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="subject" className={labelClass} style={labelStyle}>
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    maxLength={150}
                    className={inputClass}
                    style={fieldStyle("subject")}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => handleBlur("subject")}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject ? (
                    <p
                      id="subject-error"
                      className="mt-2 text-xs"
                      style={{ color: DANGER, fontFamily: "var(--font-dm-sans)" }}
                    >
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <label htmlFor="message" className={labelClass} style={labelStyle}>
                      Message
                    </label>
                    <span
                      className="text-xs"
                      style={{
                        color: "var(--text-faint)",
                        fontFamily: "var(--font-fira-code)",
                      }}
                    >
                      {values.message.length} / {MESSAGE_MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    value={values.message}
                    maxLength={MESSAGE_MAX}
                    className={`${inputClass} resize-y`}
                    style={{
                      ...fieldStyle("message"),
                      fontFamily: "var(--font-source-serif)",
                    }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => handleBlur("message")}
                    onChange={(e) => handleChange("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message ? (
                    <p
                      id="message-error"
                      className="mt-2 text-xs"
                      style={{ color: DANGER, fontFamily: "var(--font-dm-sans)" }}
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {formError ? (
                  <p
                    role="alert"
                    className="mt-5 rounded-xl px-4 py-3 text-xs"
                    style={{
                      color: DANGER,
                      border: `1px solid ${DANGER}`,
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  >
                    {formError}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting || !formValid}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "var(--on-accent-primary, #ffffff)",
                    fontFamily: "var(--font-dm-sans)",
                  }}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-4 lg:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <User className="h-4 w-4" style={{ color: "var(--accent-gold-text)" }} />
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--accent-gold-text)", fontFamily: "var(--font-dm-sans)" }}
              >
                Other ways to reach us
              </p>
            </div>
            {INFO_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-2xl border p-5"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <Icon className="h-4 w-4" style={{ color: "var(--accent-primary)" }} />
                    <h3
                      className="text-lg font-light"
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      fontFamily: "var(--font-source-serif)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              );
            })}
          </aside>
        </div>
      </section>
    </div>
  );
}
