import { getAllDocSlugs } from '@/lib/content';
import { docHref, rootHref } from '@/lib/locale-path';
import { routing } from '@/i18n/routing';

import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ai-engineer.sh';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({
      url: `${BASE_URL}${rootHref(locale)}`,
      lastModified: new Date(),
    });

    for (const slug of getAllDocSlugs(locale)) {
      entries.push({
        url: `${BASE_URL}${docHref(locale, slug)}`,
        lastModified: new Date(),
      });
    }
  }

  return entries;
}
