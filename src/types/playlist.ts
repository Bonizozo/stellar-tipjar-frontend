/**
 * playlist.ts
 *
 * Type definitions for collaborative playlists.
 */

export interface Playlist {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerUsername: string;
  isPublic: boolean;
  itemCount: number;
  collaboratorCount: number;
  totalTips: string;
  createdAt: string;
  updatedAt: string;
  items?: PlaylistItem[];
  collaborators?: PlaylistCollaborator[];
}

export interface PlaylistItem {
  id: string;
  playlistId: string;
  creatorUsername: string;
  creatorDisplayName: string;
  creatorAvatar?: string;
  contentType: "creator" | "video" | "stream" | "collection";
  contentId: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  addedBy: string;
  addedAt: string;
  order: number;
}

export interface PlaylistCollaborator {
  id: string;
  playlistId: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  canEdit: boolean;
  canInvite: boolean;
  joinedAt: string;
}
