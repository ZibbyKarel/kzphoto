import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Locale-redirect stub served at `/`.
 *
 * In a static export there is no middleware to negotiate the locale, so `/` is a
 * pre-rendered page that forwards the visitor:
 *   - a synchronous inline script picks `/cs` or `/en` from the browser language
 *     (Czech-preferring → cs, everyone else → en) before paint;
 *   - a `<meta http-equiv="refresh">` + visible link are the no-JS / crawler
 *     fallback, sending them to the default locale (`/cs`).
 *
 * `<meta>` / `<script>` rendered here are hoisted into `<head>` by React.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const { defaultLocale, locales } = routing;
const fallback = `/${defaultLocale}/`;

// Runs before paint: forward to the best-matching locale, else the default.
const redirectScript = `(function(){try{
var locales=${JSON.stringify(locales)},def=${JSON.stringify(defaultLocale)};
var langs=(navigator.languages&&navigator.languages.length)?navigator.languages:(navigator.language?[navigator.language]:[]);
var target=def;
if(langs.length){var first=String(langs[0]).toLowerCase();target=(first==="cs"||first.indexOf("cs-")===0)?"cs":"en";}
if(locales.indexOf(target)===-1)target=def;
location.replace("/"+target+"/");
}catch(e){location.replace(${JSON.stringify(fallback)});}})();`;

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${fallback}`} />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
        <a href={fallback}>Pokračovat / Continue →</a>
      </p>
    </>
  );
}
