import type { Metadata } from "next";
import { site } from "@/lib/site";

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  /** Path relative to site root, e.g. "/gallery/family". Used for canonical URL. */
  path?: string;
};

/**
 * Helper for consistent per-page metadata with OpenGraph and Twitter defaults.
 * Root layout sets metadataBase and title.template, so passing a bare title here
 * is enough — Next.js applies the template automatically for the <title> tag.
 * OG title must be set explicitly (the template does NOT apply there).
 */
export function buildMetadata({ title, description, path }: BuildMetadataOptions = {}): Metadata {
  const resolvedDescription = description ?? site.description;
  const canonicalUrl = path ? `${site.url}${path}` : site.url;

  // Full display title for OG — the root title.template does NOT apply to openGraph.title,
  // so we must construct it explicitly here.
  const ogTitle = title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`;

  return {
    // Include title so the helper is the single source for both <title> (via template)
    // and og:title. Pass bare title — Next.js applies template "%s | site.name" to it.
    ...(title && { title }),
    ...(description && { description: resolvedDescription }),
    openGraph: {
      title: ogTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      siteName: site.name,
      locale: "cs_CZ",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: resolvedDescription,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
