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

const ITEMS: { key: ItemKey; icon: LucideIcon; span: string }[] = [
  { key: "fullstack", icon: Code2, span: "md:col-span-2 md:row-span-2" },
  { key: "edge", icon: Zap, span: "" },
  { key: "i18n", icon: Globe, span: "" },
  { key: "observability", icon: Activity, span: "md:col-span-2" },
  { key: "security", icon: Shield, span: "" },
  { key: "ownership", icon: KeyRound, span: "" },
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
        {ITEMS.map(({ key, icon: Icon, span }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className={span}
          >
            <SpotlightCard className="bg-background hover:border-primary/30 group relative h-full overflow-hidden rounded-xl border p-6 transition-colors">
              {/* Decorative gradient blob in corner */}
              <div
                aria-hidden
                className="bg-primary/10 absolute -right-12 -top-12 size-32 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60"
              />
              <div className="relative flex h-full flex-col">
                <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
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
