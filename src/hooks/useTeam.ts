"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createNamespacedStorage } from "@/lib/storage";
import { z } from "zod";

export type TeamRole = "owner" | "admin" | "member" | "viewer";

export const TEAM_ROLE_LABELS: Record<TeamRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
  viewer: "Viewer",
};

export const TEAM_ROLE_DESCRIPTIONS: Record<TeamRole, string> = {
  owner: "Full control over team settings and members",
  admin: "Can manage members and configure splits",
  member: "Receives tip splits, limited settings access",
  viewer: "Read-only access to team stats",
};

export const TEAM_ROLE_PERMISSIONS: Record<TeamRole, string[]> = {
  owner: [
    "manage_members",
    "configure_splits",
    "view_earnings",
    "delete_team",
    "invite_members",
  ],
  admin: [
    "manage_members",
    "configure_splits",
    "view_earnings",
    "invite_members",
  ],
  member: ["view_earnings"],
  viewer: [],
};

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  role: TeamRole;
  split: number;
  createdAt: string;
  isActive: boolean;
  earnings?: number;
  walletAddress?: string;
}

export interface TeamInvitation {
  id: string;
  email: string;
  sentAt: string;
  status: "pending" | "accepted" | "rejected";
  expiredAt?: string;
}

export interface TeamProfile {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  members: TeamMember[];
  invitations: TeamInvitation[];
  owner?: string;
  createdAt: string;
  updatedAt: string;
  totalTipsReceived?: number;
}

export interface TeamStatistics {
  memberCount: number;
  activeMemberCount: number;
  totalSplit: number;
  isBalanced: boolean;
  averageSplit: number;
  totalTipsReceived: number;
}

const storage = createNamespacedStorage("team");

const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  role: z.enum(["owner", "admin", "member", "viewer"]),
  split: z.number(),
  createdAt: z.string(),
  isActive: z.boolean(),
  earnings: z.number().optional(),
  walletAddress: z.string().optional(),
});

const teamInvitationSchema = z.object({
  id: z.string(),
  email: z.string(),
  sentAt: z.string(),
  status: z.enum(["pending", "accepted", "rejected"]),
  expiredAt: z.string().optional(),
});

const teamProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  displayName: z.string().optional(),
  description: z.string().optional(),
  members: z.array(teamMemberSchema),
  invitations: z.array(teamInvitationSchema),
  owner: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  totalTipsReceived: z.number().optional(),
});

const profilesRecordSchema = z.record(z.string(), teamProfileSchema);

const fmt = (date = new Date()) => new Date(date).toISOString();

export function useTeam(teamName: string) {
  const [profiles, setProfiles] = useState<Record<string, TeamProfile>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      const raw = storage.get<Record<string, TeamProfile>>("profiles", {
        schema: profilesRecordSchema,
        legacyKey: "stellar_tipjar_team_profiles",
      });
      setProfiles(raw ?? {});
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load team data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    storage.set("profiles", profiles);
  }, [profiles]);

  const team = profiles[teamName] ?? {
    id: `team_${teamName}_${Date.now()}`,
    name: teamName,
    displayName: teamName,
    description: "",
    members: [],
    invitations: [],
    createdAt: fmt(),
    updatedAt: fmt(),
    totalTipsReceived: 0,
  };

  const createTeam = useCallback(
    (displayName?: string, description?: string) => {
      if (profiles[teamName]) return;
      setProfiles((prev) => ({
        ...prev,
        [teamName]: {
          id: `team_${teamName}_${Date.now()}`,
          name: teamName,
          displayName: displayName || teamName,
          description: description || "",
          members: [],
          invitations: [],
          createdAt: fmt(),
          updatedAt: fmt(),
          totalTipsReceived: 0,
        },
      }));
    },
    [teamName, profiles],
  );

  const addMember = useCallback(
    (member: {
      name: string;
      email?: string;
      split: number;
      role?: TeamRole;
      walletAddress?: string;
    }) => {
      setProfiles((prev) => {
        const current = prev[teamName] ?? team;
        const newMember: TeamMember = {
          id: `member_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: member.name,
          email: member.email,
          split: member.split,
          role: member.role ?? "member",
          walletAddress: member.walletAddress,
          createdAt: fmt(),
          isActive: true,
          earnings: 0,
        };
        return {
          ...prev,
          [teamName]: {
            ...current,
            members: [...current.members, newMember],
            updatedAt: fmt(),
          },
        };
      });
    },
    [teamName, team],
  );

  const removeMember = useCallback(
    (memberId: string) => {
      setProfiles((prev) => {
        const current = prev[teamName];
        if (!current) return prev;
        return {
          ...prev,
          [teamName]: {
            ...current,
            members: current.members.filter((m) => m.id !== memberId),
            updatedAt: fmt(),
          },
        };
      });
    },
    [teamName],
  );

  const updateMember = useCallback(
    (memberId: string, updates: Partial<TeamMember>) => {
      setProfiles((prev) => {
        const current = prev[teamName];
        if (!current) return prev;
        const newMembers = current.members.map((m) =>
          m.id === memberId ? { ...m, ...updates } : m,
        );
        return {
          ...prev,
          [teamName]: { ...current, members: newMembers, updatedAt: fmt() },
        };
      });
    },
    [teamName],
  );

  const updateSplit = useCallback(
    (memberId: string, split: number) => {
      updateMember(memberId, { split: Math.max(0, Math.min(100, split)) });
    },
    [updateMember],
  );

  const updateRole = useCallback(
    (memberId: string, role: TeamRole) => {
      updateMember(memberId, { role });
    },
    [updateMember],
  );

  const removeSplit = useCallback(
    (memberId: string) => {
      updateMember(memberId, { isActive: false });
    },
    [updateMember],
  );

  const inviteMember = useCallback(
    (email: string) => {
      setProfiles((prev) => {
        const current = prev[teamName] ?? team;
        const newInvitation: TeamInvitation = {
          id: `invite_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          email,
          sentAt: fmt(),
          status: "pending",
          expiredAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        };
        return {
          ...prev,
          [teamName]: {
            ...current,
            invitations: [
              ...current.invitations.filter((inv) => inv.email !== email),
              newInvitation,
            ],
            updatedAt: fmt(),
          },
        };
      });
    },
    [teamName, team],
  );

  const cancelInvitation = useCallback(
    (invitationId: string) => {
      setProfiles((prev) => {
        const current = prev[teamName];
        if (!current) return prev;
        return {
          ...prev,
          [teamName]: {
            ...current,
            invitations: current.invitations.filter(
              (inv) => inv.id !== invitationId,
            ),
            updatedAt: fmt(),
          },
        };
      });
    },
    [teamName],
  );

  const stats = useMemo((): TeamStatistics => {
    const activeMembers = team.members.filter((m) => m.isActive);
    const totalSplit = activeMembers.reduce(
      (sum, member) => sum + member.split,
      0,
    );

    return {
      memberCount: team.members.length,
      activeMemberCount: activeMembers.length,
      totalSplit,
      isBalanced: totalSplit === 100 && activeMembers.length > 0,
      averageSplit:
        activeMembers.length > 0 ? totalSplit / activeMembers.length : 0,
      totalTipsReceived: team.totalTipsReceived || 0,
    };
  }, [team.members, team.totalTipsReceived]);

  const splitStatus = stats.isBalanced ? "balanced" : "unbalanced";
  const pendingInvitations = team.invitations.filter(
    (inv) => inv.status === "pending",
  );

  return {
    team,
    stats,
    isLoading,
    error,
    createTeam,
    addMember,
    removeMember,
    updateMember,
    updateSplit,
    updateRole,
    removeSplit,
    totalSplit: stats.totalSplit,
    splitStatus,
    inviteMember,
    cancelInvitation,
    pendingInvitations,
  };
}
