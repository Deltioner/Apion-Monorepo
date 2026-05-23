"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Code2,
  Zap,
  Globe,
  Activity,
  Shield,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

import {
  Section,
  SectionEyebrow,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";

type ItemKey =
  | "fullstack"
  | "edge"
  | "i18n"
  | "observability"
  | "security"
  | "ownership";

const ITEMS: {
  key: ItemKey;
  icon: LucideIcon;
  span: string;
  bg: string;
  text: string;
  blob: string;
}[] = [
  {
    key: "fullstack",
    icon: Code2,
    span: "md:col-span-2 md:row-span-2",
    bg: "bg-blue-500/10",
    text: "text-blue-500",
    blob: "bg-blue-500/15",
  },
  {
    key: "edge",
    icon: Zap,
    span: "",
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    blob: "bg-yellow-500/15",
  },
  {
    key: "i18n",
    icon: Globe,
    span: "",
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    blob: "bg-emerald-500/15",
  },
  {
    key: "observability",
    icon: Activity,
    span: "md:col-span-2",
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    blob: "bg-orange-500/15",
  },
  {
    key: "security",
    icon: Shield,
    span: "",
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    blob: "bg-rose-500/15",
  },
  {
    key: "ownership",
    icon: KeyRound,
    span: "",
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    blob: "bg-violet-500/15",
  },
];

export function CapabilitiesBento() {
  const t = useTranslations("Capabilities");

  return (
    <Section>
      <div className="max-w-3xl">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <SectionTitle>{t("title")}</SectionTitle>
        <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
      </div>

      <div className="mt-12 grid auto-rows-[12rem] grid-cols-1 gap-4 md:grid-cols-4">
        {ITEMS.map(({ key, icon: Icon, span, bg, text, blob }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={span}
          >
            <SpotlightCard className="bg-background hover:border-foreground/20 group relative h-full overflow-hidden rounded-xl border p-6 transition-colors">
              {/* Decorative gradient blob in corner — colored per capability */}
              <div
                aria-hidden
                className={`${blob} absolute -right-12 -top-12 size-32 rounded-full blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative flex h-full flex-col">
                <div
                  className={`${bg} ${text} inline-flex size-10 items-center justify-center rounded-lg`}
                >
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
