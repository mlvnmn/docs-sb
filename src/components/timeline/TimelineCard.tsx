import type { TimelineMilestone } from '../../types/content';

interface TimelineCardProps {
  milestone: TimelineMilestone;
  isFirst: boolean;
  eager: boolean;
}

export function TimelineCard({ milestone, isFirst, eager }: TimelineCardProps) {
  return (
    <article className={`timeline-card timeline-card-${milestone.accent}`}>
      <div className="timeline-card-image-wrap">
        {isFirst && <span className="timeline-card-flag" aria-hidden="true" />}
        <img
          className="timeline-card-image"
          src={milestone.image}
          alt={milestone.title}
          loading={eager ? 'eager' : 'lazy'}
        />
        <span className="timeline-card-expand" aria-hidden="true">
          <i className="fa-solid fa-arrow-up-right-from-square" />
        </span>
      </div>

      <div className="timeline-card-body">
        <span className="timeline-card-tag">{milestone.tag}</span>
        <h3 className="timeline-card-title">{milestone.title}</h3>
        <div className="timeline-card-dots" aria-hidden="true">
          + + + + +
        </div>
        <p className="timeline-card-desc">{milestone.description}</p>

        <div className="timeline-card-footer">
          <span className="timeline-card-footer-label">{milestone.footerLabel}</span>
          <span className="timeline-card-footer-code">{milestone.footerCode}</span>
        </div>
      </div>
    </article>
  );
}
