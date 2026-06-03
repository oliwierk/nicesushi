import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const textEls = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Knife-cut reveal
      gsap.set(imgWrapRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(imgWrapRef.current, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4, ease: 'power3.inOut',
        scrollTrigger: { trigger: imgWrapRef.current, start: 'top 78%' },
      });

      // Text stagger
      const valid = textEls.current.filter(Boolean);
      gsap.fromTo(valid,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, stagger: 0.11, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: textBlockRef.current, start: 'top 72%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => { textEls.current[i] = el; };

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 14vw, 160px) clamp(24px, 6vw, 80px)',
        position: 'relative',
      }}
    >
      {/* Cherry blossom bg decoration */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '8%', right: 'clamp(16px, 4vw, 60px)',
        fontFamily: 'serif', fontSize: 'clamp(90px, 15vw, 240px)',
        color: 'transparent', WebkitTextStroke: '1px rgba(232,121,155,0.05)',
        writingMode: 'vertical-rl', pointerEvents: 'none', userSelect: 'none',
        lineHeight: 0.9,
      }}>
        桜
      </div>

      {/* Two-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap: 'clamp(40px, 6vw, 96px)',
        alignItems: 'center',
        maxWidth: 1280,
        margin: '0 auto',
      }}
        className="philo-grid"
      >
        {/* Image column */}
        <div style={{ position: 'relative' }}>
          <div
            ref={imgWrapRef}
            style={{
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '4 / 5',
              background: 'var(--bg-card)',
            }}
          >
            <img
              ref={imgRef}
              src="/rolki.webp"
              alt="Nice Sushi — świeże rolki sushi przygotowane w Katowicach"
              loading="eager"
              decoding="async"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: 'brightness(0.65) contrast(1.1) saturate(0.9)',
                transform: 'translateY(0)',
              }}
            />
            {/* Corner accents */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: 18, right: 18, width: 40, height: 40,
              borderTop: '1.5px solid var(--pink-dim)', borderRight: '1.5px solid var(--pink-dim)',
              pointerEvents: 'none',
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute', bottom: 18, left: 18, width: 40, height: 40,
              borderBottom: '1.5px solid var(--pink-dim)', borderLeft: '1.5px solid var(--pink-dim)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Floating badge */}
          <div style={{
            position: 'absolute', bottom: -22, right: -22,
            background: 'var(--bg-card)', border: '1px solid var(--line)',
            padding: '18px 26px', backdropFilter: 'blur(8px)',
          }}>
            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.28em', color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 5,
            }}>
              Viral
            </div>
            <div style={{
              fontFamily: 'var(--font-editorial)', fontSize: '17px',
              color: 'var(--text)', fontStyle: 'italic',
            }}>
              #sushiwtubiekatowice
            </div>
          </div>
        </div>

        {/* Text column */}
        <div ref={textBlockRef} style={{ paddingTop: 16, paddingBottom: 16 }}>
          <div ref={setRef(0)} style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.3em', color: 'var(--pink)',
            textTransform: 'uppercase', marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span aria-hidden="true" style={{ display: 'block', width: 24, height: '1px', background: 'var(--pink)' }} />
            Nasza Historia
          </div>

          <h2
            id="philosophy-heading"
            ref={setRef(1)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800, letterSpacing: '0.04em', color: 'var(--text)',
              lineHeight: 1.1, textTransform: 'uppercase', marginBottom: 8,
            }}
          >
            Wymyśliliśmy
          </h2>
          <div ref={setRef(2)} style={{
            fontFamily: 'var(--font-editorial)', fontSize: 'clamp(26px, 3.8vw, 50px)',
            fontStyle: 'italic', fontWeight: 400, letterSpacing: '0.01em',
            color: 'var(--pink)', lineHeight: 1.15, marginBottom: 40,
          }}>
            coś nowego.
          </div>

          <div ref={setRef(3)} style={{
            borderLeft: '2px solid var(--line)', paddingLeft: 24, marginBottom: 40,
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.85, color: 'var(--muted)', marginBottom: 18,
            }}>
              Nice Sushi to pierwsze miejsce w Katowicach, gdzie sushi podajemy
              w oryginalnej tubie na patyku. Pomysł, który podbił media społecznościowe
              i stał się symbolem naszego miasta — wirusowe, smaczne i jedyne w swoim rodzaju.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.85, color: 'var(--muted)',
            }}>
              Składniki najwyższej jakości, autorskie sosy i niespotykana forma podania.
              Zapraszamy na ul. 1 Maja 37 w samym centrum Katowic.
            </p>
          </div>

          <div ref={setRef(4)} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div aria-hidden="true" style={{
              width: 40, height: '1px',
              background: 'linear-gradient(90deg, var(--pink), transparent)',
            }} />
            <span style={{
              fontFamily: 'var(--font-editorial)', fontSize: 'clamp(14px, 1.2vw, 16px)',
              fontStyle: 'italic', color: 'var(--muted)', letterSpacing: '0.03em',
            }}>
              Jedyne takie sushi w Katowicach.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .philo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
