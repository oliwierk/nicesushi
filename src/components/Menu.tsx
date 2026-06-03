import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuData, type MenuItem } from '../data/menu';
import MenuModal from './MenuModal';

type Tab = 'tuby' | 'zestawy' | 'rolki' | 'nigiri';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'tuby',    label: 'Sushi w Tubie', icon: '🧋' },
  { id: 'zestawy', label: 'Zestawy',       icon: '🎁' },
  { id: 'rolki',   label: 'Rolki',         icon: '🍣' },
  { id: 'nigiri',  label: 'Nigiri',        icon: '🐟' },
];

const TAG_LABEL: Record<string, string> = {
  bestseller: 'bestseller', nowe: 'nowość', popular: 'popular', premium: 'premium',
};
const TAG_COLOR: Record<string, { bg: string; text: string }> = {
  bestseller: { bg: 'rgba(232,121,155,0.2)',  text: '#E8799B' },
  nowe:       { bg: 'rgba(157,202,196,0.2)',  text: '#9DCAC4' },
  popular:    { bg: 'rgba(232,121,155,0.15)', text: '#E8799B' },
  premium:    { bg: 'rgba(157,202,196,0.15)', text: '#9DCAC4' },
};

/* CSS-only card entrance — no JS ScrollTrigger per card */
const CARD_CSS = `
  .menu-card {
    opacity: 0;
    transform: translateY(24px);
    transition: border-color 0.25s ease, transform 0.28s ease, box-shadow 0.28s ease;
  }
  .menu-grid-visible .menu-card {
    animation: cardIn 0.5s ease forwards;
    animation-delay: calc(var(--card-i, 0) * 70ms);
  }
  @keyframes cardIn {
    to { opacity: 1; transform: translateY(0); }
  }
  .menu-card:hover {
    border-color: rgba(232,121,155,0.25) !important;
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.35);
  }
  .menu-card img {
    transition: filter 0.4s ease, opacity 0.35s ease;
  }
`;

function MenuCard({ item, index, onClick }: { item: MenuItem; index: number; onClick: () => void }) {
  const tagStyle = item.tag ? TAG_COLOR[item.tag] : null;

  return (
    <article
      className="menu-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Podgląd: ${item.name}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      style={{
        '--card-i': index,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--line-subtle)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      } as React.CSSProperties}
    >
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--bg-card)' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          width={320}
          height={180}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.82) contrast(1.08) saturate(0.9)' }}
        />
        {item.tag && tagStyle && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: tagStyle.bg, color: tagStyle.text,
            padding: '4px 10px',
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            {TAG_LABEL[item.tag]}
          </div>
        )}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 12, right: 12,
          fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700,
          color: 'rgba(245,240,235,0.35)', letterSpacing: '0.1em',
        }}>
          {String(item.id).padStart(2, '0')}
        </div>
      </div>

      <div style={{ padding: 'clamp(16px, 2vw, 22px)', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(15px, 1.4vw, 18px)',
          fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
          color: 'var(--text)', lineHeight: 1.2,
        }}>
          {item.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(13px, 1vw, 15px)',
          color: 'var(--muted)', lineHeight: 1.65, flex: 1,
        }}>
          {item.desc}
        </p>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--line-subtle)',
        }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--dim)', letterSpacing: '0.06em' }}>
            {item.volume}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 1.8vw, 22px)',
            fontWeight: 700, color: 'var(--pink)', letterSpacing: '0.04em',
            display: 'flex', alignItems: 'baseline', gap: 3,
          }}>
            {item.price}
            <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--muted)' }}>zł</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab]   = useState<Tab>('tuby');
  const [modalItem, setModalItem]   = useState<MenuItem | null>(null);

  /* One ScrollTrigger for section header only */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [sectionRef.current?.querySelector('.menu-header'),
         sectionRef.current?.querySelector('.menu-tabs')],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* IntersectionObserver triggers CSS animation class on grid */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { grid.classList.add('menu-grid-visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(grid);
    return () => obs.disconnect();
  }, []);

  const switchTab = useCallback((tab: Tab) => {
    if (tab === activeTab) return;
    const grid = gridRef.current;
    if (!grid) { setActiveTab(tab); return; }

    /* Quick fade out → swap → fade in without ScrollTrigger */
    gsap.to(grid, {
      opacity: 0, y: 10, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setActiveTab(tab);
        /* After React re-render, re-trigger CSS animation */
        requestAnimationFrame(() => {
          grid.classList.remove('menu-grid-visible');
          void grid.offsetWidth; /* force reflow */
          grid.classList.add('menu-grid-visible');
          gsap.to(grid, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
        });
      },
    });
  }, [activeTab]);

  const items = menuData[activeTab];

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-labelledby="menu-heading"
      style={{ background: 'var(--bg-card)', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)', position: 'relative' }}
    >
      <style>{CARD_CSS}</style>

      <div className="menu-header" style={{ marginBottom: 'clamp(36px, 5vw, 60px)' }}>
        <div style={{
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600,
          letterSpacing: '0.3em', color: 'var(--pink)', textTransform: 'uppercase',
          marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span aria-hidden="true" style={{ display: 'block', width: 24, height: '1px', background: 'var(--pink)' }} />
          Karta Dań
        </div>
        <h2 id="menu-heading" style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 66px)',
          fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
          color: 'var(--text)', lineHeight: 1,
        }}>
          Zamów Online
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.2vw, 16px)',
          color: 'var(--muted)', marginTop: 14, lineHeight: 1.6,
        }}>
          Dostępne na Pyszne.pl — dowóz i odbiór osobisty w Katowicach
        </p>
      </div>

      <div className="menu-tabs" role="tablist" aria-label="Kategorie menu" style={{
        display: 'flex', gap: 8, marginBottom: 'clamp(32px, 4vw, 52px)', flexWrap: 'wrap',
      }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => switchTab(tab.id)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isActive ? 'var(--bg)' : 'var(--muted)',
                background: isActive ? 'var(--pink)' : 'transparent',
                border: `1.5px solid ${isActive ? 'var(--pink)' : 'var(--line-subtle)'}`,
                padding: '10px 22px',
                transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '16px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="menu-grid"
        ref={gridRef}
        role="tabpanel"
        aria-label={TABS.find(t => t.id === activeTab)?.label}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 'clamp(16px, 2.5vw, 24px)',
        }}
      >
        {items.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} onClick={() => setModalItem(item)} />
        ))}
      </div>

      {modalItem && <MenuModal item={modalItem} onClose={() => setModalItem(null)} />}

      <div style={{
        marginTop: 'clamp(48px, 6vw, 72px)', paddingTop: 32,
        borderTop: '1px solid var(--line-subtle)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: 4 }}>
            Wszystkie ceny zawierają VAT. Dostawa w Katowicach i okolicach.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '13px', color: 'var(--dim)' }}>
            Alergeny dostępne na zapytanie.
          </p>
        </div>
        <a
          href="https://www.pyszne.pl/menu/nice-sushi-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
            letterSpacing: '0.2em', color: 'var(--bg)', background: 'var(--pink)',
            padding: '15px 38px', textTransform: 'uppercase',
            display: 'inline-block', transition: 'background 0.25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--pink-vivid)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--pink)')}
        >
          Zamów na Pyszne.pl →
        </a>
      </div>
    </section>
  );
}
