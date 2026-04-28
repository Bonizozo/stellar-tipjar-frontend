import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { TransactionGraph } from "../TransactionGraph";
import type { Tip } from "@/hooks/queries/useTips";

const mockTips: Tip[] = [
  { id: "1", date: "2024-03-20T10:30:00Z", amount: 50, recipient: "alice", sender: "you", status: "completed", transactionHash: "abc123", memo: "Great!" },
  { id: "2", date: "2024-03-19T15:45:00Z", amount: 25, recipient: "bob", sender: "you", status: "pending" },
  { id: "3", date: "2024-03-18T09:15:00Z", amount: 10, recipient: "alice", sender: "carol", status: "failed" },
];

describe("TransactionGraph", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the SVG graph", () => {
    render(<TransactionGraph tips={mockTips} />);
    expect(screen.getByRole("img", { name: /transaction graph/i })).toBeInTheDocument();
  });

  it("renders search input and status filter buttons", () => {
    render(<TransactionGraph tips={mockTips} />);
    expect(screen.getByLabelText("Search transactions")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /completed/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pending/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /failed/i })).toBeInTheDocument();
  });

  it("renders legend items", () => {
    render(<TransactionGraph tips={mockTips} />);
    expect(screen.getByText("Sender")).toBeInTheDocument();
    expect(screen.getByText("Recipient")).toBeInTheDocument();
    // "Completed" appears in legend and stats bar — both are valid
    expect(screen.getAllByText("Completed").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });

  it("renders stats bar with correct totals", () => {
    render(<TransactionGraph tips={mockTips} />);
    expect(screen.getByText("3")).toBeInTheDocument(); // total
    expect(screen.getByText("1")).toBeInTheDocument(); // completed
    expect(screen.getByText("85 XLM")).toBeInTheDocument(); // volume
  });

  it("renders node buttons for senders and recipients", () => {
    render(<TransactionGraph tips={mockTips} />);
    const nodes = screen.getAllByRole("button", { name: /node:/i });
    expect(nodes.length).toBeGreaterThan(0);
  });

  it("filters by status when a filter button is clicked", () => {
    render(<TransactionGraph tips={mockTips} />);
    fireEvent.click(screen.getByRole("button", { name: /^completed$/i }));
    // Volume stat shows "50 XLM" — may also appear in SVG node label
    expect(screen.getAllByText("50 XLM").length).toBeGreaterThanOrEqual(1);
  });

  it("filters by search query", () => {
    render(<TransactionGraph tips={mockTips} />);
    fireEvent.change(screen.getByLabelText("Search transactions"), { target: { value: "carol" } });
    // Volume stat shows "10 XLM" — may also appear in SVG node label
    expect(screen.getAllByText("10 XLM").length).toBeGreaterThanOrEqual(1);
  });

  it("shows empty state when no tips match filter", () => {
    render(<TransactionGraph tips={mockTips} />);
    fireEvent.change(screen.getByLabelText("Search transactions"), { target: { value: "zzznomatch" } });
    expect(screen.getByText(/no transactions match/i)).toBeInTheDocument();
  });

  it("shows detail panel when a tx node is clicked", () => {
    render(<TransactionGraph tips={mockTips} />);
    const txNodes = screen.getAllByRole("button", { name: /tx node/i });
    fireEvent.click(txNodes[0]);
    // Detail panel should appear with transaction info
    expect(screen.getByText("Transaction")).toBeInTheDocument();
    expect(screen.getByLabelText("Close detail panel")).toBeInTheDocument();
  });

  it("closes detail panel when close button is clicked", () => {
    render(<TransactionGraph tips={mockTips} />);
    const txNodes = screen.getAllByRole("button", { name: /tx node/i });
    fireEvent.click(txNodes[0]);
    expect(screen.getByLabelText("Close detail panel")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Close detail panel"));
    expect(screen.queryByLabelText("Close detail panel")).not.toBeInTheDocument();
  });

  it("all filter button has aria-pressed=true by default", () => {
    render(<TransactionGraph tips={mockTips} />);
    expect(screen.getByRole("button", { name: /^all$/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("renders with empty tips array without crashing", () => {
    render(<TransactionGraph tips={[]} />);
    expect(screen.getByText(/no transactions match/i)).toBeInTheDocument();
  });
});
