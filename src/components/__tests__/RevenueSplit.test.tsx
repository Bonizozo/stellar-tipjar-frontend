import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RevenueSplit } from "@/components/RevenueSplit";
import { TeamMember } from "@/hooks/useTeam";

describe("RevenueSplit Component", () => {
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

  it("displays empty state when no active members", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={[]} onUpdateSplit={handleUpdateSplit} totalSplit={0} />
    );

    expect(
      screen.getByText("Add team members to configure revenue splits.")
    ).toBeInTheDocument();
  });

  it("displays all active members", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows balanced status when total split is 100%", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    expect(screen.getByText(/Balanced/i)).toBeInTheDocument();
  });

  it("shows warning when split is incomplete", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={80} />
    );

    expect(screen.getByText(/incomplete/i)).toBeInTheDocument();
    expect(screen.getByText(/20% remaining to allocate/i)).toBeInTheDocument();
  });

  it("shows overflow warning when split exceeds 100%", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={120} />
    );

    expect(screen.getByText(/Overflow/i)).toBeInTheDocument();
    expect(screen.getByText(/exceed 100%/i)).toBeInTheDocument();
  });

  it("calls onUpdateSplit when range input changes", async () => {
    const user = userEvent.setup();
    const handleUpdateSplit = vi.fn();

    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    const rangeInputs = screen.getAllByRole("slider");
    await user.click(rangeInputs[0]);

    expect(handleUpdateSplit).toHaveBeenCalled();
  });

  it("calls onUpdateSplit when number input changes", async () => {
    const user = userEvent.setup();
    const handleUpdateSplit = vi.fn();

    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    const numberInputs = screen.getAllByDisplayValue(/50/);
    if (numberInputs.length > 0) {
      await user.clear(numberInputs[0]);
      await user.type(numberInputs[0], "75");

      expect(handleUpdateSplit).toHaveBeenCalled();
    }
  });

  it("displays split percentage for each member", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    screen.getAllByDisplayValue(/50/);
  });

  it("shows total split at bottom", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("disables controls when isLoading is true", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit
        members={mockMembers}
        onUpdateSplit={handleUpdateSplit}
        totalSplit={100}
        isLoading={true}
      />
    );

    const rangeInputs = screen.getAllByRole("slider");
    rangeInputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it("enables submit button only when balanced", () => {
    const handleUpdateSplit = vi.fn();

    // Unbalanced
    const { rerender } = render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={80} />
    );

    let button = screen.getByRole("button", { name: /Configure Split/i });
    expect(button).toBeDisabled();

    // Balanced
    rerender(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    button = screen.getByRole("button", { name: /Configured/i });
    expect(button).not.toBeDisabled();
  });
});
