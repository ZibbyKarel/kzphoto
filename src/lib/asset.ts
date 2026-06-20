/**
 * Prefix a site-absolute asset path with the configured `basePath`.
 *
 * Why this exists: when the site is served under a sub-path (GitHub *project*
 * Pages → `<user>.github.io/<repo>/`), Next.js prepends `basePath` to its own
 * `_next/*` assets automatically — but NOT to image `src` values when
 * `images.unoptimized` is set (required for static export). Plain `<img>` tags
 * get no help either. So any local image referenced by a literal path
 * (`/logo.png`, `/gallery/...`) 404s on Pages unless we prepend `basePath`
 * ourselves.
 *
 * Mirrors the normalisation in next.config.ts: a lone "/" → "".
 * Only touches site-absolute paths ("/..."); leaves data URIs and absolute
 * URLs (e.g. Sanity CDN https links) untouched.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath;

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
