import type { Locale } from '@/i18n/routing';

/**
 * Build a docs URL for a given locale and slug.
 *
 * The site uses `localePrefix: 'as-needed'` — the default locale (`en`)
 * is served at the root, and other locales are prefixed.
 *   en + ['fundamentals','tokenization']  → /docs/fundamentals/tokenization
 *   sr + ['fundamentals','tokenization']  → /sr/docs/fundamentals/tokenization
 */
export function docHref(locale: Locale, slug: string[]): string {
  const path = `/docs/${slug.join('/')}`;
  return locale === 'en' ? path : `/${locale}${path}`;
}

export function rootHref(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}`;
}

export function docsRoot(locale: Locale): string {
  return locale === 'en' ? '/docs/getting-started/introduction' : `/${locale}/docs/getting-started/introduction`;
}
