import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '16px',
    animation: 'fadeIn 0.2s ease-out forwards',
  };

  const getWidth = () => {
    if (size === 'sm') return '400px';
    if (size === 'lg') return '800px';
    return '550px';
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: 'var(--card)',
    color: 'var(--card-foreground)',
    borderRadius: 'calc(var(--radius) * 1.5)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border)',
    width: '100%',
    maxWidth: getWidth(),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'fadeIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 700,
  };

  const closeBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'var(--foreground)',
    opacity: 0.5,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  };

  const bodyStyle: React.CSSProperties = {
    padding: '20px',
    overflowY: 'auto',
    maxHeight: 'calc(80vh - 100px)',
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          {title ? <h2 style={titleStyle}>{title}</h2> : <div />}
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close modal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div style={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};
