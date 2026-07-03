import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Keep directory-style URLs (`/gallery/family/`) — matches the URLs already
  // indexed from the GitHub Pages static export, avoiding SEO churn.
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
