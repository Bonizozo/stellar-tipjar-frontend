import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { TipForm } from "@/components/forms/TipForm";
import { creatorUsernameSchema } from "@/schemas/creatorSchema";
import { getCreatorProfile } from "@/services/api";
import { formatUsername } from "@/utils/format";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const parsedUsername = creatorUsernameSchema.safeParse(params.username);
  if (!parsedUsername.success) {
    notFound();
  }

  const profile = await getCreatorProfile(parsedUsername.data);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-8 shadow-card">
        <p className="text-xs uppercase tracking-wide text-wave">Creator Profile</p>
        <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">{profile.displayName}</h1>
        <p className="mt-1 text-sm text-ink/60">{formatUsername(profile.username)}</p>
        <p className="mt-4 max-w-2xl text-ink/75">{profile.bio}</p>
        <p className="mt-4 inline-flex rounded-lg bg-wave/10 px-3 py-1 text-sm text-wave">
          Preferred asset: {profile.preferredAsset}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tips">
            <Button>Tip This Creator</Button>
          </Link>
          <Link href="/explore">
            <Button variant="ghost">Back to Explore</Button>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-ink/10 bg-white/70 p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-ink">Send a Tip</h2>
          <p className="mt-2 text-sm text-ink/70">
            Amount and asset values are validated on blur and submit before calling the API.
          </p>
          <TipForm username={profile.username} defaultAssetCode={profile.preferredAsset} />
        </div>
      </div>
    </section>
  );
}
