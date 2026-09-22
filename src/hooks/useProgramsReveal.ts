import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from '../lib/enterViewport';

/**
 * "Line slides in from the left out of its overflow-hidden mask" entrance
 * for "Programs We Offer".
 */
export function useProgramsReveal(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl.from(q('.programs-title-line-inner'), { xPercent: -110, duration: 0.8 }, 0);

      cleanupObserver = onEnterViewport(section, () => tl.play());

      return () => tl.kill();
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
