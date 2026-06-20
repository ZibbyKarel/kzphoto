/**
 * Standalone root layout for the `/` locale-redirect stub.
 *
 * The localized site lives under `(site)/[locale]` with its own `<html>`; this
 * group only renders the tiny redirect page at `/`, so it needs its own minimal
 * document shell.
 */
export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
