'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';

export default function VerifyOtpPage() {
  const router = useRouter();
  const { verifyOtp, user, isLoading } = useAuth();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (otp.length !== 6) {
      setError('OTP must be exactly 6 characters.');
      return;
    }

    try {
      const email = user?.email || '';
      await verifyOtp({ email, otp });
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Invalid OTP. Please try again.';
      setError(errMsg);
    }
  };

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

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '440px',
    padding: '40px 32px',
    borderRadius: 'calc(var(--radius) * 1.5)',
    boxShadow: 'var(--shadow-lg)',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div className="glass-panel" style={cardStyle}>
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>✉️</div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
            Verify Your Email
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.65, fontWeight: 500, lineHeight: 1.5 }}>
            We have sent a verification code to your email. Enter it below to activate your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--danger)',
                color: 'var(--danger)',
                padding: '12px',
                borderRadius: 'var(--radius)',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          <Input
            label="One-Time Verification Code"
            type="text"
            placeholder="Enter 6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={isLoading}
            maxLength={6}
            required
            style={{ textAlign: 'center', letterSpacing: '4px', fontSize: '20px' }}
          />

          <Button type="submit" isLoading={isLoading} style={{ width: '100%', marginTop: '10px' }}>
            Verify Account
          </Button>
        </form>

        <div style={{ marginTop: '24px', opacity: 0.6, fontSize: '13px' }}>
          Didn&apos;t receive code? <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Resend</span>
        </div>
      </div>
    </div>
  );
}
