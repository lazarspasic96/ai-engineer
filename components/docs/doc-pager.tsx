import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { getFlatNavigation } from '@/lib/content';
import { docHref } from '@/lib/locale-path';

import type { Locale } from '@/i18n/routing';

interface DocPagerProps {
  slug: string[];
  locale: Locale;
}

export async function DocPager({ slug, locale }: DocPagerProps) {
  const flat = getFlatNavigation(locale);
  const currentIndex = flat.findIndex(
    (item) => item.slug[0] === slug[0] && item.slug[1] === slug[1],
  );
  const t = await getTranslations({ locale, namespace: 'pager' });

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={docHref(locale, prev.slug)}
          className="group hover:bg-muted/50 flex flex-col items-start gap-1 rounded-lg border p-4 transition-colors"
        >
          <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
            <ChevronLeft className="h-4 w-4" />
            {t('previous')}
          </span>
          <span className="group-hover:text-foreground font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={docHref(locale, next.slug)}
          className="group hover:bg-muted/50 flex flex-col items-end gap-1 rounded-lg border p-4 transition-colors"
        >
          <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
            {t('next')}
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="group-hover:text-foreground font-medium">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
