# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # node_modules is gitignored and not checked in — run this first
npm run dev        # Vite dev server
npm run build      # tsc -b (type-check) then production build to dist/
npm run preview    # serve the built dist/
npm run typecheck  # tsc -b only, no build
npm run images     # re-run the image pipeline over public/assets/images (see below)
```

The npm scripts invoke `node ./node_modules/vite/bin/vite.js` / `node ./node_modules/typescript/bin/tsc` rather than the bin shims — keep that form when editing scripts.

There is no test suite or linter configured. Verification is manual: `npm run build` to catch type errors, then `npm run preview` and check the routes in a browser. Headless Chrome is a practical way to diff a change against the previous build — screenshot the same route on two ports and compare — which is how the `<picture>` migration was validated.

## Architecture

A React + TypeScript single-page app (Vite, `@vitejs/plugin-react`) for the Computer Science department of St Berchmans College, client-routed with `react-router-dom`. Animation is GSAP (+ ScrollTrigger) with Lenis for smooth scrolling.

**Routes** (`src/App.tsx`) — `/` renders eagerly, everything else is `React.lazy`:

| Route | Page |
| --- | --- |
| `/` | `pages/Home.tsx` — hero slideshow, overview stats, programmes, about teaser, partners wall, contact |
| `/faculty` | `pages/FacultyDirectory.tsx` — 18 members in horizontally-scrolling clusters |
| `/about` | `pages/About.tsx` |
| `/timeline` | `pages/Timeline.tsx` → `components/timeline/TimelineArchive.tsx` |
| `/bcaacadamics`, `/msccsacadamics` | `pages/Academics.tsx` (same component, different props) |
| `/gallery`, `/gallery/:slug` | `pages/Gallery.tsx`, `pages/GalleryFolder.tsx` |
| `/news` | `pages/News.tsx` — broadsheet layout, also renders `components/news/GazetteSection.tsx` |
| `/initiatives` | `pages/Initiatives.tsx` — a "Coming Soon" placeholder |

All routes render inside `components/layout/Layout.tsx`, which owns the persistent `Header`; each page supplies its own `Footer`.

**Data layer** (`src/data/*.ts`, typed via `src/types/content.ts`): all copy lives here as plain data, not JSX. Components read it through `src/hooks/` (`useFaculty`, `useOverview`, `usePartners`, `usePrograms`, `useNews`) rather than importing data modules directly — those thin pass-through hooks exist so a future swap to a CMS API only touches the hooks. Keep them.

**Interactive behaviour** lives in `src/hooks/`, one hook per concern. `src/lib/` holds the plain helpers that are not hooks (`enterViewport`, `smoothScroll`, `images`).

## Images

`public/assets/images/` is organised by role: `brand/`, `hero/`, `campus/`, `news/`, `faculty/`, `programs/`, `recruiters/`, `overview/`, `gallery/{activities,complab,snapshots}/`. Paths are plain root-absolute strings in `src/data/*.ts` (not ES imports), so data records stay shaped like a CMS response.

**Every raster has two files: a `.jpg`/`.png` fallback and a `.webp` beside it.** That is the whole contract:

- `scripts/optimize-images.mjs` (`npm run images`) re-encodes sources in place, caps dimensions per directory, writes the WebP sibling, and picks whichever encoding is actually smaller. It records input hashes in `scripts/.image-cache.json` so a second run is a no-op — **do not delete that cache without also running `git checkout -- public/assets/images`**, or the lossy pass compounds on its own output.
- When WebP can't beat the original (flat artwork sometimes can't), no `.webp` is written and the path is listed in the generated `src/lib/generated/no-webp.ts`.
- `src/lib/images.ts` derives the WebP URL from the fallback URL by swapping the extension, consulting that skiplist.
- `components/shared/Picture.tsx` is a drop-in `<img>` replacement that emits `<picture><source type="image/webp"><img></picture>`. **Use it for every local image** — `src` stays the fallback path and all other props land on the inner `<img>`, which is what the stylesheet targets.

`base.css` sets `picture { display: contents }` so the wrapper is invisible to layout, plus `picture > source { display: none }` — without that second rule `display: contents` promotes `<source>` into the parent grid/flex container and it steals a cell.

## CSS

Plain global CSS, no modules or scoping, so **import order is load-bearing**. Inline `style={{ ... }}` is still the idiom for per-instance accent colours, matching the original static site.

- `src/styles/index.css` is imported once from `main.tsx` and `@import`s only what every route needs: `base.css` (tokens + reset), `layout/`, and the `home/` sections. `responsive.css` holds cross-section breakpoint overrides for everything imported above it and must stay in place; `home/partners.css` deliberately sits after it.
- `src/styles/routes/*.css` are route-scoped and imported from the page component, so they ship in that route's chunk rather than the global bundle. Nothing in them shares a class with a global stylesheet — check that before moving a rule across the line, and keep a section's media queries with its base rules.

Every `--font-*` token in `base.css` must also be requested in `index.html`'s single Google Fonts link, or it silently falls back. Note that Space Grotesk stops at weight 700 upstream, so the 800/900 headings render from 700.

## Content gotchas

- `src/data/faculty.ts` holds all 18 members. `components/faculty/FacultyCluster.tsx` assigns card layouts **positionally** (6 per cluster, in list order) — reordering the data changes which layout each person gets.
- The contact form (`useContactForm`) is a UI simulation with no backend (fake "Sending…" → "Sent Successfully!"), the news subscription coupon likewise, and the gazette/news copy is placeholder text.
- `useHorizontalScroll` drives both the faculty directory and the timeline archive (wheel → horizontal, drag, touch, progress, and shrink-to-fit via `zoom`). It was two near-identical hooks; keep it one.
- The first faculty cluster and the first hero slide render eager; the other three hero slides are `fetchPriority="low"` because all four are in the viewport from the start, so `loading="lazy"` would not defer them. Slide 1 is also preloaded in `index.html`.
- Fonts and Font Awesome 6.5.1 load from CDN `<link>` tags in `index.html`. Font Awesome is deliberately render-blocking: an `<i>` with no glyph yet has no width, so deferring it shifts every button it sits in. Replacing those ~36 icons with inline SVG is the largest remaining payload win.
- Because this is a client-routed SPA, the host must rewrite unmatched paths to `/index.html`: `vercel.json` and `public/_redirects` (Netlify) cover that, and `vercel.json` / `public/_headers` also set image cache headers. Other hosts need their own equivalents.
