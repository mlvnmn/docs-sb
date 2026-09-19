import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from './useEnterViewport';

/**
 * Same "line rises out of its overflow-hidden mask" entrance used elsewhere
 * (useOverviewReveal) for the "About Our Department" heading, then the body
 * copy + link rise in as a second, separate beat once the heading is done —
 * not both together.
 */
export function useAboutTeaserReveal(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);
      // The heading sits well inside the section (offset by the frame's own
      // top padding), so trigger off it directly rather than the section's
      // outer edge, or the reveal fires late relative to when it's actually
      // visible on screen.
      const trigger = section.querySelector<HTMLElement>('.about-v2-content') ?? section;

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tl.from(q('.about-v2-title-line-inner'), { yPercent: 110, duration: 0.5, stagger: 0.08 }, 0).from(
        q('.about-v2-text, .about-v2-link'),
        { y: 16, autoAlpha: 0, duration: 0.4, stagger: 0.08 },
        0.4,
      );

      cleanupObserver = onEnterViewport(trigger, () => tl.play(), '-5%');

      return () => tl.kill();
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
