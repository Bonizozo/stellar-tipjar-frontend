import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { executeAction, runSync, MAX_ATTEMPTS } from "../syncWorker";
import * as offlineStorage from "@/utils/offlineStorage";

describe("syncWorker", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("executeAction", () => {
    it("executes TIP_INTENT action successfully", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

      const action: offlineStorage.QueuedAction = {
        id: "act-1",
        type: "TIP_INTENT",
        payload: { creatorId: "alice", amount: "10" },
        createdAt: Date.now(),
        attempts: 0,
        status: "pending",
      };

      await expect(executeAction(action, "https://api.example.com")).resolves.toBeUndefined();
      expect(mockFetch).toHaveBeenCalledWith("https://api.example.com/tips/intents", expect.objectContaining({
        method: "POST",
      }));
    });

    it("throws when HTTP response is not ok", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

      const action: offlineStorage.QueuedAction = {
        id: "act-2",
        type: "POST_COMMENT",
        payload: { creatorUsername: "alice", body: "Great stream!" },
        createdAt: Date.now(),
        attempts: 0,
        status: "pending",
      };

      await expect(executeAction(action, "https://api.example.com")).rejects.toThrowError("HTTP 500");
    });
  });

  describe("runSync", () => {
    it("syncs all pending actions and emits completion events", async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const action: offlineStorage.QueuedAction = {
        id: "act-1",
        type: "TIP_INTENT",
        payload: { creatorId: "alice" },
        createdAt: Date.now(),
        attempts: 0,
        status: "pending",
      };

      vi.spyOn(offlineStorage, "getPendingActions").mockResolvedValue([action]);
      vi.spyOn(offlineStorage, "updateAction").mockResolvedValue();
      vi.spyOn(offlineStorage, "removeAction").mockResolvedValue();

      const messages: any[] = [];
      const result = await runSync("https://api.example.com", undefined, (msg) => messages.push(msg));

      expect(result.synced).toBe(1);
      expect(result.failed).toBe(0);
      expect(messages).toEqual([
        { type: "SYNC_STARTED" },
        { type: "ACTION_SUCCESS", id: "act-1" },
        { type: "SYNC_COMPLETE", synced: 1, failed: 0 },
      ]);
    });

    it("handles max-attempts failure and transitions status to failed", async () => {
      mockFetch.mockRejectedValue(new Error("Network offline"));

      const action: offlineStorage.QueuedAction = {
        id: "act-fail",
        type: "TOGGLE_REACTION",
        payload: { commentId: "c1", emoji: "🔥" },
        createdAt: Date.now(),
        attempts: MAX_ATTEMPTS - 1, // Will reach MAX_ATTEMPTS
        status: "pending",
      };

      vi.spyOn(offlineStorage, "getPendingActions").mockResolvedValue([action]);
      const updateSpy = vi.spyOn(offlineStorage, "updateAction").mockResolvedValue();
      vi.spyOn(offlineStorage, "removeAction").mockResolvedValue();

      const messages: any[] = [];
      const result = await runSync("https://api.example.com", undefined, (msg) => messages.push(msg));

      expect(result.synced).toBe(0);
      expect(result.failed).toBe(1);
      expect(updateSpy).toHaveBeenCalledWith("act-fail", expect.objectContaining({
        status: "failed",
        attempts: MAX_ATTEMPTS,
      }));
      expect(messages).toContainEqual({
        type: "ACTION_FAILED",
        id: "act-fail",
        error: "Network offline",
      });
    });

    it("respects abort signal to cleanly halt processing", async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const actions: offlineStorage.QueuedAction[] = [
        {
          id: "act-1",
          type: "TIP_INTENT",
          payload: {},
          createdAt: Date.now(),
          attempts: 0,
          status: "pending",
        },
        {
          id: "act-2",
          type: "TIP_INTENT",
          payload: {},
          createdAt: Date.now(),
          attempts: 0,
          status: "pending",
        },
      ];

      vi.spyOn(offlineStorage, "getPendingActions").mockResolvedValue(actions);
      vi.spyOn(offlineStorage, "updateAction").mockResolvedValue();
      vi.spyOn(offlineStorage, "removeAction").mockResolvedValue();

      const controller = new AbortController();
      controller.abort();

      const result = await runSync("https://api.example.com", controller.signal, () => {});
      expect(result.synced).toBe(0);
    });
  });
});
