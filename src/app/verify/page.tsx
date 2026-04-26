"use client";

import { VerificationForm } from '@/components/VerificationForm';
import { VerificationBadge } from '@/components/VerificationBadge';
import { useVerification } from '@/hooks/useVerification';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { generateAvatarUrl } from '@/utils/imageUtils';
import { AvatarImage } from '@/components/OptimizedImage';
import { useCreatorProfile } from '@/hooks/queries/useCreatorProfile';
import { useWallet } from '@/contexts/WalletContext';

export default function VerifyPage() {
  const { status, isLoading, isVerified } = useVerification();
  const { data: profile } = useCreatorProfile();
  const { isConnected } = useWallet();

  if (isVerified) {
    return (
      <div className="max-w-2xl mx-auto space-y-8 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-2xl">
            <VerificationBadge size="lg" />
            <span className="text-2xl font-bold text-ink">Already Verified!</span>
          </div>
          <p className="mt-4 text-ink/60">
            Your account <strong>@{profile?.username}</strong> is verified.
          </p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-surface p-8 text-center">
          <Link href={`/creator/${profile?.username}`}>
            <Button className="w-full sm:w-auto">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="max-w-md mx-auto space-y-6 py-12">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 rounded-2xl bg-blue-100 p-5">
            🔐
          </div>
          <h1 className="mt-6 text-3xl font-bold text-ink">Connect Wallet</h1>
          <p className="mt-2 text-ink/60">
            Verification requests require a connected Stellar wallet.
          </p>
        </div>
        <WalletConnectButton /> {/* Assume exists */}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Creator Verification
        </h1>
        <p className="mt-4 text-xl text-ink/80">
          Prove you're a real creator to get the blue badge
        </p>
      </header>

      {profile && (
        <div className="rounded-2xl border border-ink/10 bg-surface p-8">
          <div className="flex items-center gap-4 mb-6">
            <AvatarImage src={generateAvatarUrl(profile.username)} alt="" size={64} className="ring-4 ring-ink/20" />
            <div>
              <h2 className="text-2xl font-bold text-ink">{profile.displayName}</h2>
              <p className="text-sm font-mono text-ink/60">@{profile.username}</p>
              <VerificationBadge isVerified={profile.isVerified} />
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <VerificationForm />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-ink/10 bg-surface p-6">
          <h3 className="font-bold text-ink mb-2">Why Verify?</h3>
          <ul className="space-y-1 text-sm text-ink/70">
            <li>• Blue badge on profile</li>
            <li>• Priority in recommendations</li>
            <li>• Leaderboard eligibility</li>
            <li>• Trust signal for tippers</li>
          </ul>
        </div>
        <div className="rounded-xl border border-ink/10 bg-surface p-6">
          <h3 className="font-bold text-ink mb-2">Requirements</h3>
          <ul className="space-y-1 text-sm text-ink/70">
            <li>• Active social proof</li>
            <li>• Consistent content creation</li>
            <li>• Stellar wallet ownership</li>
            <li>• No violations</li>
          </ul>
        </div>
        <div className="rounded-xl border border-ink/10 bg-surface p-6">
          <h3 className="font-bold text-ink mb-2">Process</h3>
          <ul className="space-y-1 text-sm text-ink/70">
            <li>• Submit request</li>
            <li>• Admin review (48h)</li>
            <li>• Badge granted</li>
            <li>• Auto-renew monthly</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-12 border-t border-ink/10">
        <Link href="/explore">
          <Button variant="ghost">
            Back to Explore
          </Button>
        </Link>
      </div>
    </div>
  );
}

