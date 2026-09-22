/**
 * Image pipeline for public/assets/images.
 *
 * For every raster source it writes, side by side:
 *   - a re-encoded `.jpg`/`.png` fallback for older devices that can't do WebP
 *   - a `.webp` that modern browsers pick up through <picture>'s <source>
 *
 * `webpSource` (src/lib/images.ts) derives the WebP path from the fallback
 * path by swapping the extension, so nothing in src/data has to know this ran
 * - keep that naming contract if you change anything here.
 *
 * Sources are rewritten in place, so this is lossy. To stop a second run from
 * re-compressing its own output, input hashes are recorded in
 * scripts/.image-cache.json and unchanged files are skipped. Delete that file
 * only together with `git checkout -- public/assets/images`, or quality will
 * compound away. Originals stay recoverable through git history.
 *
 * Run with: npm run images
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.join(process.cwd(), 'public', 'assets', 'images');
const CACHE_FILE = path.join(process.cwd(), 'scripts', '.image-cache.json');
const SKIPLIST_FILE = path.join(process.cwd(), 'src', 'lib', 'generated', 'no-webp.ts');

/**
 * Per-directory budget. `maxWidth`/`maxHeight` bound the largest box the image
 * is ever displayed in (at roughly 2x, for hidpi), so shrinking to it is
 * invisible; `quality` is the encoder quality for that role.
 */
const RULES = [
  { dir: 'hero', maxWidth: 1920, maxHeight: 1200, quality: 76 },
  { dir: 'campus', maxWidth: 1600, maxHeight: 1600, quality: 76 },
  { dir: 'news', maxWidth: 1200, maxHeight: 1200, quality: 74 },
  { dir: 'gallery', maxWidth: 1400, maxHeight: 1400, quality: 74 },
  { dir: 'programs', maxWidth: 900, maxHeight: 1400, quality: 80 },
  { dir: 'faculty', maxWidth: 600, maxHeight: 800, quality: 80 },
  { dir: 'overview', maxWidth: 1000, maxHeight: 1000, quality: 82 },
  { dir: 'brand', maxWidth: 1200, maxHeight: 1200, quality: 84 },
  { dir: 'recruiters', maxWidth: 400, maxHeight: 200, quality: 88 },
];
const DEFAULT_RULE = { maxWidth: 1400, maxHeight: 1400, quality: 78 };

const RASTER = /\.(jpe?g|png|webp)$/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (RASTER.test(entry.name)) out.push(full);
  }
  return out;
}

const relativeUrl = (absolute) => path.relative(ROOT, absolute).split(path.sep).join('/');
const ruleFor = (relative) => RULES.find((rule) => rule.dir === relative.split('/')[0]) ?? DEFAULT_RULE;
const hash = (buffer) => createHash('sha1').update(buffer).digest('hex').slice(0, 16);
const kb = (bytes) => `${(bytes / 1024).toFixed(0)}kB`;

async function loadCache() {
  try {
    return JSON.parse(await readFile(CACHE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

/**
 * Transparency is the only reason to pay PNG's price: a photograph saved as
 * PNG (the programme posters were) costs several times its JPEG size for no
 * visible gain, so opaque sources always fall back to JPEG whatever they
 * arrived as. WebP sources have no lossy fallback of their own, so one is
 * generated beside them the same way.
 */
const fallbackExtension = (hasAlpha) => (hasAlpha ? '.png' : '.jpg');

/**
 * PNG fallbacks are encoded twice - palette-quantised (tiny, but liable to
 * band on soft gradients) and full-colour - and the palette wins only when the
 * saving is large, so flat line art shrinks hard while gradient artwork keeps
 * its full palette.
 */
async function encodeFallback(pipeline, extension, quality) {
  if (extension !== '.png') {
    return pipeline().jpeg({ quality: quality + 4, progressive: true, mozjpeg: true }).toBuffer();
  }
  const [full, palette] = await Promise.all([
    pipeline().png({ compressionLevel: 9, effort: 10 }).toBuffer(),
    pipeline().png({ compressionLevel: 9, effort: 10, palette: true, quality: 95, dither: 0.6 }).toBuffer(),
  ]);
  return palette.length < full.length * 0.7 ? palette : full;
}

/**
 * Lossy WebP is not automatically a win: flat artwork codes larger as lossy
 * WebP than as PNG, because lossy spends bits on the broad flat areas PNG
 * stores almost for free. Candidates are encoded across a quality ladder plus
 * lossless and the smallest wins; `budget` is the fallback's size, and the
 * ladder keeps descending while nothing fits under it.
 */
async function encodeWebp(pipeline, quality, hasAlpha, budget) {
  const candidates = [await pipeline().webp({ quality, effort: 6, smartSubsample: true }).toBuffer()];
  if (hasAlpha) candidates.push(await pipeline().webp({ lossless: true, effort: 6 }).toBuffer());

  for (const step of [70, 60, 50]) {
    if (step >= quality) continue;
    if (Math.min(...candidates.map((c) => c.length)) <= budget) break;
    candidates.push(await pipeline().webp({ quality: step, effort: 6, smartSubsample: true }).toBuffer());
  }

  return candidates.reduce((best, c) => (c.length < best.length ? c : best));
}

/**
 * Any fallback with no `.webp` sibling on disk is one where WebP lost, so the
 * tree itself is the source of truth - a cached no-op run still regenerates an
 * accurate list.
 */
async function collectSkiplist() {
  const files = (await walk(ROOT)).map(relativeUrl);
  const present = new Set(files);
  return files
    .filter((file) => !file.endsWith('.webp') && !present.has(file.replace(/\.(jpe?g|png)$/i, '.webp')))
    .sort();
}

/**
 * A few images - a flat, near-two-tone watermark, say - palette-quantise to a
 * PNG that no WebP encoding can beat. Serving WebP there would hand modern
 * browsers the *heavier* file, so those get no WebP sibling and are listed
 * here instead; `webpSource` reads this list and omits the <source> for them.
 */
async function writeSkiplist(paths) {
  const lines = [
    '// Generated by scripts/optimize-images.mjs - do not edit by hand.',
    '// Images whose best WebP encoding came out no smaller than the optimised',
    '// original, so <picture> serves that original to every browser instead.',
    '',
    'export const NO_WEBP: ReadonlySet<string> = new Set([',
    ...paths.map((p) => `  '/assets/images/${p}',`),
    ']);',
  ];
  await writeFile(SKIPLIST_FILE, `${lines.join('\n')}\n`, 'utf8');
}

async function main() {
  const cache = await loadCache();
  const files = await walk(ROOT);
  const onDisk = new Set(files.map(relativeUrl));
  let processed = 0;
  let before = 0;
  let after = 0;

  for (const file of files) {
    const key = relativeUrl(file);

    // The WebP outputs this script writes are inputs on the next run; skip any
    // WebP that already has a fallback sibling so a re-run never re-compresses
    // its own output.
    if (key.endsWith('.webp') && ['.jpg', '.png'].some((e) => onDisk.has(key.replace(/\.webp$/i, e)))) continue;

    const source = await readFile(file);
    const sourceHash = hash(source);
    if (cache[key] === sourceHash) continue;

    const rule = ruleFor(key);
    const meta = await sharp(source).metadata();
    const pipeline = () =>
      sharp(source)
        .rotate()
        .resize({
          width: Math.min(meta.width ?? rule.maxWidth, rule.maxWidth),
          height: Math.min(meta.height ?? rule.maxHeight, rule.maxHeight),
          fit: 'inside',
          withoutEnlargement: true,
        });

    const fallbackExt = fallbackExtension(meta.hasAlpha);
    const fallbackPath = file.replace(RASTER, fallbackExt);
    const webpPath = file.replace(RASTER, '.webp');

    const fallback = await encodeFallback(pipeline, fallbackExt, rule.quality);
    const webp = await encodeWebp(pipeline, rule.quality, meta.hasAlpha, fallback.length);
    const webpWins = webp.length < fallback.length;

    await writeFile(fallbackPath, fallback);
    if (webpWins) await writeFile(webpPath, webp);
    // A source in a format we're no longer emitting (a PNG photo now falling
    // back to JPEG, say) is left behind by the writes above - drop it.
    if (path.resolve(fallbackPath) !== path.resolve(file) && path.resolve(webpPath) !== path.resolve(file)) {
      await unlink(file);
    }

    cache[key] = sourceHash;
    cache[relativeUrl(fallbackPath)] = hash(fallback);
    if (webpWins) cache[relativeUrl(webpPath)] = hash(webp);

    before += source.length;
    after += webpWins ? webp.length : fallback.length;
    processed += 1;
    console.log(
      `${key.padEnd(62)} ${kb(source.length).padStart(7)} -> ${fallbackExt.slice(1)} ${kb(fallback.length).padStart(7)}` +
        (webpWins ? ` / webp ${kb(webp.length).padStart(7)}` : ' / webp skipped (no smaller)'),
    );
  }

  await writeFile(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);
  await writeSkiplist(await collectSkiplist());

  console.log(
    processed === 0
      ? '\nAll images already optimised.'
      : `\n${processed} image(s) processed. Modern-browser payload ${kb(before)} -> ${kb(after)} ` +
          `(${Math.round((1 - after / before) * 100)}% smaller).`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
