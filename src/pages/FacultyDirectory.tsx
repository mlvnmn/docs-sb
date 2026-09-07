import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { PeopleWave } from '../components/home/PeopleWave';
import { FacultyGrid } from '../components/faculty/FacultyGrid';
import { FacultyFooter } from '../components/layout/FacultyFooter';

export function FacultyDirectory() {
  useDocumentMeta(
    'Our People | Department of Computer Science | St Berchmans College Autonomous',
    'Our People and Faculty directory for the Department of Computer Science at St Berchmans College Autonomous. Discover our esteemed teaching faculty, research scholars, technical staff, and publications.',
  );

  return (
    <>
      <PeopleWave variant="top" style={{ marginTop: '60px' }} />

      <section className="people-section" id="people" style={{ paddingTop: '1rem' }}>
        <div className="retro-star star-1">✦</div>
        <div className="retro-star star-2">✧</div>
        <div className="retro-star star-3">✦</div>
        <div className="retro-star star-4">✦</div>

        <div className="people-container">
          <h1 className="people-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '0.5rem' }}>
            OUR PEOPLE
          </h1>
          <p
            style={{
              textAlign: 'center',
              color: '#cbd5e1',
              fontSize: '1.1rem',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              fontWeight: 500,
            }}
          >
            Meet the dedicated educators, researchers, and technical experts guiding the next generation of computer
            scientists at St Berchmans College Autonomous.
          </p>

          <FacultyGrid />
        </div>
      </section>

      <FacultyFooter />
    </>
  );
}
