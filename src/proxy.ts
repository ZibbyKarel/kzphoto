import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every pathname except static assets (anything with a file extension)
  // and Next's internals.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
