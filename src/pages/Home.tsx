import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroSection } from '../components/home/HeroSection';
import { OverviewSection } from '../components/home/OverviewSection';
import { AboutTeaserSection } from '../components/home/AboutTeaserSection';
import { ContactSection } from '../components/home/ContactSection';
import { Footer } from '../components/layout/Footer';

export function Home() {
  useDocumentMeta(
    'Department of Computer Science | St Berchmans College Autonomous',
    'Department of Computer Science, St Berchmans College Autonomous. Where Ideas Become Impact. Committed to excellence in education, research, and innovation.',
  );

  return (
    <>
      <HeroSection />
      <OverviewSection />
      <AboutTeaserSection />
      <ContactSection />
      <Footer />
    </>
  );
}
