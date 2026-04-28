"use client";

import { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlaylistService } from "@/services/playlistService";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { ShareButton } from "@/components/ShareButton";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  ShareIcon,
  UsersIcon,
  MusicalNoteIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LockClosedIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import type { Playlist, PlaylistItem, PlaylistCollaborator } from "@/types/playlist";

interface CollaborativePlaylistProps {
  playlistId?: string;
  className?: string;
}

export function CollaborativePlaylist({ playlistId, className = "" }: CollaborativePlaylistProps) {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");
  const [expandedPlaylist, setExpandedPlaylist] = useState<string | null>(null);
  const [collaboratorEmail, setCollaboratorEmail] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Fetch playlists
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => (playlistId ? PlaylistService.getPlaylist(playlistId).then((p) => (p ? [p] : [])) : PlaylistService.getUserPlaylists()),
    staleTime: 30_000,
  });

  // Create playlist mutation
  const createMutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      PlaylistService.createPlaylist({ ...data, isPublic: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setIsCreating(false);
      setNewPlaylistName("");
      setNewPlaylistDesc("");
    },
  });

  // Delete playlist mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => PlaylistService.deletePlaylist(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["playlists"] }),
  });

  // Add collaborator mutation
  const addCollaboratorMutation = useMutation({
    mutationFn: ({ playlistId: pid, email }: { playlistId: string; email: string }) =>
      PlaylistService.addCollaborator(pid, {
        username: email,
        displayName: email,
        canEdit: true,
        canInvite: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      setCollaboratorEmail("");
    },
  });

  // Share playlist
  const handleShare = useCallback(async (pid: string) => {
    const url = await PlaylistService.sharePlaylist(pid);
    if (url) setShareUrl(url);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedPlaylist(expandedPlaylist === id ? null : id);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">Collaborative Playlists</h2>
          <p className="mt-0.5 text-sm text-ink/50">
            Curate content collections with your community
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-1.5"
        >
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          New Playlist
        </Button>
      </div>

      {/* Create playlist form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-[color:var(--surface)] p-4"
          >
            <div className="space-y-3">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Playlist name"
                className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                aria-label="Playlist name"
              />
              <textarea
                value={newPlaylistDesc}
                onChange={(e) => setNewPlaylistDesc(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
                className="w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                aria-label="Playlist description"
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => createMutation.mutate({ name: newPlaylistName, description: newPlaylistDesc })}
                  disabled={!newPlaylistName.trim() || createMutation.isPending}
                >
                  {createMutation.isPending ? "Creating..." : "Create"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Playlist list */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-ink/10 bg-ink/5" />
          ))}
        </div>
      )}

      {!isLoading && (!playlists || playlists.length === 0) && (
        <div className="rounded-2xl border border-dashed border-ink/20 p-8 text-center">
          <MusicalNoteIcon className="mx-auto h-10 w-10 text-ink/30" aria-hidden="true" />
          <p className="mt-3 text-sm font-medium text-ink/60">No playlists yet</p>
          <p className="mt-1 text-xs text-ink/40">
            Create your first collaborative playlist to start curating content with your community.
          </p>
        </div>
      )}

      {playlists?.map((playlist) => (
        <motion.div
          key={playlist.id}
          layout
          className="rounded-2xl border border-ink/10 bg-[color:var(--surface)] overflow-hidden"
        >
          {/* Playlist header */}
          <button
            type="button"
            onClick={() => toggleExpand(playlist.id)}
            className="flex w-full items-center justify-between p-4 text-left hover:bg-ink/5 transition-colors"
            aria-expanded={expandedPlaylist === playlist.id}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wave/10">
                <MusicalNoteIcon className="h-5 w-5 text-wave" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink truncate">{playlist.name}</p>
                  {playlist.isPublic ? (
                    <GlobeAltIcon className="h-3.5 w-3.5 text-moss shrink-0" title="Public" />
                  ) : (
                    <LockClosedIcon className="h-3.5 w-3.5 text-ink/40 shrink-0" title="Private" />
                  )}
                </div>
                <p className="text-xs text-ink/50">
                  {playlist.itemCount} items &middot; {playlist.collaboratorCount} collaborators
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {playlist.totalTips && Number(playlist.totalTips) > 0 && (
                <Badge variant="success" className="text-xs">
                  {playlist.totalTips} tipped
                </Badge>
              )}
              {expandedPlaylist === playlist.id ? (
                <ChevronUpIcon className="h-4 w-4 text-ink/40" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-ink/40" />
              )}
            </div>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {expandedPlaylist === playlist.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-ink/10"
              >
                <div className="p-4 space-y-4">
                  {/* Description */}
                  {playlist.description && (
                    <p className="text-sm text-ink/60">{playlist.description}</p>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShare(playlist.id)}
                      className="inline-flex items-center gap-1.5"
                    >
                      <ShareIcon className="h-4 w-4" aria-hidden="true" />
                      Share
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => deleteMutation.mutate(playlist.id)}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center gap-1.5 text-semantic-error hover:bg-semantic-error/10"
                    >
                      <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>

                  {/* Share URL */}
                  {shareUrl && (
                    <div className="rounded-lg bg-ink/5 p-3">
                      <p className="text-xs font-medium text-ink/60 mb-1">Share link:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink dark:bg-gray-900"
                          onClick={(e) => (e.target as HTMLInputElement).select()}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(shareUrl)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Collaborators section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <UsersIcon className="h-4 w-4 text-ink/50" aria-hidden="true" />
                      <h4 className="text-sm font-medium text-ink">Collaborators</h4>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={collaboratorEmail}
                        onChange={(e) => setCollaboratorEmail(e.target.value)}
                        placeholder="Add collaborator by username..."
                        className="flex-1 rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-sm text-ink focus:border-wave focus:outline-none focus:ring-2 focus:ring-wave/20 dark:bg-gray-900"
                        aria-label="Collaborator username"
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          addCollaboratorMutation.mutate({
                            playlistId: playlist.id,
                            email: collaboratorEmail,
                          })
                        }
                        disabled={!collaboratorEmail.trim() || addCollaboratorMutation.isPending}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Items list */}
                  {playlist.items && playlist.items.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-ink mb-2">Items ({playlist.items.length})</h4>
                      <div className="space-y-2">
                        {playlist.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 rounded-lg border border-ink/10 p-3"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                              <p className="text-xs text-ink/50">
                                by {item.creatorDisplayName} &middot; added by {item.addedBy}
                              </p>
                            </div>
                            <Badge variant="default" className="text-xs">
                              {item.contentType}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
