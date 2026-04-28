"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { UserPlus, ChevronDown, ChevronUp, Coins } from "lucide-react";
import type { Collaboration } from "@/types/collaboration";
import { CollaborationBadge } from "@/components/collaboration/CollaborationBadge";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CollaborationCardProps {
  collaboration: Collaboration;
  currentUsername: string;
  onInvite: (collabId: string, username: string, split: number) => Promise<boolean>;
  onUpdateSplit: (collabId: string, splits: Record<string, number>) => Promise<boolean>;
}

export function CollaborationCard({
  collaboration,
  currentUsername,
  onInvite,
  onUpdateSplit,
}: CollaborationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");
  const [inviteSplit, setInviteSplit] = useState(20);
  const [inviting, setInviting] = useState(false);
  const reduced = useReducedMotion();

  const isOwner = collaboration.collaborators.find(
    (c) => c.username === currentUsername
  )?.role === "owner";

  const totalSplit = collaboration.collaborators.reduce(
    (sum, c) => sum + c.splitPercentage,
    0
  );

  async function handleInvite() {
    if (!inviteUsername.trim()) return;
    setInviting(true);
    const ok = await onInvite(collaboration.id, inviteUsername, inviteSplit);
    if (ok) setInviteUsername("");
    setInviting(false);
  }

  return (
    <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-ink dark:text-white truncate">{collaboration.title}</h3>
              <CollaborationBadge status={collaboration.status} />
            </div>
            {collaboration.description && (
              <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5 truncate">{collaboration.description}</p>
            )}
          </div>
          <button
            onClick={() => setExpanded((e: boolean) => !e)}
            className="ml-2 text-ink/40 dark:text-white/40 hover:text-ink dark:hover:text-white"
            aria-label={expanded ? "Collapse" : "Expand"}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Collaborators summary */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {collaboration.collaborators.slice(0, 4).map((c) => (
              <div
                key={c.username}
                className="w-7 h-7 rounded-full bg-wave/20 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-wave"
                title={`@${c.username} (${c.splitPercentage}%)`}
              >
                {c.displayName[0]?.toUpperCase()}
              </div>
            ))}
          </div>
          <span className="text-xs text-ink/50 dark:text-white/50">
            {collaboration.collaborators.length} creator{collaboration.collaborators.length !== 1 ? "s" : ""}
          </span>
          <div className="ml-auto flex items-center gap-1 text-xs text-moss font-medium">
            <Coins size={12} />
            {collaboration.totalTipsReceived} XLM
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          className="border-t border-ink/10 dark:border-white/10 p-4 space-y-3"
          initial={reduced ? {} : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
        >
          {/* Split breakdown */}
          <div>
            <p className="text-xs font-semibold text-ink/60 dark:text-white/60 uppercase tracking-wide mb-2">
              Tip Split
            </p>
            <div className="space-y-1.5">
              {collaboration.collaborators.map((c) => (
                <div key={c.username} className="flex items-center gap-2">
                  <span className="text-xs text-ink/70 dark:text-white/70 w-24 truncate">@{c.username}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-wave to-moss"
                      style={{ width: `${c.splitPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-ink dark:text-white w-8 text-right">
                    {c.splitPercentage}%
                  </span>
                </div>
              ))}
            </div>
            {totalSplit !== 100 && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                ⚠ Split totals {totalSplit}% (should be 100%)
              </p>
            )}
          </div>

          {/* Invite form (owner only) */}
          {isOwner && collaboration.status === "active" && (
            <div>
              <p className="text-xs font-semibold text-ink/60 dark:text-white/60 uppercase tracking-wide mb-2">
                Invite Co-Creator
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inviteUsername}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInviteUsername(e.target.value)}
                  placeholder="@username"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave"
                  aria-label="Invite username"
                />
                <input
                  type="number"
                  value={inviteSplit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInviteSplit(Number(e.target.value))}
                  min={1}
                  max={99}
                  className="w-16 px-2 py-1.5 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave text-center"
                  aria-label="Split percentage"
                />
                <Button
                  size="sm"
                  variant="primary"
                  icon={<UserPlus size={14} />}
                  onClick={handleInvite}
                  loading={inviting}
                  disabled={!inviteUsername.trim() || inviting}
                >
                  Invite
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
