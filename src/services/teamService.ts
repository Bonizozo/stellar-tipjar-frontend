import {
  teamProfileSchema,
  teamMemberSchema,
  createTeamSchema,
  addMemberSchema,
  updateSplitSchema,
  inviteMemberSchema,
  type TeamProfileInput,
  type TeamStatistics,
} from "@/schemas/teamSchema";
import { TeamProfile, TeamMember } from "@/hooks/useTeam";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Team service for communicating with the backend API
 * Handles team profile operations, member management, and revenue splits
 */

export class TeamService {
  /**
   * Get a team profile by name
   */
  static async getTeamProfile(teamName: string): Promise<TeamProfile | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}`);

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch team: ${response.statusText}`);
      }

      const data = await response.json();
      return teamProfileSchema.parse(data);
    } catch (error) {
      console.error("Error fetching team profile:", error);
      throw error;
    }
  }

  /**
   * Create a new team
   */
  static async createTeam(data: TeamProfileInput): Promise<TeamProfile> {
    try {
      const validated = createTeamSchema.parse(data);

      const response = await fetch(`${API_BASE_URL}/api/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to create team: ${response.statusText}`);
      }

      const result = await response.json();
      return teamProfileSchema.parse(result);
    } catch (error) {
      console.error("Error creating team:", error);
      throw error;
    }
  }

  /**
   * Update team profile metadata
   */
  static async updateTeamProfile(
    teamName: string,
    updates: Partial<TeamProfileInput>
  ): Promise<TeamProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update team: ${response.statusText}`);
      }

      const result = await response.json();
      return teamProfileSchema.parse(result);
    } catch (error) {
      console.error("Error updating team profile:", error);
      throw error;
    }
  }

  /**
   * Add a member to a team
   */
  static async addTeamMember(
    teamName: string,
    member: TeamMember | Omit<TeamMember, "id" | "createdAt">
  ): Promise<TeamMember> {
    try {
      const validated = teamMemberSchema.omit({ id: true, createdAt: true }).parse(member);

      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        throw new Error(`Failed to add member: ${response.statusText}`);
      }

      const result = await response.json();
      return teamMemberSchema.parse(result);
    } catch (error) {
      console.error("Error adding team member:", error);
      throw error;
    }
  }

  /**
   * Remove a member from a team
   */
  static async removeTeamMember(teamName: string, memberId: string): Promise<void> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}/members/${encodeURIComponent(memberId)}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Failed to remove member: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error removing team member:", error);
      throw error;
    }
  }

  /**
   * Update a member's revenue split
   */
  static async updateMemberSplit(
    teamName: string,
    memberId: string,
    split: number
  ): Promise<TeamMember> {
    try {
      const validated = updateSplitSchema.parse({ memberId, split });

      const response = await fetch(
        `${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}/members/${encodeURIComponent(memberId)}/split`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ split: validated.split }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update split: ${response.statusText}`);
      }

      const result = await response.json();
      return teamMemberSchema.parse(result);
    } catch (error) {
      console.error("Error updating member split:", error);
      throw error;
    }
  }

  /**
   * Invite a member to a team
   */
  static async inviteMember(teamName: string, email: string, message?: string): Promise<void> {
    try {
      const validated = inviteMemberSchema.parse({ email, message });

      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}/invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!response.ok) {
        throw new Error(`Failed to send invitation: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error inviting member:", error);
      throw error;
    }
  }

  /**
   * Get team statistics
   */
  static async getTeamStatistics(teamName: string): Promise<TeamStatistics> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}/statistics`);

      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        memberCount: result.memberCount || 0,
        activeMemberCount: result.activeMemberCount || 0,
        totalSplit: result.totalSplit || 0,
        isBalanced: result.isBalanced || false,
        averageSplit: result.averageSplit || 0,
        totalTipsReceived: result.totalTipsReceived || 0,
      };
    } catch (error) {
      console.error("Error fetching team statistics:", error);
      // Return default stats on error
      return {
        memberCount: 0,
        activeMemberCount: 0,
        totalSplit: 0,
        isBalanced: false,
        averageSplit: 0,
        totalTipsReceived: 0,
      };
    }
  }

  /**
   * Check if a team name is available
   */
  static async checkTeamNameAvailability(teamName: string): Promise<boolean> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/teams/check-availability?name=${encodeURIComponent(teamName)}`
      );

      if (!response.ok) {
        // Assume not available if we get an error
        return false;
      }

      const result = await response.json();
      return result.available === true;
    } catch (error) {
      console.error("Error checking team name availability:", error);
      return false;
    }
  }

  /**
   * List all teams for the current user
   */
  static async listUserTeams(): Promise<TeamProfile[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/teams`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user teams: ${response.statusText}`);
      }

      const result = await response.json();
      return (Array.isArray(result) ? result : result.teams || []).map((team: any) =>
        teamProfileSchema.parse(team)
      );
    } catch (error) {
      console.error("Error listing user teams:", error);
      return [];
    }
  }

  /**
   * Delete a team (admin only)
   */
  static async deleteTeam(teamName: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/teams/${encodeURIComponent(teamName)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete team: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      throw error;
    }
  }
}
