import { and, eq, inArray, sql } from "drizzle-orm";
import { schema } from "@repo/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const cartRouter = router({
  /**
   * Return the current user's cart, joined with the product so the storefront
   * can render without a second round-trip.
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select({
        cartItemId: schema.cartItems.id,
        productId: schema.cartItems.productId,
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

    const subtotalCents = rows.reduce(
      (sum, r) => sum + r.product.priceCents * r.quantity,
      0,
    );
    const currency = rows[0]?.product.currency ?? "EUR";

    return { items: rows, subtotalCents, currency };
  }),

  /**
   * Add a product to the cart. If it's already there, increment quantity.
   * Single round-trip via Postgres ON CONFLICT.
   */
  add: protectedProcedure
    .input(
      z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1).max(99).default(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [product] = await ctx.db
        .select({ id: schema.products.id, active: schema.products.active })
        .from(schema.products)
        .where(eq(schema.products.id, input.productId))
        .limit(1);
      if (!product || !product.active) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
      }

      const [row] = await ctx.db
        .insert(schema.cartItems)
        .values({
          userId: ctx.user.id,
          productId: input.productId,
          quantity: input.quantity,
        })
        .onConflictDoUpdate({
          target: [schema.cartItems.userId, schema.cartItems.productId],
          set: {
            quantity: sql`${schema.cartItems.quantity} + ${input.quantity}`,
            updatedAt: new Date(),
          },
        })
        .returning();

      return row;
    }),

  setQuantity: protectedProcedure
    .input(
      z.object({
        cartItemId: z.string().uuid(),
        quantity: z.number().int().min(0).max(99),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.quantity === 0) {
        await ctx.db
          .delete(schema.cartItems)
          .where(
            and(
              eq(schema.cartItems.id, input.cartItemId),
              eq(schema.cartItems.userId, ctx.user.id),
            ),
          );
        return { removed: true };
      }
      const [row] = await ctx.db
        .update(schema.cartItems)
        .set({ quantity: input.quantity, updatedAt: new Date() })
        .where(
          and(
            eq(schema.cartItems.id, input.cartItemId),
            eq(schema.cartItems.userId, ctx.user.id),
          ),
        )
        .returning();
      return row ?? null;
    }),

  remove: protectedProcedure
    .input(z.object({ cartItemId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(schema.cartItems)
        .where(
          and(
            eq(schema.cartItems.id, input.cartItemId),
            eq(schema.cartItems.userId, ctx.user.id),
          ),
        );
      return { ok: true };
    }),

  /**
   * Merge a guest (localStorage) cart into the user's server cart after sign-in.
   */
  mergeGuest: protectedProcedure
    .input(
      z.object({
        items: z
          .array(
            z.object({
              productId: z.string().uuid(),
              quantity: z.number().int().min(1).max(99),
            }),
          )
          .max(100),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { merged: 0 };

      // Validate product ids in one query
      const ids = [...new Set(input.items.map((i) => i.productId))];
      const validProducts = await ctx.db
        .select({ id: schema.products.id })
        .from(schema.products)
        .where(
          and(
            inArray(schema.products.id, ids),
            eq(schema.products.active, true),
          ),
        );
      const validSet = new Set(validProducts.map((p) => p.id));

      const rowsToInsert = input.items
        .filter((i) => validSet.has(i.productId))
        .map((i) => ({
          userId: ctx.user.id,
          productId: i.productId,
          quantity: i.quantity,
        }));
      if (rowsToInsert.length === 0) return { merged: 0 };

      await ctx.db
        .insert(schema.cartItems)
        .values(rowsToInsert)
        .onConflictDoUpdate({
          target: [schema.cartItems.userId, schema.cartItems.productId],
          set: {
            quantity: sql`${schema.cartItems.quantity} + EXCLUDED.quantity`,
            updatedAt: new Date(),
          },
        });

      return { merged: rowsToInsert.length };
    }),

  clear: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db
      .delete(schema.cartItems)
      .where(eq(schema.cartItems.userId, ctx.user.id));
    return { ok: true };
  }),
});
