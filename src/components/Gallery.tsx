import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    id: 'a',
    src: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=900&q=85',
    label: 'Sushi w Tubie',
  },
  {
    id: 'b',
    src: 'https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=700&q=85',
    label: 'Nice Roll',
  },
  {
    id: 'c',
    src: 'https://images.unsplash.com/photo-1617196034799-44264b8bfee4?auto=format&fit=crop&w=700&q=85',
    label: 'Cherry Blossom Roll',
  },
  {
    id: 'd',
    src: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?auto=format&fit=crop&w=700&q=85',
    label: 'Katowice Roll',
  },
];

function GalleryCell({ photo, delay }: { photo: typeof photos[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const cellRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(captionRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, ease: 'power2.in' });
      gsap.to(captionRef.current, { y: 14, opacity: 0, duration: 0.3, ease: 'power2.in' });
    }
  }, [hovered]);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: cellRef.current,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cellRef.current,
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', delay }
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
        opacity: 0, cursor: 'pointer', background: '#080F0B',
      }}
    >
      <img
        src={photo.src}
        alt={photo.label}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: `brightness(${hovered ? 0.88 : 0.62}) contrast(1.1) saturate(${hovered ? 1.0 : 0.85})`,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'filter 0.5s ease, transform 0.6s var(--ease-expo)',
          willChange: 'transform',
        }}
      />

      <div
        ref={overlayRef}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(27,67,50,0.65) 0%, rgba(232,121,155,0.08) 40%, transparent 70%)',
          opacity: 0, pointerEvents: 'none',
        }}
      />

      <div
        ref={captionRef}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '20px 24px', opacity: 0, transform: 'translateY(14px)',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-editorial)', fontSize: 'clamp(13px, 1.3vw, 16px)',
          fontStyle: 'italic', color: 'var(--text)', letterSpacing: '0.03em',
        }}>
          {photo.label}
        </div>
        <div style={{ width: 24, height: '0.5px', background: 'var(--pink)', marginTop: 6 }} />
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
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
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
          <div className="section-label" style={{ marginBottom: 16 }}>
            Galeria
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.5vw, 56px)',
            fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase',
            lineHeight: 1, color: 'var(--text)',
          }}>
            Jedyne takie<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.55)' }}>
              doświadczenie
            </span>
          </h2>
        </div>
        <p style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(13px, 1.3vw, 15px)', color: 'var(--muted)',
          maxWidth: 280, lineHeight: 1.7, textAlign: 'right',
        }}>
          Wirusowe sushi w tubie, autorskie rolki i smaki, które wracają w snach.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '5fr 3fr 3fr',
        gridTemplateRows: '320px 240px',
        gap: 3,
        padding: '0 clamp(24px, 6vw, 80px)',
      }}>
        <div style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }}>
          <GalleryCell photo={photos[0]} delay={0} />
        </div>
        <div style={{ gridColumn: '2 / 3', gridRow: '1 / 2' }}>
          <GalleryCell photo={photos[1]} delay={0.1} />
        </div>
        <div style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}>
          <GalleryCell photo={photos[2]} delay={0.2} />
        </div>
        <div style={{ gridColumn: '2 / 4', gridRow: '2 / 3' }}>
          <GalleryCell photo={photos[3]} delay={0.3} />
        </div>
      </div>

      <div style={{
        padding: 'clamp(24px, 3vw, 36px) clamp(24px, 6vw, 80px) 0',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ width: 36, height: '0.5px', background: 'var(--pink)' }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 10,
          letterSpacing: '0.3em', color: 'var(--pink)', textTransform: 'uppercase',
        }}>
          Świeże składniki · Każdego dnia
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #gallery > div:nth-of-type(2) {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: 220px 220px !important;
          }
          #gallery > div:nth-of-type(2) > div:first-child {
            grid-row: auto !important; grid-column: 1 / 3 !important;
          }
          #gallery > div:nth-of-type(2) > div:last-child {
            grid-column: 1 / 3 !important;
          }
        }
      `}</style>
    </section>
  );
}
