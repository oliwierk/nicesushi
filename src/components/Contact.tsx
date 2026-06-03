import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PHONE = '+48880154776';
const PHONE_DISPLAY = '880 154 776';
const MAPS_URL = 'https://www.google.com/maps/search/Nice+Sushi+Katowice+ul.+1+Maja+37';
const ORDER_URL = 'https://www.pyszne.pl/menu/nice-sushi-3';
const FB_URL = 'https://www.facebook.com/profile.php?id=61585356602337';
const IG_URL = 'https://www.instagram.com/nicesushi.katowice';

const hours = [
  { day: 'Poniedziałek – Czwartek', time: '12:00 – 21:00' },
  { day: 'Piątek – Sobota',         time: '12:00 – 22:00' },
  { day: 'Niedziela',               time: '13:00 – 21:00' },
];

const features = [
  { icon: '🚴', label: 'Dostawa w Katowicach', sub: 'Szybka i bezpieczna' },
  { icon: '🏃', label: 'Odbiór osobisty',     sub: 'ul. 1 Maja 37' },
  { icon: '💳', label: 'Płatność kartą',       sub: 'i gotówką' },
  { icon: '🌱', label: 'Opcje wegańskie',      sub: 'Vege Tuba i więcej' },
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
            opacity: 1, y: 0, stagger: 0.08, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          },
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
        padding: 'clamp(72px, 10vw, 130px) clamp(24px, 5vw, 80px)',
        borderTop: '1px solid var(--line-subtle)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background kanji */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Yu Mincho", "Hiragino Mincho ProN", serif',
        fontSize: 'clamp(200px, 38vw, 520px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.02)',
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1, zIndex: 0,
      }}>
        来
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
        <div className="cr section-label" style={{ marginBottom: 28 }}>Odwiedź nas</div>

        {/* ── Main grid: 3 columns on large, stacks on small ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }} className="contact-grid">

          {/* ─── Column 1: Brand + Address + Phone + CTAs ─── */}
          <div>
            <h2 id="contact-heading" className="cr" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.5vw, 62px)',
              fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
              lineHeight: 1.05, marginBottom: 20,
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

            <p className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.1vw, 16px)',
              color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32,
              maxWidth: 400,
            }}>
              Pierwsze miejsce w Katowicach serwujące sushi w tubie na patyku.
              Wirusowe, smaczne i absolutnie jedyne w swoim rodzaju — od lat podbijamy
              serca i TikToki. Zapraszamy do naszego lokalu przy ul. 1 Maja 37
              lub zamów z dostawą bezpośrednio przez Pyszne.pl.
            </p>

            {/* Address */}
            <div className="cr" style={{ borderLeft: '2px solid var(--pink)', paddingLeft: 20, marginBottom: 24 }}>
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
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 18px)',
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
            <div className="cr" style={{ borderLeft: '2px solid var(--mint)', paddingLeft: 20, marginBottom: 36 }}>
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
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 2vw, 26px)',
                  fontWeight: 700, color: 'var(--text)',
                  transition: 'color 0.25s ease', display: 'block', letterSpacing: '0.06em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mint)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
              >
                {PHONE_DISPLAY}
              </a>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)',
                marginTop: 4, display: 'block',
              }}>
                Pon–Czw 12–21 · Pt–Sb 12–22 · Nd 13–21
              </span>
            </div>

            {/* CTAs */}
            <div className="cr" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zamów online na Pyszne.pl"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.18em', color: 'var(--bg)', background: 'var(--pink)',
                  padding: '13px 26px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.25s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pink-vivid)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--pink)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Zamów Online
              </a>
              <a
                href={`tel:${PHONE}`}
                aria-label={`Zadzwoń: ${PHONE_DISPLAY}`}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.15em', color: 'var(--text)', border: '1.5px solid var(--line)',
                  padding: '13px 22px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'border-color 0.25s ease, background 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.background = 'var(--pink-glow)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'transparent'; }}
              >
                Zadzwoń
              </a>
              <a
                href={FB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.15em', color: 'var(--mint)', border: '1.5px solid var(--mint-dim)',
                  padding: '13px 22px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(157,202,196,0.08)'; e.currentTarget.style.borderColor = 'var(--mint)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--mint-dim)'; }}
              >
                Facebook
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.15em', color: 'var(--pink)', border: '1.5px solid var(--pink-dim)',
                  padding: '13px 22px', textTransform: 'uppercase',
                  display: 'inline-block', transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pink-glow)'; e.currentTarget.style.borderColor = 'var(--pink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--pink-dim)'; }}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* ─── Column 2: Hours + Info features ─── */}
          <div>
            <h3 className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24,
            }}>
              Godziny Otwarcia
            </h3>

            <dl style={{ marginBottom: 36 }}>
              {hours.map((h, i) => (
                <div
                  key={i}
                  className="cr"
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'clamp(12px, 1.6vw, 18px) 0',
                    borderBottom: '1px solid var(--line-subtle)', gap: 16,
                  }}
                >
                  <dt style={{
                    fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 400, color: 'var(--muted)',
                  }}>
                    {h.day}
                  </dt>
                  <dd style={{
                    fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 600, color: 'var(--text)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
                  }}>
                    {h.time}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Feature badges */}
            <h3 className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 18,
            }}>
              Udogodnienia
            </h3>
            <div className="cr" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--line-subtle)',
                  padding: '14px 16px',
                }}>
                  <span style={{ fontSize: '20px', display: 'block', marginBottom: 6 }}>{f.icon}</span>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                    color: 'var(--text)', marginBottom: 3,
                  }}>
                    {f.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--dim)' }}>
                    {f.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Column 3: Map placeholder + Social ─── */}
          <div>
            <h3 className="cr" style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
              letterSpacing: '0.25em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 24,
            }}>
              Znajdź nas
            </h3>

            {/* Map placeholder */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Otwórz lokalizację Nice Sushi w Google Maps"
              className="cr"
              style={{
                display: 'block', marginBottom: 28,
                height: 'clamp(160px, 20vh, 240px)',
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

            {/* Social + online ordering */}
            <div className="cr" style={{
              background: 'var(--bg-card)', border: '1px solid var(--line-subtle)',
              padding: '24px',
            }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.25em', color: 'var(--pink)', textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Zamów Online
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)',
                lineHeight: 1.7, marginBottom: 18,
              }}>
                Dostawa i odbiór osobisty dostępne przez Pyszne.pl.
                Śledź nas na mediach społecznościowych — codziennie nowe filmy
                i kulisy przygotowania sushi w tubie.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a
                  href={ORDER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                    color: 'var(--text)', letterSpacing: '0.08em',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', border: '1px solid var(--line-subtle)',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.color = 'var(--pink)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-subtle)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <span>Pyszne.pl</span>
                  <span style={{ color: 'var(--dim)', fontSize: '11px' }}>→</span>
                </a>
                <a
                  href={FB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                    color: 'var(--text)', letterSpacing: '0.08em',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', border: '1px solid var(--line-subtle)',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--mint)'; e.currentTarget.style.color = 'var(--mint)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-subtle)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <span>Facebook</span>
                  <span style={{ color: 'var(--dim)', fontSize: '11px' }}>→</span>
                </a>
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500,
                    color: 'var(--text)', letterSpacing: '0.08em',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 14px', border: '1px solid var(--line-subtle)',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--pink)'; e.currentTarget.style.color = 'var(--pink)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line-subtle)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <span>@nicesushi.katowice</span>
                  <span style={{ color: 'var(--dim)', fontSize: '11px' }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="cr" style={{
          marginTop: 'clamp(48px, 7vw, 88px)',
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
            © 2025 Nice Sushi Katowice · ul. 1 Maja 37
          </span>
          <span style={{ display: 'flex', gap: 20 }}>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '13px', color: 'var(--dim)', transition: 'color 0.25s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--mint)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              Facebook
            </a>
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '13px', color: 'var(--dim)', transition: 'color 0.25s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--pink)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--dim)')}
            >
              Instagram
            </a>
          </span>
        </footer>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
