# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

Photographer portfolio + lead-gen site for Plzeň (rodina / reality / krajiny). MVP implemented;
see `docs/plans/01-implementacni-plan.md` for phases (✅ = done). Deferred: CMS (Sanity), blog.

## Stack & conventions

- **Next.js 16** (App Router) + React 19 + TypeScript, **Tailwind v4** (CSS-first tokens in
  `src/app/globals.css` `@theme` — no `tailwind.config`), **GSAP** (`@gsap/react` `useGSAP`).
- Content lives in `src/lib/`: `site.ts` (name/contact/nav), `content.ts` (sections/pricing/FAQ),
  `gallery.ts` + generated `gallery.generated.ts`. Edit data there, not in components.
- UI primitives in `src/components/ui/`; sections in `src/components/sections/`; animations in
  `src/components/animations/` (all client, `matchMedia` reduced-motion guarded).
- Gallery photos: drop into `gallery-source/<cat>/` and run `npm run gallery`.
- Contact form: `src/app/api/contact/route.ts` (Resend, env-gated) + shared `contact-schema.ts`.

## Commands

`npm run dev` · `build` · `lint` · `typecheck` · `format` · `gallery`. Green = lint + typecheck +
build all pass.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
