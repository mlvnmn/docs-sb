import { useEffect, type RefObject } from 'react';

/**
 * Direct port of the reference "Nocturne Pathway" scroll engine: as the user
 * scrolls the road container, the animated energy-flow path draws itself in
 * (via stroke-dashoffset) and a glowing orb rides its leading tip (via
 * getPointAtLength). Runs as an imperative effect against refs, mirroring the
 * original vanilla-JS implementation, rather than driving 60fps updates
 * through React state.
 */
export function useTimelineRoadScroll(
  containerRef: RefObject<HTMLElement | null>,
  flowPathRef: RefObject<SVGPathElement | null>,
  orbRef: RefObject<SVGGElement | null>,
) {
  useEffect(() => {
    const flowLine = flowPathRef.current;
    let totalLength = 2400;

    if (flowLine) {
      try {
        totalLength = flowLine.getTotalLength();
      } catch {
        totalLength = 2400;
      }
      flowLine.style.strokeDasharray = String(totalLength);
      flowLine.style.strokeDashoffset = String(totalLength);
    }

    const update = () => {
      const container = containerRef.current;
      if (!container || !flowLine) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const targetMiddleScreen = windowHeight * 0.5;

      let progress = (targetMiddleScreen - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));

      const currentLength = progress * totalLength;
      const currentOffset = totalLength - currentLength;
      flowLine.style.strokeDashoffset = String(currentOffset);

      if (progress > 0.01 && progress < 0.99) {
        flowLine.classList.add('flowing');
      } else {
        flowLine.classList.remove('flowing');
      }

      const orb = orbRef.current;
      if (orb) {
        if (progress > 0.01 && progress < 0.99) {
          try {
            const pt = flowLine.getPointAtLength(currentLength);
            orb.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
            orb.style.opacity = '1';
          } catch {
            orb.style.opacity = '0';
          }
        } else {
          orb.style.opacity = '0';
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [containerRef, flowPathRef, orbRef]);
}
