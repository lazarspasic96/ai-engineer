import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      ['remark-mdx-frontmatter', { name: 'metadata' }],
    ],
    rehypePlugins: ['rehype-slug', ['rehype-autolink-headings', { behavior: 'wrap' }]],
  },
});

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(withMDX(nextConfig));
