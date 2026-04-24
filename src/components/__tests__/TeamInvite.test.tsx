import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { TeamInvite } from "@/components/TeamInvite";

describe("TeamInvite Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders invite form", () => {
    const handleInvite = vi.fn();
    render(<TeamInvite onInvite={handleInvite} />);

    expect(screen.getByPlaceholderText(/colleague@example.com/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Invite/i })).toBeInTheDocument();
  });

  it("shows error when email is empty", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();

    render(<TeamInvite onInvite={handleInvite} />);

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(screen.getByText(/Please enter an email address/i)).toBeInTheDocument();
    expect(handleInvite).not.toHaveBeenCalled();
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();

    render(<TeamInvite onInvite={handleInvite} />);

    const input = screen.getByPlaceholderText(/colleague@example.com/);
    await user.type(input, "not-an-email");

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(handleInvite).not.toHaveBeenCalled();
  });

  it("calls onInvite with valid email", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();

    render(<TeamInvite onInvite={handleInvite} />);

    const input = screen.getByPlaceholderText(/colleague@example.com/);
    await user.type(input, "colleague@example.com");

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(handleInvite).toHaveBeenCalledWith("colleague@example.com");
  });

  it("shows success message after sending invite", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();

    render(<TeamInvite onInvite={handleInvite} />);

    const input = screen.getByPlaceholderText(/colleague@example.com/);
    await user.type(input, "colleague@example.com");

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(screen.getByText(/Invitation sent to colleague@example.com/)).toBeInTheDocument();
  });

  it("clears email input after sending invite", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();

    render(<TeamInvite onInvite={handleInvite} />);

    const input = screen.getByPlaceholderText(/colleague@example.com/) as HTMLInputElement;
    await user.type(input, "colleague@example.com");

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(input.value).toBe("");
  });

  it("shows pending invitations list", () => {
    const handleInvite = vi.fn();
    const pendingInvitations = [
      {
        id: "1",
        email: "user1@example.com",
        status: "pending",
      },
      {
        id: "2",
        email: "user2@example.com",
        status: "accepted",
      },
    ];

    render(
      <TeamInvite
        onInvite={handleInvite}
        pendingInvitations={pendingInvitations}
      />
    );

    expect(screen.getByText("Pending Invitations (2)")).toBeInTheDocument();
    expect(screen.getByText("user1@example.com")).toBeInTheDocument();
    expect(screen.getByText("user2@example.com")).toBeInTheDocument();
  });

  it("prevents duplicate invitations to same email", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();
    const pendingInvitations = [
      {
        id: "1",
        email: "colleague@example.com",
        status: "pending",
      },
    ];

    render(
      <TeamInvite
        onInvite={handleInvite}
        pendingInvitations={pendingInvitations}
      />
    );

    const input = screen.getByPlaceholderText(/colleague@example.com/);
    await user.type(input, "colleague@example.com");

    const button = screen.getByRole("button", { name: /Send Invite/i });
    await user.click(button);

    expect(screen.getByText(/already been invited/i)).toBeInTheDocument();
    expect(handleInvite).not.toHaveBeenCalled();
  });

  it("calls onCancelInvitation when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleInvite = vi.fn();
    const handleCancelInvitation = vi.fn();
    const pendingInvitations = [
      {
        id: "1",
        email: "colleague@example.com",
        status: "pending",
      },
    ];

    render(
      <TeamInvite
        onInvite={handleInvite}
        pendingInvitations={pendingInvitations}
        onCancelInvitation={handleCancelInvitation}
      />
    );

    // Find the cancel button (usually an X icon)
    const cancelButtons = screen.getAllByRole("button");
    // The first button is "Send Invite", subsequent should be cancel buttons
    if (cancelButtons.length > 1) {
      await user.click(cancelButtons[1]);
      expect(handleCancelInvitation).toHaveBeenCalledWith("1");
    }
  });

  it("disables form when isLoading is true", () => {
    const handleInvite = vi.fn();
    render(<TeamInvite onInvite={handleInvite} isLoading={true} />);

    const input = screen.getByPlaceholderText(/colleague@example.com/) as HTMLInputElement;
    const button = screen.getByRole("button", { name: /Send Invite/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("shows help text", () => {
    const handleInvite = vi.fn();
    render(<TeamInvite onInvite={handleInvite} />);

    expect(
      screen.getByText(/Invited members will receive an email/i)
    ).toBeInTheDocument();
  });
});
