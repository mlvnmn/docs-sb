import { useEffect, useState, type RefObject } from 'react';

export interface TeaserRoadGeometry {
  path: string;
  viewBox: string;
  startDot: { x: number; y: number };
  endDot: { x: number; y: number };
}

/**
 * Measures the two content cards' real rendered rects (relative to their
 * shared container) and builds the connecting road's SVG path from those
 * pixel values directly, with the viewBox set to the container's own pixel
 * size — so the path is never stretched non-uniformly the way a fixed
 * viewBox would be at a viewport it wasn't tuned for. Recomputes on resize
 * and on the cards' own size changes (e.g. webfonts loading late).
 */
export function useTeaserRoadPath(
  containerRef: RefObject<HTMLElement | null>,
  firstCardRef: RefObject<HTMLElement | null>,
  secondCardRef: RefObject<HTMLElement | null>,
): TeaserRoadGeometry | null {
  const [geometry, setGeometry] = useState<TeaserRoadGeometry | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const firstCard = firstCardRef.current;
    const secondCard = secondCardRef.current;
    if (!container || !firstCard || !secondCard) return;

    const recompute = () => {
      const containerRect = container.getBoundingClientRect();
      const firstRect = firstCard.getBoundingClientRect();
      const secondRect = secondCard.getBoundingClientRect();
      if (containerRect.width === 0 || containerRect.height === 0) {
        setGeometry(null);
        return;
      }

      const inset = 9;
      const startX = firstRect.left - containerRect.left;
      const startTopY = firstRect.top - containerRect.top + inset;
      const startBottomY = firstRect.bottom - containerRect.top - inset;
      const endX = secondRect.right - containerRect.left;
      const endTopY = secondRect.top - containerRect.top + inset;
      const endBottomY = secondRect.bottom - containerRect.top - inset;

      // Control points sit directly above/below their anchor so the curve's
      // tangent stays vertical right where it meets the straight run down
      // each card's edge — no kink at the join. The handle is a generous
      // fraction of the gap so the turn reads as one smooth arc rather than
      // a sharp elbow.
      const gap = Math.max(endTopY - startBottomY, 1);
      const handle = gap * 0.62;

      const path = [
        `M ${startX} ${startTopY}`,
        `L ${startX} ${startBottomY}`,
        `C ${startX} ${startBottomY + handle}, ${endX} ${endTopY - handle}, ${endX} ${endTopY}`,
        `L ${endX} ${endBottomY}`,
      ].join(' ');

      setGeometry({
        path,
        viewBox: `0 0 ${containerRect.width} ${containerRect.height}`,
        startDot: { x: startX, y: startTopY },
        endDot: { x: endX, y: endBottomY },
      });
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(container);
    observer.observe(firstCard);
    observer.observe(secondCard);
    window.addEventListener('resize', recompute);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, [containerRef, firstCardRef, secondCardRef]);

  return geometry;
}
