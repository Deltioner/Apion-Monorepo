import { setRequestLocale, getTranslations } from "next-intl/server";

import { services } from "@/content/services";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ClosingCta } from "@/components/home/closing-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.hero" });
  return { title: t("title") };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage");
  const tItems = await getTranslations("Services.items");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section>
        <div className="divide-border space-y-16 md:space-y-24">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOdd = i % 2 === 1;
            return (
              <div
                key={service.key}
                id={service.key}
                className="grid scroll-mt-24 grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={isOdd ? "md:order-2" : ""}>
                  <div className="bg-primary/10 text-primary inline-flex size-12 items-center justify-center rounded-xl">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {tItems(`${service.key}.title`)}
                  </h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">
                    {tItems(`${service.key}.description`)}
                  </p>
                </div>
                <div
                  className={
                    "from-primary/15 via-primary/5 ring-primary/10 relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br to-transparent ring-1 " +
                    (isOdd ? "md:order-1" : "")
                  }
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.5),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_60%)]"
                  />
                  <div className="text-primary/20 absolute inset-0 flex items-center justify-center">
                    <Icon strokeWidth={1} className="size-40" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
