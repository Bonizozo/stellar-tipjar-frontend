import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NotificationToggle } from "@/components/NotificationToggle";
import { NotificationCategory } from "@/components/NotificationCategory";
import { NotificationFrequency } from "@/components/NotificationFrequency";
import { NotificationStats } from "@/components/NotificationStats";

describe("NotificationToggle", () => {
  it("should render with label", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
      />
    );

    expect(screen.getByText("Test Notification")).toBeInTheDocument();
  });

  it("should render description when provided", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        description="This is a test"
        checked={false}
        onChange={handleChange}
      />
    );

    expect(screen.getByText("This is a test")).toBeInTheDocument();
  });

  it("should call onChange when clicked", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
      />
    );

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("should show checked state visually", () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
      />
    );

    let switchButton = screen.getByRole("switch");
    expect(switchButton).toHaveAttribute("aria-checked", "false");

    rerender(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={true}
        onChange={handleChange}
      />
    );

    switchButton = screen.getByRole("switch");
    expect(switchButton).toHaveAttribute("aria-checked", "true");
  });

  it("should be disabled when disabled prop is true", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
        disabled={true}
      />
    );

    const button = screen.getByRole("switch");
    expect(button).toBeDisabled();
  });

  it("should not call onChange when disabled", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
        disabled={true}
      />
    );

    const button = screen.getByRole("switch");
    fireEvent.click(button);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("should render icon when provided", () => {
    const handleChange = vi.fn();
    render(
      <NotificationToggle
        id="test-toggle"
        label="Test Notification"
        checked={false}
        onChange={handleChange}
        icon="📧"
      />
    );

    expect(screen.getByText("📧")).toBeInTheDocument();
  });
});

describe("NotificationCategory", () => {
  const defaultProps = {
    id: "tips",
    title: "New Tips",
    description: "When you receive a tip",
    preferences: { email: true, push: true, inApp: false },
    onUpdate: vi.fn(),
    onToggleAll: vi.fn(),
    isEnabled: true,
  };

  it("should render category title and description", () => {
    render(<NotificationCategory {...defaultProps} />);

    expect(screen.getByText("New Tips")).toBeInTheDocument();
    expect(screen.getByText("When you receive a tip")).toBeInTheDocument();
  });

  it("should show enabled count", () => {
    render(<NotificationCategory {...defaultProps} />);

    expect(screen.getByText("2/3")).toBeInTheDocument();
  });

  it("should expand and collapse on click", async () => {
    render(<NotificationCategory {...defaultProps} />);

    const button = screen.getByRole("button", { name: /New Tips|When you/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Enable All")).toBeInTheDocument();
    });

    fireEvent.click(button);
  });

  it("should call onToggleAll when Enable All clicked", async () => {
    const handleToggleAll = vi.fn();
    render(
      <NotificationCategory
        {...defaultProps}
        onToggleAll={handleToggleAll}
      />
    );

    const expandButton = screen.getByRole("button", { name: /New Tips/ });
    fireEvent.click(expandButton);

    await waitFor(() => {
      const enableButton = screen.getByText("Enable All");
      fireEvent.click(enableButton);
    });

    expect(handleToggleAll).toHaveBeenCalledWith(true);
  });

  it("should call onToggleAll when Disable All clicked", async () => {
    const handleToggleAll = vi.fn();
    render(
      <NotificationCategory
        {...defaultProps}
        onToggleAll={handleToggleAll}
      />
    );

    const expandButton = screen.getByRole("button", { name: /New Tips/ });
    fireEvent.click(expandButton);

    await waitFor(() => {
      const disableButton = screen.getByText("Disable All");
      fireEvent.click(disableButton);
    });

    expect(handleToggleAll).toHaveBeenCalledWith(false);
  });

  it("should render individual channel toggles when expanded", async () => {
    render(<NotificationCategory {...defaultProps} />);

    const expandButton = screen.getByRole("button", { name: /New Tips/ });
    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Push Notifications")).toBeInTheDocument();
      expect(screen.getByText("In-app")).toBeInTheDocument();
    });
  });
});

describe("NotificationFrequency", () => {
  it("should render all frequency options", () => {
    const handleChange = vi.fn();
    render(
      <NotificationFrequency
        channel="email"
        frequency="instant"
        onChange={handleChange}
      />
    );

    expect(screen.getByText("Instant")).toBeInTheDocument();
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Never")).toBeInTheDocument();
  });

  it("should call onChange with selected frequency", async () => {
    const handleChange = vi.fn();
    render(
      <NotificationFrequency
        channel="email"
        frequency="instant"
        onChange={handleChange}
      />
    );

    const weeklyButton = screen.getByText("Weekly");
    fireEvent.click(weeklyButton);

    expect(handleChange).toHaveBeenCalledWith("weekly");
  });

  it("should show channel name in title", () => {
    const handleChange = vi.fn();
    render(
      <NotificationFrequency
        channel="email"
        frequency="instant"
        onChange={handleChange}
      />
    );

    expect(screen.getByText(/email frequency/i)).toBeInTheDocument();
  });

  it("should highlight selected frequency", () => {
    const handleChange = vi.fn();
    render(
      <NotificationFrequency
        channel="email"
        frequency="daily"
        onChange={handleChange}
      />
    );

    const dailyButton = screen.getByRole("button", { name: /daily/i });
    expect(dailyButton).toHaveClass("border-wave", "bg-wave/10");
  });
});

describe("NotificationStats", () => {
  it("should display stats correctly", () => {
    const { container } = render(
      <NotificationStats
        totalSettings={18}
        enabledSettings={15}
        disabledSettings={3}
        categoriesEnabled={5}
        totalCategories={6}
      />
    );

    const text = container.textContent || "";
    expect(text).toContain("Notifications");
    expect(text).toContain("Categories");
    expect(text).toContain("Notification Summary");
    expect(text).toContain("Overall Activity");
    expect(text).toContain("notification preferences enabled");
  });

  it("should calculate percentage correctly", () => {
    render(
      <NotificationStats
        totalSettings={18}
        enabledSettings={9}
        disabledSettings={9}
        categoriesEnabled={3}
        totalCategories={6}
      />
    );

    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  it("should show correct status for fully enabled", () => {
    render(
      <NotificationStats
        totalSettings={18}
        enabledSettings={18}
        disabledSettings={0}
        categoriesEnabled={6}
        totalCategories={6}
      />
    );

    expect(screen.getByText(/fully engaged/i)).toBeInTheDocument();
  });

  it("should show correct status for fully disabled", () => {
    render(
      <NotificationStats
        totalSettings={18}
        enabledSettings={0}
        disabledSettings={18}
        categoriesEnabled={0}
        totalCategories={6}
      />
    );

    expect(screen.getByText(/all notifications disabled/i)).toBeInTheDocument();
  });

  it("should show correct status for partially enabled", () => {
    render(
      <NotificationStats
        totalSettings={18}
        enabledSettings={10}
        disabledSettings={8}
        categoriesEnabled={3}
        totalCategories={6}
      />
    );

    expect(screen.getByText(/partially enabled/i)).toBeInTheDocument();
  });
});
