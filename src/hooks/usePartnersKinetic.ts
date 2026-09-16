import { useCallback, useLayoutEffect, useRef, useState, type FocusEvent, type MouseEvent, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Behaviour for the homepage "OUR PARTNERS" kinetic type wall.
 *
 * - Cursor card: a floating logo card trails the pointer (GSAP quickTo for
 *   the lag) while a name is hovered, tilting slightly with pointer velocity.
 *   Keyboard focus parks the card under the focused name instead.
 * - Scroll skew: the marquee rows shear a few degrees with scroll velocity
 *   and ease back to level — the wall feels pulled by the page.
 * - Entrance: heading lines rise out of their masks; rows slide in from
 *   alternating sides.
 *
 * All GSAP work is registered through gsap.matchMedia so nothing runs under
 * `prefers-reduced-motion: reduce`; the CSS marquee is disabled there too.
 */
export function usePartnersKinetic(sectionRef: RefObject<HTMLElement | null>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const moveX = useRef<((v: number) => void) | null>(null);
  const moveY = useRef<((v: number) => void) | null>(null);
  const tilt = useRef<((v: number) => void) | null>(null);
  const lastX = useRef(0);
  const reduced = useRef(false);

  const place = useCallback((clientX: number, clientY: number, immediate = false) => {
    const section = sectionRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    if (immediate || reduced.current || !moveX.current || !moveY.current) {
      gsap.set(cardRef.current, { x, y });
      return;
    }
    moveX.current(x);
    moveY.current(y);
    const dx = clientX - lastX.current;
    lastX.current = clientX;
    tilt.current?.(gsap.utils.clamp(-8, 8, dx * 0.35));
  }, [sectionRef]);

  const onWordEnter = useCallback(
    (index: number, e: MouseEvent<HTMLElement>) => {
      lastX.current = e.clientX;
      place(e.clientX, e.clientY, true);
      setHovered(index);
    },
    [place],
  );

  const onWordMove = useCallback((e: MouseEvent<HTMLElement>) => place(e.clientX, e.clientY), [place]);

  const onWordFocus = useCallback(
    (index: number, e: FocusEvent<HTMLElement>) => {
      const r = e.currentTarget.getBoundingClientRect();
      place(r.left + r.width / 2, r.bottom, true);
      setHovered(index);
    },
    [place],
  );

  const onWordLeave = useCallback(() => {
    setHovered(null);
    tilt.current?.(0);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const q = gsap.utils.selector(section);

        // ---- Cursor card lag.
        moveX.current = gsap.quickTo(card, 'x', { duration: 0.5, ease: 'power3' });
        moveY.current = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power3' });
        tilt.current = gsap.quickTo(card, 'rotation', { duration: 0.6, ease: 'power3' });

        // ---- Entrance.
        const rows = q('.partners-row');
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: section, start: 'top 65%', once: true },
        });
        tl.from(q('.partners-eyebrow'), { y: -8, autoAlpha: 0, duration: 0.6 }, 0)
          .from(q('.partners-title-line-inner'), { yPercent: 110, duration: 1, stagger: 0.09 }, 0.05)
          .from(q('.partners-lede'), { y: 14, autoAlpha: 0, duration: 0.7 }, 0.35)
          .from(
            rows,
            { x: (i: number) => (i % 2 ? 80 : -80), autoAlpha: 0, duration: 1, stagger: 0.12, ease: 'power4.out' },
            0.25,
          )
          .from(q('.partners-foot'), { y: 10, autoAlpha: 0, duration: 0.6 }, 0.8);

        // ---- Scroll-velocity skew on the rows.
        const proxy = { skew: 0 };
        const setSkew = gsap.quickSetter(rows, 'skewX', 'deg');
        const clampSkew = gsap.utils.clamp(-7, 7);
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const skew = clampSkew(self.getVelocity() / -260);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.9,
                ease: 'power3',
                overwrite: true,
                onUpdate: () => setSkew(proxy.skew),
              });
            }
          },
        });

        return () => {
          moveX.current = null;
          moveY.current = null;
          tilt.current = null;
        };
      },
      section,
    );

    return () => mm.revert();
  }, [sectionRef]);

  return { cardRef, hovered, onWordEnter, onWordMove, onWordFocus, onWordLeave };
}
