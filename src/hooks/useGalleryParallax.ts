import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Awwwards-style image parallax: each photo's <img> (sized taller than its
 * overflow-hidden card via CSS) drifts vertically at a slower rate than the
 * page scroll, driven by GSAP ScrollTrigger and smoothed through Lenis.
 * Scoped to this page only — Lenis is torn down on unmount so leaving the
 * gallery folder restores native scrolling everywhere else.
 */
export function useGalleryParallax(containerRef: RefObject<HTMLElement | null>, itemCount: number) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    // The route-change scroll-to-top (App.tsx's ScrollToHash) races the
    // site's global `html { scroll-behavior: smooth }`, so it's often still
    // mid-animation when this effect runs. A plain window.scrollTo(0, 0)
    // here loses that race in Chromium (a second scrollTo issued the same
    // frame as an in-flight smooth one is dropped). Lenis owns scroll once
    // constructed, so drive the reset through its own API instead — this
    // resyncs both its internal state and the real scroll position.
    lenis.scrollTo(0, { immediate: true });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

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

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => tween.scrollTrigger?.kill());
      tweens.forEach((tween) => tween.kill());
      gsap.ticker.remove(raf);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
    };
  }, [containerRef, itemCount]);
}
