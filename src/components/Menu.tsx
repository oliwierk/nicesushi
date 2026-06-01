import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuData, type MenuItem } from '../data/menu';

gsap.registerPlugin(ScrollTrigger);

type Tab = 'tuby' | 'zestawy' | 'rolki' | 'nigiri';

const TAB_LABELS: Record<Tab, string> = {
  tuby: 'Sushi w Tubie',
  zestawy: 'Zestawy',
  rolki: 'Rolki',
  nigiri: 'Nigiri',
};

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  bestseller: { bg: 'rgba(232,121,155,0.18)', color: 'var(--pink)' },
  nowe:       { bg: 'rgba(157,202,196,0.18)', color: 'var(--mint)' },
  popular:    { bg: 'rgba(232,121,155,0.12)', color: 'var(--pink)' },
  premium:    { bg: 'rgba(157,202,196,0.12)', color: 'var(--mint)' },
};

function MenuRow({
  item, index, onMouseEnter, onMouseLeave,
}: {
  item: MenuItem;
  index: number;
  onMouseEnter: (item: MenuItem) => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={() => onMouseEnter(item)}
      onMouseLeave={onMouseLeave}
      className="menu-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        alignItems: 'center',
        gap: 'clamp(12px, 3vw, 40px)',
        padding: 'clamp(18px, 2.5vw, 28px) 0',
        borderBottom: '1px solid var(--line-subtle)',
        cursor: 'default',
        transition: 'border-color 0.3s ease',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', left: -36, top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-body)', fontSize: 10,
        color: 'var(--muted)', opacity: 0.4, letterSpacing: '0.1em',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div
            className="row-name"
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(13px, 1.5vw, 17px)',
              fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text)',
              textTransform: 'uppercase', transition: 'color 0.3s ease',
            }}
          >
            {item.name}
          </div>
          {item.tag && TAG_STYLES[item.tag] && (
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: 8, letterSpacing: '0.28em',
              textTransform: 'uppercase', padding: '3px 8px',
              background: TAG_STYLES[item.tag].bg,
              color: TAG_STYLES[item.tag].color,
              flexShrink: 0,
            }}>
              {item.tag}
            </span>
          )}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(11px, 0.95vw, 13px)',
          color: 'var(--muted)', lineHeight: 1.5, maxWidth: '520px',
        }}>
          {item.desc}
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.1em',
        color: 'var(--muted)', textAlign: 'right', whiteSpace: 'nowrap',
      }}>
        {item.volume}
      </div>

      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(15px, 1.7vw, 19px)',
        fontWeight: 600, color: 'var(--pink)', letterSpacing: '0.06em',
        textAlign: 'right', whiteSpace: 'nowrap', minWidth: 72,
        display: 'flex', alignItems: 'baseline', gap: 3,
      }}>
        {item.price}
        <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--muted)' }}>zł</span>
      </div>
    </div>
  );
}

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('tuby');
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const prevTab = useRef<Tab>('tuby');

  useEffect(() => {
    if (previewRef.current) {
      xTo.current = gsap.quickTo(previewRef.current, 'x', { duration: 0.42, ease: 'power3.out' });
      yTo.current = gsap.quickTo(previewRef.current, 'y', { duration: 0.42, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (!rowsRef.current) return;
    if (prevTab.current !== activeTab) {
      const rows = rowsRef.current.querySelectorAll('.menu-row');
      gsap.fromTo(
        rows,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.45, ease: 'power3.out' }
      );
      prevTab.current = activeTab;
    }
  }, [activeTab]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.menu-header');
      const tabs = sectionRef.current?.querySelector('.menu-tabs');
      gsap.fromTo(
        [header, tabs],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );

      ScrollTrigger.create({
        trigger: rowsRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          const rows = rowsRef.current?.querySelectorAll('.menu-row');
          if (rows) {
            gsap.fromTo(rows,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, stagger: 0.06, duration: 0.55, ease: 'power3.out' }
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
  }, []);

  const handleRowEnter = useCallback((item: MenuItem) => {
    setHoveredItem(item);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' });
    document.querySelectorAll('.row-name').forEach((el) => {
      (el as HTMLElement).style.color = 'var(--muted)';
    });
  }, []);

  const handleRowLeave = useCallback(() => {
    setHoveredItem(null);
    gsap.to(previewRef.current, { opacity: 0, scale: 0.93, duration: 0.22, ease: 'power2.in' });
    document.querySelectorAll('.row-name').forEach((el) => {
      (el as HTMLElement).style.color = 'var(--text)';
    });
  }, []);

  const items = menuData[activeTab];

  return (
    <section
      id="menu"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        background: 'var(--bg-card)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)',
        position: 'relative', minHeight: '80vh',
      }}
    >
      {/* Floating preview */}
      <div
        ref={previewRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 220, height: 160, pointerEvents: 'none',
          zIndex: 5000, opacity: 0, scale: 0.93,
          transform: 'translate(-50%, calc(-100% - 16px))',
          overflow: 'hidden', border: '1px solid var(--line)',
        }}
      >
        {hoveredItem && (
          <>
            <img
              src={hoveredItem.image}
              alt={hoveredItem.name}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.78) contrast(1.1)' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '10px 12px',
              background: 'linear-gradient(transparent, rgba(13,31,23,0.92))',
              fontFamily: 'var(--font-body)', fontSize: 9,
              letterSpacing: '0.2em', color: 'var(--pink)', textTransform: 'uppercase',
            }}>
              {hoveredItem.name}
            </div>
          </>
        )}
      </div>

      {/* Header */}
      <div className="menu-header" style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.45em',
          color: 'var(--pink)', textTransform: 'uppercase', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ display: 'block', width: 24, height: '0.5px', background: 'var(--pink)' }} />
          Karta Dań
        </div>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 64px)',
          fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--text)', lineHeight: 1,
        }}>
          Zamów Online
        </h2>
        <p style={{
          fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
          fontSize: 'clamp(12px, 1.1vw, 14px)', color: 'var(--muted)',
          marginTop: 12, letterSpacing: '0.03em',
        }}>
          Dostępne na Pyszne.pl · dowóz i odbiór osobisty
        </p>
      </div>

      {/* Tabs */}
      <div className="menu-tabs" style={{
        display: 'flex', gap: 0,
        marginBottom: 'clamp(28px, 4vw, 48px)',
        borderBottom: '1px solid var(--line-subtle)',
        overflowX: 'auto',
      }}>
        {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: 'var(--font-body)', fontSize: 11,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: activeTab === tab ? 'var(--text)' : 'var(--muted)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 'clamp(12px, 1.5vw, 16px) clamp(16px, 2.5vw, 32px) clamp(12px, 1.5vw, 16px) 0',
              position: 'relative', transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {TAB_LABELS[tab]}
            <span style={{
              position: 'absolute', bottom: -1, left: 0,
              width: activeTab === tab ? '100%' : '0%',
              height: '1.5px', background: 'var(--pink)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          </button>
        ))}
      </div>

      {/* Menu rows */}
      <div ref={rowsRef} style={{ position: 'relative', paddingLeft: 36 }}>
        <div style={{ height: '0.5px', background: 'var(--line-subtle)' }} />
        {items.map((item, i) => (
          <MenuRow
            key={item.id}
            item={item}
            index={i}
            onMouseEnter={handleRowEnter}
            onMouseLeave={handleRowLeave}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 'clamp(40px, 5vw, 64px)',
        paddingTop: 32,
        borderTop: '1px solid var(--line-subtle)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11,
            color: 'var(--muted)', letterSpacing: '0.05em', marginBottom: 4,
          }}>
            Wszystkie ceny zawierają VAT. Dostawa w Katowicach.
          </p>
          <p style={{
            fontFamily: 'var(--font-editorial)', fontStyle: 'italic',
            fontSize: 11, color: 'var(--dim)',
          }}>
            Alergeny dostępne na zapytanie.
          </p>
        </div>
        <a
          href="https://www.pyszne.pl/menu/nice-sushi-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: '0.25em',
            color: 'var(--bg)', background: 'var(--pink)',
            padding: '14px 36px', textTransform: 'uppercase',
            display: 'inline-block', transition: 'background 0.3s ease, transform 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--pink-vivid)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--pink)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Zamów na Pyszne.pl →
        </a>
      </div>

      <style>{`
        .menu-row:hover .row-name {
          color: var(--pink) !important;
        }
        .menu-row:hover {
          border-bottom-color: rgba(232, 121, 155, 0.18) !important;
        }
        .menu-tabs::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
