import React from 'react';

export const Loading: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    width: '100%',
    gap: '16px',
    padding: '40px',
  };

  const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid var(--border)',
    borderTopColor: 'var(--primary)',
    animation: 'spin 0.8s linear infinite',
  };

  const textStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--foreground)',
    opacity: 0.6,
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <span style={textStyle}>Loading, please wait...</span>
    </div>
  );
};
