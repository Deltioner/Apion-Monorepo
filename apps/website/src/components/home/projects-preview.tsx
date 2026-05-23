"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/content/projects";
import {
  Section,
  SectionEyebrow,
  SectionSubtitle,
  SectionTitle,
} from "@/components/section";
import { ProjectCard } from "@/components/project-card";

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
              <ProjectCard project={project} className="h-full" />
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
