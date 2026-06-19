import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getCategorySlugs } from "@/lib/gallery";

// Static date for deterministic builds — update on major content changes.
const LAST_MODIFIED = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const categorySlugs = getCategorySlugs();

  const categoryEntries: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${site.url}/galerie/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: site.url,
      lastModified: LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryEntries,
  ];
}
