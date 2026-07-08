import { defineConfig, devices } from "@playwright/test";

/**
 * e2e config — drives the app in a real browser against the Next.js dev
 * server. Kept minimal: single chromium project, local-only (no CI matrix)
 * since this repo has no CI test stage yet (Vercel builds only).
 */
export default defineConfig({
  testDir: "./e2e",
  // Single worker: the first navigation against the dev server triggers a
  // Turbopack compile that can exceed the default 30s action timeout when
  // multiple workers hit it at once.
  workers: 1,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    // Use "localhost", not "127.0.0.1": Next's dev server rejects
    // cross-origin requests from IPs not in `allowedDevOrigins` (only
    // "localhost" is allowed by default), which silently breaks client
    // hydration (no error is thrown — the page just never becomes
    // interactive) when driven from 127.0.0.1.
    baseURL: "http://localhost:3100",
    trace: "on-first-retry",
    actionTimeout: 15_000,
    // Pin the browser's Accept-Language to Czech so next-intl's middleware
    // (src/proxy.ts) resolves the default, unprefixed locale (`cs`) instead
    // of negotiating `/en` from the CI/host's language settings.
    locale: "cs-CZ",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --port 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
