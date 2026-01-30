'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('article h2, article h3'));

    const items: TocItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: Number(el.tagName.charAt(1)),
    }));

    setHeadings(items);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 1.0 }
    );

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">On This Page</p>
      <ul className="m-0 list-none text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className="mt-0 pt-2">
            <a
              href={`#${heading.id}`}
              className={cn(
                'text-muted-foreground hover:text-foreground inline-block no-underline transition-colors',
                heading.level === 3 && 'pl-4',
                activeId === heading.id && 'text-foreground font-medium'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
