"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, Heart, Globe, Wrench, type LucideIcon } from "lucide-react";

import {
  Section,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";

type StatKey = "response" | "retention" | "languages" | "experience";

type Theme = {
  stroke: string;
  icon: string;
  gradFrom: string;
  gradTo: string;
  glow: string;
  pill: string;
};

const THEMES: Record<"emerald" | "rose" | "sky" | "amber", Theme> = {
  emerald: {
    stroke: "stroke-emerald-500",
    icon: "text-emerald-500",
    gradFrom: "from-emerald-500",
    gradTo: "to-emerald-400",
    glow: "from-emerald-500/15",
    pill: "bg-emerald-500",
  },
  rose: {
    stroke: "stroke-rose-500",
    icon: "text-rose-500",
    gradFrom: "from-rose-500",
    gradTo: "to-pink-400",
    glow: "from-rose-500/15",
    pill: "bg-rose-500",
  },
  sky: {
    stroke: "stroke-sky-500",
    icon: "text-sky-500",
    gradFrom: "from-sky-500",
    gradTo: "to-cyan-400",
    glow: "from-sky-500/15",
    pill: "bg-sky-500",
  },
  amber: {
    stroke: "stroke-amber-500",
    icon: "text-amber-500",
    gradFrom: "from-amber-500",
    gradTo: "to-orange-400",
    glow: "from-amber-500/15",
    pill: "bg-amber-500",
  },
};

const ITEMS: {
  key: StatKey;
  icon: LucideIcon;
  max: number;
  theme: keyof typeof THEMES;
}[] = [
  { key: "response", icon: Clock, max: 24, theme: "emerald" },
  { key: "retention", icon: Heart, max: 100, theme: "rose" },
  { key: "languages", icon: Globe, max: 3, theme: "sky" },
  { key: "experience", icon: Wrench, max: 10, theme: "amber" },
];

function useCountUp(target: number, animate: boolean, duration = 1400) {
  const [n, setN] = useState(animate && target ? 0 : target);
  useEffect(() => {
    if (!animate) {
      setN(target);
      return;
    }
    if (!target) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, duration]);
  return n;
}

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function StatCard({
  index,
  icon: Icon,
  max,
  value,
  label,
  inView,
  theme,
}: {
  index: number;
  icon: LucideIcon;
  max: number;
  value: string;
  label: string;
  inView: boolean;
  theme: Theme;
}) {
  const match = value.match(/(\d+)/);
  const target = match ? parseInt(match[1] ?? "0", 10) : 0;
  const n = useCountUp(target, inView);
  const display = match
    ? value.replace(/\d+/, String(Math.round(n)))
    : value;
  const progress = max ? Math.min(1, n / max) : 0;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="bg-background group relative flex flex-col items-center px-6 py-10 sm:px-8 sm:py-12"
    >
      <div
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-br ${theme.glow} via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="absolute right-4 top-4 flex items-center gap-1.5">
        <span className="relative flex size-2">
          <span className={`absolute inset-0 animate-ping rounded-full ${theme.pill} opacity-60`} />
          <span className={`relative inline-flex size-2 rounded-full ${theme.pill}`} />
        </span>
        <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-[0.15em]">
          live
        </span>
      </div>

      <div className="relative transition-transform duration-500 group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 128 128"
          className="size-32"
          aria-hidden
          style={{ transform: "rotate(-90deg)" }}
        >
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
            className="stroke-muted"
          />
          <circle
            cx="64"
            cy="64"
            r={RADIUS}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={theme.stroke}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <Icon className={`${theme.icon} size-4`} aria-hidden />
          <div
            className={`bg-gradient-to-br ${theme.gradFrom} ${theme.gradTo} bg-clip-text text-2xl font-semibold tracking-tight tabular-nums text-transparent sm:text-3xl`}
          >
            {display}
          </div>
        </div>
      </div>

      <div className="text-muted-foreground relative mt-5 text-center text-sm font-medium">
        {label}
      </div>
    </motion.div>
  );
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
        {ITEMS.map((item, i) => (
          <StatCard
            key={item.key}
            index={i}
            icon={item.icon}
            max={item.max}
            value={t(`items.${item.key}.value`)}
            label={t(`items.${item.key}.label`)}
            inView={inView}
            theme={THEMES[item.theme]}
          />
        ))}
      </div>
    </Section>
  );
}
