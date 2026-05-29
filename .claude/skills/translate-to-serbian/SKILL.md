---
name: translate-to-serbian
description: Translates English MDX articles in this docs site to Serbian, preserving structure exactly, leaving code blocks and technical terminology in English, and rewriting internal cross-links to the /sr/docs/... locale. The skill never paraphrases or reorders content — translation only, essence preserved. Reads from content/docs/en/, writes to content/docs/sr/. Use this skill after structure-learning has produced English docs and the user wants a Serbian version, when the user pastes English MDX asking for Serbian, or says "translate to Serbian", "prevedi na srpski", "add Serbian version", "make this bilingual", "sr version", or "serbian translation" — even when they don't explicitly mention this skill, if they want Serbian docs created from English source this is the right one to run.
---

# Translate to Serbian

Translate fresh English MDX articles into Serbian, preserving structure and technical terminology. **Never paraphrase or restructure** — this is translation, not rewriting. Each output article matches its source paragraph-by-paragraph.

## When to run

Usually right after `structure-learning` writes new English articles to `content/docs/en/`. The companion script `scripts/list-untranslated.sh` finds them automatically.

## Scope resolution

- **No args** → sweep mode. Run `./.claude/skills/translate-to-serbian/scripts/list-untranslated.sh` from the repo root to list every English article without a Serbian counterpart. Translate all of them.
- **File path argument** → translate just that one file. Useful for re-translating after a content edit.

## Workflow

Copy this checklist and tick items off as you go:

```text
Translate-to-serbian progress:
- [ ] 1. Resolve targets (script for sweep, or use the given path)
- [ ] 2. For each target: read content/docs/en/<section>/<slug>.mdx
- [ ] 3. Translate following the rules below
- [ ] 4. Write to content/docs/sr/<section>/<slug>.mdx
- [ ] 5. Run `npm run build` to verify both locales still compile
- [ ] 6. Report the list of files written
```

## Translation rules

### Translate

- Prose paragraphs and list items
- Image `alt` and `caption` (technical terms inside still stay English)
- Table cells that are prose (column headers / row text)
- Bold and italic text inside prose
- Blockquote prose

### Never translate (keep exactly as in source)

- **Frontmatter `title`** — article titles stay English on both locales (e.g. "Tokenization", "How LLMs Are Built", "Introduction"). They appear in the sidebar, breadcrumb, and `<h1>`, and need to read the same way in both locales.
- **Frontmatter `description`** — title-adjacent meta text; keep English for consistency.
- **All headings** (`#`, `##`, `###`, `####`) — stay English on both locales. They appear in the right-side Table of Contents and need to match the English structure.
- **Frontmatter `order`** value
- Code blocks (between triple backticks) — including comments inside them
- Inline code in backticks
- `import` / `export` statements at the top of MDX
- Image `src` paths
- JSX component names and props
- URLs / hostnames / model IDs

### Keep these terms in English even inside translated prose

| Category | Examples (non-exhaustive) |
|---|---|
| **LLM / AI core** | LLM, token, tokenizer, tokenization, BPE, embedding, context window, transformer, attention, pre-training, post-training, fine-tuning, RLHF, instruction tuning, self-supervised, base model, vocabulary |
| **Agentic / coding** | agent, prompt, prompting, RAG, MCP, eval, evals, second brain, codebase, repository, repo, commit, hook, pre-commit, refactor, refactoring, slice, layer, pipeline, framework, library, snippet, source of truth, scope, contract |
| **Quality / loops** | feedback loop, type system, type-check, lint, lint-staged, CI, dataset, deduplication, PII, redaction, double descent, change amplification, cognitive load, unknown unknowns, software entropy, dependencies, obscurity, slop, drift, smart zone, vibe coding, tracer bullets, vertical slice |
| **Tools / brands** | Claude, OpenAI, Anthropic, GPT, ChatGPT, Gemini, Grok, Meta AI, Next.js, MDX, Pandoc, Husky, lint-staged, Prettier, TypeScript, JavaScript, Python, PyTorch, React, Vercel, GitHub, Reddit, HuggingFace |
| **Datasets / orgs** | CommonCrawl, FineWeb, Dolma, C4, RefinedWeb, AI2, Falcon/TII |
| **Doc artifacts** | PRD, plan, user story, acceptance criteria, frontmatter, slug |

Rule of thumb: if it would look weird, untranslatable, or invented in a Serbian engineering team chat, keep it English.

### Cross-link rewriting

Internal links inside the prose must point at the Serbian locale so clicks stay in Serbian:

```text
[text](/docs/<section>/<slug>)        →  [text](/sr/docs/<section>/<slug>)
[text](/docs/<section>/<slug>#anchor) →  [text](/sr/docs/<section>/<slug>#anchor)
```

External links (`https://…`) and image `src` paths stay unchanged.

### Voice

Match the voice of existing Serbian articles in `content/docs/sr/` (e.g. `fundamentals/tokenization.mdx`):

- Latin script (not Cyrillic), since the repo's existing Serbian docs use Latin.
- Clear, direct, slightly informal — second-person when the English source uses "you".
- Use the natural Serbian engineering register that mixes English jargon: "context window", "feedback loop", "commit-uje", "fine-tune-uje".
- Preserve sentence boundaries and paragraph breaks from the source.

## After writing

1. `npm run build` — must pass; broken cross-links or MDX syntax will fail compilation.
2. Briefly report which files were written and any tricky translation decisions (e.g. a coined Serbian term, a deliberate English carry-over the rules don't list).

## Rules

- Translation only. Do not improve, restructure, or add content.
- One Serbian article per English source. Same slug, same frontmatter `order`.
- When in doubt about a term: keep it English and note it in the final report.
- Never invent a Serbian translation for a proper noun or trademark.
