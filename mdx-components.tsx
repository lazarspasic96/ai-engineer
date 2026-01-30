import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBlock } from '@/components/mdx/code-block';

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...components,
    h1: ({ children, ...props }) => (
      <h1
        className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight [&>a]:no-underline"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 [&>a]:no-underline"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight [&>a]:no-underline"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mt-6 scroll-m-20 text-lg font-semibold tracking-tight [&>a]:no-underline"
        {...props}
      >
        {children}
      </h4>
    ),
    a: ({ href, children, ...props }) => {
      if (href?.startsWith('/')) {
        return (
          <Link href={href} className="font-medium underline underline-offset-4" {...props}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-4"
          {...props}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (!src) return null;
      return (
        <Image
          src={src}
          alt={alt ?? ''}
          width={720}
          height={400}
          className="rounded-md border"
          {...props}
        />
      );
    },
    pre: ({ children, ...props }) => <CodeBlock {...props}>{children}</CodeBlock>,
    blockquote: ({ children, ...props }) => (
      <blockquote className="text-muted-foreground mt-6 border-l-2 pl-6 italic" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table className="w-full" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right"
        {...props}
      >
        {children}
      </td>
    ),
    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  };
}
