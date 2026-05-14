import { createMollieClient, type MollieClient } from "@mollie/api-client";

import type {
  CreatePaymentInput,
  CreatePaymentResult,
} from "./types";

let mollieClient: MollieClient | undefined;

export function getMollie(): MollieClient {
  if (mollieClient) return mollieClient;

  const key = process.env.MOLLIE_API_KEY;
  if (!key) {
    throw new Error(
      "MOLLIE_API_KEY is not set. Add it to apps/shop/.env.local.",
    );
  }

  mollieClient = createMollieClient({ apiKey: key });
  return mollieClient;
}

function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2);
}

export async function createMolliePayment(
  input: CreatePaymentInput,
): Promise<CreatePaymentResult> {
  const mollie = getMollie();
  const payment = await mollie.payments.create({
    amount: {
      value: centsToDecimal(input.amountCents),
      currency: input.currency.toUpperCase(),
    },
    description: input.description,
    redirectUrl: input.redirectUrl,
    webhookUrl: input.webhookUrl,
    metadata: input.metadata,
  });

  const checkoutUrl = payment.getCheckoutUrl();
  if (!checkoutUrl) {
    throw new Error("Mollie returned a payment without a checkout URL");
  }

  return {
    id: payment.id,
    checkoutUrl,
    amountCents: input.amountCents,
    currency: input.currency.toUpperCase(),
  };
}
