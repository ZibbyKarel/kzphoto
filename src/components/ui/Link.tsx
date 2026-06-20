import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type Tone = "nav" | "subtle";

const tones: Record<Tone, string> = {
  // Footer / navigation links — muted, brighten to foreground on hover.
  nav: "text-muted hover:text-foreground transition-colors",
  // In-body links (e.g. direct contact details) — foreground, accent on hover.
  subtle: "text-foreground hover:text-accent transition-colors",
};

/** Shared inline-link styling — reuse on a plain <a> (mailto/tel/external). */
export function textLinkClasses(tone: Tone = "nav", className?: string) {
  return cn(tones[tone], className);
}

type TextLinkProps = React.ComponentProps<typeof Link> & {
  tone?: Tone;
};

/** A Next.js link styled as an inline text link. */
export function TextLink({ tone, className, ...props }: TextLinkProps) {
  return <Link className={textLinkClasses(tone, className)} {...props} />;
}
