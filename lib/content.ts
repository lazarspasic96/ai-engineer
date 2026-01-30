import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

export interface DocMeta {
  title: string;
  description: string;
  order: number;
}

export interface NavItem {
  title: string;
  slug: string[];
  order: number;
}

export interface NavSection {
  title: string;
  slug: string;
  order: number;
  items: NavItem[];
}

const SECTION_ORDER: Record<string, { title: string; order: number }> = {
  'getting-started': { title: 'Getting Started', order: 1 },
  fundamentals: { title: 'Fundamentals', order: 2 },
  transformers: { title: 'Transformers', order: 3 },
  'llm-engineering': { title: 'LLM Engineering', order: 4 },
};

export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];
  const sections = fs.readdirSync(CONTENT_DIR);

  for (const section of sections) {
    const sectionPath = path.join(CONTENT_DIR, section);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    const files = fs.readdirSync(sectionPath);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      slugs.push([section, file.replace('.mdx', '')]);
    }
  }

  return slugs;
}

export function getDocFrontmatter(slug: string[]): DocMeta {
  const filePath = path.join(CONTENT_DIR, ...slug) + '.mdx';
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(source);
  return data as DocMeta;
}

export function getNavigation(): NavSection[] {
  const sections: NavSection[] = [];
  const dirs = fs.readdirSync(CONTENT_DIR);

  for (const dir of dirs) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const sectionConfig = SECTION_ORDER[dir];
    if (!sectionConfig) continue;

    const files = fs.readdirSync(dirPath);
    const items: NavItem[] = [];

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      const slug = [dir, file.replace('.mdx', '')];
      const meta = getDocFrontmatter(slug);
      items.push({
        title: meta.title,
        slug,
        order: meta.order,
      });
    }

    items.sort((a, b) => a.order - b.order);

    sections.push({
      title: sectionConfig.title,
      slug: dir,
      order: sectionConfig.order,
      items,
    });
  }

  sections.sort((a, b) => a.order - b.order);
  return sections;
}
