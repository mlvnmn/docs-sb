import { NO_WEBP } from './generated/no-webp';

/**
 * scripts/optimize-images.mjs writes a `.webp` next to every optimised
 * `.jpg`/`.png` under public/assets/images, so the modern-format URL is always
 * the fallback URL with its extension swapped — that naming contract is the
 * only thing tying the two halves together, which keeps src/data records
 * shaped like a plain CMS response (one `image` path, no format bookkeeping).
 *
 * Returns null when there is no WebP to offer: either the path isn't a local
 * optimised raster (a remote logo, an SVG) or the script found WebP couldn't
 * beat the original and skipped it.
 */
export function webpSource(src: string): string | null {
  if (!src.startsWith('/assets/') || NO_WEBP.has(src)) return null;

  const match = /\.(jpe?g|png)$/i.exec(src);
  if (!match) return null;

  return `${src.slice(0, match.index)}.webp`;
}
