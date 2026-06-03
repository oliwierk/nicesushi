import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const stats = [
  { value: 5,   suffix: '+', label: 'Smaków w Tubie',  sub: 'Nice, Flambe, Spicy i więcej' },
  { value: 100, suffix: '%', label: 'Świeże składniki', sub: 'Dostawa codziennie' },
  { value: 4.9, suffix: '★', label: 'Ocena Google',     sub: '300+ opinii' },
  { value: 20,  suffix: '+', label: 'Pozycji w menu',   sub: 'Tuby, zestawy, rolki, nigiri' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* One ScrollTrigger for all counters instead of 4 */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const el = numRefs.current[i];
            if (!el) return;
            const counter = { val: 0 };
            gsap.to(counter, {
              val: stat.value, duration: 1.5, ease: 'power2.out', delay: i * 0.12,
              onUpdate: () => {
                el.textContent = stat.value % 1 !== 0
                  ? counter.val.toFixed(1)
                  : String(Math.round(counter.val));
              },
            });
          });
        },
      });

      gsap.fromTo(
        sectionRef.current?.querySelectorAll('.stat-col') ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Statystyki Nice Sushi"
      style={{ background: 'var(--bg-warm)', position: 'relative', zIndex: 1 }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 64,
        background: 'var(--bg)',
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 100%)',
        pointerEvents: 'none',
      }} />

      <dl style={{
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
            <dd style={{
              fontFamily: 'var(--font-display)', fontWeight: 900,
              fontSize: 'clamp(50px, 7vw, 96px)', lineHeight: 0.9, letterSpacing: '-0.02em',
              color: i % 2 === 0 ? 'var(--pink)' : 'var(--mint)',
              display: 'flex', alignItems: 'baseline', gap: 2,
            }}>
              <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
              <span aria-hidden="true" style={{ fontSize: '0.45em', letterSpacing: 0 }}>{stat.suffix}</span>
            </dd>

            <dt style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(12px, 1vw, 14px)',
              fontWeight: 700, letterSpacing: '0.1em',
              color: 'var(--text)', textTransform: 'uppercase', marginTop: 8,
            }}>
              {stat.label}
            </dt>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400,
              color: 'var(--dim)', letterSpacing: '0.04em',
            }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </dl>

      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 64,
        background: 'var(--bg)',
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 640px) {
          .stat-col { border-right: none !important; border-bottom: 1px solid var(--line-subtle); }
          .stat-col:last-child { border-bottom: none; }
        }
        @media (max-width: 640px) {
          dl { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
