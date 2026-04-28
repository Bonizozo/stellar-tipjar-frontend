"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, GitMerge, History } from "lucide-react";
import { useCollaboration } from "@/hooks/useCollaboration";
import { CollaborationCard } from "./CollaborationCard";
import { CollaborationInviteModal } from "./CollaborationInviteModal";
import { Button } from "@/components/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CollaborationPanelProps {
  username: string;
}

export function CollaborationPanel({ username }: CollaborationPanelProps) {
  const {
    collaborations,
    pendingInvites,
    loading,
    fetchCollaborations,
    createCollaboration,
    inviteCollaborator,
    respondToInvite,
    updateSplit,
  } = useCollaboration(username);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    fetchCollaborations();
  }, [fetchCollaborations]);

  async function handleCreate() {
    if (!newTitle.trim()) return;
    setCreating(true);
    await createCollaboration({ title: newTitle, description: newDesc || undefined });
    setNewTitle("");
    setNewDesc("");
    setShowCreate(false);
    setCreating(false);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink dark:text-white flex items-center gap-2">
          <Users size={20} className="text-wave" />
          Collaborations
        </h2>
        <Button size="sm" variant="outline" icon={<Plus size={14} />} onClick={() => setShowCreate(true)}>
          New
        </Button>
      </div>

      {/* Pending invites */}
      {pendingInvites.length > 0 && (
        <div className="rounded-2xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-4">
          <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center gap-2">
            <GitMerge size={14} />
            Pending Invites ({pendingInvites.length})
          </h3>
          <div className="space-y-2">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-xl p-3">
                <div>
                  <p className="text-sm font-medium text-ink dark:text-white">
                    From @{invite.inviterUsername}
                  </p>
                  <p className="text-xs text-ink/50 dark:text-white/50">
                    {invite.splitPercentage}% split offered
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="xs" variant="danger" onClick={() => respondToInvite(invite.id, false)}>
                    Decline
                  </Button>
                  <Button size="xs" variant="primary" onClick={() => respondToInvite(invite.id, true)}>
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create form */}
      {showCreate && (
        <motion.div
          className="rounded-2xl border border-ink/10 dark:border-white/10 bg-[color:var(--surface)] p-4"
          initial={reduced ? {} : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-sm font-semibold text-ink dark:text-white mb-3">New Collaboration</h3>
          <div className="space-y-2 mb-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Collaboration title"
              className="w-full px-3 py-2 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave"
              aria-label="Collaboration title"
            />
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Description (optional)"
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-ink/10 dark:border-white/10 bg-transparent text-sm text-ink dark:text-white outline-none focus:ring-2 focus:ring-wave resize-none"
              aria-label="Collaboration description"
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setShowCreate(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleCreate}
              loading={creating}
              disabled={!newTitle.trim() || creating}
              className="flex-1"
            >
              Create
            </Button>
          </div>
        </motion.div>
      )}

      {/* Collaborations list */}
      {loading ? (
        <div className="space-y-3 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : collaborations.length === 0 ? (
        <div className="text-center py-10 text-ink/50 dark:text-white/50">
          <Users size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No collaborations yet</p>
          <p className="text-xs mt-1">Create one to start splitting tips with co-creators</p>
        </div>
      ) : (
        <div className="space-y-3">
          {collaborations.map((collab) => (
            <CollaborationCard
              key={collab.id}
              collaboration={collab}
              currentUsername={username}
              onInvite={inviteCollaborator}
              onUpdateSplit={updateSplit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
