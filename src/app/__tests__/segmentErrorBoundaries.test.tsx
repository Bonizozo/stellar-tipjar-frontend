import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardError from "../dashboard/error";
import MarketplaceError from "../marketplace/error";
import CreatorProfileError from "../creator/[username]/error";
import MentorshipError from "../mentorship/error";
import * as errorLogger from "@/utils/errorLogger";

describe("Segment-Level Error Boundaries", () => {
  const mockError = new Error("Failed to load segment data");
  const mockReset = vi.fn();
  const logErrorSpy = vi.spyOn(errorLogger, "logError").mockImplementation(() => {});

  it("renders DashboardError fallback and handles reset", () => {
    render(<DashboardError error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledWith(mockError, expect.objectContaining({ context: "DashboardSegment" }));

    const retryBtn = screen.getByRole("button", { name: /try again/i });
    fireEvent.click(retryBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("renders MarketplaceError fallback and logs error", () => {
    render(<MarketplaceError error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledWith(mockError, expect.objectContaining({ context: "MarketplaceSegment" }));
  });

  it("renders CreatorProfileError fallback and logs error", () => {
    render(<CreatorProfileError error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledWith(mockError, expect.objectContaining({ context: "CreatorProfileSegment" }));
  });

  it("renders MentorshipError fallback and logs error", () => {
    render(<MentorshipError error={mockError} reset={mockReset} />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(logErrorSpy).toHaveBeenCalledWith(mockError, expect.objectContaining({ context: "MentorshipSegment" }));
  });
});
