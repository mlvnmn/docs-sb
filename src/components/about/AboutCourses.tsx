import { aboutContent } from '../../data/about';

export function AboutCourses() {
  return (
    <section className="about-courses">
      <div className="about-highlights-container">
        <h2 className="about-section-heading">
          Courses
          <span className="about-heading-underline" />
        </h2>

        <div className="about-courses-grid">
          {aboutContent.courses.map((group) => (
            <div className="gradient-border-card" key={group.heading}>
              <div className="gradient-border-card-inner about-course-card">
                <h3 className="about-course-heading">{group.heading}</h3>
                <ul className="about-course-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="about-highlight-check">
                        <i className="fa-solid fa-check" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
