import { getAllDocSlugs } from '@/lib/content';

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai-engineer.sh';

  const docPages = getAllDocSlugs().map((slug) => ({
    url: `${baseUrl}/docs/${slug.join('/')}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...docPages,
  ];
}
