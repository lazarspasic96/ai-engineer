import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { docsRoot } from '@/lib/locale-path';
import { routing } from '@/i18n/routing';

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) notFound();
  redirect(docsRoot(lang));
}
