import { Pencil } from 'lucide-react';

const GITHUB_EDIT_URL =
  'https://github.com/lazarspasic/ai-engineer/edit/main/content/docs';

interface EditLinkProps {
  slug: string[];
}

export function EditLink({ slug }: EditLinkProps) {
  const href = `${GITHUB_EDIT_URL}/${slug.join('/')}.mdx`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit this page on GitHub
    </a>
  );
}
