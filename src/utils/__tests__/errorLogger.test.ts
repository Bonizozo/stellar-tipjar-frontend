import { describe, it, expect, vi, beforeEach } from "vitest";
import { logError } from "../errorLogger";

describe("errorLogger utility (#586)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("logs structured error without crashing", () => {
    const spyError = vi.spyOn(console, "error").mockImplementation(() => {});
    const err = new Error("Something went wrong");

    expect(() => logError(err, { digest: "test-digest-123" })).not.toThrow();
    expect(spyError).toHaveBeenCalled();
  });
});
