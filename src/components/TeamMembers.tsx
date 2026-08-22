"use client";

import { useState } from "react";
import {
  TeamMember,
  TeamRole,
  TEAM_ROLE_LABELS,
  TEAM_ROLE_DESCRIPTIONS,
} from "@/hooks/useTeam";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Tooltip } from "@/components/Tooltip";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilSquareIcon,
  WalletIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

const ROLE_BADGE_COLORS: Record<
  TeamRole,
  "primary" | "success" | "warning" | "neutral" | "info"
> = {
  owner: "primary",
  admin: "info",
  member: "success",
  viewer: "neutral",
};

interface EditMemberModalProps {
  member: TeamMember;
  onSave: (updates: Partial<TeamMember>) => void;
  onClose: () => void;
}

function EditMemberModal({ member, onSave, onClose }: EditMemberModalProps) {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email ?? "");
  const [walletAddress, setWalletAddress] = useState(
    member.walletAddress ?? "",
  );
  const [role, setRole] = useState<TeamRole>(member.role);

  const handleSave = () => {
    onSave({
      name: name.trim() || member.name,
      email: email.trim() || undefined,
      walletAddress: walletAddress.trim() || undefined,
      role,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Edit ${member.name}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-6 shadow-xl"
      >
        <h3 className="mb-4 text-lg font-semibold text-ink">Edit Member</h3>

        <div className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm font-medium text-ink"
              htmlFor="edit-name"
            >
              Name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-sm focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-ink"
              htmlFor="edit-email"
            >
              Email <span className="text-ink/50">(optional)</span>
            </label>
            <input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@example.com"
              className="w-full rounded-lg border border-ink/20 px-4 py-2.5 text-sm focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-ink"
              htmlFor="edit-wallet"
            >
              Wallet Address <span className="text-ink/50">(optional)</span>
            </label>
            <input
              id="edit-wallet"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="G..."
              className="w-full rounded-lg border border-ink/20 px-4 py-2.5 font-mono text-xs focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium text-ink"
              htmlFor="edit-role"
            >
              Role
            </label>
            <div className="relative">
              <select
                id="edit-role"
                value={role}
                onChange={(e) => setRole(e.target.value as TeamRole)}
                className="w-full appearance-none rounded-lg border border-ink/20 px-4 py-2.5 pr-10 text-sm focus:border-wave focus:outline-none focus:ring-1 focus:ring-wave/20"
              >
                {(Object.keys(TEAM_ROLE_LABELS) as TeamRole[]).map((r) => (
                  <option key={r} value={r}>
                    {TEAM_ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
            </div>
            <p className="mt-1 text-xs text-ink/50">
              {TEAM_ROLE_DESCRIPTIONS[role]}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleSave} className="flex-1">
            Save Changes
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

interface TeamMembersProps {
  members: TeamMember[];
  onRemove: (id: string) => void;
  onEdit?: (id: string, updates: Partial<TeamMember>) => void;
  isLoading?: boolean;
  className?: string;
}

export function TeamMembers({
  members,
  onRemove,
  onEdit,
  isLoading = false,
  className = "",
}: TeamMembersProps) {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const activeMembers = members.filter((m) => m.isActive);
  const inactiveMembers = members.filter((m) => !m.isActive);

  if (members.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center ${className}`}
      >
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink/10">
          <svg
            className="h-6 w-6 text-ink/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-ink/70">No team members yet</p>
        <p className="mt-1 text-xs text-ink/60">
          Start by adding your first team member or sending an invitation
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={`space-y-4 ${className}`}>
        {/* Active Members Section */}
        {activeMembers.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink">
              Active Members ({activeMembers.length})
            </h3>
            <div className="space-y-2">
              {activeMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4 shadow-sm transition hover:border-wave/20 hover:shadow-card"
                >
                  <div className="flex flex-1 items-center gap-3 min-w-0">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 font-semibold text-wave">
                      {member.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-ink">{member.name}</p>
                        <Badge
                          color={ROLE_BADGE_COLORS[member.role]}
                          size="sm"
                          style="soft"
                        >
                          {TEAM_ROLE_LABELS[member.role]}
                        </Badge>
                      </div>

                      {member.email && (
                        <p className="text-xs text-ink/60 line-clamp-1">
                          {member.email}
                        </p>
                      )}

                      {member.walletAddress && (
                        <div className="mt-0.5 flex items-center gap-1">
                          <WalletIcon className="h-3 w-3 text-ink/40" />
                          <p className="font-mono text-xs text-ink/50">
                            {member.walletAddress.slice(0, 6)}…
                            {member.walletAddress.slice(-4)}
                          </p>
                        </div>
                      )}

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <Badge color="neutral" size="sm" style="soft">
                          {member.split}% split
                        </Badge>
                        {member.earnings !== undefined &&
                          member.earnings > 0 && (
                            <Badge color="success" size="sm" style="soft">
                              {member.earnings.toLocaleString()} XLM earned
                            </Badge>
                          )}
                        <span className="text-xs text-ink/40">
                          Joined{" "}
                          {new Date(member.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="ml-2 flex flex-shrink-0 items-center gap-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss/10">
                      <CheckCircleIcon className="h-5 w-5 text-moss" />
                    </div>

                    {onEdit && (
                      <Tooltip content="Edit member" side="top">
                        <button
                          onClick={() => setEditingMember(member)}
                          disabled={isLoading}
                          className="rounded-lg p-2 text-ink/60 transition hover:bg-wave/10 hover:text-wave disabled:opacity-50"
                          aria-label={`Edit ${member.name}`}
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    )}

                    <Tooltip content="Remove member" side="top">
                      <button
                        onClick={() => onRemove(member.id)}
                        disabled={isLoading}
                        className="rounded-lg p-2 text-ink/60 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-950"
                        aria-label={`Remove ${member.name}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </Tooltip>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Members Section */}
        {inactiveMembers.length > 0 && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink/50">
              Removed Members ({inactiveMembers.length})
            </h3>
            <div className="space-y-2 opacity-60">
              {inactiveMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-[color:var(--surface)] p-4"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/10 font-semibold text-ink/50">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 font-semibold text-ink/70 line-through">
                        {member.name}
                      </p>
                      {member.email && (
                        <p className="text-xs text-ink/50 line-clamp-1">
                          {member.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950">
                    <XCircleIcon className="h-5 w-5 text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingMember && onEdit && (
          <EditMemberModal
            member={editingMember}
            onSave={(updates) => onEdit(editingMember.id, updates)}
            onClose={() => setEditingMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
