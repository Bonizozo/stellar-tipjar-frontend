"use client";

import { useState } from 'react';
import { Button } from '../Button';
import { generateAvatarUrl } from '@/utils/imageUtils';
import { requestVerification } from '@/services/api';
import { useCreatorProfile } from '@/hooks/queries/useCreatorProfile';

export function VerificationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { data: profile } = useCreatorProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setStatus('submitting');
    try {
      await requestVerification(profile.username);
      setStatus('success');
      setMessage('Verification request submitted! Admin will review within 48 hours.');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit request. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 p-3">
          ✓
        </div>
        <h3 className="mt-4 text-xl font-bold text-green-900">Request Submitted!</h3>
        <p className="mt-2 text-green-800">{message}</p>
        <Button variant="ghost" className="mt-4" onClick={() => setStatus('idle')}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-surface p-6">
      <h2 className="text-xl font-bold text-ink">Request Verification</h2>
      <p className="text-sm text-ink/60">
        Provide evidence of your creator status (social proof, website, etc.). Admin approval within 48h.
      </p>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80">Creator Username</label>
        <div className="flex items-center gap-2 rounded-lg border border-ink/20 px-3 py-2 bg-ink/5">
          <img 
            src={generateAvatarUrl(profile?.username || '')} 
            alt="" 
            className="h-8 w-8 rounded-full"
          />
          <span className="font-mono font-bold text-ink">{profile?.username}</span>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80">
          Proof Links (Twitter, Linktree, etc.)
        </label>
        <textarea
          required
          rows={3}
          className="w-full rounded-xl border border-ink/20 bg-surface px-4 py-3 shadow-sm focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20"
          placeholder="https://twitter.com/yourhandle&#10;https://linktr.ee/yourprofile"
        />
      </div>

      <Button type="submit" className="w-full" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Submit Verification Request'}
      </Button>

      {status === 'error' && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-900">{message}</p>
        </div>
      )}
    </form>
  );
}

