'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { docHref } from '@/lib/locale-path';

import type { Locale } from '@/i18n/routing';
import type { SearchEntry } from '@/lib/search';

interface SearchDialogProps {
  entries: SearchEntry[];
  locale: Locale;
}

export function SearchDialog({ entries, locale }: SearchDialogProps) {
  const router = useRouter();
  const t = useTranslations('search');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const search = useCallback(
    (q: string) => {
      setQuery(q);
      setActiveIndex(0);

      if (!q.trim()) {
        setResults([]);
        return;
      }

      const lower = q.toLowerCase();
      const matched = entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(lower) ||
          entry.content.toLowerCase().includes(lower) ||
          entry.section.toLowerCase().includes(lower),
      );

      // Sort: title match first, then section match, then content
      matched.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(lower) ? 0 : 1;
        const bTitle = b.title.toLowerCase().includes(lower) ? 0 : 1;
        return aTitle - bTitle;
      });

      setResults(matched.slice(0, 10));
    },
    [entries],
  );

  const navigate = useCallback(
    (entry: SearchEntry) => {
      setOpen(false);
      router.push(docHref(locale, entry.slug));
    },
    [router, locale],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault();
        navigate(results[activeIndex]);
      }
    },
    [results, activeIndex, navigate],
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-input bg-muted/40 text-muted-foreground hover:bg-muted flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors md:w-60"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden md:inline">{t('placeholder')}</span>
        <kbd className="bg-background border-border pointer-events-none ml-auto hidden rounded border px-1.5 py-0.5 text-[10px] font-medium md:inline">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">{t('trigger')}</DialogTitle>
          <div className="border-border flex items-center gap-2 border-b px-4">
            <Search className="text-muted-foreground h-4 w-4 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => search(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('placeholder')}
              className="placeholder:text-muted-foreground h-12 w-full bg-transparent text-sm outline-none"
            />
          </div>

          {results.length > 0 && (
            <ul className="max-h-72 overflow-y-auto p-2">
              {results.map((entry, i) => (
                <li key={entry.id}>
                  <button
                    onClick={() => navigate(entry)}
                    onMouseEnter={() => setActiveIndex(i)}
                    data-active={i === activeIndex}
                    className="data-[active=true]:bg-accent flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm"
                  >
                    <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="truncate font-medium">{entry.title}</div>
                      <div className="text-muted-foreground truncate text-xs">
                        {entry.section}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query && results.length === 0 && (
            <div className="text-muted-foreground p-8 text-center text-sm">
              {t('noResults')}
            </div>
          )}

          {!query && (
            <div className="text-muted-foreground p-8 text-center text-sm">
              {t('placeholder')}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
