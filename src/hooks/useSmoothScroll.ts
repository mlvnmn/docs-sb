import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Buttery-smooth scroll for the homepage, driven by Lenis and synced to
 * GSAP's ticker/ScrollTrigger — same wiring as the gallery folder page's
 * useGalleryParallax. Scoped to this page only: Lenis is torn down on
 * unmount so navigating away restores native scrolling everywhere else.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
    };
  }, []);
}
