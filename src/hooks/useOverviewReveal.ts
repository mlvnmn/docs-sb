import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(section);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      });

      tl.from(q('.overview-kicker-line-inner'), { yPercent: 110, duration: 0.8 }, 0).from(
        q('.overview-title-line-inner'),
        { yPercent: 110, duration: 1 },
        0.1,
      );

      return () => tl.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, [sectionRef]);
}
