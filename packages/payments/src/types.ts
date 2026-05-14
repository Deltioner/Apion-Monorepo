/**
 * Mollie-shaped values we expose to the rest of the monorepo without leaking
 * the full Mollie types into callers. Keep this surface tiny.
 */

export type CreatePaymentInput = {
  amountCents: number;
  /** ISO 4217 code, e.g. "EUR". Will be uppercased before sending. */
  currency: string;
  /** Where Mollie redirects the customer after they pay (or cancel). */
  redirectUrl: string;
  /** Public URL Mollie POSTs to when the payment status changes. */
  webhookUrl: string;
  /** Free-form description shown in the Mollie dashboard and to the customer. */
  description: string;
  /** Order context surfaced in the webhook payload. */
  metadata?: Record<string, string>;
};

export type CreatePaymentResult = {
  id: string;
  checkoutUrl: string;
  amountCents: number;
  currency: string;
};

export type PaymentStatusSnapshot = {
  id: string;
  status: "open" | "paid" | "failed" | "canceled" | "expired" | "pending" | "authorized";
  amountCents: number;
  currency: string;
  metadata: Record<string, string>;
  customerEmail: string | null;
};
