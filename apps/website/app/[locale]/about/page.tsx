import { setRequestLocale, getTranslations } from "next-intl/server";
import { MapPin, Heart, Rocket, Handshake } from "lucide-react";

import { Card, CardContent } from "@repo/ui/components/card";

import { PageHero } from "@/components/page-hero";
import { Section, SectionTitle } from "@/components/section";
import { ClosingCta } from "@/components/home/closing-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.hero" });
  return { title: t("title") };
}

const APPROACH_ITEMS = [
  { key: "listen", icon: Heart },
  { key: "ship", icon: Rocket },
  { key: "stay", icon: Handshake },
] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <SectionTitle>{t("mission.title")}</SectionTitle>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {t("mission.body")}
            </p>
          </div>
          <div className="bg-primary/5 ring-primary/10 relative overflow-hidden rounded-2xl p-8 ring-1">
            <MapPin className="text-primary size-6" />
            <h3 className="mt-4 text-xl font-semibold">{t("hq.title")}</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {t("hq.body")}
            </p>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionTitle>{t("approach.title")}</SectionTitle>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {APPROACH_ITEMS.map(({ key, icon: Icon }) => (
            <Card key={key} className="h-full">
              <CardContent className="flex h-full flex-col gap-3 px-6">
                <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {t(`approach.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`approach.items.${key}.body`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
