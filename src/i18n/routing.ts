import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config (shared by navigation, middleware, and request config).
 *
 * - `localePrefix: "as-needed"` — the default locale (`cs`) is served unprefixed
 *   at `/`; only `en` carries a `/en` prefix. Enforced by `src/middleware.ts`
 *   (a request to `/cs/...` redirects to the unprefixed path).
 */
export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
