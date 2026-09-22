import '../styles/routes/faculty.css';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useFaculty } from '../hooks/useFaculty';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { FacultyCluster } from '../components/faculty/FacultyCluster';
import { FacultySecondaryNav } from '../components/faculty/FacultySecondaryNav';
import { FacultyScrollBar } from '../components/faculty/FacultyScrollBar';

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
  const { containerRef, trackRef, progress, scale, scrollByStep } = useHorizontalScroll({
    progressWhenUnscrollable: 100,
  });

  const groups = chunk(faculty, CLUSTER_SIZE);

  return (
    <div className="fg-page">
      <FacultySecondaryNav />

      <main
        className="fg-scroll no-scrollbar"
        ref={containerRef}
        style={scale < 1 ? { alignItems: 'flex-start' } : undefined}
      >
        <div className="fg-track" ref={trackRef} style={scale < 1 ? { zoom: scale } : undefined}>
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

      <FacultyScrollBar
        progress={progress}
        onScrollLeft={() => scrollByStep(-1)}
        onScrollRight={() => scrollByStep(1)}
        style={scale < 1 ? { marginTop: 0 } : undefined}
      />
    </div>
  );
}
