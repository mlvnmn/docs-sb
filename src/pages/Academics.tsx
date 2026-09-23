import '../styles/routes/academics.css';
import { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Footer } from '../components/layout/Footer';
import { TimetableModal } from '../components/academics/TimetableModal';
import { SmartLink } from '../components/shared/SmartLink';
import { timetables } from '../data/timetables';

interface AcademicsProps {
  program: string;
  syllabusNote: string;
  timetableBoxes?: string[];
}

export function Academics({ program, syllabusNote, timetableBoxes }: AcademicsProps) {
  useDocumentMeta(
    `${program} Academics | Department of Computer Science | St Berchmans College Autonomous`,
    `Syllabus and academics page for ${program}.`,
  );

  const [activeTimetable, setActiveTimetable] = useState<string | null>(null);

  return (
    <div className="academics-page">
      <section className="syllabus-section">
        <SmartLink to="/about" className="academics-back-link">
          <i className="fa-solid fa-arrow-left" />
          Back
        </SmartLink>

        <div className="academics-heading-row">
          <span className="academics-heading-bar" aria-hidden="true" />
          <h2 className="syllabus-heading">
            <span className="academics-heading-solid">Our</span> <span className="academics-heading-outline">Syllabus</span>
          </h2>
        </div>
        <div className="syllabus-card">
          <div className="syllabus-card-info">
            <span className="syllabus-icon" aria-hidden="true">
              <i className="fa-solid fa-file-lines" />
            </span>
            <div>
              <h3 className="syllabus-title">Complete Syllabus Document</h3>
              <p className="syllabus-desc">{syllabusNote}</p>
            </div>
          </div>
          <div className="syllabus-actions">
            <a href="#" className="syllabus-btn-primary">
              <i className="fa-solid fa-download" />
              Download Syllabus
            </a>
            <a href="#" className="syllabus-btn-secondary">
              <i className="fa-solid fa-arrow-up-right-from-square" />
              View Online
            </a>
          </div>
        </div>
      </section>

      {timetableBoxes && timetableBoxes.length > 0 && (
        <section className="timetable-section">
          <div className="academics-heading-row">
            <span className="academics-heading-bar" aria-hidden="true" />
            <h2 className="syllabus-heading academics-heading-solid">Timetables</h2>
          </div>
          <div className="timetable-grid">
            {timetableBoxes.map((label) => (
              <button type="button" className="timetable-box" key={label} onClick={() => setActiveTimetable(label)}>
                <span className="timetable-box-plus" aria-hidden="true">
                  + + + +
                </span>
                <span className="timetable-icon" aria-hidden="true">
                  <i className="fa-solid fa-calendar-days" />
                </span>
                <span className="timetable-label">{label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      <TimetableModal
        label={activeTimetable}
        schedule={activeTimetable ? timetables[activeTimetable] ?? null : null}
        onClose={() => setActiveTimetable(null)}
      />

      <Footer />
    </div>
  );
}
