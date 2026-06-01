import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imgContainerRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(imgContainerRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: imgContainerRef.current, start: 'top 75%' },
      });

      gsap.to(imgRef.current, {
        y: '-12%', ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current, start: 'top bottom',
          end: 'bottom top', scrub: 1.2,
        },
      });

      gsap.fromTo(
        [labelRef.current, line1Ref.current, line2Ref.current, bodyRef.current, taglineRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 14vw, 160px) clamp(24px, 6vw, 80px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: 'clamp(32px, 4vw, 64px)',
        alignItems: 'center',
        minHeight: '80vh',
        position: 'relative',
      }}
    >
      {/* Cherry blossom decoration */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '10%', right: 'clamp(16px, 4vw, 60px)',
          fontFamily: 'serif', fontSize: 'clamp(90px, 15vw, 240px)',
          color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.05)',
          writingMode: 'vertical-rl', pointerEvents: 'none', userSelect: 'none',
          lineHeight: 0.9, letterSpacing: '0.1em',
        }}
      >
        桜
      </div>

      {/* Image column — cols 1–6 */}
      <div style={{ gridColumn: '1 / 7', position: 'relative', aspectRatio: '4/5' }}>
        <div ref={imgContainerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
          <div
            ref={imgRef}
            style={{
              width: '100%', height: '115%',
              backgroundImage: `url(https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=1200&q=85)`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              filter: 'brightness(0.65) contrast(1.1) saturate(0.9)',
            }}
          />
          <div style={{
            position: 'absolute', top: 20, right: 20, width: 40, height: 40,
            borderTop: '1px solid var(--pink-dim)', borderRight: '1px solid var(--pink-dim)',
          }} />
          <div style={{
            position: 'absolute', bottom: 20, left: 20, width: 40, height: 40,
            borderBottom: '1px solid var(--pink-dim)', borderLeft: '1px solid var(--pink-dim)',
          }} />
        </div>

        {/* Floating badge */}
        <div style={{
          position: 'absolute', bottom: -20, right: -20,
          background: 'var(--bg-card)', border: '1px solid var(--line)',
          padding: '16px 24px', backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.3em',
            color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 4,
          }}>
            Viral
          </div>
          <div style={{
            fontFamily: 'var(--font-editorial)', fontSize: 16, color: 'var(--text)', fontStyle: 'italic',
          }}>
            #sushiwtubiekatowice
          </div>
        </div>
      </div>

      {/* Text column — cols 7–12 */}
      <div
        ref={textBlockRef}
        style={{
          gridColumn: '7 / 13',
          paddingLeft: 'clamp(0px, 2vw, 32px)',
          paddingTop: 32, paddingBottom: 32,
        }}
      >
        <div ref={labelRef} style={{
          fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.45em',
          color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 24, height: '0.5px', background: 'var(--pink)' }} />
          Nasza Historia
        </div>

        <h2 ref={line1Ref} style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.8vw, 50px)',
          fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text)',
          lineHeight: 1.15, textTransform: 'uppercase', marginBottom: 8,
        }}>
          Wymyśliliśmy
        </h2>
        <h2 ref={line2Ref} style={{
          fontFamily: 'var(--font-editorial)', fontSize: 'clamp(26px, 3.8vw, 50px)',
          fontStyle: 'italic', fontWeight: 400, letterSpacing: '0.02em',
          color: 'var(--pink)', lineHeight: 1.15, marginBottom: 40,
        }}>
          coś nowego.
        </h2>

        <div ref={bodyRef} style={{
          borderLeft: '1px solid var(--line)', paddingLeft: 24, marginBottom: 40,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.3vw, 15px)',
            lineHeight: 1.85, color: 'var(--muted)', marginBottom: 20,
          }}>
            Nice Sushi to pierwsze miejsce w Katowicach, gdzie sushi podajemy
            w oryginalnej tubie na patyku. Pomysł, który podbił media społecznościowe
            i stał się symbolem naszego miasta. Wirusowe, smaczne i jedyne w swoim rodzaju.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1.3vw, 15px)',
            lineHeight: 1.85, color: 'var(--muted)',
          }}>
            Składniki najwyższej jakości, autorskie sosy i niespotykana forma podania —
            to właśnie sprawia, że wracasz po więcej. Zapraszamy na ul. 1 Maja 37
            w samym centrum Katowic.
          </p>
        </div>

        <div ref={taglineRef} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40, height: '0.5px',
            background: 'linear-gradient(90deg, var(--pink), transparent)',
          }} />
          <span style={{
            fontFamily: 'var(--font-editorial)', fontSize: 'clamp(12px, 1.2vw, 14px)',
            fontStyle: 'italic', color: 'var(--muted)', letterSpacing: '0.04em',
          }}>
            Jedyne takie sushi w Katowicach.
          </span>
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{
        gridColumn: '1 / -1', height: '0.5px',
        background: 'linear-gradient(90deg, transparent, var(--line), transparent)',
        marginTop: 40,
      }} />
    </section>
  );
}
