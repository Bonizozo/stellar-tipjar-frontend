"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProfileForm } from "@/components/profile/ProfileForm";

// Stub: replace with real API calls
async function uploadAvatar(file: File): Promise<string> {
  await new Promise((r) => setTimeout(r, 800));
  return URL.createObjectURL(file);
}

async function saveProfile(values: Record<string, unknown>): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  console.log("Profile saved", values);
}

const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink/5 to-transparent">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.div {...fadeUp} className="mb-8">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-wave hover:text-wave/80 mb-4 text-sm font-medium"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Settings
          </Link>
          <h1 className="text-3xl font-bold text-ink flex items-center gap-3">
            <UserCircleIcon className="h-8 w-8 text-wave" />
            Profile Settings
          </h1>
          <p className="text-ink/60 mt-1 text-sm">
            Manage your public creator profile
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Avatar */}
          <motion.section
            {...fadeUp}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6"
          >
            <h2 className="text-base font-semibold text-ink mb-4">Profile photo</h2>
            <AvatarUpload
              name="Creator"
              onUpload={uploadAvatar}
              onRemove={() => console.log("Avatar removed")}
            />
          </motion.section>

          {/* Profile info */}
          <motion.section
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6"
          >
            <h2 className="text-base font-semibold text-ink mb-4">Profile information</h2>
            <ProfileForm onSave={saveProfile} />
          </motion.section>
        </div>
      </div>
    </div>
  );
}
