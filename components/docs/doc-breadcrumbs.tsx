import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getFlatNavigation } from '@/lib/content';

interface DocBreadcrumbsProps {
  slug: string[];
}

export function DocBreadcrumbs({ slug }: DocBreadcrumbsProps) {
  const flat = getFlatNavigation();
  const current = flat.find((item) => item.slug[0] === slug[0] && item.slug[1] === slug[1]);

  if (!current) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground mb-4 flex items-center gap-1.5 text-sm"
    >
      <Link
        href="/docs/getting-started/introduction"
        className="hover:text-foreground transition-colors"
      >
        Docs
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span>{current.section}</span>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-foreground font-medium">{current.title}</span>
    </nav>
  );
}
