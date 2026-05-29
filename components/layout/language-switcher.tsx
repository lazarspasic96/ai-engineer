'use client';

import { Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';

interface LanguageSwitcherProps {
  locale: Locale;
}

/**
 * Switches the URL between locales using `localePrefix: 'as-needed'`.
 * - The default locale (`en`) renders at the root: `/docs/...`
 * - Other locales are prefixed: `/sr/docs/...`
 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const activeLocale = useLocale() as Locale;

  function buildHref(target: Locale): string {
    // Strip any current locale prefix from the path, then add the new one if needed.
    const stripped = stripLocalePrefix(pathname, activeLocale);
    return target === routing.defaultLocale ? stripped : `/${target}${stripped}`;
  }

  function onSelect(target: Locale) {
    if (target === activeLocale) return;
    router.push(buildHref(target));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          aria-label={t('switcherLabel')}
        >
          <Languages className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => onSelect(code)}
            className={code === locale ? 'font-medium' : undefined}
          >
            {t(code)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function stripLocalePrefix(path: string, current: Locale): string {
  if (current === routing.defaultLocale) return path || '/';
  const prefix = `/${current}`;
  if (path === prefix) return '/';
  if (path.startsWith(`${prefix}/`)) return path.slice(prefix.length);
  return path;
}
