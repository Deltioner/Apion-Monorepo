import { setRequestLocale, getTranslations } from "next-intl/server";
import { Clock, Mail, MapPin } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.hero" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          <aside className="space-y-6 md:pt-2">
            <div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                <MapPin className="size-3.5" />
                {t("info.officeTitle")}
              </div>
              <div className="mt-1 text-sm font-medium">
                {t("info.officeLine")}
              </div>
            </div>

            <div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                <Mail className="size-3.5" />
                {t("info.emailLabel")}
              </div>
              <a
                href="mailto:hello@apion.tech"
                className="mt-1 block text-sm font-medium hover:underline"
              >
                hello@apion.tech
              </a>
            </div>

            <div>
              <div className="text-muted-foreground flex items-center gap-2 text-xs font-medium uppercase tracking-wide">
                <Clock className="size-3.5" />
                {t("info.responseLabel")}
              </div>
              <div className="mt-1 text-sm font-medium">
                {t("info.responseValue")}
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
