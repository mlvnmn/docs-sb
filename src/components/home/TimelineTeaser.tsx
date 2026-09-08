import type { CSSProperties } from 'react';
import { timelineMilestones } from '../../data/timeline';
import { SmartLink } from '../shared/SmartLink';
import { TimelineTeaserRoad } from './TimelineTeaserRoad';

export function TimelineTeaser() {
  const glimpseMilestones = timelineMilestones.slice(0, 2);

  return (
    <div className="timeline-teaser">
      <h2 className="timeline-teaser-title">Our Milestones &amp; Momentum</h2>

      <p className="timeline-teaser-sub">
        Trace the milestones that shaped the Department of Computer Science — from its founding batch to the
        research, infrastructure, and industry ties it holds today.
      </p>

      <div className="timeline-teaser-cards tl-page">
        <TimelineTeaserRoad />

        {glimpseMilestones.map((milestone, index) => (
          <div className={`timeline-teaser-row${index % 2 === 1 ? ' timeline-teaser-row-reverse' : ''}`} key={milestone.id}>
            <div
              className="tl-card tl-glass timeline-teaser-card"
              style={{ ['--tl-accent' as string]: milestone.accent } as CSSProperties}
            >
              <span className="tl-card-bar" />
              <div className="tl-card-head">
                <div className="tl-card-head-left">
                  <span className="tl-era-pill" style={{ color: milestone.tint }}>
                    {milestone.era}
                  </span>
                  <span className="tl-era-year">{milestone.year}</span>
                </div>
                <div className="tl-icon-box">
                  <span className="material-symbols-outlined">{milestone.icon}</span>
                </div>
              </div>

              <h3 className="tl-card-title">{milestone.title}</h3>
              <p className="tl-card-desc">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>

      <SmartLink to="/timeline" className="timeline-teaser-btn">
        View Full Timeline
        <i className="fa-solid fa-arrow-right" />
      </SmartLink>
    </div>
  );
}
