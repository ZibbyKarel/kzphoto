import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

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
};

export default withNextIntl(nextConfig);
