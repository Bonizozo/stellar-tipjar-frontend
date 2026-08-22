import { render, screen, fireEvent } from "@testing-library/react";
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
      role: "member",
    },
    {
      id: "2",
      name: "Bob",
      email: "bob@example.com",
      split: 50,
      createdAt: new Date().toISOString(),
      isActive: true,
      role: "member",
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

    expect(screen.getByText(/Revenue split is balanced/i)).toBeInTheDocument();
  });

  it("shows warning when split is incomplete", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={80} />
    );

    expect(screen.getByText(/Incomplete/i)).toBeInTheDocument();
    expect(screen.getByText(/20% remaining to allocate/)).toBeInTheDocument();
  });

  it("shows overflow warning when split exceeds 100%", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={120} />
    );

    expect(screen.getByText(/Splits exceed 100%/)).toBeInTheDocument();
    expect(screen.getByText(/Reduce splits to reach 100%/)).toBeInTheDocument();
  });

  it("calls onUpdateSplit when range input changes", async () => {
    const handleUpdateSplit = vi.fn();

    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    const rangeInputs = screen.getAllByRole("slider");
    fireEvent.change(rangeInputs[0], { target: { value: "60" } });

    expect(handleUpdateSplit).toHaveBeenCalledWith("1", 60);
  });

  it("calls onUpdateSplit when number input changes", async () => {
    const handleUpdateSplit = vi.fn();

    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    const numberInputs = screen.getAllByDisplayValue(/50/);
    if (numberInputs.length > 0) {
      const input = numberInputs[0];
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;
      nativeInputValueSetter?.call(input, "75");
      input.dispatchEvent(new Event("change", { bubbles: true }));

      expect(handleUpdateSplit).toHaveBeenCalled();
    }
  });

  it("displays split percentage for each member", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    expect(screen.getAllByDisplayValue(/50/).length).toBeGreaterThan(0);
  });

  it("shows total split at bottom", () => {
    const handleUpdateSplit = vi.fn();
    render(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    // The total split is displayed in the total indicator section
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Total Split")).toBeInTheDocument();
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

    const unbalancedButton = screen.getByRole("button", { name: /Configure Split to 100%/ });
    expect(unbalancedButton).toBeDisabled();

    // Balanced
    rerender(
      <RevenueSplit members={mockMembers} onUpdateSplit={handleUpdateSplit} totalSplit={100} />
    );

    const balancedButton = screen.getByRole("button", { name: /✓ Revenue Split Configured/ });
    expect(balancedButton).not.toBeDisabled();
  });
});
