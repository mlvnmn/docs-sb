import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Starts Lenis and drives it from GSAP's ticker, with ScrollTrigger updating
 * off Lenis's scroll events so scroll-linked animations stay in step with the
 * smoothed position rather than the raw one.
 *
 * Callers own the teardown and must run it on unmount: Lenis takes over the
 * document's scrolling for as long as it lives, so leaving one behind would
 * keep smooth scroll (and its scroll hijacking) active on pages that never
 * asked for it.
 */
export function startSmoothScroll({ resetScroll = false } = {}): () => void {
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

  const onLenisScroll = () => ScrollTrigger.update();
  lenis.on('scroll', onLenisScroll);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // `resetScroll` is opt-in because it must not fight a hash deep link: the
  // homepage can be entered at /#contact, and forcing the top there would undo
  // the jump. Pages that always open at the top (the gallery folder) do want
  // it, because the route-change scroll-to-top in App.tsx races the global
  // `html { scroll-behavior: smooth }` and a plain window.scrollTo(0, 0) loses
  // that race in Chromium - a second scrollTo issued in the same frame as an
  // in-flight smooth one is dropped. Lenis owns scrolling once constructed, so
  // the reset goes through its own API, which resyncs both its internal state
  // and the real scroll position.
  if (resetScroll) lenis.scrollTo(0, { immediate: true });

  return () => {
    gsap.ticker.remove(raf);
    lenis.off('scroll', onLenisScroll);
    lenis.destroy();
  };
}
