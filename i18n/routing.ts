import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'sr'],
  defaultLocale: 'en',
  // English at root (/docs/...), Serbian prefixed (/sr/docs/...)
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
