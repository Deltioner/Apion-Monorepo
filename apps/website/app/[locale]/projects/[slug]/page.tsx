import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import { Badge } from "@repo/ui/components/badge";
import { Separator } from "@repo/ui/components/separator";

import { Link } from "@/i18n/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { Section } from "@/components/section";
import { ClosingCta } from "@/components/home/closing-cta";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const tCase = await getTranslations({
    locale,
    namespace: `Projects.cases.${slug}`,
  });
  return {
    title: project.client,
    description: tCase("summary"),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations("ProjectsPage");
  const tProj = await getTranslations("Projects");
  const tCase = await getTranslations(`Projects.cases.${slug}`);
  const results = tCase.raw("results") as string[];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background: `linear-gradient(135deg, ${project.accentFrom}, ${project.accentTo})`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.25),_transparent_60%)]"
        />
        <div className="mx-auto max-w-6xl px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-white"
          >
            <ArrowLeft className="size-4 rtl:rotate-180" />
            {t("backToProjects")}
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/15 text-white hover:bg-white/15">
              {tCase("industry")}
            </Badge>
            <Badge
              variant="outline"
              className="border-white/30 text-white/90"
            >
              {project.year}
            </Badge>
          </div>
          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {project.client}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-base text-white/90 sm:text-lg">
            {tCase("summary")}
          </p>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/25"
            >
              {t("viewLive")}
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>
      </section>

      {project.image ? (
        <Section>
          <div className="relative -mt-4 overflow-hidden rounded-2xl border shadow-xl">
            <div className="relative aspect-[16/9] w-full bg-muted">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover object-top"
                unoptimized
              />
            </div>
          </div>
        </Section>
      ) : null}

      <Section>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">{t("summary")}</h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {tCase("description")}
            </p>

            <h2 className="mt-12 text-xl font-semibold">{tProj("results")}</h2>
            <ul className="mt-4 space-y-3">
              {results.map((result) => (
                <li key={result} className="flex items-start gap-3">
                  <span className="bg-primary/10 text-primary mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full">
                    <Check className="size-3" />
                  </span>
                  <span className="text-sm leading-relaxed">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div>
              <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                {tProj("industry")}
              </div>
              <div className="mt-1 text-sm font-medium">{tCase("industry")}</div>
            </div>
            <Separator />
            <div>
              <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                {tProj("year")}
              </div>
              <div className="mt-1 text-sm font-medium">{project.year}</div>
            </div>
            <Separator />
            <div>
              <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                {tProj("stack")}
              </div>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" className="text-xs font-normal">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
