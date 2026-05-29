import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all routes except API, Next internals, OG image, sitemap, robots, icons,
  // and anything containing a file extension (static assets).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
