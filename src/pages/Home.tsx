import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { HeroSection } from '../components/home/HeroSection';
import { OverviewSection } from '../components/home/OverviewSection';
import { ProgramsSection } from '../components/home/ProgramsSection';
import { AboutTeaserSection } from '../components/home/AboutTeaserSection';
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
      <OverviewSection />
      <ProgramsSection />
      <AboutTeaserSection />
      <RecruitmentSection />
      <ContactSection />
      <Footer />
    </>
  );
}
