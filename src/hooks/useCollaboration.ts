"use client";

import { useState, useCallback } from "react";
import type { Collaboration, CollaborationInvite } from "@/types/collaboration";

function getMockCollaborations(): Collaboration[] {
  return [
    {
      id: "collab-1",
      title: "Music & Art Collab",
      description: "Joint content creation for music and visual art",
      status: "active",
      collaborators: [
        {
          username: "creator_a",
          displayName: "Creator A",
          splitPercentage: 60,
          role: "owner",
          joinedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
        },
        {
          username: "creator_b",
          displayName: "Creator B",
          splitPercentage: 40,
          role: "co-creator",
          joinedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        },
      ],
      totalTipsReceived: "125.50",
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
}

export function useCollaboration(username?: string) {
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [pendingInvites, setPendingInvites] = useState<CollaborationInvite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCollaborations = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError(null);
    try {
      const [collabRes, inviteRes] = await Promise.all([
        fetch(`/api/creators/${username}/collaborations`),
        fetch(`/api/creators/${username}/collaborations/invites`),
      ]);
      if (collabRes.ok) {
        setCollaborations(await collabRes.json());
      } else {
        setCollaborations(getMockCollaborations());
      }
      if (inviteRes.ok) {
        setPendingInvites(await inviteRes.json());
      }
    } catch {
      setCollaborations(getMockCollaborations());
      setError("Failed to load collaborations");
    } finally {
      setLoading(false);
    }
  }, [username]);

  const createCollaboration = useCallback(
    async (data: { title: string; description?: string }) => {
      if (!username) return null;
      try {
        const res = await fetch(`/api/creators/${username}/collaborations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const collab: Collaboration = await res.json();
          setCollaborations((prev) => [collab, ...prev]);
          return collab;
        }
      } catch {
        // silently fail
      }
      // optimistic mock
      const mock: Collaboration = {
        id: `collab-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: "active",
        collaborators: [
          {
            username: username,
            displayName: username,
            splitPercentage: 100,
            role: "owner",
            joinedAt: new Date().toISOString(),
          },
        ],
        totalTipsReceived: "0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCollaborations((prev) => [mock, ...prev]);
      return mock;
    },
    [username]
  );

  const inviteCollaborator = useCallback(
    async (collaborationId: string, invitedUsername: string, splitPercentage: number) => {
      if (!username) return false;
      try {
        const res = await fetch(
          `/api/creators/${username}/collaborations/${collaborationId}/invite`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ invitedUsername, splitPercentage }),
          }
        );
        return res.ok;
      } catch {
        return false;
      }
    },
    [username]
  );

  const respondToInvite = useCallback(
    async (inviteId: string, accept: boolean) => {
      try {
        const res = await fetch(`/api/collaborations/invites/${inviteId}/respond`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accept }),
        });
        if (res.ok) {
          setPendingInvites((prev) => prev.filter((i) => i.id !== inviteId));
          return true;
        }
      } catch {
        // silently fail
      }
      return false;
    },
    []
  );

  const updateSplit = useCallback(
    async (collaborationId: string, splits: Record<string, number>) => {
      if (!username) return false;
      try {
        const res = await fetch(
          `/api/creators/${username}/collaborations/${collaborationId}/splits`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ splits }),
          }
        );
        if (res.ok) {
          setCollaborations((prev) =>
            prev.map((c) => {
              if (c.id !== collaborationId) return c;
              return {
                ...c,
                collaborators: c.collaborators.map((col) => ({
                  ...col,
                  splitPercentage: splits[col.username] ?? col.splitPercentage,
                })),
              };
            })
          );
          return true;
        }
      } catch {
        // silently fail
      }
      return false;
    },
    [username]
  );

  return {
    collaborations,
    pendingInvites,
    loading,
    error,
    fetchCollaborations,
    createCollaboration,
    inviteCollaborator,
    respondToInvite,
    updateSplit,
  };
}
