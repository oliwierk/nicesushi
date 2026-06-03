import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { preloadSushiModel } from './SushiScene';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const kanjiRef    = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const brandRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Kick off 3-D model loading while preloader is visible
    preloadSushiModel();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.75,
            ease: 'power2.inOut',
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

      // Kanji: clip-path wipe from bottom to top
      gsap.set(kanjiRef.current, { clipPath: 'inset(100% 0 0 0)', opacity: 1 });
      tl.to(kanjiRef.current, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.05,
        ease: 'power3.out',
      }, 0.15);

      // Separator
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
      tl.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');

      // Brand
      gsap.set(brandRef.current, { opacity: 0, y: 10 });
      tl.to(brandRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.2');

      // Hold
      tl.to({}, { duration: 0.8 });
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
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Kanji */}
      <div
        ref={kanjiRef}
        aria-hidden="true"
        style={{
          fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", "Noto Serif", Georgia, serif',
          fontSize: 'clamp(160px, 30vw, 320px)',
          color: 'transparent',
          WebkitTextStroke: '1px #E8799B',
          lineHeight: 1,
          letterSpacing: '0.04em',
          userSelect: 'none',
          opacity: 0,
          textRendering: 'geometricPrecision' as React.CSSProperties['textRendering'],
          WebkitFontSmoothing: 'antialiased',
        } as React.CSSProperties}
      >
        桜
      </div>

      {/* Separator */}
      <div
        ref={lineRef}
        aria-hidden="true"
        style={{
          width: 'clamp(80px, 12vw, 140px)',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #E8799B, transparent)',
          margin: '32px 0 24px',
        }}
      />

      {/* Brand */}
      <div
        ref={brandRef}
        aria-hidden="true"
        style={{ display: 'flex', alignItems: 'baseline', gap: 10, opacity: 0 }}
      >
        <span style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 600,
          letterSpacing: '0.06em', color: '#E8799B',
        }}>
          Nice
        </span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.6vw, 22px)',
          fontWeight: 700, letterSpacing: '0.38em', color: '#9AB8A8',
          textTransform: 'uppercase',
        }}>
          SUSHI
        </span>
      </div>

      {/* Subtle city tag */}
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
