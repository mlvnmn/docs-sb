# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The git repo root is `docs-sb/` (the working directory `docs-main/` is just its parent folder). All commands below run from `docs-sb/`.

## Commands

```bash
npm install        # node_modules is gitignored and not checked in — run this first
npm run dev        # Vite dev server
npm run build      # tsc -b (type-check) then production build to dist/
npm run preview    # serve the built dist/
npm run typecheck  # tsc -b only, no build
```

The npm scripts invoke `node ./node_modules/vite/bin/vite.js` / `node ./node_modules/typescript/bin/tsc` rather than the bin shims — keep that form when editing scripts.

There is no test suite or linter configured. Verification is manual: run `npm run dev`, check both routes in a browser, and run `npm run build` to catch type errors.

## Architecture

A React + TypeScript single-page app (Vite, `@vitejs/plugin-react`) for the Computer Science department of St Berchmans College, client-routed with `react-router-dom`. It was migrated 1:1 from a prior plain-HTML/CSS/JS multi-page site — visual output and interactive behavior are intended to match that version exactly; only the implementation is React.

**Routes** (`src/App.tsx`):
- `/` → `src/pages/Home.tsx` — the long single-scroll homepage (hero slideshow, Life @ CS, gazette, Our People teaser, recruitment partners, contact)
- `/faculty` → `src/pages/FacultyDirectory.tsx` — the full 18-member faculty directory

Both routes render inside `src/components/layout/Layout.tsx`, which owns the persistent `Header` and `SearchModal`; each page supplies its own footer (`Footer` vs `FacultyFooter`).

**Data layer** (`src/data/*.ts`, typed via `src/types/content.ts`): all copy — nav links, hero slides, the 18 faculty members, the homepage's 2-person teaser, recruiters, footer columns/branding, contact info, campus-life content, gazette placeholder content — lives here as plain data, not JSX. Components read it through `src/hooks/` (`useFaculty`, `useDepartment`, etc.) rather than importing data modules directly, so a future swap to a Payload CMS API only touches the hooks.

**Interactive behavior** lives in `src/hooks/` (one hook per concern: `useHeroSlideshow`, `useFolderStack`, `useContactForm`, `useHeaderScroll`, `useMobileMenu`, `useSearchModal`, `useDocumentMeta`). This replaces the old single `script.js`.

**Assets**: images live in `public/assets/` and are referenced as plain root-absolute path strings (e.g. `/assets/images/faculty/....jpg`) in `src/data/*.ts` and in `style.css` — not as ES imports. This keeps data records shaped like a future CMS API response.

**CSS**: `src/styles/style.css` is the same ~3700-line stylesheet from the original site, moved but otherwise untouched — same design tokens in `:root`, same `/* ==================== SECTION ==================== */` banners, same responsive breakpoints (1200/1024/768/480, mostly consolidated near the end but a few sections carry local media queries). It is imported once, globally, from `src/main.tsx`. No CSS Modules or scoping was introduced — inline `style={{ ... }}` is still the idiom for per-instance accent colors, matching the original's inline `style="..."` usage.

**Routing/navigation**: `src/components/shared/SmartLink.tsx` renders a plain `<a href="#hash">` for a same-page hash link (native browser anchor-jump, matches the old static site) and a react-router `<Link>` for anything that changes route. `App.tsx`'s `ScrollToHash` effect handles scrolling to the right section after a cross-page navigation like `/faculty` → `/#life`.

**Deployment note**: because this is now a client-routed SPA (previously two independent static HTML files), the host must rewrite unmatched paths to `/index.html`. `public/_redirects` covers Netlify (`/*  /index.html  200`); other hosts (Vercel, GitHub Pages, IIS, etc.) need their own equivalent rewrite rule.

## Content gotchas

- **Faculty data lives in one place now**: `src/data/faculty.ts` (18 members, each with an `archetype: 'a'|'b'|'c'|'d'` driving which of `FacultyCard.tsx`'s four layouts renders). The homepage "Our People" teaser is intentionally a *separate* dataset (`src/data/peopleTeaser.ts`) with its own marketing-copy `quote` field — it is not derived from `faculty.ts`, matching the original site's two hand-curated, differently-styled teaser cards.
- `FacultyGrid.tsx` renders `<div id="facultyGrid">` with `.faculty-card` children in a fixed, unwrapped list — `style.css` targets it with `nth-child(3n)` rules, so don't introduce a wrapper element around the mapped cards or the coloring cycle breaks.
- The header search modal collects input but has no search implementation behind it — the quick-tags only prefill the field (`useSearchModal`).
- The contact form (`useContactForm`) is a UI simulation only (fake "Sending…" → "Sent Successfully!"). There is no backend.
- Fonts (Google Fonts) and Font Awesome 6.5.1 load from CDN `<link>` tags in the single `index.html` `<head>` — shared by both routes now, so there's no per-page duplication to keep in sync.
- The first 3 faculty cards render eager (no `loading="lazy"`) to match the original above-the-fold cutoff; the rest pass `eager={false}` (the default) in `FacultyGrid.tsx`. The 4 hero-slide images and header logo are likewise always eager.
- **Known pre-existing CSS bug, not introduced by the React migration**: the mobile nav (`.nav-menu.mobile-open`) sets `flex-direction: column` on `.nav-menu`, but the actual nav items are children of the `<ul class="nav-list">` one level down, which never gets a mobile override — so on narrow viewports the nav items don't stack as intended. This was carried over unmodified from the original `style.css`.
