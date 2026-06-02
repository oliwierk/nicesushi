import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    id: 'a',
    src: '/rolka.jpg',
    label: 'Sushi w Tubie',
    span: 'main',
  },
  {
    id: 'b',
    src: '/rolki.webp',
    label: 'Nice Sushi Katowice',
    span: 'normal',
  },
  {
    id: 'c',
    src: '/avocadoroll].jpg',
    label: 'Avocado Cream Roll',
    span: 'normal',
  },
  {
    id: 'd',
    src: '/wiecejrolek.jpg',
    label: 'Uramaki & Grill Łosoś',
    span: 'wide',
  },
];

function GalleryCell({ photo, delay, style }: {
  photo: typeof photos[0];
  delay: number;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.38, ease: 'power2.out' });
      gsap.to(captionRef.current, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.32, ease: 'power2.in' });
      gsap.to(captionRef.current, { y: 14, opacity: 0, duration: 0.28, ease: 'power2.in' });
    }
  }, [hovered]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: cellRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cellRef.current,
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.88, ease: 'power3.out', delay }
        );
      },
    });
  }, [delay]);

  return (
    <div
      ref={cellRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        opacity: 0, background: '#080F0B',
        ...style,
      }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: `brightness(${hovered ? 0.88 : 0.6}) contrast(1.1) saturate(${hovered ? 1.0 : 0.82})`,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'filter 0.5s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform',
        }}
      />

      <div ref={overlayRef} aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(27,67,50,0.7) 0%, rgba(232,121,155,0.06) 45%, transparent 75%)',
        opacity: 0, pointerEvents: 'none',
      }} />

      <div ref={captionRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 'clamp(16px, 2vw, 24px)',
        opacity: 0, transform: 'translateY(14px)',
      }}>
        <div style={{
          fontFamily: 'var(--font-editorial)', fontSize: 'clamp(14px, 1.3vw, 17px)',
          fontStyle: 'italic', color: 'var(--text)', letterSpacing: '0.02em',
        }}>
          {photo.label}
        </div>
        <div aria-hidden="true" style={{ width: 24, height: '1px', background: 'var(--pink)', marginTop: 7 }} />
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.gal-header > *') ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      aria-label="Galeria Nice Sushi"
      style={{ background: 'var(--bg-warm)', padding: 'clamp(60px, 10vw, 120px) 0' }}
    >
      <div
        className="gal-header"
        style={{
          padding: '0 clamp(24px, 6vw, 80px)',
          marginBottom: 'clamp(32px, 5vw, 56px)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 20,
        }}
      >
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>Galeria</div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 58px)',
            fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase',
            lineHeight: 1, color: 'var(--text)',
          }}>
            Jedyne takie<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(232,121,155,0.55)' }}>
              doświadczenie
            </span>
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontStyle: 'normal',
          fontSize: 'clamp(14px, 1.3vw, 16px)', color: 'var(--muted)',
          maxWidth: 300, lineHeight: 1.7,
        }}>
          Wirusowe sushi w tubie, autorskie rolki i smaki, które wracają w snach.
        </p>
      </div>

      {/* Desktop asymmetric grid */}
      <div
        className="gal-grid"
        style={{
          padding: '0 clamp(24px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: '5fr 3fr 3fr',
          gridTemplateRows: '340px 250px',
          gap: 4,
        }}
      >
        {/* Large left — spans 2 rows */}
        <GalleryCell
          photo={photos[0]}
          delay={0}
          style={{ gridRow: '1 / 3', gridColumn: '1 / 2', height: '100%' }}
        />
        {/* Top middle */}
        <GalleryCell
          photo={photos[1]}
          delay={0.1}
          style={{ gridRow: '1 / 2', gridColumn: '2 / 3', height: '100%' }}
        />
        {/* Top right */}
        <GalleryCell
          photo={photos[2]}
          delay={0.2}
          style={{ gridRow: '1 / 2', gridColumn: '3 / 4', height: '100%' }}
        />
        {/* Bottom right wide */}
        <GalleryCell
          photo={photos[3]}
          delay={0.3}
          style={{ gridRow: '2 / 3', gridColumn: '2 / 4', height: '100%' }}
        />
      </div>

      <div style={{
        padding: 'clamp(24px, 3vw, 36px) clamp(24px, 6vw, 80px) 0',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div aria-hidden="true" style={{ width: 36, height: '1px', background: 'var(--pink)' }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
          letterSpacing: '0.25em', color: 'var(--pink)', textTransform: 'uppercase',
        }}>
          Świeże składniki · Każdego dnia
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gal-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 220px 180px 180px !important;
          }
          .gal-grid > *:first-child {
            grid-row: 1 / 2 !important;
            grid-column: 1 / 3 !important;
          }
          .gal-grid > *:nth-child(4) {
            grid-column: 1 / 3 !important;
          }
        }
        @media (max-width: 480px) {
          .gal-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(4, 220px) !important;
          }
          .gal-grid > * {
            grid-row: auto !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
