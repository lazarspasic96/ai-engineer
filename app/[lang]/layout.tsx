import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);

  return children;
}
