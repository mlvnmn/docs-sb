/**
 * A miniature version of the Timeline page's serpentine road: a single curve
 * running down beside the first card, sweeping across to the other side, then
 * down beside the second card — using the exact same brand gradient as
 * TimelineRoad's "tl-track-flow" so this teaser reads as a glimpse of the
 * real thing rather than a lookalike.
 */
const TEASER_ROAD_PATH = 'M 6 6 L 6 190 C 6 212, 614 196, 614 224 L 614 414';

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
      </defs>

      <path d={TEASER_ROAD_PATH} opacity="0.3" stroke="url(#tlt-track-flow)" strokeLinecap="round" strokeWidth="18" />
      <path
        d={TEASER_ROAD_PATH}
        filter="url(#tlt-glow)"
        stroke="url(#tlt-track-flow)"
        strokeLinecap="round"
        strokeWidth="7"
      />
      <path
        d={TEASER_ROAD_PATH}
        stroke="#ffffff"
        strokeDasharray="3 6"
        strokeOpacity="0.75"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}
