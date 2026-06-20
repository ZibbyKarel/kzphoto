import "../globals.css";

/**
 * Standalone root layout for the embedded Sanity Studio (`/studio`).
 *
 * The localized site lives under `(site)/[locale]`; the Studio is an admin-only
 * route outside the locale tree, so it needs its own `<html>`/`<body>` and no
 * site chrome (no header/footer/analytics).
 */
export default function StudioRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
