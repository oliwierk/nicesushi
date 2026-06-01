import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'O Nas', href: '#philosophy' },
  { label: 'Menu', href: '#menu' },
  { label: 'Kontakt', href: '#contact' },
];

function NiceSushiLogo() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{
        fontFamily: 'var(--font-editorial)',
        fontStyle: 'italic',
        fontSize: 18,
        letterSpacing: '0.04em',
        color: 'var(--pink)',
        lineHeight: 1,
      }}>Nice</span>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: 11,
        letterSpacing: '0.38em',
        color: 'var(--text)',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>Sushi</span>
    </span>
  );
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.4 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 clamp(24px, 5vw, 64px)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 0.5s ease, border-color 0.5s ease',
          background: scrolled ? 'rgba(13, 31, 23, 0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232, 121, 155, 0.08)' : '1px solid transparent',
        }}
      >
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')}>
          <NiceSushiLogo />
        </a>

        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)', fontSize: 9, letterSpacing: '0.35em',
          color: 'var(--muted)', textTransform: 'uppercase',
          opacity: scrolled ? 1 : 0, transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}>
          ul. 1 Maja 37, Katowice
        </div>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', listStyle: 'none',
          gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center',
        }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 11,
                  letterSpacing: '0.2em', color: 'var(--muted)',
                  textTransform: 'uppercase', transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--text)'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--muted)'; }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.pyszne.pl/menu/nice-sushi-3"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-body)', fontSize: 10,
                letterSpacing: '0.22em', color: 'var(--bg)',
                textTransform: 'uppercase', background: 'var(--pink)',
                padding: '8px 20px', display: 'inline-block',
                transition: 'background 0.3s ease, transform 0.25s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = 'var(--pink-vivid)';
                (e.target as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'var(--pink)';
                (e.target as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              Zamów
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'none', flexDirection: 'column', gap: 5, padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: 22, height: '1.5px',
              background: 'var(--text)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="nav-drawer"
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(13, 31, 23, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 40, opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 6vw, 32px)',
              letterSpacing: '0.18em', color: 'var(--text)',
              textTransform: 'uppercase',
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.pyszne.pl/menu/nice-sushi-3"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 12,
            letterSpacing: '0.28em', color: 'var(--bg)',
            textTransform: 'uppercase', background: 'var(--pink)',
            padding: '14px 40px', marginTop: 8,
          }}
        >
          Zamów Online
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
