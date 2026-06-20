import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config (shared by proxy, navigation and request config).
 *
 * - Czech is the default locale and serves prefix-free URLs (`/`, `/gallery/family`).
 * - English lives under `/en` (`localePrefix: "as-needed"`).
 * - Browser detection lives in `src/proxy.ts`: Czech-preferring browsers get `cs`,
 *   everyone else gets `en`.
 */
export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
