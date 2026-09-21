import { timelineIntro, timelineMilestones } from '../../data/timeline';
import { useTimelineScroll } from '../../hooks/useTimelineScroll';
import { TimelineCard } from './TimelineCard';

export function TimelineArchive() {
  const { containerRef, progress, scrollByStep } = useTimelineScroll();

  return (
    <div className="timeline-page">
      <div className="timeline-page-decor" aria-hidden="true">
        <img
          className="timeline-archive-tower"
          src="/assets/images/about/tower-lineart.png"
          alt=""
          loading="lazy"
        />
        <span className="timeline-star timeline-star-1">✦</span>
        <span className="timeline-star timeline-star-2">✦</span>
        <span className="timeline-star timeline-star-3">✦</span>
      </div>

      <h2 className="timeline-page-title">
        <span className="timeline-archive-title-solid">{timelineIntro.titleTop}</span>
        <span className="timeline-archive-title-outline">{timelineIntro.titleBottom}</span>
      </h2>

      <main className="timeline-archive-scroll" ref={containerRef}>
        <div className="timeline-archive-row">
          <div className="timeline-archive-line" aria-hidden="true" />
          {timelineMilestones.map((milestone, index) => (
            <div className="timeline-archive-column" data-timeline-column key={milestone.id}>
              <div className="timeline-archive-point">
                <span
                  className={`timeline-archive-dot timeline-archive-dot-${milestone.accent}${
                    milestone.active ? ' timeline-archive-dot-active' : ''
                  }`}
                />
                <span
                  className="timeline-archive-year-pill"
                  style={{ transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})` }}
                >
                  {milestone.year}
                </span>
                {milestone.active && <span className="timeline-archive-pointer" aria-hidden="true" />}
              </div>

              <TimelineCard milestone={milestone} isFirst={index === 0} eager={index < 2} />
            </div>
          ))}
        </div>
      </main>

      <footer className="timeline-archive-footer">
        <div className="timeline-archive-footer-left">
          <span aria-hidden="true">✦</span>
          <span aria-hidden="true">•</span>
          DEPARTMENT OF COMPUTER SCIENCE &bull; ST BERCHMANS
        </div>

        <div className="timeline-archive-footer-right">
          <span className="timeline-archive-scroll-label">SCROLL ARCHIVE</span>
          <div className="timeline-archive-progress-track">
            <span className="timeline-archive-progress-handle" style={{ left: `${progress}%` }} />
          </div>
          <span className="timeline-archive-progress-pct">{progress}%</span>
          <div className="timeline-archive-nav-buttons">
            <button type="button" onClick={() => scrollByStep(-1)} aria-label="Previous milestone">
              &larr;
            </button>
            <button type="button" onClick={() => scrollByStep(1)} aria-label="Next milestone">
              &rarr;
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
