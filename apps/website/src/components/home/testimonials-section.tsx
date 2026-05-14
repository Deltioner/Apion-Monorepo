"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import {
  Section,
  SectionEyebrow,
  SectionTitle,
} from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";

const KEYS = ["anna", "olena", "mark"] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");

  return (
    <Section>
      <div className="max-w-3xl">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <SectionTitle>{t("title")}</SectionTitle>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {KEYS.map((key, i) => {
          const name = t(`items.${key}.name`);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <SpotlightCard className="bg-background relative flex h-full flex-col gap-5 rounded-xl border p-6">
                <Quote className="text-primary/30 size-7 shrink-0" />
                <blockquote className="text-foreground/90 text-sm leading-relaxed">
                  &ldquo;{t(`items.${key}.quote`)}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-center gap-3">
                  <div className="from-primary to-primary/60 inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white shadow-sm">
                    {initials(name)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{name}</div>
                    <div className="text-muted-foreground text-xs">
                      {t(`items.${key}.role`)}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
