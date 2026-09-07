import { recruiters } from '../../data/recruiters';

export function RecruitmentSection() {
  return (
    <section className="recruitment-section" id="partners">
      <div className="recruitment-overlay" />

      <div className="recruitment-container">
        <div className="recruitment-title-col">
          <h2 className="recruitment-title">
            <span className="title-highlight">TOP</span>
            <br />
            <span className="title-main">RECRUITMENT</span>
            <br />
            <span className="title-main">PARTNERS</span>
          </h2>
          <p className="recruitment-sub">
            Leading global technology companies, research labs, and IT enterprises actively recruiting talent from our
            Department of Computer Science.
          </p>
        </div>

        <div className="recruitment-grid-col">
          <div className="company-logo-grid">
            {recruiters.map((r) => (
              <div className="company-logo-card" key={r.name}>
                <img loading="lazy" decoding="async" src={r.logo} alt={r.name} className="company-logo-img" />
              </div>
            ))}
            <div className="company-logo-card company-more-badge">
              <span>&amp; more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
