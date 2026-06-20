import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

/**
 * Returns true only when Czech is the visitor's genuinely preferred language —
 * i.e. it appears in Accept-Language with a quality at least as high as any other
 * language. Everything else (incl. English, German, …) is treated as non-Czech.
 */
function prefersCzech(acceptLanguage: string): boolean {
  let bestCs = 0;
  let bestOther = 0;
  for (const part of acceptLanguage.split(",")) {
    const [tag, q] = part.trim().split(";q=");
    const quality = q ? parseFloat(q) : 1;
    const lang = tag.toLowerCase();
    if (lang === "cs" || lang.startsWith("cs-")) bestCs = Math.max(bestCs, quality);
    else if (lang !== "*") bestOther = Math.max(bestOther, quality);
  }
  return bestCs > 0 && bestCs >= bestOther;
}

/**
 * Next.js 16 proxy (formerly middleware). Wraps next-intl's locale negotiation:
 * Czech is the default unprefixed locale, but on a first visit (no NEXT_LOCALE
 * cookie, no locale prefix) a browser that does NOT prefer Czech is redirected to
 * the English (`/en`) variant. Requests without an Accept-Language header (e.g.
 * crawlers) fall through to the Czech default, keeping `/` as the canonical root.
 */
export default function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const hasCookie = request.cookies.has("NEXT_LOCALE");
  const hasLocalePrefix = routing.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );

  if (!hasCookie && !hasLocalePrefix) {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage && !prefersCzech(acceptLanguage)) {
      const url = request.nextUrl.clone();
      url.pathname = `/en${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intlProxy(request);
}

export const config = {
  // Skip API, Sanity Studio, Next internals and any file with an extension.
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};
