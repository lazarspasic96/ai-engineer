# Plan: ai-engineer.sh Documentation Site

## Overview

Build a documentation-style website for AI learning resources using Next.js 16 + MDX + shadcn/ui. Three-column layout: left sidebar nav, center content, right TOC. Dark/light mode toggle.

**Branding**: ai-engineer.sh
**Homepage**: redirect to `/docs/getting-started/introduction`
**GitHub**: github.com/lazarspasic/ai-engineer (for "Edit this page" links)
**Nav**: Docs only for now (skip Resources/About pages)

## Architecture

```
app/
  layout.tsx                 -- root layout (ThemeProvider, fonts, metadata)
  page.tsx                   -- landing page with hero + CTA to docs
  globals.css                -- Tailwind v4 + typography + class-based dark mode
  docs/
    layout.tsx               -- 3-column docs layout (sidebar | content | TOC)
    [...slug]/
      page.tsx               -- dynamic MDX renderer + generateStaticParams
components/
  layout/
    top-nav.tsx              -- logo, nav links, search input, theme toggle
    sidebar-nav.tsx          -- left sidebar with categorized sections (client)
    toc.tsx                  -- right "ON THIS PAGE" via IntersectionObserver (client)
    mobile-nav.tsx           -- Sheet-based mobile nav (client)
  theme/
    theme-provider.tsx       -- next-themes wrapper (client)
    theme-toggle.tsx         -- Sun/Moon toggle button (client)
  mdx/
    code-block.tsx           -- copy button + language label (client)
  ui/                        -- shadcn components (auto-generated)
content/
  docs/
    getting-started/         -- introduction.mdx, why-ai-engineering.mdx, prerequisites.mdx
    fundamentals/            -- neural-networks.mdx, deep-learning.mdx, training-and-optimization.mdx
    transformers/            -- what-is-attention.mdx, self-attention.mdx, multi-head-attention.mdx, etc.
    llm-engineering/         -- tokenization.mdx, prompt-engineering.mdx, fine-tuning.mdx
lib/
  content.ts                 -- nav tree builder, slug resolution, TOC extraction
  utils.ts                   -- cn utility (shadcn)
mdx-components.tsx           -- MDX element → React component mappings
```

## Key Decisions

- **MDX rendering**: dynamic `import()` via `@next/mdx` loader (not remote MDX)
- **Frontmatter**: `remark-frontmatter` + `remark-mdx-frontmatter` plugins → exports `metadata` from each MDX file
- **TOC**: client-side DOM query + IntersectionObserver (layout doesn't know child page)
- **Dark mode**: class-based via `next-themes` + Tailwind v4 `@custom-variant dark`
- **Static gen**: all pages via `generateStaticParams` + `dynamicParams = false`
- **Nav tree**: built from filesystem at build time, ordered by frontmatter `order` field

## Dependencies to Install

```bash
# MDX pipeline
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# Remark/Rehype plugins
npm install remark-gfm remark-frontmatter remark-mdx-frontmatter rehype-slug rehype-autolink-headings rehype-pretty-code shiki

# Theming & UI
npm install next-themes lucide-react @tailwindcss/typography

# Frontmatter parsing (for lib/content.ts nav builder)
npm install gray-matter
```

```bash
# shadcn init + components
npx shadcn@latest init
npx shadcn@latest add sidebar button dropdown-menu scroll-area sheet input separator
```

---

## Phase 1: Foundation

1. Install all npm deps
2. Init shadcn/ui, install components
3. Configure `next.config.ts` — MDX + pageExtensions + remark/rehype plugins
4. Create root `mdx-components.tsx`
5. Set up `next-themes` — ThemeProvider + ThemeToggle
6. Update root `layout.tsx` — ThemeProvider wrap, metadata, `suppressHydrationWarning`
7. Update `globals.css` — class-based dark mode (`@custom-variant`), typography plugin import, shadcn CSS vars

## Phase 2: Content Infrastructure

1. Create `content/docs/` directory tree with sample MDX files (frontmatter + placeholder content)
2. Build `lib/content.ts` — `getAllDocSlugs()`, `getDocBySlug()`, `getNavigation()`, `extractToc()`
3. Create `app/docs/[...slug]/page.tsx` — dynamic import, generateStaticParams, generateMetadata
4. Verify MDX rendering works end-to-end

## Phase 3: Layout & Navigation

1. Build `components/layout/top-nav.tsx` — logo, links, search input, theme toggle, GitHub icon
2. Build `components/layout/sidebar-nav.tsx` — sections + items with active state via `usePathname`
3. Build `components/layout/toc.tsx` — DOM-based heading extraction + IntersectionObserver active tracking
4. Build `components/layout/mobile-nav.tsx` — Sheet with sidebar content
5. Create `app/docs/layout.tsx` — 3-column grid wiring everything together

## Phase 4: Content Styling

1. Configure `@tailwindcss/typography` prose classes in docs layout
2. Populate `mdx-components.tsx` — custom h1-h6, code blocks, links, images, tables, blockquotes
3. Build `components/mdx/code-block.tsx` — copy-to-clipboard + language label
4. Test dark/light mode across all content elements

## Phase 5: Homepage & Polish

1. Update `app/page.tsx` — redirect to `/docs/getting-started/introduction`
2. Write real sample content for `getting-started/introduction.mdx`
3. Responsive testing (mobile Sheet nav, tablet 2-col, desktop 3-col)
4. Add metadata, favicon, robots.txt, sitemap via Next.js APIs
5. Verify `npm run build` succeeds

## Verification

- `npm run dev` — site loads, dark/light toggle works
- Navigate docs pages — sidebar highlights, TOC tracks scroll, code blocks highlight
- `npm run build` — static generation succeeds for all MDX pages
- Mobile viewport — Sheet nav opens/closes, content readable
- `npm run lint && npm run typecheck` — no errors

## Potential Issues

- **Turbopack + rehype-pretty-code**: may need `next dev --turbopack=false` if plugin serialization fails
- **Tailwind v4 + shadcn**: CSS variable merging in globals.css needs careful handling
- **MDX frontmatter**: requires `remark-frontmatter` + `remark-mdx-frontmatter` (YAML frontmatter not natively supported by `@next/mdx`)
