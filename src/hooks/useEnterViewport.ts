/**
 * Fires `callback` the instant `el` enters the viewport, using
 * IntersectionObserver rather than a scroll-position/velocity heuristic —
 * so it fires immediately whether the user arrives by a slow scroll, a fast
 * fling, or an instant jump (anchor link, browser back/forward), with no
 * chance of a multi-frame "blank" gap before a scroll-triggered animation
 * starts. `bottomMargin` shrinks the viewport's bottom edge inward (e.g.
 * '-10%' fires once the element is 10% up from the bottom, matching the
 * old ScrollTrigger 'top 90%' start point).
 */
export function onEnterViewport(el: Element, callback: () => void, bottomMargin = '-10%'): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        callback();
        observer.disconnect();
      }
    },
    { rootMargin: `0px 0px ${bottomMargin} 0px`, threshold: 0 },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
