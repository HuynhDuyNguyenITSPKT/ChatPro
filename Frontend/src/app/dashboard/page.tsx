'use client';

import React from 'react';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user } = useAuth();

  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
  };

  const contentLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
  };

  const mainContentStyle: React.CSSProperties = {
    flex: 1,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  };

  const welcomeCardStyle: React.CSSProperties = {
    padding: '32px',
    borderRadius: 'calc(var(--radius) * 1.5)',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: '#ffffff',
    boxShadow: 'var(--shadow-lg)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  };

  const statCardStyle: React.CSSProperties = {
    padding: '24px',
    borderRadius: 'var(--radius)',
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  return (
    <div style={mainContainerStyle}>
      <Header />
      <div style={contentLayoutStyle}>
        <Sidebar />
        <main style={mainContentStyle}>
          {/* Welcome Banner */}
          <div style={welcomeCardStyle} className="animate-fade-in">
            <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p style={{ opacity: 0.9, fontSize: '15px', maxWidth: '600px', lineHeight: 1.5 }}>
              Here is what is happening with your projects today. You can monitor system statistics, edit your profile details, or upload digital assets.
            </p>
          </div>

          {/* Stats Grid */}
          <div style={gridStyle}>
            <div style={statCardStyle}>
              <span style={{ fontSize: '28px' }}>🚀</span>
              <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.6 }}>Active Sessions</span>
              <span style={{ fontSize: '32px', fontWeight: 800 }}>12</span>
            </div>
            
            <div style={statCardStyle}>
              <span style={{ fontSize: '28px' }}>📂</span>
              <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.6 }}>Files Uploaded</span>
              <span style={{ fontSize: '32px', fontWeight: 800 }}>84</span>
            </div>

            <div style={statCardStyle}>
              <span style={{ fontSize: '28px' }}>⚡</span>
              <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.6 }}>API Integrations</span>
              <span style={{ fontSize: '32px', fontWeight: 800 }}>Online</span>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div style={{ ...statCardStyle, flex: 1, gap: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>System Health</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: 'var(--radius)', backgroundColor: 'var(--input)', fontSize: '14px' }}>
                <span>Backend API Connection</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: 'var(--radius)', backgroundColor: 'var(--input)', fontSize: '14px' }}>
                <span>Database Sync Status</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Synchronized</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderRadius: 'var(--radius)', backgroundColor: 'var(--input)', fontSize: '14px' }}>
                <span>Storage service</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Connected</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
