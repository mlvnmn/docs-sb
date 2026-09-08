import { useEffect, type RefObject } from 'react';

/**
 * Fades/slides each photo tile up into place as it scrolls into view —
 * mirrors the reveal used on the Timeline page (see useMilestoneReveal),
 * applied to the gallery folder's photo grid.
 */
export function useGalleryReveal(containerRef: RefObject<HTMLElement | null>, itemCount: number) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = Array.from(container.querySelectorAll<HTMLElement>('.gallery-photo-card'));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef, itemCount]);
}
