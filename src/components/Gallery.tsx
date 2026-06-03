import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const photos = [
  { id: 'a', src: '/rolka.jpg',          label: 'Sushi w Tubie'        },
  { id: 'b', src: '/rolki.webp',         label: 'Nice Sushi Katowice'  },
  { id: 'c', src: '/avocadoroll].jpg',   label: 'Avocado Cream Roll'   },
  { id: 'd', src: '/wiecejrolek.jpg',    label: 'Uramaki & Grill Łosoś'},
];

/* Pure CSS hover — zero JS, zero re-renders, runs on compositor thread */
const CELL_CSS = `
  .gal-cell { position: relative; overflow: hidden; background: #080F0B; cursor: pointer; }
  .gal-cell img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: brightness(0.62) contrast(1.1) saturate(0.85);
    transform: scale(1);
    transition: filter 0.45s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1);
    will-change: transform;
  }
  .gal-cell:hover img {
    filter: brightness(0.88) contrast(1.1) saturate(1.0);
    transform: scale(1.05);
  }
  .gal-overlay {
    position: absolute; inset: 0; opacity: 0; pointer-events: none;
    background: linear-gradient(to top, rgba(27,67,50,0.7) 0%, rgba(232,121,155,0.06) 45%, transparent 75%);
    transition: opacity 0.38s ease;
  }
  .gal-cell:hover .gal-overlay { opacity: 1; }
  .gal-caption {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: clamp(16px, 2vw, 24px);
    opacity: 0; transform: translateY(12px);
    transition: opacity 0.38s ease, transform 0.38s ease;
  }
  .gal-cell:hover .gal-caption { opacity: 1; transform: translateY(0); }
`;

function GalleryCell({ photo, style }: { photo: typeof photos[0]; style?: React.CSSProperties }) {
  return (
    <div className="gal-cell" style={style}>
      <img src={photo.src} alt={photo.label} loading="lazy" decoding="async" />
      <div className="gal-overlay" aria-hidden="true" />
      <div className="gal-caption">
        <div style={{
          fontFamily: 'var(--font-editorial)', fontSize: 'clamp(14px, 1.3vw, 17px)',
          fontStyle: 'italic', color: 'var(--text)',
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
    /* Single ScrollTrigger for the whole section */
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.gal-header > *') ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', once: true },
        }
      );

      /* Animate all cells together — one ScrollTrigger instead of 4 */
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.gal-cell') ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current?.querySelector('.gal-grid'), start: 'top 85%', once: true },
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
      <style>{CELL_CSS}</style>

      <div className="gal-header" style={{
        padding: '0 clamp(24px, 6vw, 80px)',
        marginBottom: 'clamp(32px, 5vw, 56px)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 20,
      }}>
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
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.3vw, 16px)',
          color: 'var(--muted)', maxWidth: 300, lineHeight: 1.7,
        }}>
          Wirusowe sushi w tubie, autorskie rolki i smaki, które wracają w snach.
        </p>
      </div>

      <div className="gal-grid" style={{
        padding: '0 clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: '5fr 3fr 3fr',
        gridTemplateRows: '340px 250px',
        gap: 4,
      }}>
        <GalleryCell photo={photos[0]} style={{ gridRow: '1 / 3', gridColumn: '1 / 2', height: '100%' }} />
        <GalleryCell photo={photos[1]} style={{ gridRow: '1 / 2', gridColumn: '2 / 3', height: '100%' }} />
        <GalleryCell photo={photos[2]} style={{ gridRow: '1 / 2', gridColumn: '3 / 4', height: '100%' }} />
        <GalleryCell photo={photos[3]} style={{ gridRow: '2 / 3', gridColumn: '2 / 4', height: '100%' }} />
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
          .gal-grid > *:first-child { grid-row: 1/2 !important; grid-column: 1/3 !important; }
          .gal-grid > *:nth-child(4) { grid-column: 1/3 !important; }
        }
        @media (max-width: 480px) {
          .gal-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: repeat(4, 220px) !important;
          }
          .gal-grid > * { grid-row: auto !important; grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}
