import { cn } from "@/lib/cn";

/* Eyebrow — accent uppercase label above a section heading */
type EyebrowProps = React.ComponentProps<"p">;

export function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn("text-accent text-sm font-medium tracking-[0.2em] uppercase", className)}
      {...props}
    />
  );
}

/* Label — small uppercase meta label (contact blocks, badges, footer headings) */
type LabelTone = "faint" | "muted" | "accent";
type LabelSize = "xs" | "sm";

const labelTones: Record<LabelTone, string> = {
  faint: "text-faint",
  muted: "text-muted",
  accent: "text-accent",
};

const labelSizes: Record<LabelSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
};

type LabelProps = React.ComponentProps<"p"> & {
  tone?: LabelTone;
  size?: LabelSize;
};

export function Label({ tone = "faint", size = "xs", className, ...props }: LabelProps) {
  return (
    <p
      className={cn("tracking-[0.2em] uppercase", labelSizes[size], labelTones[tone], className)}
      {...props}
    />
  );
}

/* Heading — serif display headings */
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

type HeadingProps = React.ComponentProps<"h2"> & {
  as?: HeadingLevel;
  size?: keyof typeof headingSizes;
};

const headingSizes = {
  display: "text-display",
  xl: "text-4xl md:text-5xl",
  lg: "text-3xl md:text-4xl",
  md: "text-2xl md:text-3xl",
  sm: "text-xl md:text-2xl",
} as const;

export function Heading({ as = "h2", size = "lg", className, ...props }: HeadingProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-serif font-semibold tracking-tight text-balance",
        headingSizes[size],
        className,
      )}
      {...props}
    />
  );
}

/* Title — flat-size serif headings for cards and components (no responsive
 * step-up or text-balance; use Heading for display/section headings). */
type TitleLevel = "h3" | "h4" | "p";

const titleSizes = {
  /** No size class — the caller supplies its own (e.g. a responsive size). */
  none: "",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
} as const;

/** Shared card-title styling — reuse on a <summary> or other elements. */
export function titleClasses(size: keyof typeof titleSizes = "xl", className?: string) {
  return cn("font-serif font-semibold tracking-tight", titleSizes[size], className);
}

type TitleProps = React.ComponentProps<"h3"> & {
  as?: TitleLevel;
  size?: keyof typeof titleSizes;
};

export function Title({ as = "h3", size = "xl", className, ...props }: TitleProps) {
  const Tag = as;
  return <Tag className={titleClasses(size, className)} {...props} />;
}

/* Text — body copy */
type TextProps = React.ComponentProps<"p"> & {
  size?: keyof typeof textSizes;
  tone?: "default" | "muted" | "faint";
};

const textSizes = {
  lg: "text-lg md:text-xl",
  md: "text-base md:text-lg",
  sm: "text-sm",
} as const;

export function Text({ size = "md", tone = "default", className, ...props }: TextProps) {
  return (
    <p
      className={cn(
        "leading-relaxed text-pretty",
        textSizes[size],
        tone === "muted" && "text-muted",
        tone === "faint" && "text-faint",
        className,
      )}
      {...props}
    />
  );
}
