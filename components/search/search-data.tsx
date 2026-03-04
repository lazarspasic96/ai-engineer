import { buildSearchIndex } from '@/lib/search';
import { SearchDialog } from '@/components/search/search-dialog';

export function SearchProvider() {
  const entries = buildSearchIndex();
  return <SearchDialog entries={entries} />;
}
