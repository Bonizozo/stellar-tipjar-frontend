/**
 * playlistService.ts
 *
 * Service for managing collaborative playlists.
 * Supports playlist CRUD, collaborative editing, sharing, and playlist tips.
 */

import type { Playlist, PlaylistItem, PlaylistCollaborator } from "@/types/playlist";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class PlaylistService {
  /**
   * Fetch all playlists for the current user
   */
  static async getUserPlaylists(): Promise<Playlist[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlists`);
      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.statusText}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.playlists ?? [];
    } catch (error) {
      console.error("Error fetching playlists:", error);
      return [];
    }
  }

  /**
   * Fetch a single playlist by ID
   */
  static async getPlaylist(playlistId: string): Promise<Playlist | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}`);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Failed to fetch playlist: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching playlist:", error);
      return null;
    }
  }

  /**
   * Create a new playlist
   */
  static async createPlaylist(data: {
    name: string;
    description?: string;
    isPublic?: boolean;
  }): Promise<Playlist | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to create playlist: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error creating playlist:", error);
      return null;
    }
  }

  /**
   * Update playlist metadata
   */
  static async updatePlaylist(
    playlistId: string,
    updates: Partial<{ name: string; description: string; isPublic: boolean }>
  ): Promise<Playlist | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error(`Failed to update playlist: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error updating playlist:", error);
      return null;
    }
  }

  /**
   * Delete a playlist
   */
  static async deletePlaylist(playlistId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Error deleting playlist:", error);
      return false;
    }
  }

  /**
   * Add an item (creator/content) to a playlist
   */
  static async addItem(playlistId: string, item: Omit<PlaylistItem, "id" | "addedAt">): Promise<PlaylistItem | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );
      if (!response.ok) throw new Error(`Failed to add item: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error adding playlist item:", error);
      return null;
    }
  }

  /**
   * Remove an item from a playlist
   */
  static async removeItem(playlistId: string, itemId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/items/${encodeURIComponent(itemId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error removing playlist item:", error);
      return false;
    }
  }

  /**
   * Reorder items in a playlist
   */
  static async reorderItems(playlistId: string, itemIds: string[]): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/reorder`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemIds }),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error reordering playlist items:", error);
      return false;
    }
  }

  /**
   * Add a collaborator to a playlist
   */
  static async addCollaborator(
    playlistId: string,
    collaborator: Omit<PlaylistCollaborator, "id" | "joinedAt">
  ): Promise<PlaylistCollaborator | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/collaborators`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(collaborator),
        }
      );
      if (!response.ok) throw new Error(`Failed to add collaborator: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error adding collaborator:", error);
      return null;
    }
  }

  /**
   * Remove a collaborator from a playlist
   */
  static async removeCollaborator(playlistId: string, collaboratorId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/collaborators/${encodeURIComponent(collaboratorId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error removing collaborator:", error);
      return false;
    }
  }

  /**
   * Update collaborator permissions
   */
  static async updateCollaboratorPermissions(
    playlistId: string,
    collaboratorId: string,
    permissions: Partial<Pick<PlaylistCollaborator, "canEdit" | "canInvite">>
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/collaborators/${encodeURIComponent(collaboratorId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(permissions),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error updating collaborator permissions:", error);
      return false;
    }
  }

  /**
   * Share a playlist (generate share link)
   */
  static async sharePlaylist(playlistId: string): Promise<string | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/share`,
        { method: "POST" }
      );
      if (!response.ok) throw new Error(`Failed to share playlist: ${response.statusText}`);
      const data = await response.json();
      return data.shareUrl ?? null;
    } catch (error) {
      console.error("Error sharing playlist:", error);
      return null;
    }
  }

  /**
   * Send a tip to a playlist
   */
  static async tipPlaylist(playlistId: string, amount: string, asset: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/playlists/${encodeURIComponent(playlistId)}/tips`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, asset }),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error tipping playlist:", error);
      return false;
    }
  }

  /**
   * Discover public playlists
   */
  static async discoverPlaylists(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ playlists: Playlist[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.set("category", params.category);
      if (params?.search) query.set("search", params.search);
      if (params?.page) query.set("page", String(params.page));
      if (params?.limit) query.set("limit", String(params.limit));

      const response = await fetch(`${API_BASE_URL}/api/playlists/discover?${query.toString()}`);
      if (!response.ok) throw new Error(`Failed to discover playlists: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error discovering playlists:", error);
      return { playlists: [], total: 0 };
    }
  }
}
