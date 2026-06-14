'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/validators/login.schema';
import { ROUTES } from '@/lib/constants';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    // Prepare payload
    const payload = isOtpMode
      ? { email, otp }
      : { email, password };

    // Validate using Zod schema
    const result = loginSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err: any) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      if (isOtpMode && !otp) {
        // If just submitting email to request OTP
        setApiError('Please enter the OTP sent to your email.');
        return;
      }
      
      await login(payload);
      router.push(ROUTES.DASHBOARD);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Login failed. Please check your credentials.';
      setApiError(errMsg);
    }
  };

  const formStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle} className="animate-fade-in">
      {apiError && (
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
          {apiError}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        disabled={authLoading}
        required
      />

      {isOtpMode ? (
        <Input
          label="One-Time Password (OTP)"
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          error={errors.otp}
          disabled={authLoading}
          maxLength={6}
          required
        />
      ) : (
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          disabled={authLoading}
          required
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => {
            setIsOtpMode(!isOtpMode);
            setErrors({});
            setApiError(null);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {isOtpMode ? 'Use Password Sign In' : 'Sign In with OTP'}
        </button>
      </div>

      <Button type="submit" isLoading={authLoading} style={{ width: '100%' }}>
        {isOtpMode ? 'Verify and Sign In' : 'Sign In'}
      </Button>
    </form>
  );
};
