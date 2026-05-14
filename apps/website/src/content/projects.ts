export type Project = {
  slug: string;
  client: string;
  industry: string;
  year: number;
  summary: string;
  description: string;
  stack: string[];
  results: string[];
  accentFrom: string;
  accentTo: string;
};

export const projects: Project[] = [
  {
    slug: "bloemwerk-amsterdam",
    client: "Bloemwerk Amsterdam",
    industry: "Local retail / florist",
    year: 2025,
    summary:
      "Modern website and online ordering for a boutique florist in Amsterdam.",
    description:
      "We rebuilt Bloemwerk's outdated WordPress site into a fast, mobile-first Next.js storefront with an integrated ordering flow, automated daily-delivery scheduling, and Dutch/English content.",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Stripe"],
    results: [
      "3.1x faster page loads",
      "+62% online orders in first 60 days",
      "Top 3 local search ranking for key terms",
    ],
    accentFrom: "#2563EB",
    accentTo: "#7C3AED",
  },
  {
    slug: "kyiv-clinic",
    client: "Kyiv Family Clinic",
    industry: "Healthcare",
    year: 2024,
    summary:
      "Patient portal and appointment scheduling SaaS for a multi-clinic group.",
    description:
      "Custom SaaS application allowing patients to book appointments across multiple clinics, view records, and message practitioners. Built with Ukrainian/English UI from day one and HIPAA-style data isolation per clinic.",
    stack: ["Next.js", "Drizzle ORM", "Supabase", "TanStack Query"],
    results: [
      "Reduced phone bookings by 70%",
      "8 clinics onboarded in 4 months",
      "94% patient satisfaction score",
    ],
    accentFrom: "#0EA5E9",
    accentTo: "#10B981",
  },
  {
    slug: "delta-logistics",
    client: "Delta Logistics",
    industry: "Logistics & shipping",
    year: 2024,
    summary:
      "Database overhaul and performance optimization for a logistics dashboard.",
    description:
      "Delta's dashboard was loading 30+ seconds under peak load. We restructured their Postgres schema, added the right indexes, and rewrote the heaviest queries. The dashboard now loads in under a second.",
    stack: ["PostgreSQL", "Drizzle ORM", "Node.js", "Redis"],
    results: [
      "30s → 0.8s dashboard load time",
      "Database storage reduced 42%",
      "Zero downtime migration",
    ],
    accentFrom: "#F97316",
    accentTo: "#EF4444",
  },
  {
    slug: "atlas-coffee-roasters",
    client: "Atlas Coffee Roasters",
    industry: "Food & beverage / D2C",
    year: 2025,
    summary:
      "Subscription SaaS and storefront for a specialty coffee roaster.",
    description:
      "From flat sales site to recurring revenue. We built a subscription management platform on top of their existing Shopify storefront with a custom admin to manage roast schedules, customer preferences, and shipments.",
    stack: ["Next.js", "Supabase", "Stripe Billing", "TanStack Query"],
    results: [
      "1,200+ active subscribers in 90 days",
      "+38% average customer lifetime value",
      "Roast-to-ship cycle automated end-to-end",
    ],
    accentFrom: "#A16207",
    accentTo: "#92400E",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.slice(0, limit);
}
