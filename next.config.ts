import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Sub-path the site is served under (GitHub *project* Pages live at
// `<user>.github.io/<repo>/`). Injected via `NEXT_PUBLIC_BASE_PATH` by CI
// (from the configure-pages `base_path` output); empty locally / on a custom
// domain. A lone "/" (custom-domain root) is normalised to "" — Next rejects
// `basePath: "/"`.
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = rawBasePath === "/" ? "" : rawBasePath;

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` — deployable to any static host
  // (Netlify, Cloudflare Pages, GitHub Pages, S3, …). No Node server needed.
  output: "export",
  // Static export can't run the Image Optimization server — serve originals.
  images: {
    unoptimized: true,
  },
  // Emit directory-style URLs (`/cs/index.html`) so every host serves clean
  // paths without per-host rewrite rules.
  trailingSlash: true,
  // Prefix all routes/assets so the export works under the Pages sub-path.
  // Set manually here (not via the workflow's `static_site_generator: next`,
  // which writes a plugin-less `next.config.js` that shadows this file and
  // breaks next-intl during prerender).
  basePath,
};

export default withNextIntl(nextConfig);
