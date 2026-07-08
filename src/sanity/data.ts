/**
 * Sanity data layer — reads photos and testimonials from Sanity.
 *
 * Call these functions ONLY when `isSanityConfigured === true`. They map the
 * Sanity response onto the EXACT SAME shapes used by the static content
 * (`GalleryPhoto`, `Testimonial`), so components work unchanged.
 */

import "server-only";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { urlFor } from "./image";
import { photosByCategoryQuery, testimonialsQuery } from "./queries";
import type { CategorySlug, GalleryPhoto } from "@/lib/gallery";
import type { Testimonial } from "@/lib/content";

type SanityPhoto = {
  id: string;
  alt: string | null;
  category: string | null;
  asset: {
    lqip: string | null;
    dimensions: { width: number; height: number } | null;
  } | null;
  image: SanityImageSource;
};

type SanityTestimonial = {
  id: string;
  name: string | null;
  role: string | null;
  quote: string | null;
};

/** Fetches a category's photos from Sanity and maps them onto `GalleryPhoto`. */
export async function fetchPhotosByCategory(category: CategorySlug): Promise<GalleryPhoto[]> {
  if (!client) return [];
  const rows = await client.fetch<SanityPhoto[]>(photosByCategoryQuery, { category });

  return rows.flatMap((row) => {
    const url = urlFor(row.image);
    const dims = row.asset?.dimensions;
    if (!url || !dims) return [];

    return [
      {
        category,
        src: url.auto("format").fit("max").url(),
        width: dims.width,
        height: dims.height,
        alt: row.alt ?? "",
        // LQIP is a base64 data URL → usable directly as blurDataURL.
        blurDataURL: row.asset?.lqip ?? "",
      },
    ];
  });
}

/** Fetches testimonials from Sanity and maps them onto `Testimonial` (quote → text). */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!client) return [];
  const rows = await client.fetch<SanityTestimonial[]>(testimonialsQuery, {});

  return rows.map((row) => ({
    id: row.id,
    name: row.name ?? "",
    role: row.role ?? "",
    text: row.quote ?? "",
  }));
}
