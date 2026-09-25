import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';

const FacultyDirectory = lazy(() => import('./pages/FacultyDirectory').then((m) => ({ default: m.FacultyDirectory })));
const Timeline = lazy(() => import('./pages/Timeline').then((m) => ({ default: m.Timeline })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Academics = lazy(() => import('./pages/Academics').then((m) => ({ default: m.Academics })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const GalleryFolder = lazy(() => import('./pages/GalleryFolder').then((m) => ({ default: m.GalleryFolder })));
const News = lazy(() => import('./pages/News').then((m) => ({ default: m.News })));
const Initiatives = lazy(() => import('./pages/Initiatives').then((m) => ({ default: m.Initiatives })));

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/bcaacadamics"
              element={
                <Academics
                  program="Bachelor of Computer Application"
                  syllabusNote="The official 4-year BCA scheme and detailed course syllabus for all eight semesters is available for download."
                  syllabusUrl="https://www.aicte.gov.in/downloads/msyllabus/UG/BCA%20FINAL%2024.09.2024%20(2%20year)_latest.pdf"
                  syllabusDownloadUrl="/assets/docs/bca-syllabus.pdf"
                  timetableBoxes={[
                    'BCA 1st Yr A',
                    'BCA 1st Yr B',
                    'BCA 2nd Yr A',
                    'BCA 2nd Yr B',
                    'BCA 3rd Yr A',
                    'BCA 3rd Yr B',
                  ]}
                />
              }
            />
            <Route
              path="/msccsacadamics"
              element={
                <Academics
                  program="M.Sc Computer Science"
                  syllabusNote="The official 2-year M.Sc Computer Science scheme and detailed course syllabus for all four semesters is available for download."
                />
              }
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/:slug" element={<GalleryFolder />} />
            <Route path="/news" element={<News />} />
            <Route path="/initiatives" element={<Initiatives />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
