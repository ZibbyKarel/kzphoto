import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { ButtonLink } from "@/components/ui/Button";
import { categories, getPhotosByCategory } from "@/lib/gallery";
import { Reveal } from "@/components/animations/Reveal";
import { GalleryPreviewGrid } from "./GalleryPreviewGrid";

/** Number of preview thumbnails shown per category on the homepage. */
const PREVIEW_COUNT = 4;

/**
 * Homepage gallery preview section — shows 3 categories with 4 preview images each
 * and a link to the full category page.
 * Server component — Reveal client wrappers are fine inside RSC.
 */
export async function GalleryPreview() {
  const t = await getTranslations("gallery");
  // Resolve the full photo set for each category upfront (cannot await inside the
  // .map render). The grid renders only the first PREVIEW_COUNT as thumbnails but
  // feeds the complete set to the lightbox, so fullscreen browsing covers the
  // whole category — not just the previews.
  const photosByCat = await Promise.all(categories.map((cat) => getPhotosByCategory(cat.slug)));

  // Pair each category with its photos and drop the empty ones — a category
  // with no photos yet (e.g. a newly added one) would otherwise render a broken
  // heading with an empty grid.
  const blocks = categories
    .map((cat, index) => ({ cat, photos: photosByCat[index] }))
    .filter((block) => block.photos.length > 0);

  return (
    <Section id="gallery" className="border-border scroll-mt-24 border-t">
      <Container>
        <Stack gap="xl">
          {/* Section header */}
          <div className="max-w-xl">
            <Stack gap="sm">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <Heading as="h2" size="xl">
                {t("previewHeading")}
              </Heading>
            </Stack>
          </div>

          {/* Category blocks — Reveal becomes the grid, children are category blocks */}
          <Reveal stagger={0.12} className="grid w-full grid-cols-1 gap-16 md:gap-20">
            {blocks.map(({ cat, photos }) => {
              return (
                <div key={cat.slug}>
                  <Stack gap="lg">
                    {/* Category title + description */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <Stack gap="xs">
                        <Heading as="h3" size="md">
                          {t(`categories.${cat.slug}.title`)}
                        </Heading>
                        <Text tone="muted" size="sm" className="max-w-md">
                          {t(`categories.${cat.slug}.description`)}
                        </Text>
                      </Stack>
                      <ButtonLink
                        href={`/gallery#${cat.slug}`}
                        variant="ghost"
                        className="shrink-0 self-start sm:self-auto"
                      >
                        {t("viewAll")}
                      </ButtonLink>
                    </div>

                    {/* Preview grid — shows the first PREVIEW_COUNT thumbnails; the
                     * lightbox browses the whole category. */}
                    <GalleryPreviewGrid photos={photos} previewCount={PREVIEW_COUNT} />
                  </Stack>
                </div>
              );
            })}
          </Reveal>
        </Stack>
      </Container>
    </Section>
  );
}
