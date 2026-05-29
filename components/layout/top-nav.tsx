import Link from 'next/link';
import { AlignJustify, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { SearchProvider } from '@/components/search/search-data';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { docsRoot } from '@/lib/locale-path';

import type { Locale } from '@/i18n/routing';
import type { NavSection } from '@/lib/content';

interface TopNavProps {
  navigation: NavSection[];
  locale: Locale;
}

export async function TopNav({ navigation, locale }: TopNavProps) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const homeHref = docsRoot(locale);

  return (
    <header className="header-backdrop z-header sticky top-0 w-full border-b">
      <div className="h-header flex items-center px-4 md:px-6">
        <MobileNav navigation={navigation} locale={locale} />

        <Link href={homeHref} className="mr-6 flex items-center gap-2 font-semibold">
          <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-600">
            <AlignJustify className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span>ai-engineer.sh</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href={homeHref}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('docs')}
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchProvider locale={locale} />
          <LanguageSwitcher locale={locale} />
          <ThemeToggle />
          <a
            href="https://github.com/lazarspasic/ai-engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">{t('github')}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
