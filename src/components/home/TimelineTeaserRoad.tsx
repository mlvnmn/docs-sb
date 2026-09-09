import type { TeaserRoadGeometry } from '../../hooks/useTeaserRoadPath';

/**
 * A miniature version of the Timeline page's serpentine road: a single curve
 * that hugs the first row's content card on its left edge, sweeps across the
 * gap, then hugs the second (reversed) row's content card on its right edge
 * — using the exact same brand gradient as TimelineRoad's "tl-track-flow" so
 * this teaser reads as a glimpse of the real thing rather than a lookalike.
 *
 * The path/viewBox come from useTeaserRoadPath, which measures the cards'
 * real rendered rects, so this never has to hardcode pixel coordinates tuned
 * to one viewport — the road stays aligned to the cards at any width instead
 * of warping under preserveAspectRatio="none"'s non-uniform stretch.
 */
export function TimelineTeaserRoad({ geometry }: { geometry: TeaserRoadGeometry | null }) {
  if (!geometry) return null;

  const { path, viewBox, startDot, endDot } = geometry;

  return (
    <svg className="timeline-teaser-road-svg" viewBox={viewBox} fill="none" aria-hidden="true">
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
        d={path}
        transform="translate(0, 5)"
        filter="url(#tlt-shadow)"
        stroke="#060a24"
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeWidth="14"
      />
      <path d={path} opacity="0.3" stroke="url(#tlt-track-flow)" strokeLinecap="round" strokeWidth="14" />
      <path d={path} filter="url(#tlt-glow)" stroke="url(#tlt-track-flow)" strokeLinecap="round" strokeWidth="6" />
      <path
        d={path}
        stroke="#ffffff"
        strokeDasharray="3 6"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeWidth="1.3"
      />

      {/* Start / end nodes — small glowing beads that cap the track, matching
          the gradient's local colour at each end. */}
      <circle cx={startDot.x} cy={startDot.y} r="7" fill="#1B79FF" opacity="0.5" filter="url(#tlt-dot-glow)" />
      <circle cx={startDot.x} cy={startDot.y} r="4" fill="#0d1334" stroke="#1B79FF" strokeWidth="2" />
      <circle cx={startDot.x} cy={startDot.y} r="1.6" fill="#ffffff" />

      <circle cx={endDot.x} cy={endDot.y} r="7" fill="#FF165B" opacity="0.5" filter="url(#tlt-dot-glow)" />
      <circle cx={endDot.x} cy={endDot.y} r="4" fill="#0d1334" stroke="#FF165B" strokeWidth="2" />
      <circle cx={endDot.x} cy={endDot.y} r="1.6" fill="#ffffff" />
    </svg>
  );
}
