import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from '../lib/enterViewport';

/**
 * Same "rises up out of the bottom of the viewport + fades in" entrance used
 * elsewhere on the homepage (e.g. useAboutTeaserReveal's body-copy beat) for
 * the contact section's three intro blocks - the "Talk To Us!" heading, the
 * "Connect with us" block, and the address card - each its own quick beat
 * instead of all three landing on screen at once.
 */
export function useContactReveal(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.55 } });

      tl.from(q('.contact-title-bar, .contact-title, .contact-desc'), { y: 40, autoAlpha: 0 }, 0)
        .from(q('.contact-connect-block'), { y: 40, autoAlpha: 0 }, 0.12)
        .from(q('.address-card-blue'), { y: 40, autoAlpha: 0 }, 0.24);

      cleanupObserver = onEnterViewport(section, () => tl.play());

      return () => tl.kill();
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
