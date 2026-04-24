import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { TeamMembers } from "@/components/TeamMembers";
import { TeamMember } from "@/hooks/useTeam";

describe("TeamMembers Component", () => {
  const mockMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alice",
      email: "alice@example.com",
      split: 50,
      createdAt: new Date().toISOString(),
      isActive: true,
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@example.com",
      split: 50,
      createdAt: new Date().toISOString(),
      isActive: true,
    },
  ];

  it("renders empty state when no members", () => {
    const handleRemove = vi.fn();
    render(<TeamMembers members={[]} onRemove={handleRemove} />);

    expect(screen.getByText("No team members yet")).toBeInTheDocument();
  });

  it("displays all active members", () => {
    const handleRemove = vi.fn();
    render(<TeamMembers members={mockMembers} onRemove={handleRemove} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("displays member email addresses", () => {
    const handleRemove = vi.fn();
    render(<TeamMembers members={mockMembers} onRemove={handleRemove} />);

    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
  });

  it("displays member split percentages", () => {
    const handleRemove = vi.fn();
    render(<TeamMembers members={mockMembers} onRemove={handleRemove} />);

    expect(screen.getByText("50% split")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const handleRemove = vi.fn();

    render(<TeamMembers members={mockMembers} onRemove={handleRemove} />);

    const removeButtons = screen.getAllByRole("button");
    await user.click(removeButtons[0]);

    expect(handleRemove).toHaveBeenCalledWith("1");
  });

  it("separates active and inactive members", () => {
    const inactiveMembers: TeamMember[] = [
      ...mockMembers,
      {
        id: "3",
        name: "Charlie",
        email: "charlie@example.com",
        split: 0,
        createdAt: new Date().toISOString(),
        isActive: false,
      },
    ];

    const handleRemove = vi.fn();
    render(<TeamMembers members={inactiveMembers} onRemove={handleRemove} />);

    expect(screen.getByText("Active Members (2)")).toBeInTheDocument();
    expect(screen.getByText("Removed Members (1)")).toBeInTheDocument();
  });

  it("shows loading state when isLoading prop is true", () => {
    const handleRemove = vi.fn();
    render(<TeamMembers members={mockMembers} onRemove={handleRemove} isLoading={true} />);

    const removeButtons = screen.getAllByRole("button");
    // In loading state, buttons should be disabled
    removeButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
