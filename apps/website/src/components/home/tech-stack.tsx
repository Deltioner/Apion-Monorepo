"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Tech = {
  slug: string;
  label: string;
  // True for dark monochrome logos (Next.js, Vercel, etc.) — inverted in dark mode for visibility.
  invertOnDark?: boolean;
  // Override the icon URL when the slug isn't on the current Simple Icons CDN.
  src?: string;
};

// Slugs match https://simpleicons.org and are served from their CDN in brand colors,
// unless `src` is provided as an explicit override.
const TECH: Tech[] = [
  { slug: "nextdotjs", label: "Next.js", invertOnDark: true },
  { slug: "react", label: "React" },
  { slug: "typescript", label: "TypeScript" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "tailwindcss", label: "Tailwind CSS" },
  { slug: "supabase", label: "Supabase" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "redis", label: "Redis" },
  { slug: "vercel", label: "Vercel", invertOnDark: true },
  { slug: "cloudflare", label: "Cloudflare" },
  { slug: "docker", label: "Docker" },
  { slug: "stripe", label: "Stripe" },
  { slug: "androidstudio", label: "Android Studio" },
  { slug: "kotlin", label: "Kotlin" },
  { slug: "swift", label: "Swift" },
  { slug: "expo", label: "Expo", invertOnDark: true },
  { slug: "figma", label: "Figma" },
  { slug: "cursor", label: "Cursor", invertOnDark: true },
  {
    slug: "openai",
    label: "OpenAI",
    invertOnDark: true,
    // Removed from the live Simple Icons CDN — pinned to the v13 snapshot on jsDelivr.
    src: "https://cdn.jsdelivr.net/npm/simple-icons@13/icons/openai.svg",
  },
  { slug: "github", label: "GitHub", invertOnDark: true },
];

export function TechStack() {
  const t = useTranslations("TechStack");

  return (
    <section className="border-border/40 relative overflow-hidden border-y bg-background py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_75%)]"
      >
        <div className="absolute left-1/4 top-1/4 size-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 size-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-muted-foreground text-center text-xs font-medium uppercase tracking-widest">
          {t("label")}
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10">
          {TECH.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: (i % 10) * 0.03 }}
              className="group bg-card/40 hover:bg-card hover:border-foreground/20 relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-transparent p-2 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg"
              title={item.label}
            >
              <img
                src={item.src ?? `https://cdn.simpleicons.org/${item.slug}`}
                alt={item.label}
                width={32}
                height={32}
                loading="lazy"
                className={`size-7 transition-transform duration-300 group-hover:scale-110 sm:size-8 ${item.invertOnDark ? "dark:invert" : ""}`}
              />
              <span className="text-muted-foreground text-[10px] font-medium leading-tight text-center sm:text-xs">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
