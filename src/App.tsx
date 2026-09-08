import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { FacultyDirectory } from './pages/FacultyDirectory';
import { Timeline } from './pages/Timeline';
import { About } from './pages/About';
import { Gallery } from './pages/Gallery';
import { GalleryFolder } from './pages/GalleryFolder';

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty" element={<FacultyDirectory />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:slug" element={<GalleryFolder />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
