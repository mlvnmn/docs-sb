import { useEffect } from 'react';

/**
 * Keeps a `--header-height` CSS var in sync with the fixed site-header's real
 * rendered height, which varies by breakpoint and can even jump (e.g. the nav
 * wrapping to two lines) independent of any single media-query value. Content
 * that sits directly under the header (the hero card) reads this var instead
 * of a guessed, breakpoint-specific pixel value.
 */
export function useHeaderHeight() {
  useEffect(() => {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    const setHeight = () => {
      document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
}
