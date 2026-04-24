"use client";

import { TeamMember } from "@/hooks/useTeam";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Tooltip } from "@/components/Tooltip";
import { motion } from "framer-motion";
import { TrashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface TeamMembersProps {
  members: TeamMember[];
  onRemove: (id: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function TeamMembers({ members, onRemove, isLoading = false, className = "" }: TeamMembersProps) {
  const activeMembers = members.filter((m) => m.isActive);
  const inactiveMembers = members.filter((m) => !m.isActive);

  if (members.length === 0) {
    return (
      <div className={`rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-8 text-center ${className}`}>
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink/10">
          <svg className="h-6 w-6 text-ink/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 12H9m4 5h4m0 0h4m-8 0v4m0-11h0.01" />
          </svg>
        </div>
        <p className="text-sm font-medium text-ink/70">No team members yet</p>
        <p className="mt-1 text-xs text-ink/60">Start by adding your first team member or sending an invitation</p>
      </div>
    );
  }

  return (
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
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 font-semibold text-wave">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink line-clamp-1">{member.name}</p>
                    {member.email && (
                      <p className="text-xs text-ink/60 line-clamp-1">{member.email}</p>
                    )}
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant="secondary" className="inline-flex">
                        {member.split}% split
                      </Badge>
                      <Tooltip text={`Joined ${new Date(member.createdAt).toLocaleDateString()}`}>
                        <span className="text-xs text-ink/50">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-grass/10">
                    <CheckCircleIcon className="h-5 w-5 text-moss" />
                  </div>
                  <Tooltip text="Remove member">
                    <button
                      onClick={() => onRemove(member.id)}
                      disabled={isLoading}
                      className="rounded-lg p-2 text-ink/60 transition hover:bg-error/10 hover:text-error disabled:opacity-50"
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
                    <p className="line-clamp-1 font-semibold text-ink/70 line-through">{member.name}</p>
                    {member.email && (
                      <p className="text-xs text-ink/50 line-clamp-1">{member.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error/10">
                  <XCircleIcon className="h-5 w-5 text-error" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
