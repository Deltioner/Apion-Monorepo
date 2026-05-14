# apps/shop

The Apion ecommerce storefront.

- **Framework:** Next.js 16 (App Router, RSC) + React 19
- **Styling:** Tailwind v4 via `@repo/ui`
- **i18n:** `next-intl` (en / nl / uk / ar)
- **Data:** `@repo/db` (Drizzle + Postgres) and `@repo/api` (tRPC v11)
- **Auth:** `@repo/supabase` (Supabase Auth, magic links)
- **Payments:** `@repo/payments` (Stripe, server-only)
- **Email:** `@repo/email` (Resend + React Email)

## Getting started

```bash
# from monorepo root
pnpm install
cp apps/shop/.env.example apps/shop/.env.local
# fill in DATABASE_URL, Supabase keys, Stripe keys, Resend key

# push schema to your Postgres
pnpm --filter @repo/db push

# seed a few sample products
pnpm --filter @repo/db seed:shop

# run the shop
pnpm --filter shop dev   # http://localhost:3002
```

## Stripe local dev

In a second terminal, forward webhooks to your local app:

```bash
stripe listen --forward-to localhost:3002/api/webhooks/stripe
```

Copy the printed `whsec_...` into `STRIPE_WEBHOOK_SECRET`.

Test cards: see https://stripe.com/docs/testing.

## Architecture in one screen

- **All product / cart / order reads + writes go through tRPC** (`@repo/api`).
  Route handlers and React Server Components both call `appRouter.createCaller(ctx)`
  on the server; client components use the typed `trpc` React hooks.
- **Amounts are computed server-side** in `checkout.createPaymentIntent`.
  The client never tells Stripe how much to charge.
- **Orders are written by the Stripe webhook**, never by the checkout page.
  This guarantees no order without a confirmed payment.
- **Guest cart lives in localStorage** (`src/lib/guest-cart.ts`) and is merged
  into the user's Postgres cart on sign-in via `cart.mergeGuest`.
- **No Strapi.** Product catalog lives in the same Postgres as the rest of
  the monorepo — managed for now via Supabase Studio.
