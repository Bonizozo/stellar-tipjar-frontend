export type CollaborationStatus = "pending" | "active" | "declined" | "ended";

export interface Collaborator {
  username: string;
  displayName: string;
  avatarUrl?: string;
  splitPercentage: number;
  role: "owner" | "co-creator";
  joinedAt: string;
}

export interface Collaboration {
  id: string;
  title: string;
  description?: string;
  status: CollaborationStatus;
  collaborators: Collaborator[];
  totalTipsReceived: string;
  createdAt: string;
  updatedAt: string;
}

export interface CollaborationInvite {
  id: string;
  collaborationId: string;
  invitedUsername: string;
  inviterUsername: string;
  splitPercentage: number;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  expiresAt: string;
}
