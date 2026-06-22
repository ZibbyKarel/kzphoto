import { getTranslations } from "next-intl/server";
import { pricingPackages } from "@/lib/content";
import { site } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

/**
 * JSON-LD structured data for LocalBusiness / ProfessionalService.
 * ProfessionalService is a sub-type of LocalBusiness and the appropriate
 * schema.org type for a photographer offering paid services.
 * Names/descriptions are pulled from the localized pricing messages; prices come
 * from the single source of truth in `src/lib/content.ts`.
 */
const OFFERS = pricingPackages.map((p) => ({ id: p.id, price: String(p.price) }));

export async function StructuredData({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pricing" });
  const tm = await getTranslations({ locale, namespace: "meta" });

  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: tm("description"),
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image`,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Plzeň" },
      { "@type": "AdministrativeArea", name: "Plzeňský kraj" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Plzeň",
      addressCountry: "CZ",
    },
    sameAs: [site.instagram],
    knowsAbout: OFFERS.map((o) => t(`packages.${o.id}.title`)),
    makesOffer: OFFERS.map((o) => ({
      "@type": "Offer",
      name: t(`packages.${o.id}.title`),
      description: t(`packages.${o.id}.description`),
      priceCurrency: "CZK",
      price: o.price,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "CZK",
        minPrice: o.price,
      },
      areaServed: {
        "@type": "City",
        name: "Plzeň",
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
