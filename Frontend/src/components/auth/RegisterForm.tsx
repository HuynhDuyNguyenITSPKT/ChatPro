'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema } from '@/validators/register.schema';
import { ROUTES } from '@/lib/constants';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const payload = { name, email, password, confirmPassword };

    // Validate using Zod schema
    const result = registerSchema.safeParse(payload);
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
      await register({ name, email, password });
      router.push(ROUTES.VERIFY_OTP);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
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
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
        disabled={authLoading}
        required
      />

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

      <Input
        label="Password"
        type="password"
        placeholder="Minimum 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        disabled={authLoading}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        disabled={authLoading}
        required
      />

      <Button type="submit" isLoading={authLoading} style={{ width: '100%', marginTop: '10px' }}>
        Create Account
      </Button>
    </form>
  );
};
