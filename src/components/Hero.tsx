import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';

const TITLE_LINE1 = 'NICE';
const TITLE_LINE2 = 'SUSHI';

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="split-word">
      {text.split('').map((char, i) => (
        <span key={i} className="split-letter" style={{ animationDelay: `${delay + i * 0.04}s` }}>
          {char}
        </span>
      ))}
    </span>
  );
}

const PETALS = [
  { left: '8%',  top: '12%', size: 10, opacity: 0.35, delay: 0 },
  { left: '18%', top: '65%', size: 7,  opacity: 0.25, delay: 1.2 },
  { left: '32%', top: '28%', size: 12, opacity: 0.3,  delay: 0.5 },
  { left: '72%', top: '18%', size: 8,  opacity: 0.4,  delay: 0.8 },
  { left: '85%', top: '55%', size: 11, opacity: 0.3,  delay: 1.5 },
  { left: '55%', top: '78%', size: 9,  opacity: 0.2,  delay: 2.0 },
  { left: '92%', top: '30%', size: 7,  opacity: 0.35, delay: 0.3 },
  { left: '42%', top: '88%', size: 8,  opacity: 0.22, delay: 1.8 },
];

const CherryPetal = memo(({ left, top, size, opacity, delay }: typeof PETALS[0]) => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      left, top,
      width: size, height: size,
      pointerEvents: 'none',
      animation: `petalFloat ${7 + delay * 0.8}s ease-in-out ${delay}s infinite alternate`,
      opacity,
    }}
  >
    <svg viewBox="0 0 20 20" width={size} height={size}>
      <path
        d="M10 2 C12 5 16 7 14 11 C12 14 8 14 6 11 C4 7 8 5 10 2Z"
        fill="#E8799B"
      />
      <path
        d="M10 2 C8 5 4 7 6 11 C8 14 12 14 14 11 C16 7 12 5 10 2Z"
        fill="#F07CA0"
        opacity="0.6"
      />
    </svg>
  </div>
));
CherryPetal.displayName = 'CherryPetal';

function SushiTube() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
    }}>
      {/* Tube body */}
      <div style={{
        width: 'clamp(55px, 7vw, 84px)',
        height: 'clamp(180px, 23vw, 268px)',
        borderRadius: '50px',
        background: `linear-gradient(145deg,
          #D4EEEB 0%,
          #9DD0CA 28%,
          #70B5AE 55%,
          #4A9A92 80%,
          #357871 100%
        )`,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `
          inset -10px 0 24px rgba(0,0,0,0.28),
          inset 7px 0 18px rgba(255,255,255,0.22),
          inset 0 -14px 28px rgba(0,0,0,0.2)
        `,
      }}>
        {/* Cherry blossom branch SVG on tube */}
        <svg
          viewBox="0 0 84 268"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          aria-hidden
        >
          {/* Branch */}
          <path
            d="M 42 268 C 38 230 28 200 22 172 C 32 158 42 148 42 124 C 42 100 34 84 38 60"
            stroke="rgba(0,60,40,0.22)"
            strokeWidth="2"
            fill="none"
          />
          {/* Flowers */}
          {[
            { cx: 22, cy: 172, r: 5 },
            { cx: 36, cy: 148, r: 4 },
            { cx: 30, cy: 124, r: 6 },
            { cx: 48, cy: 100, r: 4 },
            { cx: 38, cy: 60,  r: 5 },
            { cx: 55, cy: 80,  r: 3 },
          ].map((f, i) => (
            <g key={i}>
              <circle cx={f.cx} cy={f.cy} r={f.r} fill="rgba(232,121,155,0.55)" />
              <circle cx={f.cx} cy={f.cy} r={f.r * 0.4} fill="rgba(255,230,200,0.8)" />
            </g>
          ))}
        </svg>

        {/* Brand text on tube */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          writingMode: 'vertical-rl',
          textAlign: 'center',
          userSelect: 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(11px, 1.4vw, 16px)',
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.12em',
            display: 'block',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>Nice</span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(8px, 1vw, 11px)',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            display: 'block',
            marginTop: 4,
          }}>Sushi</span>
        </div>

        {/* Top cap */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '12%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)',
          borderRadius: '50px 50px 0 0',
        }} />
      </div>

      {/* Stick */}
      <div style={{
        width: 'clamp(3px, 0.4vw, 5px)',
        height: 'clamp(60px, 9vw, 110px)',
        background: 'linear-gradient(to bottom, #7A5540, #4A3025)',
        borderRadius: '3px',
        marginTop: -6,
        boxShadow: '-2px 2px 8px rgba(0,0,0,0.4)',
      }} />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const tubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = sectionRef.current?.querySelectorAll('.split-letter');
      if (letters) {
        gsap.fromTo(letters,
          { y: '108%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.045, duration: 1.0, ease: 'power3.out', delay: 0.35 }
        );
      }

      gsap.fromTo(
        [subtitleRef.current, scrollRef.current, stripRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.9 }
      );

      gsap.fromTo(tubeRef.current,
        { opacity: 0, y: 30, rotate: -3 },
        { opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );

      gsap.to(tubeRef.current, {
        y: -14, rotate: 1.5,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        height: '100svh', minHeight: 600,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'hidden',
        padding: '0 clamp(28px, 7vw, 96px)',
        gap: 'clamp(24px, 4vw, 60px)',
      }}
    >
      {/* Radial glow - green center */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 35% 55%, rgba(27,67,50,0.45) 0%, transparent 70%)',
      }} />

      {/* Pink radial on right */}
      <div aria-hidden style={{
        position: 'absolute', right: '-5%', top: '20%',
        width: 'clamp(300px, 40vw, 600px)', height: 'clamp(300px, 40vw, 600px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,121,155,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Decorative cherry petals */}
      {PETALS.map((p, i) => (
        <CherryPetal key={i} {...p} />
      ))}

      {/* Pink accent bar — left edge */}
      <div aria-hidden style={{
        position: 'absolute', left: 0, top: '18%', bottom: '18%',
        width: 2,
        background: 'linear-gradient(to bottom, transparent, var(--pink), transparent)',
        opacity: 0.5,
      }} />

      {/* Left: Main content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Overline */}
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.5em',
          color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 32,
          opacity: 0, animation: 'fadeUp 0.6s ease forwards 0.2s',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 20, height: '0.5px', background: 'var(--pink)' }} />
          Katowice · Jedyne takie sushi
        </div>

        {/* NICE — filled */}
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(68px, 14vw, 180px)',
          letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 0.95,
          color: 'var(--text)', overflow: 'hidden',
        }}>
          <SplitText text={TITLE_LINE1} delay={0} />
        </div>

        {/* Thin separator */}
        <div style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(14px, 2vw, 26px)',
          color: 'var(--pink)', margin: '8px 0', letterSpacing: '0.55em',
          display: 'flex', alignItems: 'center', gap: '0.5em',
        }}>
          <span style={{
            display: 'block', height: '0.5px', width: 'clamp(18px, 3vw, 48px)',
            background: 'linear-gradient(90deg, transparent, var(--pink))',
          }} />
          ×
          <span style={{
            display: 'block', height: '0.5px', width: 'clamp(18px, 3vw, 48px)',
            background: 'linear-gradient(90deg, var(--pink), transparent)',
          }} />
        </div>

        {/* SUSHI — outline */}
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: 'clamp(68px, 14vw, 180px)',
          letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 0.95,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,121,155,0.55)',
          overflow: 'hidden',
        }}>
          <SplitText text={TITLE_LINE2} delay={0.18} />
        </div>

        {/* Tagline */}
        <div ref={subtitleRef} style={{
          marginTop: 'clamp(20px, 3vw, 36px)',
          opacity: 0,
        }}>
          <p style={{
            fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
            fontSize: 'clamp(12px, 1.3vw, 15px)', color: 'var(--muted)',
            letterSpacing: '0.04em',
          }}>
            Wirusowe sushi w tubie na patyku — jedyne w Katowicach
          </p>
        </div>
      </div>

      {/* Right: Tube visual */}
      <div
        ref={tubeRef}
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          paddingTop: 60,
          opacity: 0,
        }}
        className="hero-tube"
      >
        <SushiTube />
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, opacity: 0,
        zIndex: 2,
      }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.4em',
          color: 'var(--muted)', textTransform: 'uppercase',
        }}>Scroll</div>
        <div style={{
          width: 1, height: 32,
          background: 'linear-gradient(to bottom, var(--pink-dim), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Bottom marquee strip */}
      <div ref={stripRef} style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'var(--pink)', height: 28, overflow: 'hidden',
        display: 'flex', alignItems: 'center', opacity: 0, zIndex: 2,
      }}>
        <div style={{
          display: 'flex', gap: '3em', alignItems: 'center',
          animation: 'marquee 24s linear infinite',
          whiteSpace: 'nowrap', paddingLeft: '100%',
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.4em',
              color: 'rgba(13,31,23,0.85)', textTransform: 'uppercase',
            }}>
              NICE SUSHI KATOWICE &nbsp;·&nbsp; SUSHI W TUBIE &nbsp;·&nbsp; JEDYNE W KATOWICACH &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Side label */}
      <div aria-hidden style={{
        position: 'absolute', left: 'clamp(14px, 2vw, 40px)', bottom: '36%',
        writingMode: 'vertical-rl', transform: 'rotate(180deg)',
        fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.3em',
        color: 'var(--dim)', textTransform: 'uppercase',
      }}>
        © 2025 Nice Sushi
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50%       { transform: scaleY(0.55); opacity: 1; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes petalFloat {
          0%   { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-18px) rotate(25deg); }
        }
        @media (max-width: 640px) {
          .hero-tube { display: none; }
          #hero { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
