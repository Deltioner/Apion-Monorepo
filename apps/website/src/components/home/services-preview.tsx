"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import {
  Section,
  SectionEyebrow,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";
import { SpotlightCard } from "@/components/spotlight-card";

export function ServicesPreview() {
  const t = useTranslations("Home.services");
  const tItems = useTranslations("Services.items");

  return (
    <Section>
      <div className="max-w-3xl">
        <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
        <SectionTitle>{t("title")}</SectionTitle>
        <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <SpotlightCard className="bg-background hover:border-primary/30 group/card relative flex h-full flex-col gap-3 rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
                <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover/card:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {tItems(`${service.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tItems(`${service.key}.description`)}
                </p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10">
        <Link
          href="/services"
          className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          {t("viewAll")}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </Section>
  );
}
