import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Next.js/Turbopack statically parses this at build time — the matcher
  // entries must be literal strings, not derived from `routing.locales`
  // (a template literal here fails the build: "Entry `matcher[1]` need to
  // be static strings or static objects").
  matcher: [
    '/',
    '/(en|es|fr|zh|ar)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
