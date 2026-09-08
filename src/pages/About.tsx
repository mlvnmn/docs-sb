import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { AboutHero } from '../components/about/AboutHero';
import { AboutHighlights } from '../components/about/AboutHighlights';
import { AboutCourses } from '../components/about/AboutCourses';
import { Footer } from '../components/layout/Footer';

export function About() {
  useDocumentMeta(
    'About | Department of Computer Science | St Berchmans College Autonomous',
    'About the Department of Computer Science at St Berchmans College Autonomous — our story, highlights, and courses.',
  );

  return (
    <>
      <AboutHero />
      <AboutHighlights />
      <AboutCourses />
      <Footer />
    </>
  );
}
