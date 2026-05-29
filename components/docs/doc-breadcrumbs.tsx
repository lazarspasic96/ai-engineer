import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getFlatNavigation } from '@/lib/content';
import { docsRoot } from '@/lib/locale-path';

import type { Locale } from '@/i18n/routing';

interface DocBreadcrumbsProps {
  slug: string[];
  locale: Locale;
}

export async function DocBreadcrumbs({ slug, locale }: DocBreadcrumbsProps) {
  const flat = getFlatNavigation(locale);
  const current = flat.find((item) => item.slug[0] === slug[0] && item.slug[1] === slug[1]);
  const t = await getTranslations({ locale, namespace: 'breadcrumbs' });

  if (!current) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-4 flex items-center gap-1.5 text-sm"
    >
      <Link href={docsRoot(locale)} className="hover:text-foreground transition-colors">
        {t('root')}
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span>{current.section}</span>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-foreground font-medium">{current.title}</span>
    </nav>
  );
}
