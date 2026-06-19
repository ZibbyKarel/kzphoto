# photo-web

Portfolio a akviziční web pro fotografa (Plzeň a okolí) — rodinné focení, reality, krajiny.
Designově laděné tmavé editoriální téma s plynulými scroll animacemi (GSAP), galerií rozdělenou
do kategorií a funkčním kontaktním formulářem.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokeny v `globals.css`)
- **GSAP + ScrollTrigger** (`@gsap/react`) — scroll animace, reduced-motion fallback
- **Resend** + **zod** — kontaktní formulář (API route)
- **next/image** + `sharp` — optimalizovaná galerie
- **Vercel** — hosting, Analytics, Speed Insights

## Vývoj

```bash
npm install
npm run dev          # http://localhost:3000
```

Další skripty:

```bash
npm run build        # produkční build
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint
npm run format       # Prettier
npm run gallery      # vygeneruje/zpracuje fotky galerie + manifest
```

## Přizpůsobení obsahu

| Co | Kde |
| --- | --- |
| Jméno, kontakt, Instagram, nav | `src/lib/site.ts` |
| Texty sekcí, ceník, reference, FAQ | `src/lib/content.ts` |
| Kategorie galerie a popisy | `src/lib/gallery.ts` |
| Design tokeny (barvy, typografie) | `src/app/globals.css` (`@theme`) |
| Strukturovaná data (SEO) | `src/components/seo/StructuredData.tsx` |

> **TODO před spuštěním:** v `src/lib/site.ts` jsou placeholdery (`Jméno Fotografa`,
> `example.cz`, kontakty) — nahraď je skutečnými údaji.

## Fotky do galerie

Galerie je řízená manifestem `src/lib/gallery.generated.ts`, který generuje skript
`scripts/generate-gallery.mjs`.

**Reálné fotky:** vlož soubory (`.jpg/.jpeg/.png`) do `gallery-source/<kategorie>/`
(kategorie: `rodina`, `reality`, `priroda`) a spusť:

```bash
npm run gallery
```

Skript fotky zmenší (max 2000 px), uloží do `public/gallery/<kategorie>/`, vygeneruje blur
placeholdery a přepíše manifest. Bez zdrojových fotek vygeneruje dočasné tonální placeholdery.

> Po nahrazení placeholderů zkontroluj `alt` popisy v manifestu / skriptu — jsou důležité pro SEO.

## Kontaktní formulář (Resend)

Formulář odesílá přes [Resend](https://resend.com). Lokálně i v produkci nastav proměnné
(viz `.env.example`):

```
RESEND_API_KEY=        # API klíč z Resend
CONTACT_TO_EMAIL=      # kam chodí poptávky
CONTACT_FROM_EMAIL=    # odesílací adresa na OVĚŘENÉ doméně v Resend
```

Bez `RESEND_API_KEY` se web normálně sestaví i běží; formulář jen vrátí přívětivou hlášku, ať
návštěvník napíše přímo na e-mail.

## Nasazení na Vercel

1. Napoj GitHub repo na [Vercel](https://vercel.com/new) (Next.js se detekuje automaticky).
2. V **Project Settings → Environment Variables** nastav `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL`.
3. V Resend ověř odesílací **doménu** (DNS záznamy) — `CONTACT_FROM_EMAIL` musí být na ní.
4. Po prvním deployi přidej vlastní **doménu** (Project → Domains) a v `src/lib/site.ts` nastav
   `url` na produkční doménu (kvůli canonical URL, sitemap a OG).
5. Analytics a Speed Insights se aktivují automaticky (komponenty jsou v `layout.tsx`); v
   dashboardu je jen zapni.
6. Odešli `sitemap.xml` do [Google Search Console](https://search.google.com/search-console).

## Stav implementace

Viz `docs/plans/01-implementacni-plan.md` — fáze označené ✅ jsou hotové.
Odloženo na později: CMS (Sanity, F6) a blog (F9).
