import { Resend } from "resend";

let client: Resend | undefined;

export function getResend(): Resend {
  if (client) return client;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to apps/shop/.env.local.",
    );
  }
  client = new Resend(apiKey);
  return client;
}

export function getFromAddress(): string {
  const from = process.env.EMAIL_FROM;
  if (!from) {
    throw new Error(
      "EMAIL_FROM is not set. Use a verified sender like 'Apion Shop <orders@yourdomain.com>'.",
    );
  }
  return from;
}
