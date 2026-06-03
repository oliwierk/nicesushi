import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

/* One maki piece — cross-section circle viewed from top */
function MakiPiece({ size = 52 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden="true">
      {/* Nori outer ring */}
      <circle cx="30" cy="30" r="29" fill="#1A2E24" />
      {/* Rice */}
      <circle cx="30" cy="30" r="24" fill="#F5F0E8" />
      {/* Avocado */}
      <circle cx="30" cy="30" r="17" fill="#8CB87A" opacity="0.88" />
      {/* Salmon */}
      <circle cx="30" cy="30" r="11" fill="#FF8058" opacity="0.92" />
      {/* Core */}
      <circle cx="30" cy="30" r="5"  fill="#E85C35" />
      {/* Highlight sheen */}
      <ellipse cx="20" cy="19" rx="7" ry="4" fill="rgba(255,255,255,0.18)" transform="rotate(-30,20,19)" />
    </svg>
  );
}

/* Stack config — landing positions grow upward */
const STACK = [
  { landX:  6, landY:   0, finalRot:  -7, size: 54, startX:  30 },
  { landX: -5, landY: -46, finalRot:   9, size: 50, startX:  60 },
  { landX:  8, landY: -88, finalRot: -12, size: 52, startX: -10 },
  { landX: -3, landY:-128, finalRot:   5, size: 48, startX:  20 },
  { landX:  5, landY:-166, finalRot: -15, size: 50, startX: -30 },
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const petalRef      = useRef<HTMLDivElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const brandRef      = useRef<HTMLDivElement>(null);
  const numRef        = useRef<HTMLSpanElement>(null);
  const stackRef      = useRef<HTMLDivElement>(null);
  const piecesRef     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    /* Preload hero image while the preloader plays */
    new Image().src = '/rolka.jpg';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0, duration: 0.85, ease: 'power2.inOut',
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.pointerEvents = 'none';
                containerRef.current.style.visibility   = 'hidden';
              }
              onComplete();
            },
          });
        },
      });

      /* ── Kanji reveal ── */
      gsap.set(petalRef.current, { clipPath: 'inset(100% 0 0 0)', opacity: 1 });
      tl.to(petalRef.current, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power3.out' }, 0.2);

      /* ── Separator ── */
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
      tl.to(lineRef.current, { scaleX: 1, duration: 0.55, ease: 'power2.out' }, '-=0.35');

      /* ── Brand ── */
      gsap.set(brandRef.current, { opacity: 0, y: 8 });
      tl.to(brandRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.25');

      /* ── Counter ── */
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100, duration: 1.6, ease: 'power1.inOut',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = String(Math.round(counter.val));
        },
      }, 0.15);

      /* ── Falling maki pieces (staggered, after brand appears) ── */
      const stack = stackRef.current;
      if (stack) {
        gsap.set(stack, { opacity: 1 });

        STACK.forEach((s, i) => {
          const piece = piecesRef.current[i];
          if (!piece) return;

          /* Start: above the screen, slight horizontal offset */
          gsap.set(piece, {
            x: s.startX,
            y: -420,
            rotation: Math.random() * 40 - 20,
            opacity: 1,
          });

          /* Land on the pile with bounce */
          tl.to(piece, {
            x: s.landX,
            y: s.landY,
            rotation: s.finalRot,
            duration: 0.62,
            ease: 'bounce.out',
          }, 0.7 + i * 0.28);

          /* Small squish on landing */
          tl.to(piece, {
            scaleX: 1.1, scaleY: 0.88,
            duration: 0.08, ease: 'power2.in',
          }, 0.7 + i * 0.28 + 0.52);
          tl.to(piece, {
            scaleX: 1, scaleY: 1,
            duration: 0.18, ease: 'elastic.out(1, 0.5)',
          }, 0.7 + i * 0.28 + 0.60);
        });
      }

      /* Hold */
      tl.to({}, { duration: 0.35 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Wczytywanie strony Nice Sushi"
      style={{
        position: 'fixed', inset: 0,
        background: '#0D1F17',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Centre content ── */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', position: 'relative', zIndex: 1,
      }}>
        {/* Kanji */}
        <div
          ref={petalRef}
          aria-hidden="true"
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(120px, 22vw, 220px)',
            color: 'transparent',
            WebkitTextStroke: '0.5px #E8799B',
            lineHeight: 1, opacity: 0, userSelect: 'none',
          }}
        >
          桜
        </div>

        {/* Separator */}
        <div
          ref={lineRef}
          aria-hidden="true"
          style={{
            width: 140, height: '1px',
            background: 'linear-gradient(90deg, transparent, #E8799B, transparent)',
            marginTop: 36, marginBottom: 28,
          }}
        />

        {/* Brand */}
        <div
          ref={brandRef}
          aria-hidden="true"
          style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: 0 }}
        >
          <img src="/logo.jpg" alt="" width={48} height={48}
            style={{ borderRadius: '50%', objectFit: 'cover', opacity: 0.85 }} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
              fontSize: '32px', fontWeight: 600, letterSpacing: '0.06em', color: '#E8799B',
            }}>Nice</span>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700,
              letterSpacing: '0.38em', color: '#9AB8A8', textTransform: 'uppercase',
            }}>SUSHI</span>
          </div>
        </div>
      </div>

      {/* ── Falling sushi stack — right side ── */}
      <div
        ref={stackRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(48px, 10vw, 120px)',
          bottom: 'clamp(60px, 12vh, 140px)',
          opacity: 0,
        }}
      >
        {STACK.map((s, i) => (
          <div
            key={i}
            ref={(el) => { piecesRef.current[i] = el; }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              transformOrigin: 'center center',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
            }}
          >
            <MakiPiece size={s.size} />
          </div>
        ))}
      </div>

      {/* Progress */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 40, right: 52,
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: '#2E4A3A', letterSpacing: '0.1em',
        display: 'flex', alignItems: 'baseline', gap: 2,
      }}>
        <span ref={numRef}>0</span>
        <span style={{ fontSize: '11px' }}>%</span>
      </div>

      <div aria-hidden="true" style={{
        position: 'absolute', top: 36, left: 52,
        fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
        letterSpacing: '0.24em', color: '#1F3628', textTransform: 'uppercase',
      }}>
        Katowice
      </div>
    </div>
  );
}
