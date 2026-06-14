'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/lib/constants';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const headerStyle: React.CSSProperties = {
    height: '70px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    backgroundColor: 'var(--card)',
    color: 'var(--card-foreground)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: 'var(--shadow)',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '-0.5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const userSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };

  const avatarStyle: React.CSSProperties = {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '15px',
    border: '2px solid var(--border)',
  };

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header style={headerStyle}>
      <Link href={ROUTES.HOME} style={logoStyle}>
        <span style={{ fontSize: '24px' }}>⚡</span>
        <span className="gradient-text">ChatPro</span>
      </Link>

      <nav style={navStyle}>
        {isAuthenticated ? (
          <div style={userSectionStyle}>
            <Link href={ROUTES.DASHBOARD} style={{ fontWeight: 500, fontSize: '14px', marginRight: '10px' }}>
              Dashboard
            </Link>
            <Link href={ROUTES.PROFILE} style={userSectionStyle}>
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} style={{ ...avatarStyle, objectFit: 'cover' }} />
              ) : (
                <div style={avatarStyle}>{getInitials(user?.name || '')}</div>
              )}
              <span style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name}</span>
            </Link>
            <Button variant="outline" size="sm" onClick={logout}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div style={navStyle}>
            <Link href={ROUTES.LOGIN} style={{ fontWeight: 600, fontSize: '14px' }}>
              Sign In
            </Link>
            <Link href={ROUTES.REGISTER}>
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
