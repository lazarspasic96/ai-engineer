import { type ReactElement } from 'react';
import { codeToHtml } from 'shiki';

import { CopyButton } from './copy-button';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  'data-language'?: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
  typescript: 'TypeScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  js: 'JavaScript',
  tsx: 'TSX',
  jsx: 'JSX',
  python: 'Python',
  py: 'Python',
  bash: 'Bash',
  sh: 'Bash',
  shell: 'Shell',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  css: 'CSS',
  html: 'HTML',
  sql: 'SQL',
  markdown: 'Markdown',
  md: 'Markdown',
  text: 'Plain Text',
  plaintext: 'Plain Text',
};

function extractCode(children: React.ReactNode): {
  code: string;
  language: string;
} {
  const codeElement = children as ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;

  const className = codeElement?.props?.className || '';
  const language = className.replace('language-', '') || 'text';

  const raw = codeElement?.props?.children;
  const code = typeof raw === 'string' ? raw.trim() : '';

  return { code, language };
}

export async function CodeBlock({ children, 'data-language': dataLanguage }: CodeBlockProps) {
  const { code, language: parsedLang } = extractCode(children);
  const language = dataLanguage || parsedLang;

  if (!code) {
    return (
      <pre>
        <code>{children}</code>
      </pre>
    );
  }

  const html = await codeToHtml(code, {
    lang: language === 'text' || language === 'plaintext' ? 'text' : language,
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });

  const label = LANGUAGE_LABELS[language] || language.toUpperCase();

  return (
    <div className="code-block group border-border relative my-6 overflow-hidden rounded-lg border">
      {/* Header */}
      <div className="border-border bg-elevated flex items-center justify-between border-b px-4 py-3">
        <span className="text-text-muted font-mono text-[13px]">{label}</span>
        <CopyButton code={code} />
      </div>

      {/* Highlighted code */}
      <div
        className="code-block-content overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
