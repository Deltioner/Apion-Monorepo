"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Badge } from "@repo/ui/components/badge";

import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/content/projects";
import {
  Section,
  SectionEyebrow,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";
import { TiltCard } from "@/components/tilt-card";

export function ProjectsPreview() {
  const t = useTranslations("Home.projects");
  const featured = getFeaturedProjects(3);

  return (
    <Section className="bg-muted/30 max-w-none sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionEyebrow>{t("eyebrow")}</SectionEyebrow>
          <SectionTitle>{t("title")}</SectionTitle>
          <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <TiltCard className="h-full">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group bg-background block h-full overflow-hidden rounded-xl border transition-shadow hover:shadow-xl"
                >
                  <div
                    aria-hidden
                    className="relative aspect-[4/3] w-full overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25),_transparent_60%)]" />
                    <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
                      {project.year}
                    </div>
                  </div>
                  <div className="p-5">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {project.industry}
                    </Badge>
                    <h3 className="text-lg font-semibold">{project.client}</h3>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                      {project.summary}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/projects"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {t("viewAll")}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
