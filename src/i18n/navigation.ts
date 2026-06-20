import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation APIs. Use these instead of `next/link` / `next/navigation`
 * so internal links and redirects keep the active locale (and add `/en` when needed).
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
