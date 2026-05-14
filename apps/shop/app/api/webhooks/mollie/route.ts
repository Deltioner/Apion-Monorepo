import { NextResponse } from "next/server";

import { createOrderFromPayment, markOrderFailed } from "@repo/api";
import { sendOrderConfirmation } from "@repo/email/send";
import { fetchMolliePaymentFromWebhook } from "@repo/payments/webhook";

import { SITE_NAME, SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Mollie webhook. The ONLY place orders are written.
 *
 * Mollie POSTs a form-encoded body containing just `id=tr_xxx`. We fetch the
 * payment from Mollie to get the authoritative status — never trust the body
 * alone (no signature scheme).
 *
 * Idempotent: createOrderFromPayment checks for an existing order by
 * provider payment id before inserting, so a duplicate delivery is a no-op.
 */
export async function POST(req: Request) {
  const body = await req.text();

  let payment;
  try {
    payment = await fetchMolliePaymentFromWebhook(body);
  } catch (err) {
    console.error("[mollie-webhook] failed to resolve payment", err);
    return new NextResponse("Bad payload", { status: 400 });
  }

  try {
    if (payment.status === "paid") {
      const summary = await createOrderFromPayment(payment);

      if (summary && summary.email) {
        try {
          await sendOrderConfirmation({
            to: summary.email,
            props: {
              orderNumber: summary.orderNumber,
              currency: summary.currency,
              subtotalCents: summary.subtotalCents,
              taxCents: 0,
              totalCents: summary.totalCents,
              shopName: SITE_NAME,
              shopUrl: SITE_URL,
              lines: summary.lines,
            },
          });
        } catch (err) {
          // Don't fail the webhook over email — Mollie would retry and we'd
          // double-write. Surface in logs.
          console.error("[mollie-webhook] send email failed", err);
        }
      }
    } else if (
      payment.status === "failed" ||
      payment.status === "canceled" ||
      payment.status === "expired"
    ) {
      await markOrderFailed(payment.id);
    }
    // "open" / "pending" / "authorized" — wait for a follow-up webhook call.
  } catch (err) {
    console.error(`[mollie-webhook] handler error for ${payment.status}`, err);
    return new NextResponse("Handler error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}
