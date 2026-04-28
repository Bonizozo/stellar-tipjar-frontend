"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TeamMember,
  TeamRole,
  TEAM_ROLE_LABELS,
  TEAM_ROLE_DESCRIPTIONS,
  TEAM_ROLE_PERMISSIONS,
} from "@/hooks/useTeam";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
  ShieldCheckIcon,
  UserIcon,
  EyeIcon,
  StarIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const ROLE_ICONS: Record<TeamRole, React.ReactNode> = {
  owner: <StarIcon className="h-4 w-4" />,
  admin: <ShieldCheckIcon className="h-4 w-4" />,
  member: <UserIcon className="h-4 w-4" />,
  viewer: <EyeIcon className="h-4 w-4" />,
};

const ROLE_COLORS: Record<
  TeamRole,
  "primary" | "info" | "success" | "neutral"
> = {
  owner: "primary",
  admin: "info",
  member: "success",
  viewer: "neutral",
};

const PERMISSION_LABELS: Record<string, string> = {
  manage_members: "Manage members",
  configure_splits: "Configure splits",
  view_earnings: "View earnings",
  delete_team: "Delete team",
  invite_members: "Invite members",
};

interface RolePickerProps {
  memberId: string;
  currentRole: TeamRole;
  onChangeRole: (memberId: string, role: TeamRole) => void;
  disabled?: boolean;
}

function RolePicker({
  memberId,
  currentRole,
  onChangeRole,
  disabled,
}: RolePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className="flex items-center gap-1.5 rounded-lg border border-ink/20 px-3 py-1.5 text-sm transition hover:border-wave/40 disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-ink/60">{ROLE_ICONS[currentRole]}</span>
        <span className="font-medium text-ink">
          {TEAM_ROLE_LABELS[currentRole]}
        </span>
        <ChevronDownIcon className="h-3.5 w-3.5 text-ink/50" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            role="listbox"
            aria-label="Select role"
            className="absolute left-0 top-full z-20 mt-1 w-52 overflow-hidden rounded-xl border border-ink/10 bg-[color:var(--surface)] shadow-xl"
          >
            {(Object.keys(TEAM_ROLE_LABELS) as TeamRole[]).map((role) => (
              <li key={role}>
                <button
                  role="option"
                  aria-selected={role === currentRole}
                  onClick={() => {
                    onChangeRole(memberId, role);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-ink/5"
                >
                  <span className="text-ink/60">{ROLE_ICONS[role]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">
                      {TEAM_ROLE_LABELS[role]}
                    </p>
                    <p className="text-xs text-ink/50">
                      {TEAM_ROLE_DESCRIPTIONS[role]}
                    </p>
                  </div>
                  {role === currentRole && (
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-wave" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </div>
  );
}

interface TeamRoleManagerProps {
  members: TeamMember[];
  onUpdateRole: (memberId: string, role: TeamRole) => void;
  isLoading?: boolean;
  className?: string;
}

export function TeamRoleManager({
  members,
  onUpdateRole,
  isLoading = false,
  className = "",
}: TeamRoleManagerProps) {
  const [showPermissions, setShowPermissions] = useState(false);
  const activeMembers = members.filter((m) => m.isActive);

  return (
    <div
      className={`rounded-3xl border border-ink/10 bg-[color:var(--surface)] p-6 ${className}`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-ink">Role Management</h3>
          <p className="mt-0.5 text-sm text-ink/60">
            Assign roles to control member permissions
          </p>
        </div>
        <button
          onClick={() => setShowPermissions((v) => !v)}
          className="text-xs font-medium text-wave hover:underline"
        >
          {showPermissions ? "Hide" : "View"} permissions
        </button>
      </div>

      {/* Permissions reference */}
      {showPermissions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 overflow-hidden rounded-xl border border-ink/10 bg-ink/5 p-4"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/60">
            Permissions by Role
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {(Object.keys(TEAM_ROLE_LABELS) as TeamRole[]).map((role) => (
              <div key={role} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-ink/60">{ROLE_ICONS[role]}</span>
                  <Badge color={ROLE_COLORS[role]} size="sm" style="soft">
                    {TEAM_ROLE_LABELS[role]}
                  </Badge>
                </div>
                <ul className="space-y-0.5 pl-5">
                  {TEAM_ROLE_PERMISSIONS[role].length === 0 ? (
                    <li className="text-xs text-ink/40">Read-only access</li>
                  ) : (
                    TEAM_ROLE_PERMISSIONS[role].map((perm) => (
                      <li
                        key={perm}
                        className="flex items-center gap-1 text-xs text-ink/60"
                      >
                        <CheckIcon className="h-3 w-3 text-moss" />
                        {PERMISSION_LABELS[perm] ?? perm}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Member role list */}
      {activeMembers.length === 0 ? (
        <p className="py-4 text-center text-sm text-ink/50">
          Add team members to manage their roles.
        </p>
      ) : (
        <div className="space-y-2">
          {activeMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between rounded-xl border border-ink/10 p-3 transition hover:border-wave/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-wave/20 to-sunrise/20 text-sm font-bold text-wave">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{member.name}</p>
                  {member.email && (
                    <p className="text-xs text-ink/50">{member.email}</p>
                  )}
                </div>
              </div>

              <RolePicker
                memberId={member.id}
                currentRole={member.role}
                onChangeRole={onUpdateRole}
                disabled={isLoading}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Role summary */}
      {activeMembers.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
          {(Object.keys(TEAM_ROLE_LABELS) as TeamRole[]).map((role) => {
            const count = activeMembers.filter((m) => m.role === role).length;
            if (count === 0) return null;
            return (
              <Badge
                key={role}
                color={ROLE_COLORS[role]}
                size="sm"
                style="soft"
              >
                {count} {TEAM_ROLE_LABELS[role]}
                {count !== 1 ? "s" : ""}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
