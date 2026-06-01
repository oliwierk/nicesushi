import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHONE = '+48880154776';
const PHONE_DISPLAY = '880 154 776';
const MAPS_URL = 'https://www.google.com/maps/search/Nice+Sushi+Katowice+ul.+1+Maja+37';
const ORDER_URL = 'https://www.pyszne.pl/menu/nice-sushi-3';
const FB_URL = 'https://www.facebook.com/profile.php?id=61585356602337';

const hours = [
  { day: 'Poniedziałek – Czwartek', time: '12:00 – 21:00' },
  { day: 'Piątek – Sobota',         time: '12:00 – 22:00' },
  { day: 'Niedziela',               time: '13:00 – 21:00' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.cr');
      if (els) {
        gsap.fromTo(els,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, stagger: 0.09, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)',
        borderTop: '1px solid var(--line-subtle)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Big kanji decoration */}
      <div aria-hidden style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'serif', fontSize: 'clamp(200px, 38vw, 520px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.022)',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
      }}>
        来
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="cr section-label" style={{ marginBottom: 28 }}>
          Odwiedź nas
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(48px, 7vw, 96px)',
          alignItems: 'start',
        }}>
          {/* Left column */}
          <div>
            <h2 className="cr" style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase',
              lineHeight: 1.05, marginBottom: 40,
            }}>
              <span style={{ color: 'var(--pink)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 400 }}>
                Nice
              </span>
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(245,245,247,0.4)' }}>
                Sushi
              </span>
            </h2>

            {/* Address */}
            <div className="cr" style={{ borderLeft: '2px solid var(--pink)', paddingLeft: 20, marginBottom: 28 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
                color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Adres
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
                  fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'var(--text)',
                  lineHeight: 1.6, display: 'block', transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
              >
                ul. 1 Maja 37<br />40-225 Katowice
                <span style={{
                  display: 'block', fontSize: 11, fontStyle: 'normal',
                  color: 'var(--dim)', marginTop: 4, letterSpacing: '0.08em',
                }}>
                  → Otwórz w Mapach
                </span>
              </a>
            </div>

            {/* Phone */}
            <div className="cr" style={{ borderLeft: '2px solid var(--mint)', paddingLeft: 20, marginBottom: 48 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.28em',
                color: 'var(--mint)', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Kontakt
              </div>
              <a
                href={`tel:${PHONE}`}
                style={{
                  fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
                  fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'var(--text)',
                  transition: 'color 0.3s ease', display: 'block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mint)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* CTA buttons */}
            <div className="cr" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                  color: 'var(--bg)', background: 'var(--pink)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.3s ease, transform 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--pink-vivid)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--pink)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Zamów Online
              </a>
              <a
                href={`tel:${PHONE}`}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                  color: 'var(--text)', border: '1px solid var(--line)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--pink)';
                  e.currentTarget.style.background = 'var(--pink-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Zadzwoń
              </a>
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.22em',
                  color: 'var(--mint)', border: '1px solid var(--mint-dim)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(157,202,196,0.08)';
                  e.currentTarget.style.borderColor = 'var(--mint)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'var(--mint-dim)';
                }}
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: '0.3em',
              color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24,
            }}>
              Godziny Otwarcia
            </div>

            {hours.map((h, i) => (
              <div
                key={i}
                className="cr"
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: 'clamp(14px, 1.8vw, 20px) 0',
                  borderBottom: '1px solid var(--line-subtle)', gap: 16,
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--muted)' }}>
                  {h.day}
                </span>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 13,
                  color: 'var(--text)', letterSpacing: '0.08em', whiteSpace: 'nowrap',
                }}>
                  {h.time}
                </span>
              </div>
            ))}

            {/* Map placeholder */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cr"
              style={{
                display: 'block', marginTop: 32, height: 200,
                background: 'var(--bg-card)', border: '1px solid var(--line)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--pink-dim)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  linear-gradient(var(--line-subtle) 1px, transparent 1px),
                  linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)
                `,
                backgroundSize: '28px 28px',
              }} />
              <div style={{
                position: 'absolute', top: '40%', left: 0, right: 0,
                height: '1.5px', background: 'rgba(232,121,155,0.06)',
              }} />
              <div style={{
                position: 'absolute', left: '42%', top: 0, bottom: 0,
                width: '1.5px', background: 'rgba(232,121,155,0.06)',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', textAlign: 'center',
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--pink)', margin: '0 auto 10px',
                  boxShadow: '0 0 0 6px rgba(232,121,155,0.15), 0 0 0 12px rgba(232,121,155,0.06)',
                }} />
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 9,
                  letterSpacing: '0.2em', color: 'var(--muted)', textTransform: 'uppercase',
                }}>
                  ul. 1 Maja 37
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 12, right: 16,
                fontFamily: 'var(--font-body)', fontSize: 9,
                letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase', opacity: 0.6,
              }}>
                Otwórz Mapy →
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="cr" style={{
          marginTop: 'clamp(56px, 8vw, 96px)',
          paddingTop: 28, borderTop: '1px solid var(--line-subtle)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'baseline', gap: 6,
          }}>
            <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 14, color: 'var(--pink)' }}>
              Nice
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, letterSpacing: '0.4em', color: 'var(--muted)', textTransform: 'uppercase' }}>
              SUSHI
            </span>
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: 'var(--dim)', letterSpacing: '0.08em' }}>
            © 2025 Nice Sushi Katowice
          </span>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-editorial)', fontSize: 11, fontStyle: 'italic',
              color: 'var(--dim)', transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
          >
            /nice-sushi-katowice
          </a>
        </div>
      </div>
    </section>
  );
}
