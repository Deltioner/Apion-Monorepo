"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Badge } from "@repo/ui/components/badge";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { TiltCard } from "@/components/tilt-card";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const t = useTranslations(`Projects.cases.${project.slug}`);
  const cardClassName =
    "group bg-background block h-full overflow-hidden rounded-xl border transition-shadow";
  const content = (
    <>
      <div
        aria-hidden
        className="relative aspect-[4/3] w-full overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`,
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
          {project.year}
        </div>
      </div>
      <div className="p-5">
        <Badge variant="secondary" className="mb-2 text-xs">
          {t("industry")}
        </Badge>
        <h3 className="text-lg font-semibold">{project.client}</h3>
        <p className="text-muted-foreground mt-1 line-clamp-3 text-sm">
          {t("summary")}
        </p>
      </div>
    </>
  );

  if (project.linkDisabled) {
    return (
      <TiltCard className={className}>
        <div aria-disabled="true" className={cardClassName}>
          {content}
        </div>
      </TiltCard>
    );
  }

  return (
    <TiltCard className={className}>
      <Link
        href={`/projects/${project.slug}`}
        className={`${cardClassName} hover:shadow-xl`}
      >
        {content}
      </Link>
    </TiltCard>
  );
}
