import { useEffect } from 'react';
import { startSmoothScroll } from '../lib/smoothScroll';

/**
 * Buttery-smooth scroll for the homepage. Scoped to this page only: Lenis is
 * torn down on unmount so navigating away restores native scrolling
 * everywhere else.
 */
export function useSmoothScroll() {
  useEffect(() => startSmoothScroll(), []);
}
