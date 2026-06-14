'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const sidebarStyle: React.CSSProperties = {
    width: '260px',
    borderRight: '1px solid var(--border)',
    backgroundColor: 'var(--card)',
    color: 'var(--card-foreground)',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
    height: 'calc(100vh - 70px)',
    position: 'sticky',
    top: '70px',
  };

  const navSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const getLinkStyle = (isActive: boolean): React.CSSProperties => {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: 'var(--radius)',
      fontSize: '14px',
      fontWeight: isActive ? 600 : 500,
      backgroundColor: isActive ? 'var(--ring)' : 'transparent',
      color: isActive ? 'var(--primary)' : 'var(--foreground)',
      opacity: isActive ? 1 : 0.75,
      transition: 'all 0.2s ease',
    };
  };

  const navItems = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: '📊' },
    { name: 'Profile Settings', path: ROUTES.PROFILE, icon: '👤' },
  ];

  return (
    <aside style={sidebarStyle}>
      <nav style={navSectionStyle}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} style={getLinkStyle(isActive)}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: '16px', fontSize: '12px', opacity: 0.5, fontWeight: 500 }}>
        v1.0.0
      </div>
    </aside>
  );
};
