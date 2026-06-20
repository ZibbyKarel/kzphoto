# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Photographer portfolio + lead-gen site for Plzeň. Single-page site (hero / about / process /
gallery preview / pricing / testimonials / FAQ / contact) + standalone gallery pages per category.
Categories: `family`, `weddings-events`, `drone`, `other`. See `docs/plans/01-implementacni-plan.md`
for phases. Deferred: blog.

## Stack

- **Next.js 16** (App Router, **static export** `output: "export"` → `out/`) + React 19 + TypeScript.
- **Tailwind v4** — CSS-first tokens in `src/app/globals.css` `@theme`; no `tailwind.config`.
- **next-intl** for i18n. **GSAP** (`@gsap/react` `useGSAP`) for animations.
- **Sanity** as an *optional* CMS layer (see below). **Web3Forms** for the contact form.
  (`resend` is in package.json but unused — leftover.)

## Commands

`npm run dev` · `build` · `lint` · `typecheck` · `format` · `gallery`. Green = lint + typecheck +
build all pass (run all three before declaring done).

## Architecture

### i18n — prefix-always, no middleware
- Routing config: `src/i18n/routing.ts` (`localePrefix: "always"`, locales `cs`/`en`, default `cs`).
  Every locale carries a prefix (`/cs`, `/en`) — a static export has no middleware to serve the
  default locale prefix-free. The bare `/` is a client-side language-redirect stub
  (`src/app/(root)/page.tsx`).
- Routes live under `src/app/(site)/[locale]/`; `(root)` holds only the redirect stub.
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

### Deployment — GitHub Pages
- CI builds and deploys on push to `main` (`.github/workflows/nextjs.yml`).
- Served under a project-pages sub-path, so all routes/assets are prefixed via `basePath` in
  `next.config.ts`, fed by `NEXT_PUBLIC_BASE_PATH` (set in the workflow). Static asset URLs go
  through `withBasePath` (`src/lib/asset.ts`).
- Changing domain/repo: update `site.ts` `url` **and** the workflow's `NEXT_PUBLIC_BASE_PATH`
  (see README scenarios A/B). `images.unoptimized` + `trailingSlash` are required by the export.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
