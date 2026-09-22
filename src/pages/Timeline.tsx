import '../styles/routes/timeline.css';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { TimelineArchive } from '../components/timeline/TimelineArchive';

export function Timeline() {
  useDocumentMeta(
    'Timeline Archive | Department of Computer Science | St Berchmans College Autonomous',
    'A chronicle of the Department of Computer Science at St Berchmans College Autonomous — milestones from our founding to the cutting edge.',
  );

  return <TimelineArchive />;
}
