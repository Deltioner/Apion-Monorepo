import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/hero";
import { TechStack } from "@/components/home/tech-stack";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { CapabilitiesBento } from "@/components/home/capabilities-bento";
import { ProcessSection } from "@/components/home/process-section";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { FaqSection } from "@/components/home/faq-section";
import { ClosingCta } from "@/components/home/closing-cta";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TechStack />
      <StatsSection />
      <ServicesPreview />
      <CapabilitiesBento />
      <ProcessSection />
      <ProjectsPreview />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
