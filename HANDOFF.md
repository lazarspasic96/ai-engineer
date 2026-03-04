# Handoff: ai-engineer.sh Documentation Site

## Goal

Build a documentation-style website for AI learning resources using Next.js 16 + MDX + shadcn/ui. Three-column layout (sidebar | content | TOC), dark/light mode toggle. Full plan in `PLAN.md`.

## Current Progress

**Phase 1: Foundation — COMPLETE**
**Phase 2: Content Infrastructure — COMPLETE**
**Phase 3: Layout & Navigation — COMPLETE**
**Phase 4: Content Styling — COMPLETE**
**Phase 5: Homepage & Polish — COMPLETE**
**Phase 6: Prev/Next + Edit Link + Breadcrumbs — COMPLETE**
**Phase 7: Search — COMPLETE**
**Phase 8: OG Images + Favicon + Deploy Prep — COMPLETE**

All phases complete. Build passes (`npm run build` — 22 static pages).

---

### Files created/modified in Phase 1

| File                                  | Purpose                                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `next.config.ts`                      | MDX pipeline with `@next/mdx`, `pageExtensions`, remark/rehype plugins (string-based for Turbopack)               |
| `mdx-components.tsx`                  | Required by `@next/mdx` — populated in Phase 4 with custom h1–h4, links, images, code blocks, tables, blockquotes |
| `components/theme/theme-provider.tsx` | `next-themes` wrapper, class-based dark mode, `"use client"`                                                      |
| `components/theme/theme-toggle.tsx`   | Sun/Moon dropdown via shadcn `DropdownMenu`, `"use client"`                                                       |
| `app/layout.tsx`                      | Wrapped with `ThemeProvider`, `suppressHydrationWarning`, metadata "ai-engineer.sh"                               |
| `app/globals.css`                     | Class-based dark mode via `@custom-variant dark`, shadcn CSS vars, typography plugin, rehype-pretty-code styles   |
| `lib/utils.ts`                        | `cn()` utility (shadcn)                                                                                           |
| `components/ui/*`                     | shadcn: `button`, `dropdown-menu`, `scroll-area`, `sheet`, `input`, `separator`                                   |
| `tsconfig.json`                       | Added `"**/*.mdx"` to `include`                                                                                   |
| `components.json`                     | shadcn config (new-york style, neutral base, lucide icons)                                                        |

### Files created/modified in Phase 2

| File                          | Purpose                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| `next.config.ts`              | Added `name: "metadata"` to `remark-mdx-frontmatter`                                       |
| `content/docs/**/*.mdx`       | 12 MDX files across 4 sections (see Content Structure below)                               |
| `lib/content.ts`              | `getAllDocSlugs()`, `getDocFrontmatter()`, `getNavigation()` — filesystem nav tree builder |
| `app/docs/[...slug]/page.tsx` | Dynamic MDX import, `generateStaticParams`, `generateMetadata`, `dynamicParams = false`    |

### Files created/modified in Phase 3

| File                                | Purpose                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------- |
| `components/layout/top-nav.tsx`     | Sticky header — logo (BookOpen + "ai-engineer.sh"), Docs link, ThemeToggle, GitHub icon, MobileNav trigger |
| `components/layout/sidebar-nav.tsx` | Client component — nav sections/items from `getNavigation()`, active state via `usePathname`               |
| `components/layout/toc.tsx`         | Client component — queries `article h2/h3` on mount, `IntersectionObserver` active heading tracking        |
| `components/layout/mobile-nav.tsx`  | Sheet-based sidebar for mobile (`md:hidden`), closes on link click                                         |
| `app/docs/layout.tsx`               | 3-column grid: sidebar (hidden mobile)                                                                     | content (`prose`) | TOC (hidden below `lg`) |

### Files created/modified in Phase 4

| File                            | Purpose                                                                                                                                               |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/globals.css`               | Added `@plugin "@tailwindcss/typography"`, rehype-pretty-code dual-theme CSS, inline code styling, language label `::before`                          |
| `app/docs/layout.tsx`           | Added `prose prose-neutral dark:prose-invert` to `<article>`                                                                                          |
| `mdx-components.tsx`            | Custom mappings: h1–h4 (scroll-m-20), links (internal=next/link, external=target \_blank), img=next/image, pre=CodeBlock, blockquote, table/th/td, hr |
| `components/mdx/code-block.tsx` | Client component — copy-to-clipboard (hover reveal), language label prop                                                                              |

### Files created/modified in Phase 5

| File                                            | Purpose                                                                                                        |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `app/page.tsx`                                  | `redirect("/docs/getting-started/introduction")`                                                               |
| `content/docs/getting-started/introduction.mdx` | Rewritten with real content — audience, prerequisites, section table, code example, blockquote, internal links |
| `app/robots.ts`                                 | Allows all crawlers, sitemap at `ai-engineer.sh/sitemap.xml`                                                   |
| `app/sitemap.ts`                                | Dynamic sitemap from `getAllDocSlugs()`                                                                        |

### Files created/modified in Phase 6

| File | Purpose |
| --- | --- |
| `lib/content.ts` | Added `FlatNavItem` type, `getFlatNavigation()` (flattens nav into ordered list), `getDocContent()` (returns stripped MDX body) |
| `components/docs/doc-breadcrumbs.tsx` | Server component — "Docs > Section > Page Title" breadcrumb nav above content |
| `components/docs/edit-link.tsx` | Server component — pencil icon + "Edit this page on GitHub" link to MDX source |
| `components/docs/doc-pager.tsx` | Server component — two-column grid with prev/next navigation cards (ChevronLeft/Right) |
| `app/docs/[...slug]/page.tsx` | Added breadcrumbs above `<Content />`, separator + edit link + pager below |

### Files created/modified in Phase 7

| File | Purpose |
| --- | --- |
| `lib/search.ts` | `buildSearchIndex()` — reads all MDX, strips syntax, returns `SearchEntry[]` for client search |
| `components/search/search-data.tsx` | Server component — calls `buildSearchIndex()`, passes entries to `SearchDialog` |
| `components/search/search-dialog.tsx` | Client component — Cmd+K dialog, text-based search with ranked results, keyboard nav |
| `components/layout/top-nav.tsx` | Added `<SearchProvider />` before ThemeToggle |
| `components/ui/dialog.tsx` | shadcn dialog component (added via CLI) |

### Files created/modified in Phase 8

| File | Purpose |
| --- | --- |
| `app/api/og/route.tsx` | Edge API route — `ImageResponse` OG card (dark style, title/section/description via query params) |
| `app/icon.tsx` | Generated 32x32 favicon — "ai" on blue bg |
| `app/apple-icon.tsx` | Generated 180x180 apple-touch-icon — "ai" on blue bg |
| `app/layout.tsx` | Added `metadataBase`, `openGraph`, `twitter` config |
| `app/docs/[...slug]/page.tsx` | `generateMetadata` now includes OG image URL pointing to `/api/og` |
| `public/` | Removed unused default SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg) |

### Dependencies installed

```
@next/mdx @mdx-js/loader @mdx-js/react @types/mdx
remark-gfm remark-frontmatter remark-mdx-frontmatter
rehype-slug rehype-autolink-headings rehype-pretty-code shiki
next-themes lucide-react @tailwindcss/typography gray-matter
clsx tailwind-merge class-variance-authority (via shadcn)
tw-animate-css @radix-ui/* (via shadcn components)
flexsearch
```

---

## What Worked

- **String-based plugin references** in `next.config.ts` — Turbopack requires plugins as strings, not imported JS functions.
- **shadcn `init -d --yes`** — auto-detected Tailwind v4, set up class-based dark mode correctly.
- **Dynamic `import()` for MDX** — `await import(\`@/content/docs/${slug.join("/")}.mdx\`)` works with Turbopack.
- **`remark-mdx-frontmatter` with `name: "metadata"`** — exports frontmatter as `metadata` object from each MDX.
- **`@plugin "@tailwindcss/typography"`** — Tailwind v4 uses `@plugin` directive, NOT `@import`, for plugins in CSS.
- **Tailwind v4 canonical classes** — `[[align=center]]:text-center` not `[&[align=center]]:text-center`.
- **Data flow for nav** — `getNavigation()` called in server-side `docs/layout.tsx`, passed as props to client components (`SidebarNav`, `MobileNav` via `TopNav`).
- **rehype-pretty-code dual themes** — configured `{ dark: "github-dark", light: "github-light" }` with `keepBackground: false`, CSS toggles `display:none` based on `.dark` class.

## What Didn't Work

- **JS function plugin imports in next.config.ts** — Turbopack rejects non-serializable loader options. Fixed with string-based references.
- **`@import "@tailwindcss/typography"`** — Tailwind v4 plugins use `@plugin`, not `@import`. Build error: `Can't resolve '@tailwindcss/typography'`. Fixed by changing to `@plugin "@tailwindcss/typography"`.
- **`opengraph-image.tsx` inside `[...slug]`** — Next.js error: "Catch-all must be the last part of the URL". Fixed by using a separate `/api/og` edge route with query params instead of the file convention.

---

## Content Structure

```
content/docs/
  getting-started/
    introduction.mdx        (order: 1)
    why-ai-engineering.mdx   (order: 2)
    prerequisites.mdx        (order: 3)
  fundamentals/
    neural-networks.mdx              (order: 1)
    deep-learning.mdx                (order: 2)
    training-and-optimization.mdx    (order: 3)
  transformers/
    what-is-attention.mdx     (order: 1)
    self-attention.mdx        (order: 2)
    multi-head-attention.mdx  (order: 3)
  llm-engineering/
    tokenization.mdx          (order: 1)
    prompt-engineering.mdx    (order: 2)
    fine-tuning.mdx           (order: 3)
```

Section ordering: `lib/content.ts` `SECTION_ORDER` map (Getting Started=1, Fundamentals=2, Transformers=3, LLM Engineering=4).

## Key Architecture Decisions

- **MDX rendering**: dynamic `import()` via `@next/mdx` (not remote MDX)
- **Frontmatter**: `remark-frontmatter` + `remark-mdx-frontmatter` with `name: "metadata"`
- **TOC**: client-side DOM query + `IntersectionObserver` (layout can't know child page headings)
- **Dark mode**: class-based via `next-themes` + Tailwind v4 `@custom-variant dark`
- **Static gen**: all pages via `generateStaticParams` + `dynamicParams = false`
- **Nav tree**: filesystem-based, ordered by frontmatter `order` + `SECTION_ORDER` config
- **GitHub repo**: `github.com/lazarspasic/ai-engineer`
- **Next.js 16 params**: `params` is `Promise<{ slug: string[] }>` — must be awaited

## Next Steps

### Future work
- **Real content** — expand placeholder MDX files (only `introduction.mdx` has real content)
- **Deploy** — Vercel deployment + custom domain `ai-engineer.sh`
