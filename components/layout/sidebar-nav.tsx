'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { docHref } from '@/lib/locale-path';

import type { Locale } from '@/i18n/routing';
import type { NavSection } from '@/lib/content';

interface SidebarNavProps {
  navigation: NavSection[];
  locale: Locale;
}

export function SidebarNav({ navigation, locale }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      {navigation.map((section) => (
        <div key={section.slug} className="pb-6">
          <h4 className="mb-1 px-2 text-sm font-semibold tracking-tight">{section.title}</h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {section.items.map((item) => {
              const href = docHref(locale, item.slug);
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'group hover:text-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1.5 transition-colors',
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
