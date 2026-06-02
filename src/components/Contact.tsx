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
      aria-labelledby="contact-heading"
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)',
        borderTop: '1px solid var(--line-subtle)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'serif', fontSize: 'clamp(200px, 38vw, 520px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.02)',
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(48px, 7vw, 96px)',
          alignItems: 'start',
        }}>
          {/* Left */}
          <div>
            <h2 id="contact-heading" className="cr" style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5.5vw, 66px)',
              fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
              lineHeight: 1.05, marginBottom: 40,
            }}>
              <span style={{
                fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 600,
                color: 'var(--pink)', fontSize: '1.05em', letterSpacing: '0.02em',
              }}>
                Nice
              </span>
              <br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(245,245,247,0.38)' }}>
                Sushi
              </span>
            </h2>

            {/* Address */}
            <div className="cr" style={{ borderLeft: '2px solid var(--pink)', paddingLeft: 20, marginBottom: 28 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.25em', color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Adres
              </div>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ul. 1 Maja 37, 40-225 Katowice — otwórz w Mapach"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 1.5vw, 19px)',
                  fontWeight: 400, color: 'var(--text)',
                  lineHeight: 1.65, display: 'block', transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
              >
                ul. 1 Maja 37<br />40-225 Katowice
                <span style={{
                  display: 'block', fontSize: '13px', fontWeight: 500,
                  color: 'var(--dim)', marginTop: 5, letterSpacing: '0.06em',
                }}>
                  → Otwórz w Mapach
                </span>
              </a>
            </div>

            {/* Phone */}
            <div className="cr" style={{ borderLeft: '2px solid var(--mint)', paddingLeft: 20, marginBottom: 48 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700,
                letterSpacing: '0.25em', color: 'var(--mint)', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Telefon
              </div>
              <a
                href={`tel:${PHONE}`}
                aria-label={`Zadzwoń do nas: ${PHONE_DISPLAY}`}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 2.2vw, 28px)',
                  fontWeight: 700, color: 'var(--text)',
                  transition: 'color 0.25s ease', display: 'block', letterSpacing: '0.06em',
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
                aria-label="Zamów online na Pyszne.pl — otwiera nową kartę"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                  letterSpacing: '0.18em', color: 'var(--bg)', background: 'var(--pink)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.25s ease, transform 0.2s ease',
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
                aria-label={`Zadzwoń: ${PHONE_DISPLAY}`}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
                  letterSpacing: '0.15em', color: 'var(--text)', border: '1.5px solid var(--line)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'border-color 0.25s ease, background 0.25s ease',
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
                aria-label="Odwiedź nas na Facebooku — otwiera nową kartę"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
                  letterSpacing: '0.15em', color: 'var(--mint)', border: '1.5px solid var(--mint-dim)',
                  padding: '14px 28px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.25s ease, border-color 0.25s ease',
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

          {/* Right */}
          <div>
            <h3 className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24,
            }}>
              Godziny Otwarcia
            </h3>

            <dl>
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
                  <dt style={{
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 15px)',
                    fontWeight: 400, color: 'var(--muted)',
                  }}>
                    {h.day}
                  </dt>
                  <dd style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.2vw, 16px)',
                    fontWeight: 600, color: 'var(--text)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Map placeholder */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otwórz lokalizację Nice Sushi w Google Maps"
              className="cr"
              style={{
                display: 'block', marginTop: 32, height: 200,
                background: 'var(--bg-card)', border: '1.5px solid var(--line)',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--pink-dim)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
            >
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  linear-gradient(var(--line-subtle) 1px, transparent 1px),
                  linear-gradient(90deg, var(--line-subtle) 1px, transparent 1px)
                `,
                backgroundSize: '28px 28px',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', top: '40%', left: 0, right: 0,
                height: '1.5px', background: 'rgba(232,121,155,0.07)',
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute', left: '42%', top: 0, bottom: 0,
                width: '1.5px', background: 'rgba(232,121,155,0.07)',
              }} />
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', textAlign: 'center',
              }}>
                <div aria-hidden="true" style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'var(--pink)', margin: '0 auto 12px',
                  boxShadow: '0 0 0 7px rgba(232,121,155,0.15), 0 0 0 14px rgba(232,121,155,0.06)',
                }} />
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
                  letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase',
                }}>
                  ul. 1 Maja 37
                </div>
              </div>
              <div aria-hidden="true" style={{
                position: 'absolute', bottom: 14, right: 18,
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.18em', color: 'var(--pink)', textTransform: 'uppercase', opacity: 0.65,
              }}>
                Otwórz Mapy →
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="cr" style={{
          marginTop: 'clamp(56px, 8vw, 96px)',
          paddingTop: 28, borderTop: '1px solid var(--line-subtle)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '16px',
              fontWeight: 600, color: 'var(--pink)',
            }}>Nice</span>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.35em', color: 'var(--muted)', textTransform: 'uppercase',
            }}>SUSHI</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400,
            color: 'var(--dim)', letterSpacing: '0.06em',
          }}>
            © 2025 Nice Sushi Katowice
          </span>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Profil Nice Sushi na Facebooku"
            style={{
              fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '13px',
              color: 'var(--dim)', transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
          >
            /nice-sushi-katowice
          </a>
        </footer>
      </div>
    </section>
  );
}
