import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CreatorPageClient } from "./CreatorPageClient";
import { creatorUsernameSchema } from "@/schemas/creatorSchema";
import { getCreatorProfile } from "@/services/api";
import { buildMetadata, creatorProfileJsonLd } from "@/utils/seo";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const { username } = await params;
  const parsed = creatorUsernameSchema.safeParse(username);
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

export default async function CreatorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const parsedUsername = creatorUsernameSchema.safeParse(username);
  if (!parsedUsername.success) {
    notFound();
  }

  const profile = await getCreatorProfile(parsedUsername.data);

  return (
    <>
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
      <CreatorPageClient username={parsedUsername.data} profile={profile} />
    </>
  );
}