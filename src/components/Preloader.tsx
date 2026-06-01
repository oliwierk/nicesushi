import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.85,
            ease: 'power2.inOut',
            onComplete,
          });
        },
      });

      gsap.set(petalRef.current, { clipPath: 'inset(100% 0 0% 0)', opacity: 1 });
      tl.to(petalRef.current, {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 1.3,
        ease: 'power3.out',
      }, 0.3);

      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center center' });
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.65,
        ease: 'power2.out',
      }, '-=0.4');

      gsap.set(brandRef.current, { opacity: 0, y: 10 });
      tl.to(brandRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, '-=0.3');

      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.7,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = String(Math.round(counter.val));
          }
        },
      }, 0.2);

      tl.to({}, { duration: 0.35 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0D1F17',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Cherry blossom kanji */}
      <div
        ref={petalRef}
        style={{
          fontFamily: 'serif',
          fontSize: 'clamp(72px, 13vw, 130px)',
          color: 'transparent',
          WebkitTextStroke: '0.5px #E8799B',
          lineHeight: 1,
          opacity: 0,
          letterSpacing: '0.05em',
          userSelect: 'none',
        }}
      >
        桜
      </div>

      {/* Pink separator */}
      <div
        ref={lineRef}
        style={{
          width: 80,
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent, #E8799B, transparent)',
          marginTop: 24,
          marginBottom: 20,
        }}
      />

      {/* Brand */}
      <div
        ref={brandRef}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontSize: 14,
          letterSpacing: '0.12em',
          color: '#E8799B',
        }}>
          Nice
        </span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          letterSpacing: '0.45em',
          color: '#7A9E8E',
          textTransform: 'uppercase',
        }}>
          SUSHI
        </span>
      </div>

      {/* Progress */}
      <div
        ref={progressRef}
        style={{
          position: 'absolute',
          bottom: 40,
          right: 48,
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          color: '#2E4A3A',
          letterSpacing: '0.1em',
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
        }}
      >
        <span ref={numRef}>0</span>
        <span style={{ fontSize: 9 }}>%</span>
      </div>

      <div style={{
        position: 'absolute',
        top: 36,
        left: 48,
        fontFamily: 'var(--font-body)',
        fontSize: 10,
        letterSpacing: '0.25em',
        color: '#1F3628',
        textTransform: 'uppercase',
      }}>
        Katowice
      </div>
    </div>
  );
}
