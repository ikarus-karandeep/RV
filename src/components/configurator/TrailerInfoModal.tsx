import React, { useEffect, useRef } from 'react';
import type { TrailerType } from '../../types';

interface TrailerInfoModalProps {
  type: TrailerType;
  open: boolean;
  onClose: () => void;
}

export const TrailerInfoModal: React.FC<TrailerInfoModalProps> = ({ type, open, onClose }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll on open
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open, type.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const half = Math.ceil((type.equipmentList ?? []).length / 2);
  const leftCol = (type.equipmentList ?? []).slice(0, half);
  const rightCol = (type.equipmentList ?? []).slice(half);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(2px)',
          zIndex: 40,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel — slides in from the right */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: open
            ? 'translate(-50%, -50%) translateX(0px)'
            : 'translate(-50%, -50%) translateX(120px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
          zIndex: 50,
          width: 'min(480px, 92vw)',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '20px',
          background: '#fff',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Scrollable body */}
        <div
          ref={scrollRef}
          style={{
            overflowY: 'auto',
            flex: 1,
            scrollbarWidth: 'none',
          }}
        >
          {/* Header */}
          <div style={{ padding: '28px 28px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                {type.title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  border: '1.5px solid #e5e7eb',
                  background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  marginLeft: 12,
                  marginTop: 2,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '20px' }}>
              {type.description}
            </p>
          </div>

          {/* Image */}
          <div
            style={{
              margin: '0 28px',
              borderRadius: '14px',
              background: '#eef2ff',
              height: '200px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '24px',
            }}
          >
            <img
              src={type.image}
              alt={type.title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Best Suited For */}
          {type.bestSuitedFor && type.bestSuitedFor.length > 0 && (
            <div style={{ padding: '0 28px 24px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '14px' }}>
                Best Suited for
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '10px',
                }}
              >
                {type.bestSuitedFor.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: '1.5px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#fafafa',
                    }}
                  >
                    <span style={{ fontSize: '26px', lineHeight: 1 }}>{item.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151', textAlign: 'center', lineHeight: 1.3 }}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Equipment List */}
          {type.equipmentList && type.equipmentList.length > 0 && (
            <div style={{ padding: '0 28px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827' }}>
                  {type.title.split(' ')[0]} Equipments
                </h3>
                <span
                  style={{
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}
                >
                  {type.title.split(' ')[0]}
                </span>
              </div>
              <div
                style={{
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px 16px',
                }}
              >
                {leftCol.map((eq, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#6b7280', marginTop: '1px', flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.4 }}>{eq}</span>
                  </div>
                ))}
                {rightCol.map((eq, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <span style={{ color: '#6b7280', marginTop: '1px', flexShrink: 0 }}>•</span>
                    <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.4 }}>{eq}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Close button */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid #f3f4f6', background: '#fff', flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              height: '52px',
              background: '#111827',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1f2937')}
            onMouseLeave={e => (e.currentTarget.style.background = '#111827')}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};
