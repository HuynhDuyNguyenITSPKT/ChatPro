import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  style,
  ...props
}) => {
  // Styling mappings
  const getStyles = () => {
    let baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'inherit',
      fontWeight: 600,
      borderRadius: 'var(--radius)',
      border: '1px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      gap: '8px',
      opacity: disabled || isLoading ? 0.6 : 1,
      pointerEvents: disabled || isLoading ? 'none' : 'auto',
    };

    // Variant styles
    if (variant === 'primary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'var(--primary)',
        color: '#ffffff',
      };
    } else if (variant === 'secondary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'var(--secondary)',
        color: '#ffffff',
      };
    } else if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
      };
    } else if (variant === 'danger') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'var(--danger)',
        color: '#ffffff',
      };
    }

    // Size styles
    if (size === 'sm') {
      baseStyle = {
        ...baseStyle,
        padding: '6px 12px',
        fontSize: '14px',
      };
    } else if (size === 'md') {
      baseStyle = {
        ...baseStyle,
        padding: '10px 18px',
        fontSize: '15px',
      };
    } else if (size === 'lg') {
      baseStyle = {
        ...baseStyle,
        padding: '14px 24px',
        fontSize: '16px',
      };
    }

    return { ...baseStyle, ...style };
  };

  return (
    <button
      disabled={disabled || isLoading}
      style={getStyles()}
      className={`ui-btn ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          style={{
            animation: 'spin 1s linear infinite',
            width: '18px',
            height: '18px',
          }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      )}
      {children}
    </button>
  );
};

Button.displayName = 'Button';
