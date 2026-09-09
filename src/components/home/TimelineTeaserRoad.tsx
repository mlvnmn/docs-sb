/**
 * A miniature version of the Timeline page's serpentine road: a single curve
 * that hugs the first card's left edge, sweeps across the gap, then hugs the
 * second card's right edge — using the exact same brand gradient as
 * TimelineRoad's "tl-track-flow" so this teaser reads as a glimpse of the
 * real thing rather than a lookalike.
 *
 * The verticals sit just inside each row's padding (see .timeline-teaser-row
 * in style.css) so the track reads as the card's own glowing border rather
 * than a detached line floating in a gutter. The vertical run into/out of
 * the bend and the bend's own handle length are matched (44 units each) so
 * the curve reads as one continuous arc across the gap between rows, instead
 * of two straight verticals joined by a flat diagonal — mirrors the
 * tangent-continuous approach TimelineRoad.tsx uses for the full page's road.
 */
const TEASER_ROAD_PATH = 'M 8 9 L 8 179 C 8 223, 612 199, 612 243 L 612 411';

export function TimelineTeaserRoad() {
  return (
    <svg
      className="timeline-teaser-road-svg"
      viewBox="0 0 620 420"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tlt-track-flow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF165B" />
          <stop offset="25%" stopColor="#1B79FF" />
          <stop offset="50%" stopColor="#1ACF82" />
          <stop offset="62%" stopColor="#99E24A" />
          <stop offset="80%" stopColor="#FB8700" />
          <stop offset="100%" stopColor="#FF165B" />
        </linearGradient>
        <filter id="tlt-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="tlt-shadow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
        <filter id="tlt-dot-glow" x="-160%" y="-160%" width="420%" height="420%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" />
        </filter>
      </defs>

      <path
        d={TEASER_ROAD_PATH}
        transform="translate(0, 5)"
        filter="url(#tlt-shadow)"
        stroke="#060a24"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <path d={TEASER_ROAD_PATH} opacity="0.3" stroke="url(#tlt-track-flow)" strokeLinecap="round" strokeWidth="14" />
      <path
        d={TEASER_ROAD_PATH}
        filter="url(#tlt-glow)"
        stroke="url(#tlt-track-flow)"
        strokeLinecap="round"
        strokeWidth="6"
      />
      <path
        d={TEASER_ROAD_PATH}
        stroke="#ffffff"
        strokeDasharray="3 6"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeWidth="1.3"
      />

      {/* Start / end nodes — small glowing beads that cap the track, matching
          the gradient's local colour at each end. */}
      <circle cx="8" cy="9" r="7" fill="#1B79FF" opacity="0.5" filter="url(#tlt-dot-glow)" />
      <circle cx="8" cy="9" r="4" fill="#0d1334" stroke="#1B79FF" strokeWidth="2" />
      <circle cx="8" cy="9" r="1.6" fill="#ffffff" />

      <circle cx="612" cy="411" r="7" fill="#FF165B" opacity="0.5" filter="url(#tlt-dot-glow)" />
      <circle cx="612" cy="411" r="4" fill="#0d1334" stroke="#FF165B" strokeWidth="2" />
      <circle cx="612" cy="411" r="1.6" fill="#ffffff" />
    </svg>
  );
}
