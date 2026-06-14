'use client';

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/common/Header';

export default function Home() {
  const heroStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '80px 24px',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 150px)',
    position: 'relative',
    zIndex: 1,
  };

  const bgGlowStyle: React.CSSProperties = {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, rgba(0,0,0,0) 70%)',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: -1,
    filter: 'blur(100px)',
    borderRadius: '50%',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    backgroundColor: 'var(--ring)',
    color: 'var(--primary)',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: 700,
    marginBottom: '24px',
    border: '1px solid rgba(var(--primary-rgb), 0.2)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'clamp(38px, 6vw, 68px)',
    fontWeight: 900,
    lineHeight: 1.1,
    letterSpacing: '-2px',
    marginBottom: '24px',
    color: 'var(--foreground)',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2vw, 19px)',
    lineHeight: 1.6,
    color: 'var(--foreground)',
    opacity: 0.7,
    maxWidth: '700px',
    marginBottom: '40px',
    fontWeight: 500,
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const featuresSectionStyle: React.CSSProperties = {
    padding: '80px 24px',
    backgroundColor: 'var(--card)',
    borderTop: '1px solid var(--border)',
  };

  const featureGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const featureCardStyle: React.CSSProperties = {
    padding: '32px',
    borderRadius: 'var(--radius)',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--background)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={bgGlowStyle} />
        
        <div style={badgeStyle} className="animate-fade-in">
          <span>🚀</span> Next.js 15 & Tailwind Free Architecture
        </div>
        
        <h1 style={headingStyle} className="animate-fade-in">
          Sleek Collaborative Space for <span className="gradient-text">Teams & Projects</span>
        </h1>
        
        <p style={paragraphStyle} className="animate-fade-in">
          Fully scaffolded front-end structure containing JWT & OTP authentication, secure dashboard layouts, profile customization, and drag-and-drop cloud asset uploads.
        </p>

        <div style={buttonGroupStyle} className="animate-fade-in">
          <Link href={ROUTES.DASHBOARD}>
            <Button size="lg">Go to Dashboard</Button>
          </Link>
          <Link href={ROUTES.LOGIN}>
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Overview */}
      <section style={featuresSectionStyle}>
        <div style={{ maxWidth: '1200px', margin: '0 auto 60px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '16px' }}>What&apos;s Included</h2>
          <p style={{ opacity: 0.6, maxWidth: '600px', margin: '0 auto' }}>
            A comprehensive, clean starting point structured with clean separation of layers.
          </p>
        </div>

        <div style={featureGridStyle}>
          <div style={featureCardStyle}>
            <div style={{ fontSize: '28px' }}>🔐</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Auth Routes & Context</h3>
            <p style={{ fontSize: '14px', opacity: 0.65, lineHeight: 1.5 }}>
              Ready-made pages for Registration, Password or OTP Login, and complete Verification OTP screens mapped with Zod validation.
            </p>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '28px' }}>⚡</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>React Hooks & Stores</h3>
            <p style={{ fontSize: '14px', opacity: 0.65, lineHeight: 1.5 }}>
              Vanilla pub-sub system and hooks like `useAuth` and `useUpload` that decouple interface rendering from background state logic.
            </p>
          </div>

          <div style={featureCardStyle}>
            <div style={{ fontSize: '28px' }}>☁️</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>API & Upload Services</h3>
            <p style={{ fontSize: '14px', opacity: 0.65, lineHeight: 1.5 }}>
              Standardized Axios instance carrying bearer tokens via browser cookies, alongside utilities for date formatting and asset uploads.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{ padding: '30px 24px', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '14px', opacity: 0.5 }}>
        © {new Date().getFullYear()} ChatPro. All rights reserved.
      </footer>
    </div>
  );
}
