# Content Authoring Guide

## File Structure

Articles live in `content/docs/<section>/<slug>.mdx`.

```
content/docs/
├── getting-started/
│   ├── introduction.mdx
│   └── prerequisites.mdx
├── fundamentals/
│   └── neural-networks.mdx
├── transformers/
│   └── self-attention.mdx
└── llm-engineering/
    └── tokenization.mdx
```

Sections: `getting-started`, `fundamentals`, `transformers`, `llm-engineering`.
Defined in `lib/content.ts` → `SECTION_ORDER`.

URL pattern: `/docs/<section>/<slug>` (e.g. `/docs/fundamentals/neural-networks`).

---

## Frontmatter

Every `.mdx` file must start with YAML frontmatter:

```yaml
---
title: Neural Networks
description: Introduction to neural networks and how they learn.
order: 3
---
```

| Field         | Required | Purpose                              |
| ------------- | -------- | ------------------------------------ |
| `title`       | Yes      | Page title, sidebar nav, metadata    |
| `description` | Yes      | SEO meta description, OG tags        |
| `order`       | Yes      | Sort position within section (1-based) |

---

## Headings

Use `#` through `####`. Headings get auto-generated IDs (`rehype-slug`) and become clickable links (`rehype-autolink-headings`). `h2` and `h3` appear in the right-side Table of Contents.

```mdx
# Page Title        ← h1 (one per page, matches frontmatter title)
## Major Section    ← h2 (shown in TOC, has bottom border)
### Subsection      ← h3 (shown in TOC)
#### Minor heading  ← h4
```

---

## Links

Internal and external links are handled automatically:

```mdx
<!-- Internal → uses Next.js Link, client-side navigation -->
[prerequisites](/docs/getting-started/prerequisites)

<!-- External → opens in new tab with noopener noreferrer -->
[PyTorch docs](https://pytorch.org/docs)
```

---

## Code Blocks

Fenced code blocks get Shiki syntax highlighting + a copy button automatically.

````mdx
```python
import torch

layer = torch.nn.Linear(768, 768)
output = layer(torch.randn(1, 768))
```
````

Supported languages: `python`, `typescript`, `tsx`, `javascript`, `jsx`, `bash`, `json`, `yaml`, `css`, `html`, `sql`, `markdown`, and many more via Shiki.

### Line Highlighting

Use Shiki transformer comments inside code blocks:

````mdx
```python
import torch

# [!code highlight]
model = torch.nn.Linear(768, 768)

# [!code ++]
new_line = "added"

# [!code --]
old_line = "removed"
```
````

### Inline Code

Use backticks for inline code: `` `torch.nn.Linear` `` renders with muted background and monospace font.

---

## Images

### Option 1: Markdown Syntax (quick & simple)

Place image in `public/images/` and use standard markdown:

```mdx
![Alt text](/images/my-image.png)
```

Renders via `next/image` at fixed 720×400. No blur placeholder.

### Option 2: Screenshot Component (recommended)

Import the image as a static asset for blur placeholder, auto dimensions, and optional caption:

```mdx
import { Screenshot } from '@/components/mdx/screenshot'
import img from '@/public/images/docs/my-image.png'

<Screenshot
  src={img}
  alt="Description of the image"
  caption="Optional caption below the image"
/>
```

**Screenshot props:**

| Prop        | Type                       | Required | Default |
| ----------- | -------------------------- | -------- | ------- |
| `src`       | `StaticImageData \| string` | Yes      | —       |
| `alt`       | `string`                   | Yes      | —       |
| `caption`   | `string`                   | No       | —       |
| `width`     | `number`                   | No       | 720     |
| `className` | `string`                   | No       | —       |

**Where to put images:** `public/images/docs/<section>/<name>.png`

---

## Tables

Standard GitHub Flavored Markdown tables:

```mdx
| Feature     | Status |
| ----------- | ------ |
| Tokenization| Done   |
| Fine-tuning | WIP    |
```

Supports alignment with `:` syntax (`:---`, `:---:`, `---:`).

---

## Blockquotes / Tips

Use `>` for callouts and tips:

```mdx
> All code examples use PyTorch. See the
> [prerequisites](/docs/getting-started/prerequisites) page for setup.
```

Renders with a left border and italic styling.

---

## Bold, Italic, Lists

Standard markdown:

```mdx
**bold text**
*italic text*

- Bullet item
- Another item

1. Numbered item
2. Another item
```

---

## Horizontal Rules

```mdx
---
```

Adds a divider between sections.

---

## Adding a New Article

1. Create `content/docs/<section>/<slug>.mdx`
2. Add frontmatter with `title`, `description`, `order`
3. Write content using the elements above
4. Place any images in `public/images/docs/<section>/`
5. The article auto-appears in sidebar nav and search

### Adding a New Section

Edit `SECTION_ORDER` in `lib/content.ts`:

```typescript
const SECTION_ORDER: Record<string, { title: string; order: number }> = {
  'getting-started': { title: 'Getting Started', order: 1 },
  fundamentals: { title: 'Fundamentals', order: 2 },
  transformers: { title: 'Transformers', order: 3 },
  'llm-engineering': { title: 'LLM Engineering', order: 4 },
  'new-section': { title: 'New Section', order: 5 },  // ← add here
};
```

Then create the matching directory: `content/docs/new-section/`.

---

## Quick Template

```mdx
---
title: Article Title
description: One-line summary of the article.
order: 1
---

# Article Title

Intro paragraph.

## First Section

Content with **bold** and *italic*.

> Tip or important note goes here.

### Code Example

​```python
import torch
model = torch.nn.Linear(768, 768)
​```

### With an Image

import { Screenshot } from '@/components/mdx/screenshot'
import img from '@/public/images/docs/section/example.png'

<Screenshot src={img} alt="Example" caption="What this shows" />

## Second Section

| Column A | Column B |
| -------- | -------- |
| Value    | Value    |

---

Next: [Next Article](/docs/section/next-article)
```
