import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from '../lib/enterViewport';

/**
 * Same "lines rise out of their overflow-hidden mask" entrance used by the
 * homepage "OUR PARTNERS" heading (usePartnersKinetic) — applied here to the
 * Overview section's kicker + title so the two headings share one signature
 * reveal instead of each section inventing its own.
 */
export function useOverviewReveal(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl.from(q('.overview-kicker-line-inner'), { yPercent: 110, duration: 0.8 }, 0).from(
        q('.overview-title-line-inner'),
        { yPercent: 110, duration: 1 },
        0.1,
      );

      cleanupObserver = onEnterViewport(section, () => tl.play());

      return () => tl.kill();
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
