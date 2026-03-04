# Plan: Phase 6-8 — Prev/Next, Search, OG Images

## Phase 6: Prev/Next + Edit Link + Breadcrumbs

### 6.0 Shared infra

- Add `FlatNavItem` type + `getFlatNavigation()` + `getDocContent()` to `lib/content.ts`

### 6.1 Breadcrumbs

- New `components/docs/doc-breadcrumbs.tsx` (server component)
- Shows "Docs > Section > Page Title" above content
- Uses `getFlatNavigation()` to resolve section title

### 6.2 Edit link

- New `components/docs/edit-link.tsx` (server component)
- Links to `github.com/lazarspasic/ai-engineer/edit/main/content/docs/{slug}.mdx`
- Pencil icon + "Edit this page on GitHub"

### 6.3 Prev/Next pager

- New `components/docs/doc-pager.tsx` (server component)
- Flattens nav, finds current index, renders prev/next cards
- Two-column grid with ChevronLeft/Right icons

### 6.4 Integrate into page.tsx

- `app/docs/[...slug]/page.tsx` — render breadcrumbs above `<Content />`, separator + edit link + pager below

---

## Phase 7: Search

### 7.1 Install deps

- `npm install flexsearch`
- `npx shadcn@latest add dialog`
- Create `types/flexsearch.d.ts` if types missing

### 7.2 Search index builder

- New `lib/search.ts` — `buildSearchIndex()` returns `SearchEntry[]` (id, title, section, slug, stripped content)

### 7.3 Search UI

- New `components/search/search-data.tsx` (server) — calls `buildSearchIndex()`, passes to client
- New `components/search/search-dialog.tsx` (client) — Cmd+K dialog, FlexSearch index, results list
- Trigger button: search icon + "Search docs..." + `⌘K` badge

### 7.4 Integrate into top-nav

- `components/layout/top-nav.tsx` — add `<SearchProvider />` before ThemeToggle

---

## Phase 8: OG Images + Favicon + Deploy Prep

### 8.1 OG images

- New `app/docs/[...slug]/opengraph-image.tsx` — `ImageResponse` with title, section, description, branding
- Dark card style (0a0a0a bg, fafafa text)
- Auto-uses existing `generateStaticParams`

### 8.2 Favicon

- New `app/icon.tsx` — generated 32x32 PNG via `ImageResponse` ("ai" text on dark bg)
- Optionally add `app/apple-icon.tsx` (180x180)

### 8.3 Deploy prep

- Add `metadataBase: new URL("https://ai-engineer.sh")` to `app/layout.tsx` metadata
- Add `openGraph` + `twitter` card config
- Remove unused default SVGs from `public/`
- Verify `npm run build` passes

---

## Files Summary

### New files

| File                                     | Type                         |
| ---------------------------------------- | ---------------------------- |
| `components/docs/doc-breadcrumbs.tsx`    | Server component             |
| `components/docs/edit-link.tsx`          | Server component             |
| `components/docs/doc-pager.tsx`          | Server component             |
| `components/search/search-data.tsx`      | Server component             |
| `components/search/search-dialog.tsx`    | Client component             |
| `lib/search.ts`                          | Server module                |
| `app/docs/[...slug]/opengraph-image.tsx` | OG image route               |
| `app/icon.tsx`                           | Favicon route                |
| `components/ui/dialog.tsx`               | shadcn (via CLI)             |
| `types/flexsearch.d.ts`                  | Type declaration (if needed) |

### Modified files

| File                            | Change                                                      |
| ------------------------------- | ----------------------------------------------------------- |
| `lib/content.ts`                | Add `FlatNavItem`, `getFlatNavigation()`, `getDocContent()` |
| `app/docs/[...slug]/page.tsx`   | Add breadcrumbs, edit link, pager                           |
| `components/layout/top-nav.tsx` | Add SearchProvider                                          |
| `app/layout.tsx`                | Add `metadataBase`, OG/Twitter metadata                     |

### Deps

```bash
npm install flexsearch
npx shadcn@latest add dialog
```

---

## Verification

- `npm run build` — all pages + OG images generated
- Dev: breadcrumbs show above content, edit link + prev/next below
- Dev: Cmd+K opens search, results navigate correctly
- Dev: dark/light mode works across all new components
- Check `/docs/getting-started/introduction` OG image in browser devtools

## Unresolved Questions

None — all decisions made above.
