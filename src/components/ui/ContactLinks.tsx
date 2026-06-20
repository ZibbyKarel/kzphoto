import { textLinkClasses } from "@/components/ui/Link";
import { site } from "@/lib/site";

type Tone = "nav" | "subtle";

/**
 * The direct-contact triple (email / phone / Instagram) shared by the Footer
 * and the Contact section. Renders a fragment of three styled <a> elements so
 * the caller controls layout (flex column, Stack, etc.).
 */
export function ContactLinks({ tone = "nav", className }: { tone?: Tone; className?: string }) {
  const linkClass = textLinkClasses(tone, className);
  return (
    <>
      <a href={`mailto:${site.email}`} className={linkClass}>
        {site.email}
      </a>
      <a href={site.phoneHref} className={linkClass}>
        {site.phone}
      </a>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Instagram {site.instagramHandle}
      </a>
    </>
  );
}
