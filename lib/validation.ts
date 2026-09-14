/**
 * Hand-written validators (no external schema library is installed).
 * Every validator returns `null` when the value is acceptable, or a
 * human-readable error string describing exactly what is wrong.
 */

export type FieldError = string | null;

export const NAME_MIN = 5;
export const NAME_MAX = 100;
export const SUBJECT_MIN = 5;
export const SUBJECT_MAX = 150;
export const EMAIL_MAX = 254;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;

/**
 * Unicode-aware "letters and spaces only" matcher. `\p{L}` covers Latin,
 * Devanagari, Gujarati, Cyrillic, CJK ... while still rejecting digits,
 * punctuation, symbols, emoji and angle brackets. Combining marks (`\p{M}`)
 * are allowed because Indic scripts need matras to spell ordinary names.
 */
const LETTERS_AND_SPACES = /^[\p{L}\p{M}][\p{L}\p{M} ]*$/u;

/** Deliberately pragmatic ("RFC-ish") email shape — no comments, no quoted locals. */
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

export interface ContactFormInput {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function validateLetterField(
  value: string,
  label: string,
  min: number,
  max: number
): FieldError {
  const trimmed = asString(value).trim();
  if (trimmed.length === 0) return `${label} is required.`;
  if (trimmed.length < min) return `${label} must be at least ${min} characters.`;
  if (trimmed.length > max) return `${label} must be at most ${max} characters.`;
  if (!LETTERS_AND_SPACES.test(trimmed)) {
    return `${label} can contain letters and spaces only.`;
  }
  return null;
}

export function validateName(value: string): FieldError {
  return validateLetterField(value, "Name", NAME_MIN, NAME_MAX);
}

export function validateSubject(value: string): FieldError {
  return validateLetterField(value, "Subject", SUBJECT_MIN, SUBJECT_MAX);
}

export function validateEmail(value: string): FieldError {
  const trimmed = asString(value).trim();
  if (trimmed.length === 0) return "Email is required.";
  if (trimmed.length > EMAIL_MAX) {
    return `Email must be at most ${EMAIL_MAX} characters.`;
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return null;
}

export function validateMessage(value: string): FieldError {
  const trimmed = asString(value).trim();
  if (trimmed.length === 0) return "Message is required.";
  if (trimmed.length < MESSAGE_MIN) {
    return `Message must be at least ${MESSAGE_MIN} characters.`;
  }
  if (trimmed.length > MESSAGE_MAX) {
    return `Message must be at most ${MESSAGE_MAX} characters.`;
  }
  return null;
}

export function validateContactForm(input: ContactFormInput): {
  valid: boolean;
  errors: Record<string, FieldError>;
} {
  const errors: Record<string, FieldError> = {
    name: validateName(asString(input.name)),
    email: validateEmail(asString(input.email)),
    subject: validateSubject(asString(input.subject)),
    message: validateMessage(asString(input.message)),
  };
  const valid = Object.values(errors).every((e) => e === null);
  return { valid, errors };
}
