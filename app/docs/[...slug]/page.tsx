import { notFound } from 'next/navigation';
import { getAllDocSlugs, getDocFrontmatter, getFlatNavigation } from '@/lib/content';
import { DocBreadcrumbs } from '@/components/docs/doc-breadcrumbs';
import { EditLink } from '@/components/docs/edit-link';
import { DocPager } from '@/components/docs/doc-pager';
import { Separator } from '@/components/ui/separator';
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
    const flatNav = getFlatNavigation();
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

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const { default: Content } = await import(`@/content/docs/${slug.join('/')}.mdx`);
    return (
      <>
        <DocBreadcrumbs slug={slug} />
        <Content />
        <Separator className="my-8" />
        <EditLink slug={slug} />
        <div className="mt-8">
          <DocPager slug={slug} />
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
