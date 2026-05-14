import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { projects } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

const STATIC_PATHS = [
  "",
  "/about",
  "/services",
  "/projects",
  "/contact",
  "/privacy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path === "/contact" ? 0.8 : 0.6,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${project.slug}`,
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
