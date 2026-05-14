import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { products } from "./products";

/**
 * Cart items live in Postgres, keyed by Supabase auth user id (uuid as text
 * for portability — Supabase auth.users.id is a UUID, but we keep it as text
 * to avoid an FK across schemas).
 *
 * A guest cart lives in localStorage on the client and is merged into this
 * table on sign-in (see apps/shop/src/lib/cart-merge.ts).
 *
 * (user_id, product_id) is unique so "add to cart" upserts quantity instead
 * of creating a new row.
 */
export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: varchar("user_id", { length: 64 }).notNull(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    userProductUnique: uniqueIndex("cart_items_user_product_unique").on(
      t.userId,
      t.productId,
    ),
    userIdx: index("cart_items_user_idx").on(t.userId),
  }),
);

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
