import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Draft CSP, Report-Only for now — accommodates GSAP, inline styles, the
// inline JSON-LD script, Vercel Analytics/Speed Insights, next/image, and
// the Web3Forms contact-form submission. Not enforced: switch the header
// name to `Content-Security-Policy` only once the report data confirms
// nothing legitimate is blocked.
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com https://va.vercel-scripts.com https://*.vercel-insights.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
].join("; ");

const nextConfig: NextConfig = {
  // Keep directory-style URLs (`/gallery/family/`) — matches the URLs already
  // indexed from the GitHub Pages static export, avoiding SEO churn.
  trailingSlash: true,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Content-Security-Policy-Report-Only", value: CSP_REPORT_ONLY },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
