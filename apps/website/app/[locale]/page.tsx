import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/hero";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { StatsSection } from "@/components/home/stats-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { CapabilitiesBento } from "@/components/home/capabilities-bento";
import { ProcessSection } from "@/components/home/process-section";
import { ProjectsPreview } from "@/components/home/projects-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
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
      <PartnersMarquee />
      <StatsSection />
      <ServicesPreview />
      <CapabilitiesBento />
      <ProcessSection />
      <ProjectsPreview />
      <TestimonialsSection />
      <FaqSection />
      <ClosingCta />
    </>
  );
}
