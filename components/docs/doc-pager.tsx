import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFlatNavigation } from '@/lib/content';

interface DocPagerProps {
  slug: string[];
}

export function DocPager({ slug }: DocPagerProps) {
  const flat = getFlatNavigation();
  const currentIndex = flat.findIndex(
    (item) => item.slug[0] === slug[0] && item.slug[1] === slug[1]
  );

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flat[currentIndex - 1] : null;
  const next = currentIndex < flat.length - 1 ? flat[currentIndex + 1] : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.slug.join('/')}`}
          className="group flex flex-col items-start gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            Previous
          </span>
          <span className="font-medium group-hover:text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug.join('/')}`}
          className="group flex flex-col items-end gap-1 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            Next
            <ChevronRight className="h-4 w-4" />
          </span>
          <span className="font-medium group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
