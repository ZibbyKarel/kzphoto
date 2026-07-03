# photo-web

Portfolio web pro fotografa (Plzeň a okolí). Next.js 16 (App Router), nasazený na **Vercel**
(git integrace — build a deploy proběhnou automaticky po pushi do `main`, žádný vlastní
workflow soubor).

## Skripty

```bash
npm install          # první instalace závislostí

npm run dev          # vývojový server – http://localhost:3000
npm run build        # produkční build
npm run gallery      # zpracuje fotky galerie + vygeneruje manifest (viz níže)

npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (zápis)
```

Před nasazením má projít „zeleně": `npm run lint && npm run typecheck && npm run build`.

### Fotky do galerie

Vlož `.jpg/.jpeg/.png` do `gallery-source/<kategorie>/` (kategorie: `family`,
`weddings-events`, `drone`, `other`) a spusť `npm run gallery`. Skript fotky zmenší, uloží do
`public/gallery/<kategorie>/`, vytvoří blur placeholdery a přepíše `src/lib/gallery.generated.ts`.

### Kontaktní formulář

Formulář odesílá přímo z prohlížeče přes [Web3Forms](https://web3forms.com). Klíč
`NEXT_PUBLIC_WEB3FORMS_KEY` je lokálně v `.env`, na Vercelu se nastavuje jako project env var
(Settings → Environment Variables). Je veřejný (inlinuje se do bundlu), takže to není tajemství.

### i18n routing

`cs` (výchozí locale) běží bez prefixu (`/`, `/gallery/family`); `en` má prefix (`/en`,
`/en/gallery/family`) — `localePrefix: "as-needed"` v `src/i18n/routing.ts`. Prefixování a
přesměrování `/cs/...` → bez prefixu řeší `src/middleware.ts` (next-intl middleware).

## Nasazení / doména

Web běží na `https://kzphoto.cz/` (Vercel, custom doména). Environment variables (Web3Forms
klíč, případně Sanity) se nastavují v nastavení Vercel projektu, ne v repozitáři. Při změně
domény stačí upravit `src/lib/site.ts` → `url` a přenastavit doménu ve Vercel projektu.
