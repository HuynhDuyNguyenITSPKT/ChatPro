import React, { forwardRef, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', style, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: fullWidth ? '100%' : 'auto',
      marginBottom: '16px',
    };

    const labelStyle: React.CSSProperties = {
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--foreground)',
      opacity: 0.85,
    };

    const inputStyle: React.CSSProperties = {
      padding: '10px 14px',
      fontSize: '15px',
      borderRadius: 'var(--radius)',
      border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
      backgroundColor: 'var(--input)',
      color: 'var(--foreground)',
      outline: 'none',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    };

    const errorStyle: React.CSSProperties = {
      fontSize: '12px',
      color: 'var(--danger)',
      fontWeight: 500,
      marginTop: '2px',
    };

    return (
      <div style={containerStyle}>
        {label && (
          <label htmlFor={inputId} style={labelStyle}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          style={inputStyle}
          className={`ui-input ${error ? 'error' : ''} ${className}`}
          {...props}
        />
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
