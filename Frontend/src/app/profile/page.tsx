'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/common/Header';
import { Sidebar } from '@/components/common/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useUpload } from '@/hooks/useUpload';
import { userService } from '@/services/user.service';
import { authStore } from '@/store/auth.store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const { upload, isUploading, error: uploadError } = useUpload();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync state with user data
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || 'user');
      setAvatarUrl(user.avatarUrl || '');
    }
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await upload(file);
    if (url) {
      setAvatarUrl(url);
      setMessage({ type: 'success', text: 'Avatar uploaded successfully. Remember to save changes.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const updatedUser = await userService.updateProfile({ name, avatarUrl });
      authStore.setState({ user: updatedUser });
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Failed to update profile';
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setIsSaving(false);
    }
  };

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

  const cardStyle: React.CSSProperties = {
    padding: '32px',
    borderRadius: 'calc(var(--radius) * 1.5)',
    backgroundColor: 'var(--card)',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow-lg)',
    maxWidth: '650px',
  };

  const avatarContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '28px',
  };

  const avatarPreviewStyle: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 600,
    border: '3px solid var(--border)',
    overflow: 'hidden',
    position: 'relative',
  };

  const uploadInputStyle: React.CSSProperties = {
    display: 'none',
  };

  return (
    <div style={mainContainerStyle}>
      <Header />
      <div style={contentLayoutStyle}>
        <Sidebar />
        <main style={mainContentStyle}>
          <div style={cardStyle} className="animate-fade-in">
            <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>Profile Settings</h1>

            {message && (
              <div
                style={{
                  backgroundColor: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
                  color: message.type === 'success' ? 'var(--success)' : 'var(--danger)',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}
              >
                {message.text}
              </div>
            )}

            {(uploadError) && (
              <div
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid var(--danger)',
                  color: 'var(--danger)',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}
              >
                {uploadError}
              </div>
            )}

            <div style={avatarContainerStyle}>
              <div style={avatarPreviewStyle}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span>{name.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
              <div>
                <label style={{ cursor: 'pointer' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: 'var(--input)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {isUploading ? 'Uploading...' : 'Change Avatar'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    style={uploadInputStyle}
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                  />
                </label>
                <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '6px' }}>
                  Supports PNG, JPG, GIF or WEBP. Max size 5MB.
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSaving}
                required
              />

              <Input
                label="Email Address"
                value={email}
                disabled
              />

              <Input
                label="Role"
                value={role.toUpperCase()}
                disabled
              />

              <Button type="submit" isLoading={isSaving} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
                Save Changes
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
