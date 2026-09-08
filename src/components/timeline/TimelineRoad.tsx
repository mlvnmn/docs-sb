import { useRef } from 'react';
import { timelineMilestones, type TimelineCompanion, type TimelineMilestone } from '../../data/timeline';
import { useTimelineRoadScroll } from '../../hooks/useTimelineRoadScroll';
import { useMilestoneReveal } from '../../hooks/useMilestoneReveal';
import { TimelineGridTexture } from './TimelineGridTexture';

type RoadPoint = [number, number];

/**
 * Catmull-Rom -> cubic Bezier conversion. Threading the road through hand-picked
 * control points (the original approach) produced sharp hairpin reversals
 * wherever two segments' tangents disagreed. A spline through the same
 * waypoints keeps the tangent continuous at every station, so the road always
 * reads as one smooth winding curve instead of a zigzag.
 */
function buildSerpentinePath(points: RoadPoint[]): string {
  if (points.length < 2) return '';

  const segments = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    segments.push(`C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`);
  }
  return segments.join(' ');
}

const ROAD_TOP_Y = 200;
const ROAD_BOTTOM_Y = 2660;
const ROAD_LEFT_X = 280;
const ROAD_RIGHT_X = 780;
const ROAD_VIEWBOX_HEIGHT = ROAD_BOTTOM_Y + 240;

const ROAD_STATIONS: RoadPoint[] = timelineMilestones.map((_, index) => {
  const t = index / Math.max(timelineMilestones.length - 1, 1);
  const y = ROAD_TOP_Y + (ROAD_BOTTOM_Y - ROAD_TOP_Y) * t;
  const x = index % 2 === 0 ? ROAD_LEFT_X : ROAD_RIGHT_X;
  return [x, y];
});

const ROAD_PATH = buildSerpentinePath(ROAD_STATIONS);

function Companion({ companion, accent }: { companion: TimelineCompanion; accent: string }) {
  const accentStyle = { ['--tl-accent' as string]: accent };

  if (companion.kind === 'chart') {
    const max = Math.max(...companion.bars, 1);
    return (
      <div className="tl-companion tl-glass" style={accentStyle}>
        <div className="tl-companion-header">
          <span className="tl-companion-label">{companion.label}</span>
          <span className="tl-companion-status">{companion.status}</span>
        </div>
        <div className="tl-chart-box">
          <div className="tl-chart-bars">
            {companion.bars.map((bar, i) => (
              <div
                key={i}
                className="tl-chart-bar"
                style={{ height: `${(bar / max) * 100}%`, opacity: 0.35 + (i / companion.bars.length) * 0.65 }}
              />
            ))}
          </div>
        </div>
        <p className="tl-chart-caption">{companion.caption}</p>
      </div>
    );
  }

  if (companion.kind === 'terminal') {
    return (
      <div className="tl-companion tl-glass" style={accentStyle}>
        <div className="tl-terminal-head">
          <div className="tl-terminal-badge">{companion.badge}</div>
          <div>
            <span className="tl-terminal-title">{companion.title}</span>
            <span className="tl-terminal-subtitle">{companion.subtitle}</span>
          </div>
        </div>
        <div className="tl-terminal-box">
          <div className="tl-terminal-status-row">
            <span>{companion.statusLabel}</span>
            <span>{companion.statusValue}</span>
          </div>
          {companion.lines.map((line, i) => (
            <div key={i} style={line.color ? { color: line.color } : undefined}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (companion.kind === 'map') {
    return (
      <div className="tl-companion tl-glass" style={accentStyle}>
        <div className="tl-map-box">
          <div className="tl-map-content">
            <span className="material-symbols-outlined">{companion.icon}</span>
            <div className="tl-map-heading">{companion.heading}</div>
            <div className="tl-map-subheading">{companion.subheading}</div>
          </div>
        </div>
        <div className="tl-map-footer">
          <span>{companion.footerLabel}</span>
          <span>{companion.footerValue}</span>
        </div>
      </div>
    );
  }

  if (companion.kind === 'workflow') {
    return (
      <div className="tl-companion tl-glass" style={accentStyle}>
        <span className="tl-workflow-heading">{companion.heading}</span>
        <div className="tl-workflow-list">
          {companion.items.map((item) => (
            <div className="tl-workflow-item" key={item.label}>
              <span className="tl-workflow-item-label">{item.label}</span>
              <span
                className="tl-workflow-item-status"
                style={{
                  background: `${item.statusColor}33`,
                  border: `1px solid ${item.statusColor}4d`,
                  color: item.statusColor,
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
        <p className="tl-workflow-footnote">{companion.footnote}</p>
      </div>
    );
  }

  if (companion.kind === 'neural') {
    return (
      <div className="tl-companion tl-glass" style={accentStyle}>
        <div className="tl-companion-header" style={{ border: 'none', paddingBottom: 0 }}>
          <span className="tl-companion-label" style={{ textTransform: 'none', color: '#fff', fontWeight: 700 }}>
            {companion.heading}
          </span>
          <span className="tl-neural-dot" />
        </div>
        <div className="tl-neural-box">
          <div className="tl-neural-event-title">
            <span className="material-symbols-outlined">insights</span>
            <span>{companion.eventTitle}</span>
          </div>
          <p>{companion.eventBody}</p>
          <div className="tl-neural-footer">
            <span>{companion.impactLabel}</span>
            <span>{companion.impactValue}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tl-companion tl-glass" style={accentStyle}>
      <div className="tl-spec-head">
        <span className="material-symbols-outlined">{companion.icon}</span>
        <div>
          <span className="tl-spec-heading">{companion.heading}</span>
          <span className="tl-spec-subheading">{companion.subheading}</span>
        </div>
      </div>
      <p className="tl-spec-body">{companion.body}</p>
      <div className="tl-spec-footer">
        <span>{companion.footLabel}</span>
        <span>{companion.footValue}</span>
      </div>
    </div>
  );
}

function MilestoneContent({ milestone }: { milestone: TimelineMilestone }) {
  const accentStyle = { ['--tl-accent' as string]: milestone.accent };

  return (
    <div className={`tl-card tl-glass${milestone.finale ? ' tl-card-finale' : ''}`} style={accentStyle}>
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

      <h2 className="tl-card-title">{milestone.title}</h2>
      <p className="tl-card-desc">{milestone.description}</p>

      <div className="tl-stat-grid">
        {milestone.stats.map((stat) => (
          <div key={stat.label}>
            <span className="tl-stat-label">{stat.label}</span>
            <span className={`tl-stat-value${stat.accent ? ' tl-stat-value-accent' : ''}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {milestone.note.type === 'quote' ? (
        <div className="tl-note tl-note-quote">
          <span className="material-symbols-outlined">{milestone.note.icon ?? 'format_quote'}</span>
          <span>{milestone.note.text}</span>
        </div>
      ) : (
        <div className="tl-note">
          <span className="material-symbols-outlined">{milestone.note.icon}</span>
          <span>{milestone.note.text}</span>
        </div>
      )}
    </div>
  );
}

export function TimelineRoad() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flowPathRef = useRef<SVGPathElement | null>(null);
  const orbRef = useRef<SVGGElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useTimelineRoadScroll(containerRef, flowPathRef, orbRef);
  useMilestoneReveal(rowRefs, timelineMilestones.length);

  return (
    <section className="tl-road" id="evolution-map-container">
      <TimelineGridTexture patternId="tl-iso-grid-road" />

      <div className="tl-road-container" ref={containerRef}>
        <div className="tl-road-svg-wrap" aria-hidden="true">
          <svg
            className="tl-road-svg"
            viewBox={`0 0 1000 ${ROAD_VIEWBOX_HEIGHT}`}
            fill="none"
            preserveAspectRatio="xMidYMin slice"
          >
            <defs>
              <linearGradient id="tl-sidewall-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2d3a7e" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#182052" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0e1436" stopOpacity="0.98" />
              </linearGradient>

              <linearGradient id="tl-track-flow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF165B" />
                <stop offset="25%" stopColor="#1B79FF" />
                <stop offset="50%" stopColor="#1ACF82" />
                <stop offset="62%" stopColor="#99E24A" />
                <stop offset="80%" stopColor="#FB8700" />
                <stop offset="100%" stopColor="#FF165B" />
              </linearGradient>

              <filter id="tl-ribbon-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="tl-ribbon-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="28" stdDeviation="20" floodColor="#080e2a" floodOpacity="0.75" />
              </filter>
            </defs>

            <path
              d={ROAD_PATH}
              fill="none"
              opacity="0.16"
              stroke="url(#tl-track-flow)"
              strokeLinecap="round"
              strokeWidth="60"
              transform="translate(0, 16)"
            />
            <path
              d={ROAD_PATH}
              fill="none"
              filter="url(#tl-ribbon-shadow)"
              stroke="#0b102b"
              strokeLinecap="round"
              strokeOpacity="0.9"
              strokeWidth="70"
              transform="translate(0, 36) scale(1, 0.98)"
            />
            <path
              d={ROAD_PATH}
              fill="none"
              stroke="url(#tl-sidewall-grad)"
              strokeLinecap="round"
              strokeWidth="56"
              transform="translate(0, 22)"
            />
            <path
              d={ROAD_PATH}
              fill="none"
              filter="url(#tl-ribbon-glow)"
              stroke="url(#tl-track-flow)"
              strokeLinecap="round"
              strokeWidth="46"
            />
            <path
              d={ROAD_PATH}
              fill="none"
              stroke="#ffffff"
              strokeDasharray="8 14"
              strokeLinecap="round"
              strokeOpacity="0.75"
              strokeWidth="3"
            />
            <path
              ref={flowPathRef}
              id="tl-animated-energy-flow"
              d={ROAD_PATH}
              fill="none"
              stroke="#ffffff"
              strokeDasharray="2400"
              strokeDashoffset="2400"
              strokeLinecap="round"
              strokeWidth="6"
            />

            <g ref={orbRef} style={{ opacity: 0, transition: 'opacity 0.3s ease' }}>
              <circle cx="0" cy="0" r="24" fill="#1B79FF" opacity="0.45" filter="url(#tl-ribbon-glow)" />
              <circle cx="0" cy="0" r="16" fill="#11183c" stroke="#1B79FF" strokeWidth="3.5" />
              <circle cx="0" cy="0" r="10" fill="#1B79FF" />
              <circle cx="0" cy="0" r="5" fill="#ffffff" />
            </g>
          </svg>
        </div>

        <div className="tl-nodes">
          {timelineMilestones.map((milestone, index) => (
            <div
              className={`tl-node${index % 2 === 1 ? ' tl-node-reverse' : ''}`}
              key={milestone.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
            >
              <div className="tl-col-content">
                <MilestoneContent milestone={milestone} />
              </div>
              <div className="tl-col-companion">
                <Companion companion={milestone.companion} accent={milestone.accent} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
