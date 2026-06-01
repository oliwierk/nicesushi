import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const rulerTopRef = useRef<HTMLDivElement>(null);
  const rulerBotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      });

      gsap.set([rulerTopRef.current, rulerBotRef.current], { scaleX: 0, transformOrigin: 'left center' });
      tl.to([rulerTopRef.current, rulerBotRef.current], {
        scaleX: 1, duration: 1, ease: 'power3.inOut', stagger: 0.1,
      }, 0);

      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current, authorRef.current], {
        opacity: 0, y: 28,
      });
      tl.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 1, y: 0, stagger: 0.14, duration: 0.9, ease: 'power3.out',
      }, 0.3);
      tl.to(authorRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-card)',
        padding: 'clamp(80px, 14vw, 160px) clamp(24px, 8vw, 120px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '60vh', position: 'relative',
      }}
    >
      {/* Corner glows */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 'clamp(80px, 14vw, 180px)', height: 'clamp(80px, 14vw, 180px)',
        background: 'linear-gradient(225deg, rgba(232,121,155,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 'clamp(80px, 14vw, 180px)', height: 'clamp(80px, 14vw, 180px)',
        background: 'linear-gradient(45deg, rgba(157,202,196,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={rulerTopRef}
        style={{
          width: 'min(480px, 80vw)', height: '0.5px',
          background: 'linear-gradient(90deg, var(--pink), var(--mint), transparent)',
          marginBottom: 'clamp(36px, 5vw, 60px)',
        }}
      />

      <div style={{ textAlign: 'center', maxWidth: 'min(860px, 92vw)' }}>
        <div ref={line1Ref} style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(10px, 1vw, 12px)',
          letterSpacing: '0.5em', color: 'var(--pink)', textTransform: 'uppercase',
          marginBottom: 'clamp(16px, 2.5vw, 28px)',
        }}>
          Filozofia Nice Sushi
        </div>

        <div ref={line2Ref} style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(36px, 6.5vw, 88px)', lineHeight: 1.1,
          color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.01em',
        }}>
          „Jedyne takie
        </div>

        <div ref={line3Ref} style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(36px, 6.5vw, 88px)', lineHeight: 1.1,
          letterSpacing: '-0.01em', marginBottom: 'clamp(28px, 4vw, 48px)',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '0.2em', columnGap: '0.22em',
        }}>
          <span style={{ color: 'var(--muted)' }}>sushi</span>
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--pink)' }}>
            w Katowicach."
          </span>
        </div>

        <div ref={authorRef} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        }}>
          <div style={{ width: 32, height: '0.5px', background: 'var(--pink-dim)' }} />
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: 11,
            letterSpacing: '0.28em', color: 'var(--muted)', textTransform: 'uppercase',
          }}>
            Nice Sushi · Katowice
          </span>
          <div style={{ width: 32, height: '0.5px', background: 'var(--pink-dim)' }} />
        </div>
      </div>

      <div
        ref={rulerBotRef}
        style={{
          width: 'min(480px, 80vw)', height: '0.5px',
          background: 'linear-gradient(90deg, transparent, var(--mint), var(--pink))',
          marginTop: 'clamp(36px, 5vw, 60px)',
        }}
      />

      {/* Big kanji behind */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', overflow: 'hidden', userSelect: 'none',
      }}>
        <span style={{
          fontFamily: 'serif', fontSize: 'clamp(200px, 38vw, 500px)',
          color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.025)',
          lineHeight: 1,
        }}>
          桜
        </span>
      </div>
    </section>
  );
}
