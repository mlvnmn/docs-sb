import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from './useEnterViewport';

/**
 * Counts each stat up from 0 to its real value once the stats row scrolls
 * into view, instead of the numbers just appearing pre-filled.
 */
export function useOverviewCounters(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const nums = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.overview-stat-num'));
      const tweens = nums.map((el) => {
        const target = parseInt(el.dataset.value ?? '0', 10);
        const counter = { val: 0 };
        // Reserve the final digit width up front so the box doesn't resize
        // (and drag the whole pill/section along with it) as digits appear.
        el.style.minWidth = `${String(target).length}ch`;
        el.textContent = '0';

        return gsap.to(counter, {
          val: target,
          duration: 0.9,
          ease: 'power2.out',
          paused: true,
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });

      cleanupObserver = onEnterViewport(section, () => tweens.forEach((tween) => tween.play()));

      return () => tweens.forEach((tween) => tween.kill());
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
