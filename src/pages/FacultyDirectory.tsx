import '../styles/facultyGallery.css';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useFaculty } from '../hooks/useFaculty';
import { useFacultyGalleryScroll } from '../hooks/useFacultyGalleryScroll';
import { FacultyCluster } from '../components/faculty/FacultyCluster';
import { GalleryScrollBar } from '../components/faculty/GalleryScrollBar';

const CLUSTER_SIZE = 6;

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    groups.push(items.slice(i, i + size));
  }
  return groups;
}

export function FacultyDirectory() {
  useDocumentMeta(
    'Our People | Department of Computer Science | St Berchmans College Autonomous',
    'Our People and Faculty directory for the Department of Computer Science at St Berchmans College Autonomous. Discover our esteemed teaching faculty, research scholars, technical staff, and publications.',
  );

  const faculty = useFaculty();
  const { containerRef, progress, scrollByStep } = useFacultyGalleryScroll();

  const groups = chunk(faculty, CLUSTER_SIZE);

  return (
    <div className="fg-page">
      <main className="fg-scroll no-scrollbar" ref={containerRef}>
        <div className="fg-track">
          {groups.map((members, i) => (
            <div className="fg-cluster-and-divider" key={`cluster-${i}`}>
              <FacultyCluster id={`cluster-${i}`} members={members} eager={i === 0} wideTallPhoto={i === 1} />
              {i < groups.length - 1 && (
                <div className="fg-divider">
                  <div className="fg-divider-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <GalleryScrollBar progress={progress} onScrollLeft={() => scrollByStep(-1)} onScrollRight={() => scrollByStep(1)} />
    </div>
  );
}
