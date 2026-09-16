import { usePrograms } from '../../hooks/usePrograms';

export function ProgramsSection() {
  const programs = usePrograms();

  return (
    <section className="programs-section" id="programs">
      <div className="programs-container">
        <div className="programs-heading">
          <h2 className="programs-title">Programs We Offer</h2>
        </div>

        <div className="programs-grid">
          {programs.map((program) => (
            <div className="program-card" key={program.id}>
              <div className="program-poster">
                <img src={program.poster} alt={program.title} loading="lazy" decoding="async" />
              </div>

              <div className="program-card-footer">
                <span className="program-badge">{program.badge}</span>
                <a className="program-visit-link" href={program.href}>
                  visit website
                  <i className="fa-solid fa-arrow-up-right-from-square" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
