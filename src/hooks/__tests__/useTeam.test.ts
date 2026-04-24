import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTeam, TeamMember, TeamProfile } from "@/hooks/useTeam";

describe("useTeam Hook", () => {
  const testTeamName = "test-team";

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should initialize with empty team", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    expect(result.current.team.name).toBe(testTeamName);
    expect(result.current.team.members).toHaveLength(0);
    expect(result.current.stats.memberCount).toBe(0);
  });

  it("should create a team", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.createTeam("Test Team", "A test team");
    });

    expect(result.current.team.displayName).toBe("Test Team");
    expect(result.current.team.description).toBe("A test team");
    expect(result.current.team.name).toBe(testTeamName);
  });

  it("should add a team member", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.addMember({
        name: "Alice",
        email: "alice@example.com",
        split: 50,
      });
    });

    expect(result.current.team.members).toHaveLength(1);
    expect(result.current.team.members[0].name).toBe("Alice");
    expect(result.current.team.members[0].email).toBe("alice@example.com");
    expect(result.current.team.members[0].split).toBe(50);
    expect(result.current.stats.memberCount).toBe(1);
  });

  it("should remove a team member", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    let memberId: string;

    act(() => {
      result.current.addMember({ name: "Bob", email: "bob@example.com", split: 50 });
      memberId = result.current.team.members[0].id;
    });

    expect(result.current.team.members).toHaveLength(1);

    act(() => {
      result.current.removeMember(memberId!);
    });

    expect(result.current.team.members).toHaveLength(0);
  });

  it("should update member split", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    let memberId: string;

    act(() => {
      result.current.addMember({ name: "Charlie", email: "charlie@example.com", split: 50 });
      memberId = result.current.team.members[0].id;
    });

    act(() => {
      result.current.updateSplit(memberId!, 75);
    });

    expect(result.current.team.members[0].split).toBe(75);
  });

  it("should clamp split values between 0 and 100", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    let memberId: string;

    act(() => {
      result.current.addMember({ name: "Dave", email: "dave@example.com", split: 50 });
      memberId = result.current.team.members[0].id;
    });

    act(() => {
      result.current.updateSplit(memberId!, 150);
    });

    expect(result.current.team.members[0].split).toBe(100);

    act(() => {
      result.current.updateSplit(memberId!, -50);
    });

    expect(result.current.team.members[0].split).toBe(0);
  });

  it("should calculate correct total split", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.addMember({ name: "Eve", split: 30 });
      result.current.addMember({ name: "Frank", split: 40 });
      result.current.addMember({ name: "Grace", split: 30 });
    });

    expect(result.current.totalSplit).toBe(100);
    expect(result.current.stats.isBalanced).toBe(true);
  });

  it("should detect unbalanced split", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.addMember({ name: "Henry", split: 50 });
      result.current.addMember({ name: "Ivy", split: 30 });
    });

    expect(result.current.totalSplit).toBe(80);
    expect(result.current.stats.isBalanced).toBe(false);
    expect(result.current.splitStatus).toBe("unbalanced");
  });

  it("should invite a member", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.inviteMember("jack@example.com");
    });

    expect(result.current.pendingInvitations).toHaveLength(1);
    expect(result.current.pendingInvitations[0].email).toBe("jack@example.com");
    expect(result.current.pendingInvitations[0].status).toBe("pending");
  });

  it("should cancel an invitation", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    let invitationId: string;

    act(() => {
      result.current.inviteMember("kate@example.com");
      invitationId = result.current.team.invitations[0].id;
    });

    expect(result.current.pendingInvitations).toHaveLength(1);

    act(() => {
      result.current.cancelInvitation(invitationId!);
    });

    expect(result.current.pendingInvitations).toHaveLength(0);
  });

  it("should calculate average split correctly", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.addMember({ name: "Leo", split: 40 });
      result.current.addMember({ name: "Mia", split: 40 });
      result.current.addMember({ name: "Noah", split: 20 });
    });

    expect(result.current.stats.averageSplit).toBe(100 / 3);
  });

  it("should mark inactive members correctly", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    let memberId: string;

    act(() => {
      result.current.addMember({ name: "Olivia", split: 50 });
      result.current.addMember({ name: "Paul", split: 50 });
      memberId = result.current.team.members[0].id;
    });

    expect(result.current.stats.activeMemberCount).toBe(2);

    act(() => {
      result.current.removeSplit(memberId!);
    });

    expect(result.current.stats.activeMemberCount).toBe(1);
    expect(result.current.team.members[0].isActive).toBe(false);
  });

  it("should persist data to localStorage", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.createTeam("Persistent Team");
      result.current.addMember({ name: "Quinn", split: 100 });
    });

    const stored = localStorage.getItem("stellar_tipjar_team_profiles");
    expect(stored).toBeTruthy();

    const parsed = JSON.parse(stored!);
    expect(parsed[testTeamName]).toBeDefined();
    expect(parsed[testTeamName].members).toHaveLength(1);
  });

  it("should load data from localStorage", () => {
    // First hook instance stores data
    const { result: result1 } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result1.current.createTeam("Loaded Team");
      result1.current.addMember({ name: "Rachel", split: 100 });
    });

    // Second hook instance loads data
    const { result: result2 } = renderHook(() => useTeam(testTeamName));

    expect(result2.current.team.displayName).toBe("Loaded Team");
    expect(result2.current.team.members).toHaveLength(1);
    expect(result2.current.team.members[0].name).toBe("Rachel");
  });

  it("should update team metadata", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.createTeam("Original Name", "Original Description");
      result.current.updateMember("any-id", { name: "Updated" });
    });

    expect(result.current.team.displayName).toBe("Original Name");
  });

  it("should handle multiple invitations to the same email", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.inviteMember("same@example.com");
      result.current.inviteMember("same@example.com");
    });

    // Should replace the previous invitation
    expect(result.current.pendingInvitations).toHaveLength(1);
  });

  it("should calculate stats correctly with no active members", () => {
    const { result } = renderHook(() => useTeam(testTeamName));

    act(() => {
      result.current.addMember({ name: "Sam", split: 50 });
      result.current.removeSplit(result.current.team.members[0].id);
    });

    expect(result.current.stats.activeMemberCount).toBe(0);
    expect(result.current.stats.averageSplit).toBe(0);
    expect(result.current.stats.isBalanced).toBe(false);
  });
});
