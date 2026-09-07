import { timelineHeroStats } from '../../data/timeline';

export function TimelineHero() {
  return (
    <section className="tl-hero">
      <div className="tl-hero-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tl-iso-grid" width="60" height="103.92" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path
                d="M 60 0 L 0 34.64 L 0 69.28 L 60 103.92 L 120 69.28 L 120 34.64 Z"
                fill="none"
                stroke="#7093ff"
                strokeOpacity="0.3"
                strokeWidth="0.75"
              />
              <path d="M 0 34.64 L 60 69.28 L 120 34.64" fill="none" stroke="#7093ff" strokeOpacity="0.22" strokeWidth="0.75" />
              <path d="M 60 0 L 60 69.28" fill="none" stroke="#7093ff" strokeOpacity="0.16" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tl-iso-grid)" />
        </svg>
      </div>

      <div className="tl-hero-container">
        <h1 className="tl-hero-title">From a Small Beginning to a Center of Excellence</h1>

        <p className="tl-hero-sub">
          Trace the milestones that shaped the Department of Computer Science — from its founding batch to the
          research, infrastructure, and industry ties it holds today.
        </p>

        <div className="tl-hero-stats">
          {timelineHeroStats.map((stat) => (
            <div className="tl-hero-stat" key={stat.label}>
              <span className="tl-hero-stat-value" style={stat.color ? { color: stat.color } : undefined}>
                {stat.value}
              </span>
              <span className="tl-hero-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
