"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import {
  Section,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";

const KEYS = ["response", "retention", "languages", "experience"] as const;

function Counter({ value, animate }: { value: string; animate: boolean }) {
  // Try to find a number inside the value (e.g. "98%", "10+", "4", "<24h")
  const match = value.match(/(\d+)/);
  const target = match ? parseInt(match[1] ?? "0", 10) : 0;
  const [n, setN] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate || !match) return;
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, match, target]);

  if (!match) return <>{value}</>;
  return <>{value.replace(/\d+/, String(n))}</>;
}

export function StatsSection() {
  const t = useTranslations("Stats");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section>
      <div className="max-w-2xl">
        <SectionTitle>{t("title")}</SectionTitle>
        <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
      </div>

      <div
        ref={ref}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border/60 md:grid-cols-4"
      >
        {KEYS.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="bg-background relative px-6 py-10 sm:px-8 sm:py-12"
          >
            <div
              aria-hidden
              className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
            <div className="relative">
              <div className="from-primary to-primary/60 bg-gradient-to-br bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
                <Counter value={t(`items.${key}.value`)} animate={inView} />
              </div>
              <div className="text-muted-foreground mt-2 text-sm">
                {t(`items.${key}.label`)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
