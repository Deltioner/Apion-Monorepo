"use client";

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
  return (
    <TiltCard className={className}>
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
          <p className="text-muted-foreground mt-1 line-clamp-3 text-sm">
            {project.summary}
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}
