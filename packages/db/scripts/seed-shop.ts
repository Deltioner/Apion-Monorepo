import { config as loadEnv } from "dotenv";

loadEnv({ path: "../../apps/shop/.env.local" });
loadEnv({ path: "../../apps/website/.env.local" });
loadEnv();

import { getDb } from "../src/client";
import { products } from "../src/schema/products";

const sample = [
  {
    slug: "starter-design-system",
    title: "Starter Design System",
    description:
      "A polished Tailwind + Radix component library with 80+ components, dark mode, and Figma source files. Drop-in ready for any Next.js app.",
    category: "design",
    priceCents: 4900,
    currency: "EUR",
    type: "digital",
    instantDelivery: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Design system preview",
      },
    ],
  },
  {
    slug: "saas-marketing-kit",
    title: "SaaS Marketing Kit",
    description:
      "Twelve battle-tested landing-page sections, copy templates, and an email drip sequence. Ship a launch site in an afternoon.",
    category: "marketing",
    priceCents: 7900,
    currency: "EUR",
    type: "digital",
    instantDelivery: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        alt: "Marketing kit preview",
      },
    ],
  },
  {
    slug: "auth-templates",
    title: "Authentication Templates Pack",
    description:
      "Production-ready auth flows for Supabase, Clerk, and Auth.js — sign-in, magic links, OAuth, MFA, role-based access.",
    category: "security",
    priceCents: 5900,
    currency: "EUR",
    type: "digital",
    instantDelivery: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
        alt: "Auth templates preview",
      },
    ],
  },
  {
    slug: "icon-library",
    title: "Apion Icon Library",
    description:
      "1,200 hand-tuned line icons in SVG, React, and Figma. MIT licensed for commercial use.",
    category: "design",
    priceCents: 2900,
    currency: "EUR",
    type: "digital",
    instantDelivery: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
        alt: "Icon library preview",
      },
    ],
  },
];

async function main() {
  const db = getDb();
  for (const p of sample) {
    await db.insert(products).values(p).onConflictDoNothing();
    console.info(`✓ upserted ${p.slug}`);
  }
  console.info(`done — ${sample.length} products`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
