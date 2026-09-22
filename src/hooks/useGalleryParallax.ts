import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startSmoothScroll } from '../lib/smoothScroll';

/**
 * Awwwards-style image parallax: each photo's <img> (sized taller than its
 * overflow-hidden card via CSS) drifts vertically at a slower rate than the
 * page scroll, driven by GSAP ScrollTrigger and smoothed through Lenis.
 * Scoped to this page only — the smooth-scroll layer is torn down on unmount
 * so leaving the gallery folder restores native scrolling everywhere else.
 */
export function useGalleryParallax(containerRef: RefObject<HTMLElement | null>, itemCount: number) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stopSmoothScroll = startSmoothScroll({ resetScroll: true });

    const images = Array.from(container.querySelectorAll<HTMLImageElement>('.gallery-photo-card img'));
    const tweens = images.map((img) =>
      gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement as HTMLElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      ),
    );

    // The tiles are laid out by a dense grid whose heights depend on images
    // that may still be decoding, so the start/end positions just measured can
    // be stale - recompute them once everything is in place.
    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => tween.scrollTrigger?.kill());
      tweens.forEach((tween) => tween.kill());
      stopSmoothScroll();
    };
  }, [containerRef, itemCount]);
}
