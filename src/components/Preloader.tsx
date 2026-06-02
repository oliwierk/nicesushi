import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalRef     = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const brandRef     = useRef<HTMLDivElement>(null);
  const tubeRef      = useRef<HTMLDivElement>(null);
  const numRef       = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    /* ── Preload the hero image so it's ready before the page fades in ── */
    const img = new Image();
    img.src = '/rolka.jpg';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0, duration: 0.9, ease: 'power2.inOut',
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

      /* Tube photo fades in from right */
      gsap.set(tubeRef.current, { opacity: 0, x: 30 });
      tl.to(tubeRef.current, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }, 0.1);

      /* Kanji brush reveal */
      gsap.set(petalRef.current, { clipPath: 'inset(100% 0 0 0)', opacity: 1 });
      tl.to(petalRef.current, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'power3.out' }, 0.3);

      /* Line expand */
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' });
      tl.to(lineRef.current, { scaleX: 1, duration: 0.65, ease: 'power2.out' }, '-=0.4');

      /* Brand name */
      gsap.set(brandRef.current, { opacity: 0, y: 10 });
      tl.to(brandRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.3');

      /* Counter */
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100, duration: 1.7, ease: 'power1.inOut',
        onUpdate: () => {
          if (numRef.current) numRef.current.textContent = String(Math.round(counter.val));
        },
      }, 0.2);

      tl.to({}, { duration: 0.4 });
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
      {/* ── Tube photo — right side, ghosted ── */}
      <div
        ref={tubeRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(160px, 32vw, 380px)',
          opacity: 0,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/rolka.jpg"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            filter: 'brightness(0.55) saturate(0.7)',
          }}
        />
      </div>

      {/* ── Centre content ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* Kanji */}
        <div
          ref={petalRef}
          aria-hidden="true"
          style={{
            fontFamily: 'serif',
            fontSize: 'clamp(120px, 22vw, 220px)',
            color: 'transparent',
            WebkitTextStroke: '0.5px #E8799B',
            lineHeight: 1,
            opacity: 0,
            userSelect: 'none',
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
          <img
            src="/logo.jpg"
            alt=""
            width={48}
            height={48}
            style={{ borderRadius: '50%', objectFit: 'cover', opacity: 0.85 }}
          />
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

      {/* Progress counter */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 40, right: 52,
        fontFamily: 'var(--font-body)', fontSize: '14px',
        color: '#2E4A3A', letterSpacing: '0.1em',
        display: 'flex', alignItems: 'baseline', gap: 2,
      }}>
        <span ref={numRef}>0</span>
        <span style={{ fontSize: '11px' }}>%</span>
      </div>

      {/* City tag */}
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
