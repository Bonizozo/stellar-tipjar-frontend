import { describe, it, expect, vi, beforeEach } from "vitest";
import { TeamService } from "../teamService";

describe("TeamService Member Validation & Typing (#589)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("validates and sends valid member payload in addTeamMember", async () => {
    const mockMember = {
      id: "m-123",
      name: "Bob Builder",
      email: "bob@example.com",
      role: "member" as const,
      split: 30,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockMember,
    } as Response);

    const result = await TeamService.addTeamMember("alpha-team", {
      name: "Bob Builder",
      email: "bob@example.com",
      split: 30,
    });

    expect(result.name).toBe("Bob Builder");
    expect(result.split).toBe(30);
    expect(global.fetch).toHaveBeenCalled();
  });

  it("rejects invalid member payload before network dispatch", async () => {
    global.fetch = vi.fn();

    await expect(
      TeamService.addTeamMember("alpha-team", {
        name: "",
        split: 150,
      } as any),
    ).rejects.toThrow();

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
