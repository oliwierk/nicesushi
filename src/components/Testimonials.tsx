import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reviews = [
  {
    quote: 'Sushi w tubie to najlepszy pomysł, jaki widziałam w Katowicach. Smak petarda, a forma robi wrażenie na Instagramie.',
    name: 'Kasia W.',
    source: 'Google · 5.0',
  },
  {
    quote: 'Zamawiamy z ekipą co tydzień. Świeże składniki, szybka dostawa i zawsze ten sam wysoki poziom.',
    name: 'Marek P.',
    source: 'Google · 5.0',
  },
  {
    quote: 'Flambe Tuba to majstersztyk. Nigdzie indziej w mieście nie znajdziecie czegoś podobnego.',
    name: 'Ola & Bartek',
    source: 'Facebook · 5.0',
  },
];

function Stars() {
  return (
    <div aria-hidden="true" style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: 'var(--pink)', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.testi-header > *') ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 74%', once: true },
        }
      );
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.testi-card') ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="opinie"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      style={{
        background: 'var(--bg-warm)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)',
        position: 'relative',
      }}
    >
      <div className="testi-header" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto clamp(48px, 6vw, 80px)' }}>
        <div className="section-label" style={{ justifyContent: 'center', marginBottom: 18 }}>
          Opinie
        </div>
        <h2 id="testimonials-heading" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.5vw, 60px)',
          fontWeight: 900, letterSpacing: '0.05em', textTransform: 'uppercase',
          color: 'var(--text)', lineHeight: 1.05,
        }}>
          Mówią o{' '}
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(232,121,155,0.55)' }}>
            nas
          </span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: 'clamp(20px, 2.5vw, 32px)',
        maxWidth: 1280, margin: '0 auto',
      }}>
        {reviews.map((r, i) => (
          <div key={i} className="testi-card" style={{
            background: 'var(--bg-elevated)', border: '1px solid var(--line-subtle)',
            padding: 'clamp(28px, 3vw, 40px)', display: 'flex', flexDirection: 'column',
          }}>
            <Stars />
            <p style={{
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
              fontSize: 'clamp(17px, 1.6vw, 20px)', color: 'var(--text)',
              lineHeight: 1.55, flex: 1, marginBottom: 24,
            }}>
              „{r.quote}"
            </p>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: 16, borderTop: '1px solid var(--line-subtle)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                letterSpacing: '0.04em', color: 'var(--text)', textTransform: 'uppercase',
              }}>
                {r.name}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--dim)', letterSpacing: '0.06em',
              }}>
                {r.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
