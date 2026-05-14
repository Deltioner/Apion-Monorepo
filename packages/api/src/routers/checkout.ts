import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { schema } from "@repo/db";
import { createMolliePayment } from "@repo/payments/server";
import { TRPCError } from "@trpc/server";

import { protectedProcedure, router } from "../trpc";

const inputSchema = z.object({
  /** Origin of the shop, e.g. "http://localhost:3002". Used to build the
   *  redirectUrl and webhookUrl Mollie POSTs to. */
  origin: z.string().url(),
  /** Locale segment, e.g. "en" — preserved in the redirect target. */
  locale: z.string().min(2).max(8),
});

export const checkoutRouter = router({
  /**
   * Compute the cart total server-side from product IDs (NEVER trust the
   * client) and create a Mollie payment. The order itself is written by the
   * webhook after the payment status becomes "paid", not here.
   */
  createPayment: protectedProcedure
    .input(inputSchema)
    .mutation(async ({ ctx, input }) => {
      const rows = await ctx.db
        .select({
          cartItemId: schema.cartItems.id,
          quantity: schema.cartItems.quantity,
          product: schema.products,
        })
        .from(schema.cartItems)
        .innerJoin(
          schema.products,
          eq(schema.products.id, schema.cartItems.productId),
        )
        .where(
          and(
            eq(schema.cartItems.userId, ctx.user.id),
            eq(schema.products.active, true),
          ),
        );

      if (rows.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart is empty",
        });
      }

      const currency = rows[0]?.product.currency ?? "EUR";
      const mixed = rows.some((r) => r.product.currency !== currency);
      if (mixed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cart contains items in multiple currencies",
        });
      }

      const amountCents = rows.reduce(
        (sum, r) => sum + r.product.priceCents * r.quantity,
        0,
      );

      // Mollie's minimum is currency-dependent; EUR is 1 cent. Keep a
      // sanity floor.
      if (amountCents < 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order total is below the minimum charge",
        });
      }

      const productIds = rows.map((r) => r.product.id).join(",");

      const payment = await createMolliePayment({
        amountCents,
        currency,
        description: `Shop order for ${ctx.user.email ?? ctx.user.id}`,
        redirectUrl: `${input.origin}/${input.locale}/payment-confirm`,
        webhookUrl: `${input.origin}/api/webhooks/mollie`,
        metadata: {
          userId: ctx.user.id,
          productIds,
        },
      });

      return {
        checkoutUrl: payment.checkoutUrl,
        amountCents,
        currency,
      };
    }),
});
