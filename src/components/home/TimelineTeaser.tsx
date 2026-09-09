import { useRef } from 'react';
import { timelineMilestones } from '../../data/timeline';
import { SmartLink } from '../shared/SmartLink';
import { Companion, MilestoneContent } from '../timeline/TimelineRoad';
import { TimelineTeaserRoad } from './TimelineTeaserRoad';
import { useTeaserRoadPath } from '../../hooks/useTeaserRoadPath';

export function TimelineTeaser() {
  const glimpseMilestones = timelineMilestones.slice(0, 2);

  const cardsRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const secondCardRef = useRef<HTMLDivElement | null>(null);
  const roadGeometry = useTeaserRoadPath(cardsRef, firstCardRef, secondCardRef);

  return (
    <div className="timeline-teaser">
      <span className="timeline-teaser-kicker-bar" aria-hidden="true" />

      <h2 className="timeline-teaser-title">
        Our <span className="timeline-teaser-title-violet">Milestones</span> &amp;{' '}
        <span className="title-highlight">Momentum</span>
      </h2>

      <p className="timeline-teaser-sub">
        Trace the milestones that shaped the Department of Computer Science — from its founding batch to the
        research, infrastructure, and industry ties it holds today.
      </p>

      <div className="timeline-teaser-cards tl-page" ref={cardsRef}>
        <TimelineTeaserRoad geometry={roadGeometry} />

        {glimpseMilestones.map((milestone, index) => (
          <div className={`timeline-teaser-row tl-node${index % 2 === 1 ? ' tl-node-reverse' : ''}`} key={milestone.id}>
            <div className="tl-col-content" ref={index === 0 ? firstCardRef : secondCardRef}>
              <MilestoneContent milestone={milestone} />
            </div>
            <div className="tl-col-companion">
              <Companion companion={milestone.companion} accent={milestone.accent} />
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
