import { useRef, type CSSProperties } from 'react';
import { Picture } from '../shared/Picture';
import { usePrograms } from '../../hooks/usePrograms';
import { useProgramsReveal } from '../../hooks/useProgramsReveal';

export function ProgramsSection() {
  const programs = usePrograms();
  const sectionRef = useRef<HTMLElement | null>(null);
  useProgramsReveal(sectionRef);

  return (
    <section className="programs-section" id="programs" ref={sectionRef}>
      <div className="programs-container">
        <div className="programs-heading">
          <h2 className="programs-title">
            <span className="programs-title-line">
              <span className="programs-title-line-inner">Programs We Offer</span>
            </span>
          </h2>
        </div>

        <div className="programs-row">
          {programs.map((program) => (
            <div
              className="program-card"
              key={program.id}
              style={{ '--program-color': program.color } as CSSProperties}
            >
              <div className="program-poster">
                <Picture src={program.poster} alt={program.title} loading="lazy" decoding="async" />
              </div>

              <div className="program-overlay">
                <span className="program-badge">{program.badge}</span>
                <h3 className="program-overlay-title">{program.title}</h3>
                <p className="program-overlay-desc">{program.description}</p>
                {program.href.startsWith('http') && (
                  <a
                    className="program-visit-link"
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    visit website
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
