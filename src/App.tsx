import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';

const FacultyDirectory = lazy(() => import('./pages/FacultyDirectory').then((m) => ({ default: m.FacultyDirectory })));
const Timeline = lazy(() => import('./pages/Timeline').then((m) => ({ default: m.Timeline })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
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
