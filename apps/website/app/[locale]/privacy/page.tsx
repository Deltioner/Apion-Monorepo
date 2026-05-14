import { setRequestLocale, getTranslations } from "next-intl/server";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.privacy" });
  return { title: t("title") };
}

const SECTIONS = ["contact", "analytics", "rights"] as const;

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal.privacy");

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={t("title")}
        subtitle={t("intro")}
      />
      <Section className="max-w-3xl">
        <h2 className="text-xl font-semibold">{t("sectionsTitle")}</h2>
        <div className="mt-6 space-y-8">
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
