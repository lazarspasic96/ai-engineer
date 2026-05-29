import { buildSearchIndex } from '@/lib/search';
import { SearchDialog } from '@/components/search/search-dialog';

import type { Locale } from '@/i18n/routing';

interface SearchProviderProps {
  locale: Locale;
}

export function SearchProvider({ locale }: SearchProviderProps) {
  const entries = buildSearchIndex(locale);
  return <SearchDialog entries={entries} locale={locale} />;
}
