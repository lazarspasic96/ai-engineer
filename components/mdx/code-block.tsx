'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  'data-language'?: string;
}

export function CodeBlock({
  children,
  className,
  'data-language': language,
  ...props
}: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? '';
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {language && (
        <div className="text-muted-foreground absolute top-2 left-4 text-xs tracking-wide uppercase">
          {language}
        </div>
      )}
      <button
        onClick={handleCopy}
        className={cn(
          'bg-background text-muted-foreground hover:text-foreground absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border opacity-0 transition-opacity group-hover:opacity-100',
          copied && 'text-green-500'
        )}
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
