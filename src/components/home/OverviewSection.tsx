import { useRef } from 'react';
import { useOverview } from '../../hooks/useOverview';
import { useOverviewReveal } from '../../hooks/useOverviewReveal';
import { useOverviewCounters } from '../../hooks/useOverviewCounters';

export function OverviewSection() {
  const { content, stats } = useOverview();
  const sectionRef = useRef<HTMLElement | null>(null);
  useOverviewReveal(sectionRef);
  useOverviewCounters(sectionRef);

  return (
    <section className="overview-section" id="overview" ref={sectionRef}>
      <span className="overview-seam-fade" aria-hidden="true" />
      <img
        className="overview-watermark"
        src="/assets/images/dept_logo.jpeg"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="overview-container">
        <span className="overview-title-bar" aria-hidden="true" />
        <span className="overview-kicker-line">
          <span className="overview-kicker overview-kicker-line-inner">{content.kicker}</span>
        </span>
        <h2 className="overview-title">
          <span className="overview-title-line">
            <span className="overview-title-line-inner">
              {content.headingLead} {content.headingTrail}
            </span>
          </span>
        </h2>

        <div className="overview-stats-row">
          <span className="overview-rings" aria-hidden="true" />

          <div className="overview-stats">
            {stats.map((stat) => (
              <div className="overview-stat" key={stat.id}>
                <div className="overview-stat-value">
                  <span className="overview-stat-num" data-value={stat.value}>
                    {stat.value}
                  </span>
                  <svg className="overview-stat-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 18L18 6M18 6H9M18 6V15"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="overview-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {content.taglineLead && (
          <p className="overview-tagline">
            {content.taglineLead} <strong>{content.taglineEmphasis}</strong>
          </p>
        )}
      </div>
    </section>
  );
}
