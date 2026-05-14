import { eq } from "drizzle-orm";

import { getDb, schema } from "@repo/db";
import type { PaymentStatusSnapshot } from "@repo/payments/types";

import { generateOrderNumber } from "./order-number";

export type CreatedOrderSummary = {
  orderId: string;
  orderNumber: string;
  email: string;
  currency: string;
  subtotalCents: number;
  totalCents: number;
  lines: { title: string; quantity: number; priceCents: number }[];
};

/**
 * Idempotently create an order from a paid Mollie payment.
 *
 * Lives in @repo/api so the route handler in apps/shop stays thin and the
 * same logic is reusable from other entry points (CLI, test fixtures, future
 * apps/admin).
 *
 * Returns null if the order already existed (duplicate webhook delivery) or
 * if the userId is missing from metadata.
 */
export async function createOrderFromPayment(
  payment: PaymentStatusSnapshot,
): Promise<CreatedOrderSummary | null> {
  const db = getDb();
  const userId = payment.metadata?.userId;
  if (!userId) return null;

  const existing = await db
    .select({ id: schema.orders.id })
    .from(schema.orders)
    .where(eq(schema.orders.providerPaymentId, payment.id))
    .limit(1);
  if (existing.length > 0) return null;

  const cartRows = await db
    .select({
      quantity: schema.cartItems.quantity,
      product: schema.products,
    })
    .from(schema.cartItems)
    .innerJoin(
      schema.products,
      eq(schema.products.id, schema.cartItems.productId),
    )
    .where(eq(schema.cartItems.userId, userId));

  const subtotalCents = cartRows.reduce(
    (s, r) => s + r.product.priceCents * r.quantity,
    0,
  );
  const orderNumber = generateOrderNumber();
  const currency = payment.currency.toUpperCase();
  const email = payment.customerEmail ?? "";

  const [order] = await db
    .insert(schema.orders)
    .values({
      orderNumber,
      userId,
      email,
      status: "paid",
      subtotalCents,
      totalCents: payment.amountCents,
      currency,
      providerPaymentId: payment.id,
      paidAt: new Date(),
    })
    .returning();
  if (!order) return null;

  if (cartRows.length > 0) {
    await db.insert(schema.orderItems).values(
      cartRows.map((r) => ({
        orderId: order.id,
        productId: r.product.id,
        titleSnapshot: r.product.title,
        priceCentsSnapshot: r.product.priceCents,
        currencySnapshot: r.product.currency,
        quantity: r.quantity,
      })),
    );

    await db
      .delete(schema.cartItems)
      .where(eq(schema.cartItems.userId, userId));
  }

  return {
    orderId: order.id,
    orderNumber,
    email,
    currency,
    subtotalCents,
    totalCents: payment.amountCents,
    lines: cartRows.map((r) => ({
      title: r.product.title,
      quantity: r.quantity,
      priceCents: r.product.priceCents,
    })),
  };
}

export async function markOrderFailed(providerPaymentId: string) {
  const db = getDb();
  await db
    .update(schema.orders)
    .set({ status: "failed", updatedAt: new Date() })
    .where(eq(schema.orders.providerPaymentId, providerPaymentId));
}
