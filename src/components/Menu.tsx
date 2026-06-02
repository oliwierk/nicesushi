import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuData, type MenuItem } from '../data/menu';

gsap.registerPlugin(ScrollTrigger);

type Tab = 'tuby' | 'zestawy' | 'rolki' | 'nigiri';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'tuby',    label: 'Sushi w Tubie', icon: '🧋' },
  { id: 'zestawy', label: 'Zestawy',       icon: '🎁' },
  { id: 'rolki',   label: 'Rolki',         icon: '🍣' },
  { id: 'nigiri',  label: 'Nigiri',        icon: '🐟' },
];

const TAG_LABEL: Record<string, string> = {
  bestseller: 'bestseller',
  nowe: 'nowość',
  popular: 'popular',
  premium: 'premium',
};

const TAG_COLOR: Record<string, { bg: string; text: string }> = {
  bestseller: { bg: 'rgba(232,121,155,0.2)',  text: '#E8799B' },
  nowe:       { bg: 'rgba(157,202,196,0.2)',  text: '#9DCAC4' },
  popular:    { bg: 'rgba(232,121,155,0.15)', text: '#E8799B' },
  premium:    { bg: 'rgba(157,202,196,0.15)', text: '#9DCAC4' },
};

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: (index % 3) * 0.07 }
        );
      },
    });
  }, [index]);

  const tagStyle = item.tag ? TAG_COLOR[item.tag] : null;

  return (
    <article
      ref={cardRef}
      style={{
        opacity: 0,
        background: 'var(--bg-elevated)',
        border: '1px solid var(--line-subtle)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(232,121,155,0.25)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--line-subtle)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: 'var(--bg-card)' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            filter: 'brightness(0.82) contrast(1.08) saturate(0.9)',
            transition: 'filter 0.5s ease, transform 0.55s ease, opacity 0.4s ease',
            opacity: imgLoaded ? 1 : 0,
          }}
        />
        {!imgLoaded && (
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-elevated) 100%)',
          }} />
        )}
        {item.tag && tagStyle && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: tagStyle.bg,
            color: tagStyle.text,
            backdropFilter: 'blur(8px)',
            padding: '4px 10px',
            fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            {TAG_LABEL[item.tag]}
          </div>
        )}
        {/* Number */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 12, right: 12,
          fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700,
          color: 'rgba(245,240,235,0.4)', letterSpacing: '0.1em',
        }}>
          {String(item.id).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
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
          marginTop: 4, paddingTop: 12,
          borderTop: '1px solid var(--line-subtle)',
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400,
            color: 'var(--dim)', letterSpacing: '0.06em',
          }}>
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
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('tuby');
  const prevTab = useRef<Tab>('tuby');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [sectionRef.current?.querySelector('.menu-header'),
         sectionRef.current?.querySelector('.menu-tabs')],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const switchTab = useCallback((tab: Tab) => {
    if (tab === activeTab) return;

    if (gridRef.current) {
      gsap.to(gridRef.current, {
        opacity: 0, y: 16, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          setActiveTab(tab);
          prevTab.current = tab;
          // Scroll triggers re-fire after content swap
          requestAnimationFrame(() => {
            if (gridRef.current) {
              gsap.fromTo(gridRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
              );
            }
            ScrollTrigger.refresh();
          });
        },
      });
    } else {
      setActiveTab(tab);
    }
  }, [activeTab]);

  const items = menuData[activeTab];

  return (
    <section
      id="menu"
      ref={sectionRef}
      aria-labelledby="menu-heading"
      style={{
        background: 'var(--bg-card)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)',
        position: 'relative',
      }}
    >
      {/* Header */}
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
          color: 'var(--muted)', marginTop: 14, letterSpacing: '0.02em', lineHeight: 1.6,
        }}>
          Dostępne na Pyszne.pl — dowóz i odbiór osobisty w Katowicach
        </p>
      </div>

      {/* Tab filters */}
      <div
        className="menu-tabs"
        role="tablist"
        aria-label="Kategorie menu"
        style={{
          display: 'flex', gap: 8, marginBottom: 'clamp(32px, 4vw, 52px)',
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="menu-grid"
              onClick={() => switchTab(tab.id)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: isActive ? 'var(--bg)' : 'var(--muted)',
                background: isActive ? 'var(--pink)' : 'transparent',
                border: `1.5px solid ${isActive ? 'var(--pink)' : 'var(--line-subtle)'}`,
                padding: '10px 22px',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--pink-dim)';
                  e.currentTarget.style.color = 'var(--text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--line-subtle)';
                  e.currentTarget.style.color = 'var(--muted)';
                }
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '16px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Card grid */}
      <div
        id="menu-grid"
        ref={gridRef}
        role="tabpanel"
        aria-label={`${TABS.find(t => t.id === activeTab)?.label} — lista pozycji`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(16px, 2.5vw, 24px)',
        }}
      >
        {items.map((item, i) => (
          <MenuCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* Footer CTA */}
      <div style={{
        marginTop: 'clamp(48px, 6vw, 72px)',
        paddingTop: 32, borderTop: '1px solid var(--line-subtle)',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16,
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '14px',
            color: 'var(--muted)', lineHeight: 1.6, marginBottom: 4,
          }}>
            Wszystkie ceny zawierają VAT. Dostawa w Katowicach i okolicach.
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontStyle: 'italic',
            fontSize: '13px', color: 'var(--dim)',
          }}>
            Alergeny dostępne na zapytanie.
          </p>
        </div>
        <a
          href="https://www.pyszne.pl/menu/nice-sushi-3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Zamów Nice Sushi na Pyszne.pl — otwiera nową kartę"
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
            letterSpacing: '0.2em', color: 'var(--bg)', background: 'var(--pink)',
            padding: '15px 38px', textTransform: 'uppercase',
            display: 'inline-block', transition: 'background 0.25s ease, transform 0.22s ease',
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
    </section>
  );
}
