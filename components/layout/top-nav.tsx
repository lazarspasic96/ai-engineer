import Link from 'next/link';
import { BookOpen, Github } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import type { NavSection } from '@/lib/content';

interface TopNavProps {
  navigation: NavSection[];
}

export function TopNav({ navigation }: TopNavProps) {
  return (
    <header className="header-backdrop z-header sticky top-0 w-full border-b">
      <div className="h-header flex items-center px-4 md:px-6">
        <MobileNav navigation={navigation} />

        <Link
          href="/docs/getting-started/introduction"
          className="mr-6 flex items-center gap-2 font-semibold"
        >
          <BookOpen className="h-5 w-5" />
          <span>ai-engineer.sh</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/docs/getting-started/introduction"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/lazarspasic/ai-engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
