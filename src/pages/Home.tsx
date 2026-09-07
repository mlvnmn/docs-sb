import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroSection } from '../components/home/HeroSection';
import { LifeSection } from '../components/home/LifeSection';
import { GazetteSection } from '../components/home/GazetteSection';
import { PeopleTeaserSection } from '../components/home/PeopleTeaserSection';
import { RecruitmentSection } from '../components/home/RecruitmentSection';
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
      <LifeSection />
      <GazetteSection />
      <PeopleTeaserSection />
      <RecruitmentSection />
      <ContactSection />
      <Footer />
    </>
  );
}
