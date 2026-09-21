import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

interface TimelineScroll {
  containerRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  progress: number;
  scale: number;
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const stepRef = useRef(450);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll <= 0 ? 0 : Math.round((el.scrollLeft / maxScroll) * 100));

      const firstCard = el.querySelector<HTMLElement>('[data-timeline-column]');
      // The gap lives on .timeline-archive-row (firstCard's parent), which is
      // the flex container the columns actually sit in — not on el itself
      // (.timeline-archive-scroll), which only wraps that single row and so
      // has no gap of its own to read.
      if (firstCard && firstCard.parentElement) {
        const rowStyle = getComputedStyle(firstCard.parentElement);
        const gap = parseFloat(rowStyle.columnGap || rowStyle.gap || '0');
        stepRef.current = firstCard.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
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

  // The timeline row's height is driven by its cards' intrinsic content
  // (image aspect-ratio + description text), so on a short viewport (small
  // laptop window, landscape phone, a tall header) it can exceed the space
  // left after the title and footer. Rather than letting that overflow grow
  // the page (forcing an unwanted vertical scrollbar) or clipping cards,
  // shrink the row to whatever height is actually available — the page
  // stays exactly one viewport tall and only the horizontal axis scrolls.
  useLayoutEffect(() => {
    const scrollEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const recalc = () => {
      // Measure with any existing scale removed first: getBoundingClientRect
      // reflects the live transform, so reusing a stale scaled rect here
      // would compound on every recalculation.
      const prevTransform = trackEl.style.transform;
      if (prevTransform) trackEl.style.transform = 'none';
      const scrollRect = scrollEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();
      if (prevTransform) trackEl.style.transform = prevTransform;

      const naturalHeight = trackRect.height;
      const availableHeight = scrollRect.bottom - trackRect.top;
      if (naturalHeight <= 0 || availableHeight <= 0) return;
      setScale(Math.min(1, availableHeight / naturalHeight));
    };

    recalc();

    const ro = new ResizeObserver(recalc);
    ro.observe(scrollEl);
    ro.observe(trackEl);
    window.addEventListener('resize', recalc);
    window.addEventListener('orientationchange', recalc);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalc);
      window.removeEventListener('orientationchange', recalc);
    };
  }, []);

  const scrollByStep = (direction: 1 | -1) => {
    containerRef.current?.scrollBy({ left: direction * stepRef.current, behavior: 'smooth' });
  };

  return { containerRef, trackRef, progress, scale, scrollByStep };
}
