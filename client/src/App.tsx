import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GhostLoader } from './components/GhostLoader';
import { AmbientGlow } from './components/AmbientGlow';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollRevealManager } from './components/ScrollRevealManager';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { Certifications } from './pages/Certifications';

// Component to handle smooth anchor navigation and route restoration
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollProgressBar />
      <ScrollRevealManager />
      <ScrollManager />
      <GhostLoader />
      <AmbientGlow />
      <div className="flex flex-col min-h-screen bg-black text-white selection:bg-accent selection:text-black">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Navigate to="/#work" replace />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/skills" element={<Navigate to="/#skills" replace />} />
            <Route path="/experience" element={<Navigate to="/#experience" replace />} />
            <Route path="/education" element={<Navigate to="/#education" replace />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
