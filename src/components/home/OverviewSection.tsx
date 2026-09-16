import { useOverview } from '../../hooks/useOverview';

export function OverviewSection() {
  const { content, stats } = useOverview();

  return (
    <section className="overview-section" id="overview">
      <span className="overview-seam-fade" aria-hidden="true" />
      <img
        className="overview-watermark"
        src="/assets/images/dept_logo.jpeg"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="overview-container">
        <span className="overview-kicker">{content.kicker}</span>
        <h2 className="overview-title">
          {content.headingLead} {content.headingTrail}
        </h2>

        <div className="overview-stats-row">
          <span className="overview-rings" aria-hidden="true" />

          <div className="overview-stats">
            {stats.map((stat) => (
              <div className="overview-stat" key={stat.id}>
                <div className="overview-stat-value">
                  {stat.value}
                  <svg className="overview-stat-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M6 18L18 6M18 6H9M18 6V15"
                      stroke="currentColor"
                      strokeWidth="2.4"
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
