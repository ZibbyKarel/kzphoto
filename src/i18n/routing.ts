import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config (shared by navigation and request config).
 *
 * - Every locale carries a prefix (`/cs`, `/en`) — required for a static export
 *   (`output: export`), where there is no middleware to serve the default locale
 *   prefix-free at `/`.
 * - The bare `/` is a small redirect stub (`src/app/(root)/page.tsx`) that detects
 *   the browser language client-side and forwards to `/cs` or `/en`.
 */
export const routing = defineRouting({
  locales: ["cs", "en"],
  defaultLocale: "cs",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
