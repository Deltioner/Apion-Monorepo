import {
  boolean,
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

/**
 * Product table.
 *
 * Designed digital-first but flexible — physical fields exist as nullable
 * columns so flipping a SKU from digital to physical is a single UPDATE, not
 * a schema migration.
 *
 * Price is stored as integer cents to avoid float drift across Stripe.
 */
export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull(),
    title: varchar("title", { length: 300 }).notNull(),
    description: text("description").notNull().default(""),
    category: varchar("category", { length: 64 }).notNull(),

    priceCents: integer("price_cents").notNull(),
    currency: varchar("currency", { length: 3 }).notNull().default("EUR"),

    // 'digital' | 'physical'
    type: varchar("type", { length: 16 }).notNull().default("digital"),

    // Digital
    instantDelivery: boolean("instant_delivery").notNull().default(true),
    downloadUrl: text("download_url"),

    // Physical (null for digital)
    weightGrams: integer("weight_grams"),

    // Inventory: null = unlimited (digital), int = stock count
    stock: integer("stock"),

    // [{ url, alt, width?, height? }]
    images: jsonb("images").$type<ProductImage[]>().notNull().default([]),

    active: boolean("active").notNull().default(true),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    slugUnique: uniqueIndex("products_slug_unique").on(t.slug),
    activeIdx: index("products_active_idx").on(t.active),
    categoryIdx: index("products_category_idx").on(t.category),
  }),
);

export type ProductImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
