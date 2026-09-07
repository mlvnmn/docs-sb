import { timelineCTA } from '../../data/timeline';
import { SmartLink } from '../shared/SmartLink';

export function TimelineCTA() {
  return (
    <section className="tl-cta">
      <div className="tl-cta-container">
        <div className="tl-cta-icon">
          <span className="material-symbols-outlined">explore</span>
        </div>
        <h2 className="tl-cta-title">{timelineCTA.title}</h2>
        <p className="tl-cta-body">{timelineCTA.body}</p>
        <div className="tl-cta-actions">
          <SmartLink to={timelineCTA.primaryHref} className="tl-cta-btn tl-cta-btn-primary">
            {timelineCTA.primaryLabel}
          </SmartLink>
          <SmartLink to={timelineCTA.secondaryHref} className="tl-cta-btn tl-cta-btn-secondary">
            {timelineCTA.secondaryLabel}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
