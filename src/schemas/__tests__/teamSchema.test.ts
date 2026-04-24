import { describe, it, expect } from "vitest";
import {
  teamNameSchema,
  teamMemberSchema,
  teamInvitationSchema,
  createTeamSchema,
  addMemberSchema,
  updateSplitSchema,
  inviteMemberSchema,
  revenueSplitValidationSchema,
  teamNameCheckSchema,
} from "@/schemas/teamSchema";
import { z } from "zod";

describe("Team Schema Validations", () => {
  describe("teamNameSchema", () => {
    it("validates valid team names", () => {
      expect(teamNameSchema.parse("my-team")).toBe("my-team");
      expect(teamNameSchema.parse("team_123")).toBe("team_123");
      expect(teamNameSchema.parse("TeamName")).toBe("TeamName");
    });

    it("rejects team names too short", () => {
      expect(() => teamNameSchema.parse("ab")).toThrow();
    });

    it("rejects team names with invalid characters", () => {
      expect(() => teamNameSchema.parse("team@name")).toThrow();
      expect(() => teamNameSchema.parse("team name")).toThrow();
    });

    it("rejects team names starting with invalid character", () => {
      expect(() => teamNameSchema.parse("-team")).toThrow();
      expect(() => teamNameSchema.parse("_team")).toThrow();
    });
  });

  describe("teamMemberSchema", () => {
    it("validates valid member", () => {
      const member = {
        name: "Alice",
        email: "alice@example.com",
        split: 50,
        isActive: true,
      };
      expect(teamMemberSchema.parse(member)).toEqual(member);
    });

    it("makes email optional", () => {
      const member = {
        name: "Alice",
        split: 50,
      };
      expect(teamMemberSchema.parse(member)).toMatchObject(member);
    });

    it("rejects invalid email", () => {
      expect(() =>
        teamMemberSchema.parse({
          name: "Alice",
          email: "not-an-email",
          split: 50,
        })
      ).toThrow();
    });

    it("rejects split outside 0-100 range", () => {
      expect(() =>
        teamMemberSchema.parse({
          name: "Alice",
          split: 150,
        })
      ).toThrow();

      expect(() =>
        teamMemberSchema.parse({
          name: "Alice",
          split: -10,
        })
      ).toThrow();
    });

    it("rejects non-integer split", () => {
      expect(() =>
        teamMemberSchema.parse({
          name: "Alice",
          split: 50.5,
        })
      ).toThrow();
    });
  });

  describe("teamInvitationSchema", () => {
    it("validates valid invitation", () => {
      const invitation = {
        email: "user@example.com",
        status: "pending" as const,
      };
      expect(teamInvitationSchema.parse(invitation)).toMatchObject(invitation);
    });

    it("defaults status to pending", () => {
      const invitation = {
        email: "user@example.com",
      };
      const result = teamInvitationSchema.parse(invitation);
      expect(result.status).toBe("pending");
    });

    it("rejects invalid status", () => {
      expect(() =>
        teamInvitationSchema.parse({
          email: "user@example.com",
          status: "invalid",
        })
      ).toThrow();
    });
  });

  describe("createTeamSchema", () => {
    it("validates valid team creation", () => {
      const team = {
        name: "my-team",
        displayName: "My Team",
        description: "A team description",
      };
      expect(createTeamSchema.parse(team)).toEqual(team);
    });

    it("requires team name", () => {
      expect(() =>
        createTeamSchema.parse({
          displayName: "My Team",
        })
      ).toThrow();
    });

    it("validates team name format for creation", () => {
      expect(() =>
        createTeamSchema.parse({
          name: "invalid@name",
        })
      ).toThrow();
    });
  });

  describe("addMemberSchema", () => {
    it("validates valid member addition", () => {
      const member = {
        name: "Alice",
        split: 50,
        email: "alice@example.com",
      };
      expect(addMemberSchema.parse(member)).toEqual(member);
    });

    it("email is optional", () => {
      const member = {
        name: "Alice",
        split: 50,
      };
      expect(addMemberSchema.parse(member)).toEqual(member);
    });

    it("requires name and split", () => {
      expect(() =>
        addMemberSchema.parse({
          email: "alice@example.com",
        })
      ).toThrow();
    });
  });

  describe("updateSplitSchema", () => {
    it("validates valid split update", () => {
      const update = {
        memberId: "123",
        split: 75,
      };
      expect(updateSplitSchema.parse(update)).toEqual(update);
    });

    it("requires both memberId and split", () => {
      expect(() =>
        updateSplitSchema.parse({
          memberId: "123",
        })
      ).toThrow();

      expect(() =>
        updateSplitSchema.parse({
          split: 75,
        })
      ).toThrow();
    });
  });

  describe("inviteMemberSchema", () => {
    it("validates valid invitation", () => {
      const invite = {
        email: "user@example.com",
        message: "Join our team!",
      };
      expect(inviteMemberSchema.parse(invite)).toEqual(invite);
    });

    it("message is optional", () => {
      const invite = {
        email: "user@example.com",
      };
      expect(inviteMemberSchema.parse(invite)).toEqual(invite);
    });

    it("requires valid email", () => {
      expect(() =>
        inviteMemberSchema.parse({
          email: "invalid",
        })
      ).toThrow();
    });

    it("enforces message length limit", () => {
      const longMessage = "a".repeat(501);
      expect(() =>
        inviteMemberSchema.parse({
          email: "user@example.com",
          message: longMessage,
        })
      ).toThrow();
    });
  });

  describe("revenueSplitValidationSchema", () => {
    it("accepts balanced splits totaling 100%", () => {
      const members = [
        {
          name: "Alice",
          split: 50,
          isActive: true,
        },
        {
          name: "Bob",
          split: 50,
          isActive: true,
        },
      ];
      expect(revenueSplitValidationSchema.parse(members)).toBeTruthy();
    });

    it("rejects unbalanced splits", () => {
      const members = [
        {
          name: "Alice",
          split: 50,
          isActive: true,
        },
        {
          name: "Bob",
          split: 40,
          isActive: true,
        },
      ];
      expect(() => revenueSplitValidationSchema.parse(members)).toThrow();
    });

    it("ignores inactive members in validation", () => {
      const members = [
        {
          name: "Alice",
          split: 100,
          isActive: true,
        },
        {
          name: "Bob",
          split: 50,
          isActive: false,
        },
      ];
      expect(revenueSplitValidationSchema.parse(members)).toBeTruthy();
    });

    it("allows empty array", () => {
      expect(revenueSplitValidationSchema.parse([])).toBeTruthy();
    });
  });

  describe("teamNameCheckSchema", () => {
    it("validates availability check response", () => {
      const response = {
        available: true,
        message: "Team name available",
      };
      expect(teamNameCheckSchema.parse(response)).toEqual(response);
    });

    it("message is optional", () => {
      const response = {
        available: false,
      };
      expect(teamNameCheckSchema.parse(response)).toEqual(response);
    });

    it("requires available boolean", () => {
      expect(() =>
        teamNameCheckSchema.parse({
          message: "Available",
        })
      ).toThrow();
    });
  });
});
