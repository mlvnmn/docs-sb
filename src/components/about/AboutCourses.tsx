import { aboutContent } from '../../data/about';

const COURSE_VARIANTS = ['pink', 'blue'];

export function AboutCourses() {
  return (
    <section className="about-courses" id="courses">
      <div className="about-highlights-container">
        <span className="about-section-eyebrow">PROGRAMMES OFFERED</span>
        <h2 className="about-section-heading">
          Courses
          <span className="about-heading-underline" />
        </h2>

        <div className="about-courses-grid">
          {aboutContent.courses.map((group, index) => {
            const variant = COURSE_VARIANTS[index % COURSE_VARIANTS.length];
            return (
              <div className={`about-course-card about-${variant}`} key={group.heading}>
                <div className="about-course-card-head">
                  <span className="about-course-badge">{group.badge}</span>
                  <span className="about-course-icon">
                    <i className="fa-solid fa-graduation-cap" />
                  </span>
                </div>
                <h3 className="about-course-heading">{group.heading}</h3>
                <ul className="about-course-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="about-highlight-icon-sm">
                        <i className="fa-solid fa-check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
