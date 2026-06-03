import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import SushiScene from './SushiScene';

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="split-word">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-letter"
          style={{ animationDelay: `${delay + i * 0.04}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

const PETALS = [
  { left: '8%',  top: '15%', size: 13, opacity: 0.34, delay: 0   },
  { left: '88%', top: '20%', size: 11, opacity: 0.28, delay: 1.1 },
  { left: '55%', top: '78%', size: 10, opacity: 0.22, delay: 2.0 },
];

const CherryPetal = memo(
  ({ left, top, size, opacity, delay }: typeof PETALS[0]) => (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', left, top,
        pointerEvents: 'none',
        animation: `petalFloat ${8 + delay * 0.9}s ease-in-out ${delay}s infinite alternate`,
        opacity,
      }}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <path d="M12 2C14 6 19 7 17 13C15 17 9 17 7 13C5 7 10 6 12 2Z" fill="#E8799B" />
        <path d="M12 2C10 6 5 7 7 13C9 17 15 17 17 13C19 7 14 6 12 2Z" fill="#F5A0BE" opacity="0.55" />
        <circle cx="12" cy="11" r="1.5" fill="rgba(255,235,210,0.9)" />
      </svg>
    </div>
  ),
);
CherryPetal.displayName = 'CherryPetal';

export default function Hero() {
  // Outer 300vh scroll wrapper — scroll trigger anchor for SushiScene
  const heroWrapperRef = useRef<HTMLElement>(null);
  // Inner sticky panel refs
  const stickyRef    = useRef<HTMLDivElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);
  const stripRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = stickyRef.current?.querySelectorAll('.split-letter');
      if (letters) {
        gsap.fromTo(
          letters,
          { y: '108%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.04, duration: 1.0, ease: 'power3.out', delay: 0.35 },
        );
      }

      gsap.fromTo(
        [subtitleRef.current, scrollRef.current, stripRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.9 },
      );
    }, stickyRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*
        Outer section is 300 vh so ScrollTrigger has enough room to drive the
        sushi-stacking animation. overflow must be 'visible' so position:sticky works.
        contain: 'none' overrides the global section rule.
      */}
      <section
        id="hero"
        ref={heroWrapperRef as React.RefObject<HTMLElement>}
        aria-label="Nice Sushi — strona główna"
        style={{
          height: '500vh',
          overflow: 'visible',
          contain: 'none',
          position: 'relative',
        }}
      >
        {/* ── Sticky panel ─────────────────────────────────────────────── */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100svh',
            minHeight: 620,
            overflow: 'hidden',
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Background glows */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 70% at 30% 55%, rgba(27,67,50,0.5) 0%, transparent 70%)',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%',
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 100% at 80% 50%, rgba(232,121,155,0.07) 0%, transparent 70%)',
          }} />

          {PETALS.map((p, i) => <CherryPetal key={i} {...p} />)}

          <div aria-hidden="true" style={{
            position: 'absolute', left: 0, top: '18%', bottom: '18%',
            width: 2,
            background: 'linear-gradient(to bottom, transparent, var(--pink), transparent)',
            opacity: 0.45,
          }} />

          {/* ── Main grid ─────────────────────────────────────────────── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
            alignItems: 'center',
            flex: 1,
            maxWidth: 1440,
            width: '100%',
            margin: '0 auto',
            padding: '0 clamp(28px, 5vw, 80px)',
            gap: 'clamp(24px, 3vw, 52px)',
          }} className="hero-inner-grid">
            {/* LEFT: Typography */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.32em', color: 'var(--pink)', textTransform: 'uppercase',
                marginBottom: 32, opacity: 0,
                animation: 'fadeUp 0.6s ease forwards 0.2s',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span aria-hidden="true" style={{ display: 'block', width: 20, height: '1px', background: 'var(--pink)' }} />
                Katowice · Jedyne takie sushi
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(44px, 12.5vw, 210px)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                lineHeight: 0.93, color: 'var(--text)', overflow: 'hidden', margin: 0,
              }}>
                <SplitText text="NICE" delay={0} />
              </h1>

              <div aria-hidden="true" style={{
                fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.8vw, 24px)', color: 'var(--pink)',
                margin: '10px 0', letterSpacing: '0.5em',
                display: 'flex', alignItems: 'center', gap: '0.5em',
              }}>
                <span style={{ display: 'block', height: '1px', width: 'clamp(16px, 2.5vw, 40px)', background: 'linear-gradient(90deg, transparent, var(--pink))' }} />
                ×
                <span style={{ display: 'block', height: '1px', width: 'clamp(16px, 2.5vw, 40px)', background: 'linear-gradient(90deg, var(--pink), transparent)' }} />
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(44px, 12.5vw, 210px)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                lineHeight: 0.93, color: 'transparent',
                WebkitTextStroke: '1.5px rgba(232,121,155,0.5)',
                overflow: 'hidden', margin: 0,
              }}>
                <SplitText text="SUSHI" delay={0.16} />
              </h1>

              <div ref={subtitleRef} style={{ marginTop: 'clamp(18px, 2.5vw, 36px)', opacity: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 17px)',
                  color: 'var(--muted)', letterSpacing: '0.02em', lineHeight: 1.6,
                }}>
                  Viral sushi w tubie na patyku — jedyne w Katowicach
                </p>
              </div>
            </div>

            {/* RIGHT: Three.js sushi scene */}
            <div
              className="hero-tube"
              style={{
                position: 'relative', zIndex: 2,
                height: 'clamp(320px, 55vh, 640px)',
                width: '100%',
              }}
            >
              <SushiScene triggerRef={heroWrapperRef as React.RefObject<HTMLElement | null>} />
            </div>
          </div>

          {/* Scroll indicator */}
          <div ref={scrollRef} style={{
            position: 'absolute', bottom: 36, left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, opacity: 0, zIndex: 2,
          }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.35em', color: 'var(--muted)', textTransform: 'uppercase',
            }}>
              Scroll
            </span>
            <div aria-hidden="true" style={{
              width: 1, height: 36,
              background: 'linear-gradient(to bottom, var(--pink-dim), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }} />
          </div>

          {/* Marquee strip */}
          <div ref={stripRef} aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'var(--pink)', height: 32,
            overflow: 'hidden', display: 'flex', alignItems: 'center',
            opacity: 0, zIndex: 2,
          }}>
            <div style={{
              display: 'flex', gap: '3em', alignItems: 'center',
              animation: 'marquee 26s linear infinite',
              whiteSpace: 'nowrap', paddingLeft: '100%',
            }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.32em', color: 'rgba(13,31,23,0.85)', textTransform: 'uppercase',
                }}>
                  NICE SUSHI KATOWICE &nbsp;·&nbsp; SUSHI W TUBIE &nbsp;·&nbsp; JEDYNE W KATOWICACH &nbsp;·&nbsp;
                </span>
              ))}
            </div>
          </div>

          <div aria-hidden="true" style={{
            position: 'absolute', left: 'clamp(14px, 2vw, 40px)', bottom: '36%',
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400,
            letterSpacing: '0.28em', color: 'var(--dim)', textTransform: 'uppercase',
          }}>
            © 2025 Nice Sushi
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-22px) rotate(28deg); }
        }
        @media (max-width: 680px) {
          .hero-inner-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 1fr auto !important;
            align-items: start !important;
            padding-top: 80px !important;
          }
          .hero-tube {
            height: 38vh !important;
            min-height: 200px !important;
          }
        }
      `}</style>
    </>
  );
}
