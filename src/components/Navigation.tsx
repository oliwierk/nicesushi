import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'O Nas',   href: '#philosophy', id: 'philosophy' },
  { label: 'Menu',    href: '#menu',        id: 'menu'       },
  { label: 'Kontakt', href: '#contact',     id: 'contact'    },
];

const OBSERVED_SECTIONS = ['hero', 'philosophy', 'gallery', 'menu', 'contact'];

function NiceLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <img
        src="/logo.jpg"
        alt="Nice Sushi logo"
        width={36}
        height={36}
        style={{ borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: 'var(--font-editorial)',
          fontStyle: 'italic',
          fontSize: '20px',
          fontWeight: 600,
          color: 'var(--pink)',
          lineHeight: 1,
        }}>Nice</span>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.32em',
          color: 'var(--text)',
          textTransform: 'uppercase',
        }}>Sushi</span>
      </span>
    </span>
  );
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  /* ── scroll backdrop ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── entrance animation ── */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
    );
  }, []);

  /* ── IntersectionObserver for active link ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    OBSERVED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Nawigacja główna"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          padding: '0 clamp(24px, 5vw, 64px)',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'background 0.45s ease, border-color 0.45s ease',
          background: scrolled ? 'rgba(13,31,23,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,121,155,0.1)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollTo(e, '#hero')}
          aria-label="Nice Sushi — strona główna"
        >
          <NiceLogo />
        </a>

        {/* Centre city tag — desktop only */}
        <div aria-hidden="true" className="nav-city-tag" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500,
          letterSpacing: '0.22em', color: 'var(--muted)', textTransform: 'uppercase',
          opacity: scrolled ? 1 : 0, transition: 'opacity 0.4s ease',
          pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          ul. 1 Maja 37, Katowice
        </div>

        {/* Desktop links */}
        <ul role="list" style={{
          display: 'flex', listStyle: 'none',
          gap: 'clamp(20px, 3.5vw, 44px)', alignItems: 'center',
        }} className="nav-desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: isActive ? 'var(--text)' : 'var(--muted)',
                    transition: 'color 0.25s ease',
                    padding: '4px 0',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget).style.color = 'var(--text)')}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget).style.color = 'var(--muted)';
                  }}
                >
                  {link.label}
                  {/* Active underline */}
                  <span style={{
                    position: 'absolute', bottom: -4, left: 0, right: 0,
                    height: '1.5px', background: 'var(--pink)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                </a>
              </li>
            );
          })}

          {/* CTA */}
          <li>
            <a
              href="https://www.pyszne.pl/menu/nice-sushi-3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zamów Nice Sushi na Pyszne.pl"
              style={{
                fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--bg)', background: 'var(--pink)',
                padding: '9px 22px', display: 'inline-block',
                transition: 'background 0.25s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--pink-vivid)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--pink)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Zamów
            </a>
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          style={{
            background: 'none', border: 'none',
            display: 'none', flexDirection: 'column',
            gap: 6, padding: '10px 6px', marginRight: -6,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden="true" style={{
              display: 'block', width: 24, height: '2px',
              background: 'var(--text)', borderRadius: 2,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(8px) rotate(45deg)'
                  : i === 2 ? 'translateY(-8px) rotate(-45deg)'
                  : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav"
        aria-label="Menu mobilne"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(13,31,23,0.98)',
          backdropFilter: 'none', WebkitBackdropFilter: 'none',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 44,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.32s ease',
        }}
      >
        {/* Logo in drawer */}
        <img
          src="/logo.jpg"
          alt=""
          aria-hidden="true"
          width={72}
          height={72}
          style={{ borderRadius: '50%', objectFit: 'cover', opacity: 0.7 }}
        />

        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollTo(e, link.href)}
            tabIndex={menuOpen ? 0 : -1}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 6.5vw, 36px)',
              fontWeight: 700, letterSpacing: '0.14em',
              color: activeSection === link.id ? 'var(--pink)' : 'var(--text)',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
          >
            {link.label}
          </a>
        ))}

        <a
          href="https://www.pyszne.pl/menu/nice-sushi-3"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
            letterSpacing: '0.24em', color: 'var(--bg)',
            textTransform: 'uppercase', background: 'var(--pink)',
            padding: '16px 44px', marginTop: 8,
          }}
        >
          Zamów Online
        </a>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop   { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .nav-city-tag  { display: none !important; }
        }
      `}</style>
    </>
  );
}
