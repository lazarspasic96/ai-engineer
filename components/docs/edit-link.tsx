import { Pencil } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';

const GITHUB_EDIT_URL = 'https://github.com/lazarspasic/ai-engineer/edit/main/content/docs';

interface EditLinkProps {
  slug: string[];
  locale: Locale;
}

export async function EditLink({ slug, locale }: EditLinkProps) {
  const href = `${GITHUB_EDIT_URL}/${locale}/${slug.join('/')}.mdx`;
  const t = await getTranslations({ locale, namespace: 'edit' });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
    >
      <Pencil className="h-3.5 w-3.5" />
      {t('editOnGitHub')}
    </a>
  );
}
