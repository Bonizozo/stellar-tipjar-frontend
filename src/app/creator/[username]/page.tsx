import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { TipForm } from "@/components/forms/TipForm";
import { CreatorStatsDashboard } from "@/components/stats/CreatorStatsDashboard";
import { creatorUsernameSchema } from "@/schemas/creatorSchema";
import { getCreatorProfile } from "@/services/api";
import { formatUsername } from "@/utils/format";
import { generateAvatarUrl } from "@/utils/imageUtils";
import { buildMetadata, creatorProfileJsonLd } from "@/utils/seo";
import { OptimizedImage } from "@/components/OptimizedImage";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const parsed = creatorUsernameSchema.safeParse(params.username);
  if (!parsed.success) return {};
  try {
    const profile = await getCreatorProfile(parsed.data);
    return buildMetadata({
      title: profile.displayName,
      description: profile.bio || `Support ${profile.displayName} with Stellar tips.`,
      path: `/creator/${parsed.data}`,
    });
  } catch {
    return {};
  }
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const parsedUsername = creatorUsernameSchema.safeParse(params.username);
  if (!parsedUsername.success) {
    notFound();
  }

  const profile = await getCreatorProfile(parsedUsername.data);

  return (
    <section className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            creatorProfileJsonLd({
              username: profile.username,
              displayName: profile.displayName,
              bio: profile.bio,
            })
          ),
        }}
      />
      <div className="rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-8 shadow-card">
        <div className="mb-6 h-24 w-24 overflow-hidden rounded-full ring-4 ring-wave/20 sm:h-32 sm:w-32">
          <OptimizedImage
            src={generateAvatarUrl(profile.username)}
            alt={`Avatar for ${profile.displayName}`}
            priority={true}
            fill
            sizes="(min-width: 640px) 128px, 96px"
          />
        </div>
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

      <div>
        <h2 className="mb-4 text-xl font-semibold text-ink">Statistics</h2>
        <CreatorStatsDashboard username={profile.username} />
      </div>
    </section>
  );
}
