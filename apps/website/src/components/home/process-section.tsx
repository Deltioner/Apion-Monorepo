"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  Section,
  SectionEyebrow,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";

const STEPS = ["discover", "design", "build", "support"] as const;

export function ProcessSection() {
  const t = useTranslations("Process");

  return (
    <Section className="bg-muted/30 max-w-none sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionTitle>{t("title")}</SectionTitle>
          <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
        </div>

        <div className="relative mt-12">
          {/* Connector line, hidden on small screens */}
          <div
            aria-hidden
            className="from-primary/40 via-primary/20 absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r to-transparent md:block"
          />

          <ol className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {STEPS.map((key, i) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <SpotlightCard className="bg-background h-full rounded-xl border p-6 shadow-sm">
                  <div className="bg-primary text-primary-foreground inline-flex size-14 items-center justify-center rounded-full text-sm font-semibold tracking-wide shadow-md shadow-primary/25">
                    {t(`steps.${key}.n`)}
                  </div>
                  <h3 className="mt-5 text-base font-semibold">
                    {t(`steps.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {t(`steps.${key}.body`)}
                  </p>
                </SpotlightCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
