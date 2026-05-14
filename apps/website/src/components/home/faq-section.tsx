"use client";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion";

import {
  Section,
  SectionEyebrow,
  SectionTitle,
} from "@/components/section";

const FAQ_KEYS = [
  "pricing",
  "timeline",
  "languages",
  "ownership",
  "stack",
  "support",
] as const;

export function FaqSection() {
  const t = useTranslations("Faq");

  return (
    <Section className="bg-muted/30 max-w-none sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <SectionEyebrow className="mb-3">{t("eyebrow")}</SectionEyebrow>
          <SectionTitle>{t("title")}</SectionTitle>
        </div>
        <Accordion type="single" collapsible className="bg-background mt-10 rounded-xl border px-2 sm:px-4">
          {FAQ_KEYS.map((key) => (
            <AccordionItem key={key} value={key} className="px-2 sm:px-4">
              <AccordionTrigger className="text-left text-base font-medium">
                {t(`items.${key}.q`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {t(`items.${key}.a`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
