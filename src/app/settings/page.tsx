"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  BellIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  TrashIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";
import { Toggle } from "@/components/forms/Toggle";
import { Button } from "@/components/Button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailPrefs {
  marketing: boolean;
  tips: boolean;
  security: boolean;
  digest: boolean;
}

interface PrivacyPrefs {
  publicProfile: boolean;
  showTipCount: boolean;
  showSupporters: boolean;
}

// ─── Stubs ────────────────────────────────────────────────────────────────────

async function saveEmailPrefs(prefs: EmailPrefs): Promise<void> {
  await new Promise((r) => setTimeout(r, 400));
  console.log("Email prefs saved", prefs);
}

async function savePrivacyPrefs(prefs: PrivacyPrefs): Promise<void> {
  await new Promise((r) => setTimeout(r, 400));
  console.log("Privacy prefs saved", prefs);
}

async function toggle2FA(enabled: boolean): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
  console.log("2FA toggled", enabled);
}

async function deleteAccount(): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
  console.log("Account deleted");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <h2 className="text-base font-semibold text-ink flex items-center gap-2 mb-4">
      <Icon className="h-5 w-5 text-wave" />
      {title}
    </h2>
  );
}

function NavLink({ href, icon: Icon, label, description }: {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl p-3 hover:bg-ink/5 transition-colors group"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wave/10">
          <Icon className="h-5 w-5 text-wave" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{label}</p>
          <p className="text-xs text-ink/50">{description}</p>
        </div>
      </div>
      <ChevronRightIcon className="h-4 w-4 text-ink/30 group-hover:text-ink/60 transition-colors" />
    </Link>
  );
}

// ─── Email Preferences ────────────────────────────────────────────────────────

function EmailPreferences() {
  const [prefs, setPrefs] = useState<EmailPrefs>({
    marketing: false,
    tips: true,
    security: true,
    digest: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof EmailPrefs) => (val: boolean) =>
    setPrefs((p) => ({ ...p, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    await saveEmailPrefs(prefs);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SectionCard>
      <SectionTitle icon={EnvelopeIcon} title="Email preferences" />
      <div className="space-y-3">
        {(
          [
            { key: "tips", label: "Tip notifications", helper: "Email when you receive a tip" },
            { key: "security", label: "Security alerts", helper: "Login attempts and account changes" },
            { key: "digest", label: "Weekly digest", helper: "Summary of your creator activity" },
            { key: "marketing", label: "Product updates", helper: "News and feature announcements" },
          ] as const
        ).map(({ key, label, helper }) => (
          <div key={key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-ink">{label}</p>
              <p className="text-xs text-ink/50">{helper}</p>
            </div>
            <Toggle id={`email-${key}`} label="" checked={prefs[key]} onChange={toggle(key)} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button size="sm" variant="primary" onClick={handleSave} loading={saving}>
          Save
        </Button>
        {saved && <span className="text-xs text-emerald-600">✓ Saved</span>}
      </div>
    </SectionCard>
  );
}

// ─── Privacy Settings ─────────────────────────────────────────────────────────

function PrivacySettings() {
  const [prefs, setPrefs] = useState<PrivacyPrefs>({
    publicProfile: true,
    showTipCount: true,
    showSupporters: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof PrivacyPrefs) => (val: boolean) =>
    setPrefs((p) => ({ ...p, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    await savePrivacyPrefs(prefs);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <SectionCard>
      <SectionTitle icon={LockClosedIcon} title="Privacy" />
      <div className="space-y-3">
        {(
          [
            { key: "publicProfile", label: "Public profile", helper: "Anyone can view your creator page" },
            { key: "showTipCount", label: "Show tip count", helper: "Display total tips received publicly" },
            { key: "showSupporters", label: "Show supporters", helper: "List supporters on your profile" },
          ] as const
        ).map(({ key, label, helper }) => (
          <div key={key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-ink">{label}</p>
              <p className="text-xs text-ink/50">{helper}</p>
            </div>
            <Toggle id={`privacy-${key}`} label="" checked={prefs[key]} onChange={toggle(key)} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <Button size="sm" variant="primary" onClick={handleSave} loading={saving}>
          Save
        </Button>
        {saved && <span className="text-xs text-emerald-600">✓ Saved</span>}
      </div>
    </SectionCard>
  );
}

// ─── Security Settings ────────────────────────────────────────────────────────

function SecuritySettings() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handle2FA = async (val: boolean) => {
    setToggling(true);
    await toggle2FA(val);
    setTwoFAEnabled(val);
    setToggling(false);
  };

  return (
    <SectionCard>
      <SectionTitle icon={ShieldCheckIcon} title="Security" />
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm font-medium text-ink">Two-factor authentication</p>
          <p className="text-xs text-ink/50">Add an extra layer of security to your account</p>
        </div>
        <Toggle
          id="2fa"
          label=""
          checked={twoFAEnabled}
          onChange={handle2FA}
          disabled={toggling}
        />
      </div>
      {twoFAEnabled && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2"
        >
          ✓ Two-factor authentication is enabled
        </motion.p>
      )}
    </SectionCard>
  );
}

// ─── Danger Zone ──────────────────────────────────────────────────────────────

function DangerZone() {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await deleteAccount();
    setDeleting(false);
    setConfirming(false);
    // In production: redirect to logout/home
  };

  return (
    <SectionCard className="border-rose-200 dark:border-rose-900/40">
      <SectionTitle icon={TrashIcon} title="Danger zone" />
      <p className="text-sm text-ink/60 mb-4">
        Permanently delete your account and all associated data. This action cannot be undone.
      </p>
      {!confirming ? (
        <Button size="sm" variant="danger" onClick={() => setConfirming(true)}>
          Delete account
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 space-y-3"
        >
          <p className="text-sm font-medium text-rose-700">
            Are you sure? This will permanently delete your account.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="danger" onClick={handleDelete} loading={deleting}>
              Yes, delete my account
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={deleting}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </SectionCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay },
});

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink/5 to-transparent">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Settings</h1>
          <p className="text-ink/60 mt-1 text-sm">Manage your account and preferences</p>
        </motion.div>

        <div className="space-y-6">
          {/* Quick nav */}
          <motion.div {...fadeUp(0.05)}>
            <SectionCard>
              <NavLink
                href="/profile"
                icon={UserCircleIcon}
                label="Profile"
                description="Edit your public creator profile and avatar"
              />
              <NavLink
                href="/settings/notifications"
                icon={BellIcon}
                label="Notifications"
                description="Control how and when you're notified"
              />
            </SectionCard>
          </motion.div>

          {/* Email prefs */}
          <motion.div {...fadeUp(0.1)}>
            <EmailPreferences />
          </motion.div>

          {/* Privacy */}
          <motion.div {...fadeUp(0.15)}>
            <PrivacySettings />
          </motion.div>

          {/* Security / 2FA */}
          <motion.div {...fadeUp(0.2)}>
            <SecuritySettings />
          </motion.div>

          {/* Danger zone */}
          <motion.div {...fadeUp(0.25)}>
            <DangerZone />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
