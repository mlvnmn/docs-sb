import type { ComponentPropsWithRef } from 'react';
import { webpSource } from '../../lib/images';

type PictureProps = ComponentPropsWithRef<'img'> & { src: string };

/**
 * Drop-in replacement for `<img>` that serves WebP where the browser takes it
 * and the original JPEG/PNG everywhere else. `src` stays the fallback path, so
 * callers pass exactly what they passed an `<img>`; the WebP URL is derived
 * (see webpSource). Every other prop — className, style, loading, ref, the
 * lot — lands on the inner `<img>`, which is what the stylesheet targets.
 *
 * The `<picture>` wrapper is `display: contents` in the base stylesheet, so it
 * leaves layout completely alone: the `<img>` stays the flex/grid item of
 * whatever contained it before, and percentage heights still resolve against
 * that same ancestor.
 */
export function Picture({ src, ...imgProps }: PictureProps) {
  const webp = webpSource(src);

  return (
    <picture>
      {webp && <source srcSet={webp} type="image/webp" />}
      <img src={src} {...imgProps} />
    </picture>
  );
}
