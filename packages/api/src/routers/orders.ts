import { and, desc, eq } from "drizzle-orm";
import { schema } from "@repo/db";
import { z } from "zod";

import { protectedProcedure, router } from "../trpc";

export const ordersRouter = router({
  mine: protectedProcedure
    .input(
      z
        .object({
          limit: z.number().int().min(1).max(50).default(20),
        })
        .default({}),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.userId, ctx.user.id))
        .orderBy(desc(schema.orders.createdAt))
        .limit(input.limit);
    }),

  byNumber: protectedProcedure
    .input(z.object({ orderNumber: z.string().min(1).max(32) }))
    .query(async ({ ctx, input }) => {
      const [order] = await ctx.db
        .select()
        .from(schema.orders)
        .where(
          and(
            eq(schema.orders.orderNumber, input.orderNumber),
            eq(schema.orders.userId, ctx.user.id),
          ),
        )
        .limit(1);

      if (!order) return null;

      const lines = await ctx.db
        .select()
        .from(schema.orderItems)
        .where(eq(schema.orderItems.orderId, order.id));

      return { order, lines };
    }),
});
