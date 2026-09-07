import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { TimelineHero } from '../components/timeline/TimelineHero';
import { TimelineRoad } from '../components/timeline/TimelineRoad';
import { TimelineCTA } from '../components/timeline/TimelineCTA';
import { Footer } from '../components/layout/Footer';

export function Timeline() {
  useDocumentMeta(
    'Our Journey | Department of Computer Science | St Berchmans College Autonomous',
    'Explore the milestones of the Department of Computer Science at St Berchmans College Autonomous, from its founding to its present-day academics, infrastructure, and achievements.',
  );

  return (
    <div className="tl-page">
      <TimelineHero />
      <TimelineRoad />
      <TimelineCTA />
      <Footer />
    </div>
  );
}
