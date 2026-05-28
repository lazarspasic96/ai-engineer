---
name: structure-learning
description: Structures raw learning notes, pasted text, exported documents (.docx / Google Docs), or external sources into a verified MDX article in this docs site. Fact-checks every claim, maps the full docs tree before placing, proposes a new section when content opens a new area, and ingests .docx files with Pandoc so embedded images come through as real files (not broken base64). Topics span the whole AI stack — LLM fundamentals, tokenization, transformers, prompting, Claude, Codex, agents, RAG, second brain, evals, MCP, AI coding workflows, tooling — and content arrives non-linearly. Use this skill whenever the user pastes AI/engineering learning material, shares a .docx / Google Doc / Markdown / link / transcript / code snippet, or says "structure this", "add this to the docs", "I learned X", "organize my notes", "put this in the docs", or "here's a new source" — even when they haven't explicitly asked to update the documentation, if they hand over learning material this is the right skill.
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

Copy this checklist and tick items off as you go:

```text
Structure-learning progress:
- [ ] 0. Ingest the source (if .docx, run the pandoc script; else skip)
- [ ] 1. Verify every factual claim with web search + official docs
- [ ] 2. Map the full docs tree, then decide placement
- [ ] 3. Present plan via AskUserQuestion and STOP for approval
- [ ] 4. Write the article(s) in the docs' language
- [ ] 5. Wire in images (real from media/ dir, or placeholder)
- [ ] 6. Confirm what was written
```

### 0. Ingest the source (only if given a file)

If the user pasted text or gave a link, skip to step 1. If they provided a **`.docx`** (the right way to export a Google Doc — `File → Download → Microsoft Word (.docx)`), convert it first so embedded images come through as real files:

```bash
.claude/skills/structure-learning/scripts/ingest-docx.sh <path/to/file.docx>
```

This prints the path to the generated Markdown and lists every extracted image (saved under a scratch `media/` dir). Read that Markdown as the source for the rest of the workflow. Keep the image list — you'll relocate those files into `public/images/docs/<section>/` after placement is approved (step 4).

If the user instead hands you a Google **native Markdown (.md)** export with `data:image/...;base64` links, warn them: those images are broken — ask them to re-export as `.docx` and run this step.

**Pandoc artifacts to clean up before reading the source:**
- `[CODE_BLOCK]` / `[CODE_BLOCK: name]` placeholders appear for Google Docs code blocks — treat the wrapped content as a fenced code block (pick the language from context).
- Mixed-language sources are common (e.g. Serbian intro + English body). Note which sections are in which language so you can translate them in step 4.

### 1. Verify every factual claim

Go through the source sentence by sentence. For every factual, technical, numeric, or API claim:

- Confirm it with **web search** and **official docs** (use context7 for any library/framework/SDK/API — even well-known ones; prefer it over memory).
- Record the source URL for each verified claim.
- **Verify quotes and attributions, not just facts.** When the source paraphrases an author, book, or article (e.g. "Ousterhout says..."), fetch the actual thesis. A paraphrase that *sounds right* often isn't — surface the gap and propose the correct framing.
- **Distinguish heuristics from measurements.** Round numbers like "60–80% of the context window" are almost always community rules of thumb. Frame them as heuristics, cite the research that motivates them, and don't present them as measurements.
- Flag anything you **cannot** verify, anything contradicted by sources, and anything ambiguous — do not silently "fix" or invent. Bring these to the user as questions.

### 2. Map the docs, then place

Don't pick placement from keywords. Build the full map first, then decide.

- **Read the whole tree.** List every section in `SECTION_ORDER` and every article under `content/docs/`. Skim titles and frontmatter so you know what the docs already cover. Do this even if you remember it from a previous run — the tree changes.
- **Derive the topic from the content, not the filename.** A file named `AI Basics.docx` may actually be about AI-assisted engineering practices. Read first, classify after.
- **One source often contains multiple articles.** If a single doc covers several distinct domains (e.g. PRDs *and* software entropy *and* git hooks), split it. Each output article should have one focused topic.
- **Place by domain, not by what's next.** The user learns non-linearly: Claude one week, RAG the next, Codex after that, second brain later. New content rarely lands in a tidy progression. First ask "what domain does this belong to?" — then ask "what's the next slug/order?"
- **Be willing to add a new section.** If the content opens a new area (e.g. Agents, RAG, Prompting, Tooling, Claude, Codex, Second Brain, Evals), draft a new section instead of forcing it into an existing one. Do **not** edit `lib/content.ts` yet — wait for approval.
- **Cross-link aggressively.** Identify 2–5 related articles in other sections to link from the new article (and consider adding back-links from those articles). Cross-links are how non-linear learning becomes a navigable graph.
- **Watch for overlaps with existing articles.** If the new source mostly duplicates an existing article, flag it. Possible outcomes: merge new bits into the existing article, split the genuinely-new material into a deeper companion article, or skip. Bring this to the user — never silently duplicate.
- **Pick the slug + order.** Kebab-case slug; next free `order` in the chosen section (read existing files' frontmatter to find it).

### 3. Present the plan and STOP

Use `AskUserQuestion`. Surface, concisely:

- **Placement** — section / slug / order (and new-section proposal if any).
- **Overlap** — any existing article this duplicates, and the proposed split (merge / new companion / skip).
- **Cross-links** — 2–5 related articles in other sections to link to/from.
- **Open questions** — every unverifiable claim, contradiction, ambiguity, or gap. Ask, don't guess.
- **Fact-check findings** — claims that were wrong/outdated and your proposed correction (with source).
- **Image suggestions** — where a diagram would help (see step 5).

Wait for answers and explicit approval before writing.

### 4. Write the article

Only after approval. Create `content/docs/<section>/<slug>.mdx` following `CONTENT-GUIDE.md`:

- Frontmatter: `title`, `description`, `order`.
- **Write in the docs' language.** Match the language of existing articles (currently English) — translate non-matching sections from the source instead of pasting them through.
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
