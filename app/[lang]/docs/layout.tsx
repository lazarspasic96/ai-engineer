import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { TopNav } from '@/components/layout/top-nav';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { TableOfContents } from '@/components/layout/toc';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNavigation } from '@/lib/content';
import { routing } from '@/i18n/routing';

export default async function DocsLayout({
  children,
  params,
}: LayoutProps<'/[lang]/docs'>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);

  const navigation = getNavigation(lang);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopNav navigation={navigation} locale={lang} />

      <div className="flex min-h-0 flex-1">
        <div className="mx-auto flex w-full max-w-screen-2xl">
          {/* Left sidebar */}
          <aside className="w-sidebar-left hidden shrink-0 border-r md:block">
            <ScrollArea className="h-full py-6 pr-4 pl-6">
              <SidebarNav navigation={navigation} locale={lang} />
            </ScrollArea>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-8 lg:px-12">
            <article className="prose prose-neutral dark:prose-invert max-w-content-max mx-auto">
              {children}
            </article>
          </main>

          {/* Right TOC */}
          <aside className="w-sidebar-right hidden shrink-0 lg:block">
            <div className="h-full overflow-y-auto py-6 pr-6">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
