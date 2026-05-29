import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import type { Locale } from '@/i18n/routing';

const CONTENT_ROOT = path.join(process.cwd(), 'content/docs');

const DEFAULT_LOCALE: Locale = 'en';

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

// Section labels stay in English across all locales by design.
const SECTION_ORDER: Record<string, { title: string; order: number }> = {
  'getting-started': { title: 'Getting Started', order: 1 },
  fundamentals: { title: 'Fundamentals', order: 2 },
  transformers: { title: 'Transformers', order: 3 },
  'llm-engineering': { title: 'LLM Engineering', order: 4 },
  'ai-coding': { title: 'AI Coding', order: 5 },
};

function localeDir(locale: Locale): string {
  return path.join(CONTENT_ROOT, locale);
}

export function getAllDocSlugs(locale: Locale = DEFAULT_LOCALE): string[][] {
  const slugs: string[][] = [];
  const root = localeDir(locale);
  if (!fs.existsSync(root)) return slugs;
  const sections = fs.readdirSync(root);

  for (const section of sections) {
    const sectionPath = path.join(root, section);
    if (!fs.statSync(sectionPath).isDirectory()) continue;

    const files = fs.readdirSync(sectionPath);
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      slugs.push([section, file.replace('.mdx', '')]);
    }
  }

  return slugs;
}

export function getDocFrontmatter(slug: string[], locale: Locale = DEFAULT_LOCALE): DocMeta {
  const filePath = path.join(localeDir(locale), ...slug) + '.mdx';
  const source = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(source);
  return data as DocMeta;
}

export function getNavigation(locale: Locale = DEFAULT_LOCALE): NavSection[] {
  const sections: NavSection[] = [];
  const root = localeDir(locale);
  if (!fs.existsSync(root)) return sections;
  const dirs = fs.readdirSync(root);

  for (const dir of dirs) {
    const dirPath = path.join(root, dir);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const sectionConfig = SECTION_ORDER[dir];
    if (!sectionConfig) continue;

    const files = fs.readdirSync(dirPath);
    const items: NavItem[] = [];

    for (const file of files) {
      if (!file.endsWith('.mdx')) continue;
      const slug = [dir, file.replace('.mdx', '')];
      const meta = getDocFrontmatter(slug, locale);
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

export interface FlatNavItem {
  title: string;
  slug: string[];
  section: string;
}

export function getFlatNavigation(locale: Locale = DEFAULT_LOCALE): FlatNavItem[] {
  const sections = getNavigation(locale);
  const flat: FlatNavItem[] = [];

  for (const section of sections) {
    for (const item of section.items) {
      flat.push({
        title: item.title,
        slug: item.slug,
        section: section.title,
      });
    }
  }

  return flat;
}

export function getDocContent(slug: string[], locale: Locale = DEFAULT_LOCALE): string {
  const filePath = path.join(localeDir(locale), ...slug) + '.mdx';
  const source = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(source);
  return content;
}
