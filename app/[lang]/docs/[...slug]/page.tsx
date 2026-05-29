import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { getAllDocSlugs, getDocFrontmatter, getFlatNavigation } from '@/lib/content';
import { DocBreadcrumbs } from '@/components/docs/doc-breadcrumbs';
import { EditLink } from '@/components/docs/edit-link';
import { DocPager } from '@/components/docs/doc-pager';
import { Separator } from '@/components/ui/separator';
import { routing } from '@/i18n/routing';

import type { Locale } from '@/i18n/routing';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  // Generate (lang, slug) pairs for every locale and every article.
  return routing.locales.flatMap((lang) =>
    getAllDocSlugs(lang).map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/docs/[...slug]'>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(routing.locales, lang)) return {};
  const locale = lang as Locale;
  try {
    const meta = getDocFrontmatter(slug, locale);
    const flatNav = getFlatNavigation(locale);
    const navItem = flatNav.find(
      (item) => item.slug[0] === slug[0] && item.slug[1] === slug[1],
    );
    const section = navItem?.section ?? '';

    const ogParams = new URLSearchParams({
      title: meta.title,
      description: meta.description,
      section,
    });

    return {
      title: meta.title,
      description: meta.description,
      openGraph: {
        title: meta.title,
        description: meta.description,
        images: [`/api/og?${ogParams.toString()}`],
      },
    };
  } catch {
    return {};
  }
}

export const dynamicParams = false;

export default async function DocPage({ params }: PageProps<'/[lang]/docs/[...slug]'>) {
  const { lang, slug } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  setRequestLocale(lang);

  const locale = lang as Locale;

  try {
    const { default: Content } = await import(
      `@/content/docs/${locale}/${slug.join('/')}.mdx`
    );
    return (
      <>
        <DocBreadcrumbs slug={slug} locale={locale} />
        <Content />
        <Separator className="my-8" />
        <EditLink slug={slug} locale={locale} />
        <div className="mt-8">
          <DocPager slug={slug} locale={locale} />
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
