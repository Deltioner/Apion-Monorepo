import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { schema } from "@repo/db";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const listInput = z
  .object({
    category: z.string().min(1).max(64).optional(),
    search: z.string().trim().max(200).optional(),
    limit: z.number().int().min(1).max(100).default(24),
    cursor: z.string().uuid().optional(),
  })
  .default({});

export const productsRouter = router({
  list: publicProcedure.input(listInput).query(async ({ ctx, input }) => {
    const where = and(
      eq(schema.products.active, true),
      input.category ? eq(schema.products.category, input.category) : undefined,
      input.search
        ? or(
            ilike(schema.products.title, `%${input.search}%`),
            ilike(schema.products.description, `%${input.search}%`),
          )
        : undefined,
      // Keyset pagination on (createdAt, id) using the cursor id's row.
      input.cursor
        ? sql`(${schema.products.createdAt}, ${schema.products.id}) < (
            SELECT created_at, id FROM ${schema.products} WHERE id = ${input.cursor}
          )`
        : undefined,
    );

    const rows = await ctx.db
      .select()
      .from(schema.products)
      .where(where)
      .orderBy(desc(schema.products.createdAt), desc(schema.products.id))
      .limit(input.limit + 1);

    const hasMore = rows.length > input.limit;
    const items = hasMore ? rows.slice(0, input.limit) : rows;
    const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

    return { items, nextCursor };
  }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(200) }))
    .query(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .select()
        .from(schema.products)
        .where(
          and(
            eq(schema.products.slug, input.slug),
            eq(schema.products.active, true),
          ),
        )
        .limit(1);
      return row ?? null;
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .select()
        .from(schema.products)
        .where(eq(schema.products.id, input.id))
        .limit(1);
      return row ?? null;
    }),

  related: publicProcedure
    .input(
      z.object({
        category: z.string().min(1).max(64),
        excludeId: z.string().uuid().optional(),
        limit: z.number().int().min(1).max(12).default(4),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where = and(
        eq(schema.products.active, true),
        eq(schema.products.category, input.category),
        input.excludeId
          ? sql`${schema.products.id} <> ${input.excludeId}`
          : undefined,
      );
      return ctx.db
        .select()
        .from(schema.products)
        .where(where)
        .orderBy(desc(schema.products.createdAt))
        .limit(input.limit);
    }),

  featured: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(24).default(8) }).default({}))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select()
        .from(schema.products)
        .where(eq(schema.products.active, true))
        .orderBy(desc(schema.products.createdAt))
        .limit(input.limit);
    }),
});
