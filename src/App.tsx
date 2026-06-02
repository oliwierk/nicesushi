import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from './components/Preloader';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Philosophy from './components/Philosophy';
import Gallery from './components/Gallery';
import Manifesto from './components/Manifesto';
import Menu from './components/Menu';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (preloaderDone && mainRef.current) {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [preloaderDone]);

  return (
    <>
      {/* Skip navigation — WCAG 2.4.1 */}
      <a href="#main-content" className="skip-link">Przejdź do treści</a>

      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <div ref={mainRef} style={{ opacity: 0 }}>
        <Navigation />
        <main id="main-content">
          <Hero />
          <Stats />
          <Philosophy />
          <Gallery />
          <Manifesto />
          <Menu />
          <Contact />
        </main>
      </div>
    </>
  );
}
