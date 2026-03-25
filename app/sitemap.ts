import type { MetadataRoute } from "next";
import { FLEET_SLUGS } from "@/lib/fleet-data";
import { BASE_URL, LOCALES, DEFAULT_LOCALE } from "@/lib/seo";

const STATIC_PAGES = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.7 },
  {
    path: "/permit-package",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
];

function sitemapLanguages(path: string) {
  return Object.fromEntries([
    ...LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
    ["x-default", `${BASE_URL}/${DEFAULT_LOCALE}${path}`],
  ]);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages: sitemapLanguages(page.path) },
      });
    }
  }

  for (const slug of FLEET_SLUGS) {
    const path = `/fleet/${slug}`;
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: { languages: sitemapLanguages(path) },
      });
    }
  }

  return entries;
}
