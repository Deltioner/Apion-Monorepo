import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.terms" });
  return { title: t("title") };
}

const SECTIONS = ["scope", "ip", "liability"] as const;

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.terms");

  return (
    <>
      <PageHero eyebrow="Legal" title={t("title")} subtitle={t("intro")} />
      <Section className="max-w-3xl">
        <div className="space-y-8">
          {SECTIONS.map((key) => (
            <div key={key}>
              <h3 className="text-base font-semibold">
                {t(`sections.${key}.title`)}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t(`sections.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mt-12 text-xs">
          {t("lastUpdated")}: 2026-05-10
        </p>
      </Section>
    </>
  );
}
