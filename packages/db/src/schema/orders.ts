import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { products } from "./products";

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
  state?: string;
};

/**
 * Orders are written ONLY by the payment-provider webhook handler after the
 * payment is confirmed. The client never creates orders directly.
 *
 * `orderNumber` is the human-friendly identifier shown to customers
 * (generated server-side, see @repo/api/src/lib/order-number.ts).
 *
 * `providerPaymentId` is the payment-provider's ID for the transaction
 * (e.g. Mollie's `tr_xxx`). Provider-agnostic so we can swap providers
 * without a schema migration.
 *
 * status values:
 *   pending   - Payment created, awaiting confirmation
 *   paid      - Payment succeeded, awaiting fulfillment
 *   fulfilled - Goods delivered (download link sent / shipped)
 *   failed    - Payment failed or expired
 *   refunded  - Refund issued
 */
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderNumber: varchar("order_number", { length: 32 }).notNull(),
    userId: varchar("user_id", { length: 64 }),
    email: varchar("email", { length: 320 }).notNull(),
    status: varchar("status", { length: 16 }).notNull().default("pending"),

    subtotalCents: integer("subtotal_cents").notNull(),
    taxCents: integer("tax_cents").notNull().default(0),
    totalCents: integer("total_cents").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("EUR"),

    providerPaymentId: varchar("provider_payment_id", { length: 128 }),

    shippingAddress: jsonb("shipping_address").$type<ShippingAddress | null>(),

    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    orderNumberUnique: uniqueIndex("orders_order_number_unique").on(
      t.orderNumber,
    ),
    providerPaymentIdx: index("orders_provider_payment_idx").on(
      t.providerPaymentId,
    ),
    userIdx: index("orders_user_idx").on(t.userId),
    emailIdx: index("orders_email_idx").on(t.email),
  }),
);

/**
 * Order line items snapshot title + price at purchase time so historical
 * orders stay correct even if the product is later renamed or repriced.
 */
export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),

    titleSnapshot: varchar("title_snapshot", { length: 300 }).notNull(),
    priceCentsSnapshot: integer("price_cents_snapshot").notNull(),
    currencySnapshot: varchar("currency_snapshot", { length: 3 }).notNull(),

    quantity: integer("quantity").notNull(),
  },
  (t) => ({
    orderIdx: index("order_items_order_idx").on(t.orderId),
  }),
);

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
