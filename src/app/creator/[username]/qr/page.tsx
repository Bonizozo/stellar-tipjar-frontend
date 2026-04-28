import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { creatorUsernameSchema } from "@/schemas/creatorSchema";
import { getCreatorProfile } from "@/services/api";
import { TipCard } from "@/components/TipCard";
import { Button } from "@/components/Button";

interface QRPageProps {
  params: { username: string };
}

export async function generateMetadata({ params }: QRPageProps): Promise<Metadata> {
  const parsed = creatorUsernameSchema.safeParse(params.username);
  if (!parsed.success) return {};
  return { title: `QR Code – @${parsed.data}` };
}

export default async function CreatorQRPage({ params }: QRPageProps) {
  const parsed = creatorUsernameSchema.safeParse(params.username);
  if (!parsed.success) notFound();

  const profile = await getCreatorProfile(parsed.data);
  const tipUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://stellar-tipjar.app"}/creator/${parsed.data}`;

  return (
    <section className="mx-auto max-w-lg space-y-8 py-10 px-4">
      <div>
        <Link href={`/creator/${parsed.data}`}>
          <Button variant="ghost" className="mb-4">← Back to profile</Button>
        </Link>
        <h1 className="text-2xl font-bold text-ink">QR Code Tip Card</h1>
        <p className="mt-1 text-sm text-ink/60">
          Print or share this card so supporters can scan and tip instantly.
        </p>
      </div>

      <TipCard
        username={profile.username}
        displayName={profile.displayName}
        tipUrl={tipUrl}
        bio={profile.bio}
      />
    </section>
  );
}
