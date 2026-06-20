import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { categories, getPhotosByCategory } from "@/lib/gallery";
import { buildMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });

  return buildMetadata({
    locale: locale as Locale,
    title: t("allHeading"),
    description: t("allIntro"),
    path: "/gallery",
  });
}

/**
 * Full gallery — every photo, grouped by category, top to bottom in one
 * scrollable page. Each category renders its own GalleryGrid (and thus its own
 * lightbox, scoped to that category's photos). Linked from the Hero CTA.
 */
export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("gallery");
  // Resolve photos for every category upfront (cannot await inside the .map render).
  const photosByCat = await Promise.all(categories.map((cat) => getPhotosByCategory(cat.slug)));

  // Pair each category with its photos and drop the empty ones.
  const sections = categories
    .map((cat, index) => ({ slug: cat.slug, photos: photosByCat[index] }))
    .filter((section) => section.photos.length > 0);

  return (
    <>
      {/* Page header — extra top padding clears the fixed header */}
      <div className="pt-28 md:pt-36">
        <Container>
          <Stack gap="md" className="py-12 md:py-16">
            <Stack gap="sm">
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <Heading as="h1" size="xl">
                {t("allHeading")}
              </Heading>
              <Text tone="muted" className="max-w-lg">
                {t("allIntro")}
              </Text>
            </Stack>
          </Stack>
        </Container>
      </div>

      {/* One full-resolution grid per category; id anchors allow deep-linking. */}
      {sections.map(({ slug, photos }) => (
        <Section
          key={slug}
          id={slug}
          spacing="compact"
          className="border-border scroll-mt-24 border-t"
        >
          <Container>
            <Stack gap="lg">
              <Stack gap="xs">
                <Heading as="h2" size="md">
                  {t(`categories.${slug}.title`)}
                </Heading>
                <Text tone="muted" size="sm" className="max-w-md">
                  {t(`categories.${slug}.description`)}
                </Text>
              </Stack>
              <GalleryGrid photos={photos} />
            </Stack>
          </Container>
        </Section>
      ))}
    </>
  );
}
