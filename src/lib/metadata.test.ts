import { describe, expect, it } from "vitest";
import { ogLocale, localizedUrl, languageAlternates, buildMetadata } from "./metadata";
import { site } from "./site";

describe("ogLocale", () => {
  it("maps cs to cs_CZ", () => {
    expect(ogLocale("cs")).toBe("cs_CZ");
  });

  it("maps en to en_US", () => {
    expect(ogLocale("en")).toBe("en_US");
  });
});

describe("localizedUrl", () => {
  it("builds an unprefixed URL for the default locale (cs)", () => {
    expect(localizedUrl("cs", "/gallery/family")).toBe(`${site.url}/gallery/family/`);
  });

  it("builds a /en-prefixed URL for the non-default locale", () => {
    expect(localizedUrl("en", "/gallery/family")).toBe(`${site.url}/en/gallery/family/`);
  });

  it("appends a trailing slash for the home page (empty path)", () => {
    expect(localizedUrl("cs", "")).toBe(`${site.url}/`);
    expect(localizedUrl("en", "")).toBe(`${site.url}/en/`);
  });
});

describe("languageAlternates", () => {
  it("includes x-default pointing at the default locale, plus every locale", () => {
    const alternates = languageAlternates("/gallery/family");

    expect(alternates["x-default"]).toBe(`${site.url}/gallery/family/`);
    expect(alternates.cs).toBe(`${site.url}/gallery/family/`);
    expect(alternates.en).toBe(`${site.url}/en/gallery/family/`);
  });
});

describe("buildMetadata", () => {
  it("builds locale-aware canonical + OG/Twitter metadata for cs", () => {
    const metadata = buildMetadata({
      locale: "cs",
      title: "Rodinné focení",
      description: "Popis",
      path: "/gallery/family",
    });

    expect(metadata.title).toBe("Rodinné focení");
    expect(metadata.alternates?.canonical).toBe(`${site.url}/gallery/family/`);
    expect(metadata.openGraph?.url).toBe(`${site.url}/gallery/family/`);
    expect(metadata.openGraph?.locale).toBe("cs_CZ");
    expect(metadata.openGraph?.title).toBe(`Rodinné focení | ${site.name}`);
  });

  it("builds locale-aware canonical + OG/Twitter metadata for en", () => {
    const metadata = buildMetadata({
      locale: "en",
      title: "Family session",
      description: "Description",
      path: "/gallery/family",
    });

    expect(metadata.alternates?.canonical).toBe(`${site.url}/en/gallery/family/`);
    expect(metadata.openGraph?.url).toBe(`${site.url}/en/gallery/family/`);
    expect(metadata.openGraph?.locale).toBe("en_US");
  });
});
