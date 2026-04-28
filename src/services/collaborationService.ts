/**
 * collaborationService.ts
 *
 * Service for creator collaboration tools including workspace management,
 * file sharing, task management, split configuration, and collaboration chat.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CollaborationWorkspace {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerUsername: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
  members?: WorkspaceMember[];
  tasks?: CollaborationTask[];
  files?: SharedFile[];
}

export interface WorkspaceMember {
  id: string;
  workspaceId: string;
  username: string;
  displayName: string;
  role: "owner" | "admin" | "editor" | "viewer";
  joinedAt: string;
}

export interface CollaborationTask {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SharedFile {
  id: string;
  workspaceId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface SplitConfiguration {
  workspaceId: string;
  members: SplitMember[];
  totalSplit: number;
  isBalanced: boolean;
}

export interface SplitMember {
  memberId: string;
  username: string;
  displayName: string;
  split: number;
}

export interface ChatMessage {
  id: string;
  workspaceId: string;
  senderUsername: string;
  senderDisplayName: string;
  content: string;
  messageType: "text" | "file" | "system";
  createdAt: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────

export class CollaborationService {
  // ── Workspace CRUD ───────────────────────────────────────────────────────

  static async getUserWorkspaces(): Promise<CollaborationWorkspace[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collaboration/workspaces`);
      if (!response.ok) throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.workspaces ?? [];
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return [];
    }
  }

  static async getWorkspace(workspaceId: string): Promise<CollaborationWorkspace | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}`
      );
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Failed to fetch workspace: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching workspace:", error);
      return null;
    }
  }

  static async createWorkspace(data: {
    name: string;
    description?: string;
  }): Promise<CollaborationWorkspace | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collaboration/workspaces`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to create workspace: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error creating workspace:", error);
      return null;
    }
  }

  static async updateWorkspace(
    workspaceId: string,
    updates: Partial<{ name: string; description: string }>
  ): Promise<CollaborationWorkspace | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );
      if (!response.ok) throw new Error(`Failed to update workspace: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error updating workspace:", error);
      return null;
    }
  }

  static async deleteWorkspace(workspaceId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error deleting workspace:", error);
      return false;
    }
  }

  // ── Members ──────────────────────────────────────────────────────────────

  static async addMember(
    workspaceId: string,
    member: { username: string; role: WorkspaceMember["role"] }
  ): Promise<WorkspaceMember | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/members`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(member),
        }
      );
      if (!response.ok) throw new Error(`Failed to add member: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error adding member:", error);
      return null;
    }
  }

  static async removeMember(workspaceId: string, memberId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/members/${encodeURIComponent(memberId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error removing member:", error);
      return false;
    }
  }

  static async updateMemberRole(
    workspaceId: string,
    memberId: string,
    role: WorkspaceMember["role"]
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/members/${encodeURIComponent(memberId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error updating member role:", error);
      return false;
    }
  }

  // ── Tasks ────────────────────────────────────────────────────────────────

  static async createTask(
    workspaceId: string,
    task: Omit<CollaborationTask, "id" | "workspaceId" | "createdAt" | "updatedAt">
  ): Promise<CollaborationTask | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/tasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        }
      );
      if (!response.ok) throw new Error(`Failed to create task: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      return null;
    }
  }

  static async updateTask(
    workspaceId: string,
    taskId: string,
    updates: Partial<Pick<CollaborationTask, "title" | "description" | "status" | "priority" | "assignedTo" | "dueDate">>
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/tasks/${encodeURIComponent(taskId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );
      return response.ok;
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  }

  static async deleteTask(workspaceId: string, taskId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/tasks/${encodeURIComponent(taskId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  }

  // ── File Sharing ─────────────────────────────────────────────────────────

  static async uploadFile(
    workspaceId: string,
    file: File
  ): Promise<SharedFile | null> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/files`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error(`Failed to upload file: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }

  static async deleteFile(workspaceId: string, fileId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/files/${encodeURIComponent(fileId)}`,
        { method: "DELETE" }
      );
      return response.ok;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  // ── Split Configuration ──────────────────────────────────────────────────

  static async getSplitConfiguration(workspaceId: string): Promise<SplitConfiguration | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/split`
      );
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Failed to fetch split config: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching split config:", error);
      return null;
    }
  }

  static async updateSplitConfiguration(
    workspaceId: string,
    members: SplitMember[]
  ): Promise<SplitConfiguration | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/split`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ members }),
        }
      );
      if (!response.ok) throw new Error(`Failed to update split config: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error updating split config:", error);
      return null;
    }
  }

  // ── Chat ──────────────────────────────────────────────────────────────────

  static async getMessages(
    workspaceId: string,
    params?: { limit?: number; before?: string }
  ): Promise<ChatMessage[]> {
    try {
      const query = new URLSearchParams();
      if (params?.limit) query.set("limit", String(params.limit));
      if (params?.before) query.set("before", params.before);

      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/chat?${query.toString()}`
      );
      if (!response.ok) throw new Error(`Failed to fetch messages: ${response.statusText}`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.messages ?? [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  }

  static async sendMessage(
    workspaceId: string,
    content: string
  ): Promise<ChatMessage | null> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/collaboration/workspaces/${encodeURIComponent(workspaceId)}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      );
      if (!response.ok) throw new Error(`Failed to send message: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  }
}
