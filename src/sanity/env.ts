/**
 * Sanity prostředí (env) — centrální zdroj konfigurace.
 *
 * `isSanityConfigured` je hlavní přepínač fallbacku: když není nastaveno
 * `NEXT_PUBLIC_SANITY_PROJECT_ID`, celá datová vrstva čte statický obsah
 * a Sanity client se vůbec nevytváří.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Pevná verze API (nemění chování při změně data).
export const apiVersion = "2025-01-01";

/** Hlavní přepínač: je Sanity nakonfigurováno? Pokud ne → statický fallback. */
export const isSanityConfigured = Boolean(projectId);
