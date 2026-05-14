"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@repo/ui/components/button";

import { Link } from "@/i18n/navigation";
import { Section } from "@/components/section";

export function ClosingCta() {
  const t = useTranslations("Home.cta");

  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="from-primary to-primary/85 relative overflow-hidden rounded-2xl bg-gradient-to-br p-10 text-center text-white shadow-xl sm:p-16"
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.18),_transparent_55%)]"
        />
        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base opacity-90 sm:text-lg">
            {t("subtitle")}
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">{t("button")}</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
