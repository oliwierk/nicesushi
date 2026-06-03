import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { MenuItem } from '../data/menu';

interface Props {
  item: MenuItem;
  onClose: () => void;
}

export default function MenuModal({ item, onClose }: Props) {
  // Close on ESC
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const TAG_COLOR: Record<string, { bg: string; text: string }> = {
    bestseller: { bg: 'rgba(232,121,155,0.2)',  text: '#E8799B' },
    nowe:       { bg: 'rgba(157,202,196,0.2)',  text: '#9DCAC4' },
    popular:    { bg: 'rgba(232,121,155,0.15)', text: '#E8799B' },
    premium:    { bg: 'rgba(157,202,196,0.15)', text: '#9DCAC4' },
  };
  const TAG_LABEL: Record<string, string> = {
    bestseller: 'bestseller', nowe: 'nowość', popular: 'popular', premium: 'premium',
  };

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(5,15,10,0.82)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          animation: 'modalFadeIn 0.22s ease',
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        style={{
          position: 'fixed', inset: 0, zIndex: 9001,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'clamp(16px, 4vw, 40px)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'all',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--line)',
            width: '100%',
            maxWidth: 820,
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
            animation: 'modalSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: image */}
          <div style={{ position: 'relative', minHeight: 280, background: 'var(--bg-card)', overflow: 'hidden' }}>
            <img
              src={item.image}
              alt={item.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) contrast(1.08)',
              }}
            />
            {item.tag && TAG_COLOR[item.tag] && (
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: TAG_COLOR[item.tag].bg,
                color: TAG_COLOR[item.tag].text,
                padding: '4px 10px',
                fontFamily: 'var(--font-body)', fontSize: '11px',
                fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                {TAG_LABEL[item.tag]}
              </div>
            )}
          </div>

          {/* Right: info */}
          <div style={{ padding: 'clamp(24px,4vw,36px)', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Zamknij"
              style={{
                alignSelf: 'flex-end', background: 'none', border: 'none',
                color: 'var(--muted)', fontSize: '22px', lineHeight: 1,
                cursor: 'pointer', padding: '4px 8px', marginBottom: 12,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ×
            </button>

            <div style={{
              fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.25em', color: 'var(--pink)', textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              {item.volume}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(20px,2.5vw,28px)', letterSpacing: '0.05em',
              textTransform: 'uppercase', color: 'var(--text)',
              lineHeight: 1.15, marginBottom: 12,
            }}>
              {item.name}
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 'clamp(14px,1.1vw,15px)',
              color: 'var(--muted)', lineHeight: 1.75, marginBottom: 22,
            }}>
              {item.desc}
            </p>

            {item.ingredients && item.ingredients.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.22em', color: 'var(--mint)', textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  Składniki
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {item.ingredients.map((ing) => (
                    <span key={ing} style={{
                      fontFamily: 'var(--font-body)', fontSize: '12px',
                      color: 'var(--muted)', background: 'var(--bg-card)',
                      border: '1px solid var(--line-subtle)',
                      padding: '4px 10px', letterSpacing: '0.04em',
                    }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{
              marginTop: 'auto', paddingTop: 20,
              borderTop: '1px solid var(--line-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,3vw,34px)',
                fontWeight: 800, color: 'var(--pink)', letterSpacing: '0.04em',
                display: 'flex', alignItems: 'baseline', gap: 4,
              }}>
                {item.price}
                <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--muted)' }}>zł</span>
              </span>

              <a
                href="https://www.pyszne.pl/menu/nice-sushi-3"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                  letterSpacing: '0.18em', color: 'var(--bg)',
                  background: 'var(--pink)', padding: '12px 22px',
                  textTransform: 'uppercase', transition: 'background 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--pink-vivid)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--pink)')}
              >
                Zamów →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) {
          .modal-card { grid-template-columns: 1fr !important; }
          .modal-card > div:first-child { min-height: 200px !important; }
        }
      `}</style>
    </>,
    document.body,
  );
}
