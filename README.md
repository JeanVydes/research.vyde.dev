# research.vyde.dev — Zero-Maintenance Preprint Server

Static site generator (**Astro**) + Git. No database, no author logins, no server to patch.

- **Submissions:** Google Form / Tally form (author uploads PDF) → maintainer reviews
- **Metadata:** one Markdown file per paper in `src/content/preprints/`
- **PDFs:** stored in `public/pdfs/`
- **Deploy:** Cloudflare Pages / Vercel / GitHub Pages — push to `main` to publish

Repo: <https://github.com/JeanVydes/research.vyde.dev>

---

## Quick start

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # outputs to dist/
npm run preview
```

## Adding a paper

1. Copy the template:

```bash
cp src/content/preprints/2611.00001.md src/content/preprints/2611.00003.md
```

2. Edit the YAML frontmatter:

```yaml
---
title: "My Paper Title"
authors: ["Author One", "Author Two"]
date: 2026-11-08
id: "2611.00003"
pdf: "/pdfs/2611.00003.pdf"
abstract: "Optional one-paragraph abstract."
keywords: ["tag1", "tag2"]
---
```

- `id` → URL: `/preprints/2611.00003`. Keep it unique. arXiv-style `YYMM.NNNNN` recommended.
- `pdf` must match the file you add to `public/pdfs/`.
- Body (below frontmatter) is rendered on the paper page.

3. Drop the PDF:

```bash
cp my-paper.pdf public/pdfs/2611.00003.pdf
```

4. Commit & push — the host rebuilds automatically.

```bash
git add src/content/preprints/2611.00003.md public/pdfs/2611.00003.pdf
git commit -m "Add preprint 2611.00003: My Paper Title"
git push origin main
```

## Submission form (Google Form / Tally)

Create a form with fields: title, authors (comma-separated), affiliation, email, PDF upload, abstract, keywords. Authors submit without any repo access. You (maintainer) then do steps 1–4 above.

## Citation format

Every paper page shows a copyable plain-text citation:

```
Author A, Author B. Title of Paper. Research — Preprints (2026). Available at: https://research.vyde.dev/preprints/2611.00001
```

> Since there is no DOI, cite via the canonical URL. The site sets `<link rel="canonical">` automatically.

## Deployment

| Host | Build command | Output dir | Notes |
|---|---|---|---|
| Cloudflare Pages | `npm run build` | `dist` | Set `site` in `astro.config.mjs` to your domain |
| Vercel | `npm run build` | `dist` | Framework preset: Astro |
| GitHub Pages | `npm run build` | `dist` | Move `dist` to `gh-pages` branch or use Actions |

Create `wrangler.toml` / `.vercel/project.json` only if your host needs it — default SPA/static settings work.

## Project structure

```
.
├── astro.config.mjs
├── package.json
├── public/
│   └── pdfs/            # PDFs served at /pdfs/<id>.pdf
├── src/
│   ├── content.config.ts          # collection schema
│   ├── content/preprints/*.md     # one file per paper
│   ├── layouts/BaseLayout.astro
│   └── pages/
│       ├── index.astro            # paper list
│       ├── about.astro
│       └── preprints/[id].astro   # paper page + citation block
└── dist/                          # build output
```

## Conventions

- **Sort order:** newest `date` first.
- **File naming:** `<id>.md` and `<id>.pdf` to match `id` in frontmatter.
- **IDs:** never reuse. Deleting a preprint = delete both files and the page is gone — keep an archive copy elsewhere if permanence matters.
