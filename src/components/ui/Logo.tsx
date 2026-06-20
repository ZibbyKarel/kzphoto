import { cn } from "@/lib/cn";
import Image from "next/image";

/**
 * KZ logo mark — the real brand artwork (public/logo.png): a copper camera
 * outline with serif "KZ" over a lens ring, on a transparent background so it
 * sits on the dark theme directly. Decorative: pair with a visible/SR label.
 */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt=""
      aria-hidden="true"
      width={96}
      height={96}
      priority={priority}
      className={cn("block h-auto w-10", className)}
    />
  );
}
