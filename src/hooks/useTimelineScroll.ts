import { useEffect, useRef, useState, type RefObject } from 'react';

interface TimelineScroll {
  containerRef: RefObject<HTMLDivElement | null>;
  progress: number;
  scrollByStep: (direction: 1 | -1) => void;
}

/**
 * Drives the timeline archive's horizontal scroll track: converts a normal
 * vertical wheel gesture into horizontal movement, supports click-and-drag
 * panning and touch swipes, and reports scroll progress (0-100) for the
 * footer's progress bar. Mirrors useFacultyGalleryScroll so both full-bleed
 * horizontal galleries behave identically.
 */
export function useTimelineScroll(): TimelineScroll {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const stepRef = useRef(450);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll <= 0 ? 0 : Math.round((el.scrollLeft / maxScroll) * 100));

      const firstCard = el.querySelector<HTMLElement>('[data-timeline-column]');
      if (firstCard) {
        const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap || '0');
        stepRef.current = firstCard.offsetWidth + gap;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (e.deltaY === 0) return;
      el.scrollLeft += e.deltaY * 1.5;
      e.preventDefault();
    };

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return;
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      startScrollLeft = el.scrollLeft;
      el.classList.add('timeline-dragging');
    };
    const onMouseLeaveOrUp = () => {
      isDown = false;
      el.classList.remove('timeline-dragging');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = startScrollLeft - (x - startX) * 1.6;
    };

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScrollLeft = 0;

    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return;
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartScrollLeft = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const touch = e.touches[0];
      const combinedDelta = touchStartX - touch.clientX + (touchStartY - touch.clientY);
      el.scrollLeft = touchStartScrollLeft + combinedDelta;
      e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeaveOrUp);
    el.addEventListener('mouseup', onMouseLeaveOrUp);
    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeaveOrUp);
      el.removeEventListener('mouseup', onMouseLeaveOrUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const scrollByStep = (direction: 1 | -1) => {
    containerRef.current?.scrollBy({ left: direction * stepRef.current, behavior: 'smooth' });
  };

  return { containerRef, progress, scrollByStep };
}
