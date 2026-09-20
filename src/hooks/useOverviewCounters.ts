import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { onEnterViewport } from './useEnterViewport';

// Single knob for the odometer roll speed - tweak these to retime the
// animation. Keep this constant even if it looks unused by a linter's
// "inline this" suggestion; it's the intended place to adjust speed, not
// dead weight to optimize away.
export const OVERVIEW_COUNTER_ROLL_SPEED = {
  minDuration: 0.9,
  maxDuration: 2.2,
  targetDivisor: 350,
};

/**
 * Rolls each stat's digits like odometer wheels - sliding the correct digit
 * up into place from below - once the stats row scrolls into view. Digit
 * markup (which positions roll and from what starting digit) lives in
 * OverviewSection/overview.ts; this hook just animates each wheel's track.
 */
export function useOverviewCounters(sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    let cleanupObserver: (() => void) | undefined;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const nums = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.overview-stat-num'));

      const tweens = nums.flatMap((numEl) => {
        const target = parseInt(numEl.dataset.value ?? '0', 10);
        // Same per-stat duration scaling as before: small stats get a short,
        // snappy roll; only the biggest stat earns the longer glide.
        // See OVERVIEW_COUNTER_ROLL_SPEED above to retime this.
        const { minDuration, maxDuration, targetDivisor } = OVERVIEW_COUNTER_ROLL_SPEED;
        const duration = gsap.utils.clamp(minDuration, maxDuration, minDuration + target / targetDivisor);

        const tracks = gsap.utils.toArray<HTMLElement>(numEl.querySelectorAll('.overview-digit-track'));

        return tracks
          .map((track) => {
            const cellCount = track.querySelectorAll('.overview-digit-cell').length;
            if (cellCount < 2) return null; // static digit - nothing to roll

            // yPercent (relative to the track's own current height) instead
            // of a pixel offset measured from a cell's offsetHeight - the
            // pixel version raced webfont loading: if the swap hadn't
            // happened yet when we measured, the animation targeted a
            // stale height and the wheel landed a sliver off its final
            // digit, showing two digits half-overlapped ("stuck" between
            // them). A percentage is re-resolved against the box's actual
            // size on every frame, so it lands exactly regardless of when
            // fonts settle.
            gsap.set(track, { yPercent: 0 });
            return gsap.to(track, {
              yPercent: (-(cellCount - 1) / cellCount) * 100,
              duration,
              ease: 'power2.out',
              paused: true,
            });
          })
          .filter((tween): tween is gsap.core.Tween => tween !== null);
      });

      cleanupObserver = onEnterViewport(section, () => tweens.forEach((tween) => tween.play()));

      return () => tweens.forEach((tween) => tween.kill());
    });

    return () => {
      cleanupObserver?.();
      mm.revert();
    };
  }, [sectionRef]);
}
