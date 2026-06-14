'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { ROUTES } from '@/lib/constants';

export default function LoginPage() {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    padding: '24px',
  };

  const bgGradientStyle: React.CSSProperties = {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--primary) 0%, rgba(0,0,0,0) 70%)',
    top: '-10%',
    left: '-10%',
    opacity: 0.15,
    filter: 'blur(80px)',
    zIndex: -1,
  };

  const bgGradient2Style: React.CSSProperties = {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, var(--secondary) 0%, rgba(0,0,0,0) 70%)',
    bottom: '-20%',
    right: '-10%',
    opacity: 0.15,
    filter: 'blur(100px)',
    zIndex: -1,
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '440px',
    padding: '40px 32px',
    borderRadius: 'calc(var(--radius) * 1.5)',
    boxShadow: 'var(--shadow-lg)',
  };

  return (
    <div style={containerStyle}>
      <div style={bgGradientStyle} />
      <div style={bgGradient2Style} />

      <div className="glass-panel" style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.65, fontWeight: 500 }}>
            Enter your details to sign in to your ChatPro account
          </p>
        </div>

        <LoginForm />

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', opacity: 0.8 }}>
          <span style={{ marginRight: '6px', opacity: 0.7 }}>Don&apos;t have an account?</span>
          <Link href={ROUTES.REGISTER} style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
