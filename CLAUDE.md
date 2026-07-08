# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Photographer portfolio + lead-gen site for Plzeň. Single-page site (hero / about / process /
gallery preview / pricing / testimonials / FAQ / contact) + standalone gallery pages per category.
Categories: `family`, `weddings-events`, `drone`, `other`. See `docs/plans/01-implementacni-plan.md`
for phases. Deferred: blog.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript. Deployed to **Vercel** (not a static
  export — see Deployment below).
- **Tailwind v4** — CSS-first tokens in `src/app/globals.css` `@theme`; no `tailwind.config`.
- **next-intl** for i18n. **GSAP** (`@gsap/react` `useGSAP`) for animations.
- **Sanity** as an *optional* CMS layer (see below). **Web3Forms** for the contact form.

## Commands

`npm run dev` · `build` · `lint` · `typecheck` · `format` · `gallery`. Green = lint + typecheck +
build all pass (run all three before declaring done).

## Architecture

### i18n — prefix-as-needed, via proxy
- Routing config: `src/i18n/routing.ts` (`localePrefix: "as-needed"`, locales `cs`/`en`, default
  `cs`). The default locale (`cs`) is served unprefixed at `/`; `en` carries `/en`. Enforced by
  `src/proxy.ts` (next-intl's `createMiddleware`), which also redirects `/cs/...` to the
  unprefixed path.
- Routes live under `src/app/(site)/[locale]/`, which is the sole top-level route group (its
  `layout.tsx` is the app's root `<html>` layout).
- Server pages must call `setRequestLocale(locale)` (see `[locale]/page.tsx`).
- **All display copy lives in `messages/{cs,en}.json`** and is read via `useTranslations` /
  `getTranslations`. `src/lib/` holds only locale-*independent* structure (ids, ordering,
  highlight flags, category slugs) — e.g. `content.ts` defines pricing package order while the
  text sits in `messages` under `pricing.packages.<id>`. Edit copy in `messages/`, not components.
- `src/lib/site.ts` is the single source of truth for brand facts (name, contact, nav, canonical
  `url`).

### Content / data layer with Sanity fallback
- The data layer (`src/lib/gallery.ts`, `getTestimonials` in `content.ts`) reads from **Sanity when
  configured, else static content** — gated on `isSanityConfigured` (`src/sanity/env.ts`, true iff
  `NEXT_PUBLIC_SANITY_PROJECT_ID` is set). When unset, the Sanity client is never created and
  everything runs on static data. `src/sanity/data.ts` maps Sanity responses to the *exact same*
  shapes (`GalleryPhoto`, `Testimonial`) so components are agnostic to the source.
- Sanity schemas: `src/sanity/schemas/`. Studio route was removed for static export (recoverable
  from git).

### Gallery pipeline
- Drop `.jpg/.jpeg/.png` into `gallery-source/<category>/` and run `npm run gallery`
  (`scripts/generate-gallery.mjs`): resizes via sharp into `public/gallery/<category>/`, generates
  blur placeholders, and rewrites `src/lib/gallery.generated.ts` (do not hand-edit that file).
- Photos are served largest-first (by pixel area).

### Components
- UI primitives in `src/components/ui/`; page sections in `src/components/sections/`; layout in
  `src/components/layout/`; animations in `src/components/animations/` (all client, `matchMedia`
  reduced-motion guarded).

### Contact form
- Client-side submit to **Web3Forms** (`NEXT_PUBLIC_WEB3FORMS_KEY`, public by design) in
  `src/hooks/useContactForm.ts`; validation via shared `src/lib/contact-schema.ts` (zod). Has a
  honeypot (`website` field). No server — static-export friendly.

### Deployment — Vercel
- Deployed via Vercel's git integration (build + deploy on push to `main`); no GitHub Actions
  workflow. Env vars (`NEXT_PUBLIC_WEB3FORMS_KEY`, optional Sanity vars) live in the Vercel
  project's Environment Variables settings, not in the repo.
- No `output: "export"`, no `basePath`, no `images.unoptimized` — Next's Image Optimization and
  the proxy run normally. `trailingSlash: true` is kept for URL continuity with the site's
  previous GitHub Pages export.
- Custom domain `kzphoto.cz` is configured on the Vercel project; `site.ts` `url` must match it.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
