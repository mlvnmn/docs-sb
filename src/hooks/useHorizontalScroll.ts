import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

export interface HorizontalScroll {
  /** The `overflow-x` scroll box. */
  containerRef: RefObject<HTMLDivElement | null>;
  /** The full-width row inside it, which is what gets shrunk to fit. */
  trackRef: RefObject<HTMLDivElement | null>;
  /** 0-100, for a progress bar. */
  progress: number;
  /** <1 when the track had to be shrunk to fit the viewport height. */
  scale: number;
  scrollByStep: (direction: 1 | -1) => void;
}

interface Options {
  /**
   * Selector for one "card" in the track. When it matches, an arrow-button
   * press advances by exactly one card (its width plus the row's column gap)
   * instead of a round number of pixels. Omit for a fixed `fallbackStep`.
   */
  stepSelector?: string;
  /** Pixels per arrow-button press when `stepSelector` doesn't match. */
  fallbackStep?: number;
  /**
   * What to report when the content fits and there is nothing to scroll.
   * The faculty directory shows a full bar (the archive is "all seen"); the
   * timeline shows an empty one (you are at the first milestone).
   */
  progressWhenUnscrollable?: 0 | 100;
}

/**
 * Drives a full-bleed horizontal track — the faculty directory and the
 * timeline archive both use one. It converts a normal vertical wheel gesture
 * into horizontal movement, supports click-and-drag panning and touch swipes
 * in either direction, reports scroll progress for the footer bar, and shrinks
 * the track when it is taller than the space available.
 *
 * While dragging, the container carries `is-dragging` (styled to `cursor:
 * grabbing` in both stylesheets).
 */
export function useHorizontalScroll({
  stepSelector,
  fallbackStep = 450,
  progressWhenUnscrollable = 0,
}: Options = {}): HorizontalScroll {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stepRef = useRef(fallbackStep);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      setProgress(maxScroll <= 0 ? progressWhenUnscrollable : Math.round((el.scrollLeft / maxScroll) * 100));

      if (!stepSelector) return;
      const card = el.querySelector<HTMLElement>(stepSelector);
      // The gap lives on the flex row the cards actually sit in (the card's
      // parent), not on `el`, which only wraps that single row and so has no
      // gap of its own to read.
      if (card?.parentElement) {
        const rowStyle = getComputedStyle(card.parentElement);
        const gap = parseFloat(rowStyle.columnGap || rowStyle.gap || '0');
        stepRef.current = card.offsetWidth + (Number.isNaN(gap) ? 0 : gap);
      }
    };

    // A plain mouse only ever reports vertical wheel notches (deltaY), so that
    // axis always drives the track. A trackpad reports both axes — deltaX
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
      el.classList.add('is-dragging');
      // A press in here begins a pan, not a selection. Without this the
      // browser also starts its native text-selection (and image-drag)
      // gesture, so panning left highlighted every name, heading and photo it
      // crossed. Anything genuinely clickable returned above, so nothing that
      // needs the default mousedown behaviour reaches this point.
      e.preventDefault();
    };
    const onMouseLeaveOrUp = () => {
      isDown = false;
      el.classList.remove('is-dragging');
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = startScrollLeft - (x - startX) * 1.6;
    };

    // Touch devices have no wheel events at all, and this element's overflow-y
    // is hidden, so a plain vertical finger-swipe would otherwise fall through
    // to scrolling the whole page. Track both axes of the drag and feed their
    // combined movement into horizontal scroll, so swiping in either direction
    // moves the track.
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
  }, [stepSelector, progressWhenUnscrollable]);

  // The track's height is driven by its cards, so on a short viewport (a small
  // laptop window, a landscape phone, a device with a tall header) it can
  // exceed the space left after the page's own chrome. Rather than letting
  // that overflow grow the page (forcing an unwanted vertical scrollbar) or
  // clipping cards, shrink the track to whatever height is actually available
  // — the page stays exactly one viewport tall and only the horizontal axis
  // ever scrolls.
  useLayoutEffect(() => {
    const scrollEl = containerRef.current;
    const trackEl = trackRef.current;
    if (!scrollEl || !trackEl) return;

    const recalc = () => {
      // Measure with any existing zoom removed first: getBoundingClientRect
      // reflects the live zoom, so reusing a stale zoomed rect would compound
      // on every recalculation. `zoom` (rather than transform: scale) is what
      // gets applied because it affects real layout, which keeps
      // scrollWidth/clientWidth honest for the horizontal scroll maths instead
      // of leaving them reporting the pre-shrink size. Rects are used rather
      // than offsetHeight because they're the only measurement that also
      // accounts for the track's own margin, which stays full-size whatever
      // the zoom.
      const prevZoom = trackEl.style.zoom;
      if (prevZoom) trackEl.style.zoom = '1';
      const scrollRect = scrollEl.getBoundingClientRect();
      const trackRect = trackEl.getBoundingClientRect();
      if (prevZoom) trackEl.style.zoom = prevZoom;

      const naturalHeight = trackRect.height;
      const availableHeight = scrollRect.bottom - trackRect.top;
      if (naturalHeight <= 0 || availableHeight <= 0) return;
      setScale(Math.min(1, availableHeight / naturalHeight));
    };

    recalc();

    const observer = new ResizeObserver(recalc);
    observer.observe(scrollEl);
    observer.observe(trackEl);
    window.addEventListener('resize', recalc);
    window.addEventListener('orientationchange', recalc);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recalc);
      window.removeEventListener('orientationchange', recalc);
    };
  }, []);

  const scrollByStep = useCallback((direction: 1 | -1) => {
    containerRef.current?.scrollBy({ left: direction * stepRef.current, behavior: 'smooth' });
  }, []);

  return { containerRef, trackRef, progress, scale, scrollByStep };
}
