# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The git repo root is `docs-sb/` (the working directory `docs-main/` is just its parent folder). All commands below run from `docs-sb/`.

## Commands

```bash
npm install        # node_modules is gitignored and not checked in — run this first
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run preview    # serve the built dist/
```

The npm scripts invoke `node ./node_modules/vite/bin/vite.js` rather than the `vite` bin shim — keep that form when editing scripts.

There is no test suite, linter, or formatter configured. Verification is manual: run `npm run dev` and check the pages in a browser.

## Architecture

A static, multi-page marketing site for the Computer Science department of St Berchmans College. No framework, no runtime dependencies — plain HTML + one global stylesheet + one global script, bundled by Vite only for asset hashing and multi-entry builds.

**Pages / entry points** — declared in [vite.config.js](vite.config.js) `build.rollupOptions.input`:
- `index.html` — the long single-scroll homepage (header, hero slideshow, Life @ CS, gazette, Our People teaser, recruitment partners, contact, footer, plus video + search modals)
- `faculty/index.html` — the full 18-member faculty directory

**Adding a new page requires registering it in `vite.config.js`**, or it won't be emitted by `npm run build` (it will still work in dev).

**Shared global layer**: every page loads the same [style.css](style.css) (~3700 lines) and [script.js](script.js). `script.js` is one `DOMContentLoaded` handler where each feature block is guarded by a null/length check, so the same script runs harmlessly on pages that lack those elements. Follow that pattern when adding behavior — do not split per-page scripts unless a feature is genuinely page-local (see the faculty filter below for the existing precedent of an inline page-local `<script>`).

**CSS conventions**: design tokens (fonts, brand colors, retro/brutalist accents, shadows, `--transition`) live in `:root` at the top of `style.css`. The file is organized by `/* ==================== SECTION ==================== */` banner comments that mirror the same banner comments in `index.html` — keep the two in sync when adding a section. Most responsive rules are consolidated in the `RESPONSIVE MEDIA QUERIES` block near the end (breakpoints 1200 / 1024 / 768 / 480), but a few sections (contact, faculty masonry grid, recruitment partners) carry their own local media queries next to their rules. Check both places before assuming a breakpoint is missing. Inline `style="..."` attributes are used liberally for per-instance accent colors and one-off spacing; that is the established idiom here, not an accident.

## Path conventions (easy to break)

- `index.html` references assets **relatively** (`assets/images/...`, `style.css`, `script.js`).
- `faculty/index.html` references everything **root-absolutely** (`/style.css`, `/script.js`, `/assets/images/...`) because it lives one directory down.

Any new page in a subdirectory must use root-absolute paths. The site therefore assumes deployment at a domain root, not a sub-path. Cross-page links use `/`, `/faculty/`, and `/#section-id` anchors.

## Content gotchas

- **Faculty data is hardcoded markup in two places.** `faculty/index.html` holds all 18 members as `.brutalist-card.faculty-card` elements cycling through four layout archetypes (`card-archetype-a`…`-d`, styled by `nth-child(3n)` rules on `#facultyGrid`). The homepage "Our People" teaser hand-picks two members with *different* classes (`card-stephanie`, `card-salimon`). Updating a person means editing both files.
- The header search modal collects input but has no search implementation behind it — the quick-tags only prefill the field.
- The contact form submit handler in `script.js` is a UI simulation only (fake "Sending…" → "Sent Successfully!"). There is no backend.
- Fonts (Google Fonts) and icons (Font Awesome 6.5.1) load from CDN in each page's `<head>`; new pages need those `<link>` tags copied. The font URL requests only the families actually referenced by `:root` tokens — adding a family to CSS means adding it there too.
- Below-the-fold `<img>` tags carry `loading="lazy" decoding="async"`; the header logo and the four hero-slide images are deliberately left eager so the hero never flashes empty.
