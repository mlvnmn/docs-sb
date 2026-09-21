import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

interface GalleryScroll {
  containerRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  progress: number;
  scale: number;
  scrollByStep: (direction: 1 | -1) => void;
}

const STEP = 450;

/**
 * Drives the faculty gallery's horizontal scroll track: converts a normal
 * vertical wheel gesture into horizontal movement, supports click-and-drag
 * panning, and reports scroll progress (0-100) for the footer's progress bar.
 */
export function useFacultyGalleryScroll(): GalleryScroll {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setProgress(100);
        return;
      }
      setProgress(Math.round((el.scrollLeft / maxScroll) * 100));
    };

    // A plain mouse only ever reports vertical wheel notches (deltaY), so that
    // axis always drives the gallery. A trackpad reports both axes — deltaX
    // already scrolls the element natively (overflow-x: auto), so only the
    // deltaY component needs converting here; that keeps both swipe
    // directions working on a trackpad.
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
      el.classList.add('fg-dragging');
    };
    const onMouseLeaveOrUp = () => {
      isDown = false;
      el.classList.remove('fg-dragging');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = startScrollLeft - (x - startX) * 1.6;
    };

    // Touch devices have no wheel events at all, and this element's
    // overflow-y is hidden, so a plain vertical finger-swipe would otherwise
    // fall through to scrolling the whole page. Track both axes of the drag
    // and feed their combined movement into horizontal scroll, so swiping in
    // either direction moves the gallery.
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

  // The card track has fixed pixel heights, so on a short viewport (small
  // laptop window, landscape phone, a device with a tall header) it can be
  // taller than the space left after the secondary nav and footer strip.
  // Rather than letting that overflow grow the page (forcing an unwanted
  // vertical scrollbar) or clipping cards, shrink the track to whatever
  // height is actually available — the page stays exactly one viewport tall
  // and only the horizontal axis ever scrolls.
  useLayoutEffect(() => {
    const scrollEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const recalc = () => {
      // Measure with any existing scale removed first: getBoundingClientRect
      // reflects the live transform, so reusing a stale scaled rect here
      // would compound on every recalculation. scrollHeight/ResizeObserver
      // aren't affected by transform, but they also don't account for the
      // track's own margin — which stays full-size regardless of scale — so
      // rects (comparing the track's actual top edge to the scroll box's
      // actual bottom edge) are the only measurement that can't drift.
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
    containerRef.current?.scrollBy({ left: direction * STEP, behavior: 'smooth' });
  };

  return { containerRef, trackRef, progress, scale, scrollByStep };
}
