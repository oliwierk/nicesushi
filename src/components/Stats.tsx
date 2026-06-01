import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5,   suffix: '+', label: 'Smaków w Tubie',   sub: 'Nice, Flambe, Spicy i więcej' },
  { value: 100, suffix: '%', label: 'Świeże składniki',  sub: 'Dostawa codziennie' },
  { value: 4.9, suffix: '★', label: 'Ocena Google',      sub: '300+ opinii' },
  { value: 20,  suffix: '+', label: 'Pozycji w menu',    sub: 'Tuby, zestawy, rolki, nigiri' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = numRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.to(counter, {
              val: stat.value,
              duration: 1.5,
              ease: 'power2.out',
              delay: i * 0.12,
              onUpdate: () => {
                el.textContent = stat.value % 1 !== 0
                  ? counter.val.toFixed(1)
                  : String(Math.round(counter.val));
              },
            });
          },
        });
      });

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.stat-col') ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--bg-warm)', position: 'relative', zIndex: 1 }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        background: 'var(--bg)',
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: 'clamp(56px, 8vw, 96px) clamp(24px, 6vw, 80px)',
        gap: 0, position: 'relative', zIndex: 1,
      }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-col"
            style={{
              padding: 'clamp(24px, 3vw, 40px) clamp(16px, 2vw, 32px)',
              borderRight: i < stats.length - 1 ? '1px solid var(--line-subtle)' : 'none',
              display: 'flex', flexDirection: 'column', gap: 8,
              position: 'relative', opacity: 0,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(52px, 7vw, 96px)',
              lineHeight: 0.9, letterSpacing: '-0.02em',
              background: i % 2 === 0
                ? 'linear-gradient(135deg, var(--pink-vivid) 0%, var(--pink) 60%)'
                : 'linear-gradient(135deg, var(--mint) 0%, var(--pink) 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'flex', alignItems: 'baseline', gap: 2,
            }}>
              <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
              <span style={{ fontSize: '0.45em', letterSpacing: 0 }}>{stat.suffix}</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(9px, 0.9vw, 12px)',
              letterSpacing: '0.1em', color: 'var(--text)', textTransform: 'uppercase', marginTop: 8,
            }}>
              {stat.label}
            </div>

            <div style={{
              fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--dim)', letterSpacing: '0.06em',
            }}>
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 64,
        background: 'var(--bg)',
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 640px) {
          .stat-col { border-right: none !important; border-bottom: 1px solid var(--line-subtle); }
        }
        @media (max-width: 640px) {
          .stat-col:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
