---
name: structure-learning
description: Structures raw learning notes, pasted text, exported documents (.docx / Google Docs), or external sources into a docs article for this MDX docs site, fact-checking every claim and placing it in the right section. Ingests .docx files with Pandoc to extract embedded images as real files. Use when the user shares something they learned (notes, an article, a transcript, a link, a code snippet, a .docx/Google Doc) and wants it cleaned up, verified, and added to the documentation, or says "structure this", "add this to the docs", "I learned X", or "here's a new source".
---

# Structure Learning Into Docs

Turn raw learning material into a verified, well-placed MDX article. **Never assume** — propose placement and surface open questions before writing anything.

## Conventions (read first)

This repo already documents its authoring rules. Read these before drafting:

- `CONTENT-GUIDE.md` — frontmatter schema, MDX elements, code blocks, images, tables, templates.
- `lib/content.ts` → `SECTION_ORDER` — the canonical list of sections and their order.

Match the voice of existing articles in `content/docs/` (e.g. `fundamentals/how-llms-are-built.mdx`): plain, concrete, second-person where natural, tables for comparisons, short code examples that illustrate one idea.

## Workflow

Do these in order. Do not skip the plan/approval gate.

### 0. Ingest the source (only if given a file)

If the user pasted text or gave a link, skip to step 1. If they provided a **`.docx`** (the right way to export a Google Doc — `File → Download → Microsoft Word (.docx)`), convert it first so embedded images come through as real files:

```bash
.claude/skills/structure-learning/scripts/ingest-docx.sh <path/to/file.docx>
```

This prints the path to the generated Markdown and lists every extracted image (saved under a scratch `media/` dir). Read that Markdown as the source for the rest of the workflow. Keep the image list — you'll relocate those files into `public/images/docs/<section>/` after placement is approved (step 4).

If the user instead hands you a Google **native Markdown (.md)** export with `data:image/...;base64` links, warn them: those images are broken — ask them to re-export as `.docx` and run this step.

### 1. Verify every factual claim

Go through the source sentence by sentence. For every factual, technical, numeric, or API claim:

- Confirm it with **web search** and **official docs** (use context7 for any library/framework/SDK/API — even well-known ones; prefer it over memory).
- Record the source URL for each verified claim.
- Flag anything you **cannot** verify, anything contradicted by sources, and anything ambiguous — do not silently "fix" or invent. Bring these to the user as questions.

### 2. Determine placement

- Map the content to an existing section in `SECTION_ORDER`.
- Pick a kebab-case `slug` and the next free `order` within that section (read existing files' frontmatter to find it).
- If nothing fits: draft a proposed new section (title + where in the order it goes). Do **not** edit `lib/content.ts` yet.

### 3. Present the plan and STOP

Use `AskUserQuestion`. Surface, concisely:

- **Placement** — section / slug / order (and new-section proposal if any).
- **Open questions** — every unverifiable claim, contradiction, ambiguity, or gap. Ask, don't guess.
- **Fact-check findings** — claims that were wrong/outdated and your proposed correction (with source).
- **Image suggestions** — where a diagram would help (see step 5).

Wait for answers and explicit approval before writing.

### 4. Write the article

Only after approval. Create `content/docs/<section>/<slug>.mdx` following `CONTENT-GUIDE.md`:

- Frontmatter: `title`, `description`, `order`.
- Restructure into `##`/`###` sections (they feed the TOC); rewrite for clarity while preserving the user's intent.
- Add runnable, minimal code examples in fenced blocks with the right language.
- Use tables for comparisons; blockquotes for tips/quotes.
- If a new section was approved, add it to `SECTION_ORDER` in `lib/content.ts` and create the directory.

### 5. Images

Use the `<Screenshot>` component for all images:

```mdx
import { Screenshot } from '@/components/mdx/screenshot'

<Screenshot
  src="/images/docs/<section>/<name>.png"
  alt="Precise description of what the image shows"
  caption="One-line explanation of the takeaway."
/>
```

- **Images extracted from a `.docx`** (step 0): move each used image from the scratch `media/` dir into `public/images/docs/<section>/`, give it a descriptive kebab-case name, and point `src` at the real path. Write meaningful `alt`/`caption` — don't keep Pandoc's generic names.
- **A concept needs a diagram but no image exists**: use a `placeholder-<name>.png` path with a descriptive `alt`/`caption`, and tell the user which placeholder files to create and what each should depict.

### 6. Confirm

Report what was written: file path, section/order, new section (if any), the list of fact-check corrections applied, and any placeholder images awaiting assets.

## Rules

- Never assume. Unverified or ambiguous → a question, not a guess.
- Never publish a claim you could not verify; mark it for the user instead.
- One article per file. Keep articles focused; split if a source covers distinct topics.
- Preserve the user's meaning — improve clarity, structure, and correctness, not the argument.
