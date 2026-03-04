import { getAllDocSlugs, getDocFrontmatter, getDocContent } from '@/lib/content';
import { getFlatNavigation } from '@/lib/content';

export interface SearchEntry {
  id: string;
  title: string;
  section: string;
  slug: string[];
  content: string;
}

function stripMdx(raw: string): string {
  return (
    raw
      // Remove import/export statements
      .replace(/^(import|export)\s.+$/gm, '')
      // Remove JSX tags
      .replace(/<[^>]+>/g, '')
      // Remove markdown headings markers
      .replace(/#{1,6}\s/g, '')
      // Remove emphasis/bold markers
      .replace(/(\*{1,3}|_{1,3})/g, '')
      // Remove inline code backticks
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      // Remove links, keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // Collapse whitespace
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export function buildSearchIndex(): SearchEntry[] {
  const flatNav = getFlatNavigation();
  const slugs = getAllDocSlugs();
  const entries: SearchEntry[] = [];

  for (const slug of slugs) {
    const meta = getDocFrontmatter(slug);
    const rawContent = getDocContent(slug);
    const navItem = flatNav.find(
      (item) => item.slug[0] === slug[0] && item.slug[1] === slug[1],
    );

    entries.push({
      id: slug.join('/'),
      title: meta.title,
      section: navItem?.section ?? slug[0],
      slug,
      content: stripMdx(rawContent),
    });
  }

  return entries;
}
