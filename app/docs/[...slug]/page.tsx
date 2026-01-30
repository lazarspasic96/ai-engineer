import { notFound } from 'next/navigation';
import { getAllDocSlugs, getDocFrontmatter } from '@/lib/content';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = getDocFrontmatter(slug);
    return {
      title: meta.title,
      description: meta.description,
    };
  } catch {
    return {};
  }
}

export const dynamicParams = false;

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { default: Content } = await import(`@/content/docs/${slug.join('/')}.mdx`);
    return <Content />;
  } catch {
    notFound();
  }
}
