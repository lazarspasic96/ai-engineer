'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

import type { Locale } from '@/i18n/routing';

interface LanguageSwitcherProps {
  locale: Locale;
}

/**
 * Switches the URL between locales using `localePrefix: 'as-needed'`.
 *
 * Uses next-intl's locale-aware router/pathname so:
 *  - The cookie holding the user's preferred locale is updated on switch
 *    (without this, the middleware redirects back to the previous locale).
 *  - The path returned by `usePathname()` here is already locale-stripped,
 *    so we can pass it directly to `router.push(...)` with the new locale.
 */
export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('language');
  const activeLocale = useLocale() as Locale;

  function onSelect(target: Locale) {
    if (target === activeLocale) return;
    router.replace(pathname, { locale: target });
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
      <DropdownMenuContent align="end" sideOffset={8}>
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
