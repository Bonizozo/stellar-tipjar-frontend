"use client";

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../Button';
import { generateAvatarUrl } from '@/utils/imageUtils';
import { requestVerification } from '@/services/api';
import { useCreatorProfile } from '@/hooks/queries/useCreatorProfile';
import { verificationSchema, type VerificationSchemaValues } from '@/schemas';

export function VerificationForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { data: profile } = useCreatorProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<VerificationSchemaValues>({
    resolver: zodResolver(verificationSchema),
    mode: 'onBlur',
  });

  const onValid = async (values: VerificationSchemaValues) => {
    if (!profile) return;
    await requestVerification(profile.username);
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto h-16 w-16 rounded-full bg-green-100 p-3">✓</div>
        <h3 className="mt-4 text-xl font-bold text-green-900">Request Submitted!</h3>
        <p className="mt-2 text-green-800">Admin will review within 48 hours.</p>
        <Button variant="ghost" className="mt-4" onClick={() => reset()}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-4 rounded-2xl border border-ink/10 bg-surface p-6">
      <h2 className="text-xl font-bold text-ink">Request Verification</h2>
      <p className="text-sm text-ink/60">
        Provide evidence of your creator status. Admin approval within 48h.
      </p>

      {profile && (
        <div>
          <label className="mb-1 block text-sm font-medium text-ink/80">Creator Username</label>
          <div className="flex items-center gap-2 rounded-lg border border-ink/20 px-3 py-2 bg-ink/5">
            <img src={generateAvatarUrl(profile.username)} alt="" className="h-8 w-8 rounded-full" />
            <span className="font-mono font-bold text-ink">{profile.username}</span>
          </div>
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80">
          Proof Links (one per line)
        </label>
        <textarea
          {...register('proofLinks')}
          rows={3}
          aria-invalid={!!errors.proofLinks}
          className={`w-full rounded-xl border px-4 py-3 text-sm bg-surface shadow-sm focus:outline-none focus:ring-2 ${
            errors.proofLinks ? 'border-error/60 focus:ring-error/20' : 'border-ink/20 focus:border-wave focus:ring-wave/20'
          }`}
          placeholder="https://twitter.com/yourhandle&#10;https://linktr.ee/yourprofile"
        />
        {errors.proofLinks && (
          <p className="mt-1 text-xs text-error">{errors.proofLinks.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink/80">
          Supporting Document (optional)
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,.pdf"
          className="w-full rounded-xl border border-ink/20 bg-surface px-4 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-wave/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-wave"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting…' : 'Submit Verification Request'}
      </Button>
    </form>
  );
}
