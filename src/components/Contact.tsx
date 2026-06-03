import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PHONE         = '+48880154776';
const PHONE_DISPLAY = '880 154 776';
const MAPS_URL      = 'https://www.google.com/maps/search/Nice+Sushi+Katowice+ul.+1+Maja+37';
const ORDER_URL     = 'https://www.pyszne.pl/menu/nice-sushi-3';
const FB_URL        = 'https://www.facebook.com/profile.php?id=61585356602337';

const hours = [
  { day: 'Pon - Czw', time: '12:00 - 21:00' },
  { day: 'Pt - Sob',  time: '12:00 - 22:00' },
  { day: 'Niedziela', time: '13:00 - 21:00' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.cr') ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 100px)',
        borderTop: '1px solid var(--line-subtle)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* bg kanji */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        fontFamily: '"Yu Mincho","Hiragino Mincho ProN",serif',
        fontSize: 'clamp(200px,38vw,520px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.02)',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
      }}>来</div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

        <div className="cr section-label" style={{ marginBottom: 32 }}>Odwiedź nas</div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── Adres + telefon ── */}
          <div>
            <h2 id="contact-heading" className="cr" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 4.5vw, 60px)',
              fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
              lineHeight: 1.05, marginBottom: 36,
            }}>
              <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 600, color: 'var(--pink)', fontSize: '1.05em' }}>Nice</span>
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(245,245,247,0.38)' }}>Sushi</span>
            </h2>

            <div className="cr" style={{ borderLeft: '2px solid var(--pink)', paddingLeft: 20, marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 8 }}>Adres</div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px,1.3vw,18px)', color: 'var(--text)', lineHeight: 1.65, display: 'block', transition: 'color .25s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--pink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
              >
                ul. 1 Maja 37<br />40-225 Katowice
                <span style={{ display: 'block', fontSize: '13px', color: 'var(--dim)', marginTop: 5 }}>→ Otwórz w Mapach</span>
              </a>
            </div>

            <div className="cr" style={{ borderLeft: '2px solid var(--mint)', paddingLeft: 20 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--mint)', textTransform: 'uppercase', marginBottom: 8 }}>Telefon</div>
              <a href={`tel:${PHONE}`}
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px,2vw,26px)', fontWeight: 700, color: 'var(--text)', display: 'block', letterSpacing: '0.06em', transition: 'color .25s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--mint)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
              >{PHONE_DISPLAY}</a>
            </div>
          </div>

          {/* ── Godziny ── */}
          <div>
            <h3 className="cr" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24 }}>Godziny Otwarcia</h3>
            <dl>
              {hours.map((h, i) => (
                <div key={i} className="cr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'clamp(12px,1.6vw,18px) 0', borderBottom: '1px solid var(--line-subtle)', gap: 16 }}>
                  <dt style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.1vw,15px)', color: 'var(--muted)' }}>{h.day}</dt>
                  <dd style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(13px,1.1vw,15px)', fontWeight: 600, color: 'var(--text)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── CTA + mapa ── */}
          <div>
            <h3 className="cr" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24 }}>Zamów lub Przyjdź</h3>

            <div className="cr" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--bg)', background: 'var(--pink)', padding: '13px 24px', textTransform: 'uppercase', display: 'block', textAlign: 'center', transition: 'background .25s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--pink-vivid)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--pink)')}
              >Zamów Online — Pyszne.pl</a>
              <a href={`tel:${PHONE}`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--text)', border: '1.5px solid var(--line)', padding: '13px 24px', textTransform: 'uppercase', display: 'block', textAlign: 'center', transition: 'border-color .25s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--pink)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
              >Zadzwoń</a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--mint)', border: '1.5px solid var(--mint-dim)', padding: '13px 24px', textTransform: 'uppercase', display: 'block', textAlign: 'center', transition: 'border-color .25s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--mint)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--mint-dim)')}
              >Facebook</a>
            </div>

            {/* map placeholder */}
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="cr"
              style={{ display: 'block', height: 140, background: 'var(--bg-card)', border: '1.5px solid var(--line)', position: 'relative', overflow: 'hidden', transition: 'border-color .25s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--pink-dim)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
            >
              <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--line-subtle) 1px,transparent 1px),linear-gradient(90deg,var(--line-subtle) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <div aria-hidden="true" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--pink)', margin: '0 auto 10px', boxShadow: '0 0 0 6px rgba(232,121,155,0.15),0 0 0 12px rgba(232,121,155,0.06)' }} />
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase' }}>ul. 1 Maja 37 → Otwórz Mapy</div>
              </div>
            </a>
          </div>

        </div>

        {/* footer */}
        <footer className="cr" style={{ marginTop: 'clamp(48px,7vw,80px)', paddingTop: 24, borderTop: '1px solid var(--line-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '16px', fontWeight: 600, color: 'var(--pink)' }}>Nice</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.35em', color: 'var(--muted)', textTransform: 'uppercase' }}>SUSHI</span>
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)', letterSpacing: '0.06em' }}>© 2026 Nice Sushi Katowice</span>
          <a href={FB_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '13px', color: 'var(--dim)', transition: 'color .25s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--pink)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}
          >/nice-sushi-katowice</a>
        </footer>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 580px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
