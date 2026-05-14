import { getMollie } from "./server";
import type { PaymentStatusSnapshot } from "./types";

/**
 * Parse Mollie's webhook body (form-encoded, single field: id=tr_xxx) and
 * fetch the payment from the Mollie API to get its current authoritative
 * status.
 *
 * Mollie webhooks have NO signature header — security comes from the fact
 * that the only thing the payload contains is an ID, and the actual status
 * is fetched server-to-server from Mollie. An attacker calling the webhook
 * with a fake ID gets a 404 from Mollie.
 *
 * Pass the raw request body as a string (e.g. `await req.text()`).
 */
export async function fetchMolliePaymentFromWebhook(
  body: string,
): Promise<PaymentStatusSnapshot> {
  const params = new URLSearchParams(body);
  const id = params.get("id");
  if (!id) {
    throw new Error("Mollie webhook body missing 'id' field");
  }

  const mollie = getMollie();
  const payment = await mollie.payments.get(id);

  const amountCents = Math.round(parseFloat(payment.amount.value) * 100);
  const metadata =
    (payment.metadata as Record<string, string> | null | undefined) ?? {};

  return {
    id: payment.id,
    status: payment.status as PaymentStatusSnapshot["status"],
    amountCents,
    currency: payment.amount.currency.toUpperCase(),
    metadata,
    customerEmail:
      (payment.details as { consumerEmail?: string } | undefined)?.consumerEmail ??
      null,
  };
}
