import { site } from "@/lib/site";

/**
 * JSON-LD structured data for LocalBusiness / ProfessionalService.
 * ProfessionalService is a sub-type of LocalBusiness and the appropriate
 * schema.org type for a photographer offering paid services.
 * Rendered as a <script> in <body> (inside root layout).
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/opengraph-image`,
    priceRange: "$$",
    areaServed: [
      {
        "@type": "City",
        name: "Plzeň",
      },
      {
        "@type": "AdministrativeArea",
        name: "Plzeňský kraj",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Plzeň",
      addressCountry: "CZ",
    },
    sameAs: [site.instagram],
    knowsAbout: ["Rodinné focení", "Focení nemovitostí", "Krajinářská fotografie"],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Rodinné focení",
        description:
          "Autentické rodinné focení v exteriéru nebo interiéru. Přirozené světlo, spontánní okamžiky. Dodání online galerie do 48 hodin.",
        priceCurrency: "CZK",
        price: "1800",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "CZK",
          minPrice: "1800",
        },
        areaServed: {
          "@type": "City",
          name: "Plzeň",
        },
      },
      {
        "@type": "Offer",
        name: "Focení nemovitostí — byt",
        description:
          "Profesionální fotografie bytu pro inzerci nebo prezentaci. 20–30 upravených fotek, dodání do 48 hodin.",
        priceCurrency: "CZK",
        price: "1500",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "CZK",
          minPrice: "1500",
        },
        areaServed: {
          "@type": "City",
          name: "Plzeň",
        },
      },
      {
        "@type": "Offer",
        name: "Focení nemovitostí — dům",
        description:
          "Profesionální fotografie domu nebo větší nemovitosti. Možnost dronového záběru jako příplatek.",
        priceCurrency: "CZK",
        price: "2500",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "CZK",
          minPrice: "2500",
        },
        areaServed: {
          "@type": "City",
          name: "Plzeň",
        },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
