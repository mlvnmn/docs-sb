import { useEffect, type RefObject } from 'react';

/**
 * Fades/slides each milestone row in as it enters the viewport — a direct
 * port of the reference design's IntersectionObserver reveal.
 */
export function useMilestoneReveal(rowRefs: RefObject<(HTMLElement | null)[]>, rowCount: number) {
  useEffect(() => {
    const elements = rowRefs.current.filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rowRefs, rowCount]);
}
