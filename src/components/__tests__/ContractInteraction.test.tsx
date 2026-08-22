import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ContractInteraction } from "../ContractInteraction";
import { useWalletContext } from "@/contexts/WalletContext";
import { useContractInteraction } from "@/hooks/useContractInteraction";

vi.mock("@/contexts/WalletContext");
vi.mock("@/hooks/useContractInteraction");

const mockUseWalletContext = vi.mocked(useWalletContext);
const mockUseContractInteraction = vi.mocked(useContractInteraction);

const baseWallet = {
  isConnected: true,
  publicKey: "GABC1234",
  network: "TESTNET" as const,
  signStellarTransaction: vi.fn(),
  isInstalled: true,
  shortAddress: "GABC...1234",
  balance: "100.0",
  provider: "freighter" as const,
  status: "connected" as const,
  isConnecting: false,
  isLoading: false,
  error: null,
  connect: vi.fn(),
  disconnect: vi.fn(),
  refreshBalance: vi.fn(),
};

const baseHook = {
  status: "idle" as const,
  txHash: null,
  result: null,
  estimatedFee: null,
  error: null,
  isLoading: false,
  callContract: vi.fn(),
  estimateFee: vi.fn(),
  reset: vi.fn(),
};

describe("ContractInteraction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseWalletContext.mockReturnValue(baseWallet);
    mockUseContractInteraction.mockReturnValue(baseHook);
  });

  it("renders contract ID and function name inputs", () => {
    render(<ContractInteraction />);

    expect(screen.getByLabelText("Contract ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Function Name")).toBeInTheDocument();
  });

  it("renders Estimate Fee and Call Contract buttons when connected", () => {
    render(<ContractInteraction />);

    expect(screen.getByRole("button", { name: /estimate fee/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /call contract/i })).toBeInTheDocument();
  });

  it("renders Connect Wallet button when not connected", () => {
    mockUseWalletContext.mockReturnValue({ ...baseWallet, isConnected: false, publicKey: null });
    render(<ContractInteraction />);

    expect(screen.getByRole("button", { name: /connect wallet/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /call contract/i })).not.toBeInTheDocument();
  });

  it("buttons are disabled when form is empty", () => {
    render(<ContractInteraction />);

    expect(screen.getByRole("button", { name: /estimate fee/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /call contract/i })).toBeDisabled();
  });

  it("buttons are enabled when contract ID and function name are filled", () => {
    render(<ContractInteraction />);

    fireEvent.change(screen.getByLabelText("Contract ID"), { target: { value: "CCONTRACT123" } });
    fireEvent.change(screen.getByLabelText("Function Name"), { target: { value: "transfer" } });

    expect(screen.getByRole("button", { name: /estimate fee/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /call contract/i })).not.toBeDisabled();
  });

  it("adds a parameter row when Add parameter is clicked", () => {
    render(<ContractInteraction />);

    expect(screen.queryByLabelText("Parameter 1 name")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /add parameter/i }));

    expect(screen.getByLabelText("Parameter 1 name")).toBeInTheDocument();
    expect(screen.getByLabelText("Parameter 1 type")).toBeInTheDocument();
    expect(screen.getByLabelText("Parameter 1 value")).toBeInTheDocument();
  });

  it("removes a parameter row when remove button is clicked", () => {
    render(<ContractInteraction />);

    fireEvent.click(screen.getByRole("button", { name: /add parameter/i }));
    expect(screen.getByLabelText("Parameter 1 name")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /remove parameter 1/i }));
    expect(screen.queryByLabelText("Parameter 1 name")).not.toBeInTheDocument();
  });

  it("calls estimateFee with correct args when Estimate Fee is clicked", async () => {
    const mockEstimateFee = vi.fn().mockResolvedValue("0.0001");
    mockUseContractInteraction.mockReturnValue({ ...baseHook, estimateFee: mockEstimateFee });

    render(<ContractInteraction />);

    fireEvent.change(screen.getByLabelText("Contract ID"), { target: { value: "CCONTRACT123" } });
    fireEvent.change(screen.getByLabelText("Function Name"), { target: { value: "balance" } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /estimate fee/i }));
    });

    expect(mockEstimateFee).toHaveBeenCalledWith("CCONTRACT123", "balance", []);
  });

  it("calls callContract with correct args when Call Contract is clicked", async () => {
    const mockCallContract = vi.fn().mockResolvedValue({ status: "success", txHash: "abc", result: "1", fee: "0.0001", error: null });
    mockUseContractInteraction.mockReturnValue({ ...baseHook, callContract: mockCallContract });

    render(<ContractInteraction />);

    fireEvent.change(screen.getByLabelText("Contract ID"), { target: { value: "CCONTRACT123" } });
    fireEvent.change(screen.getByLabelText("Function Name"), { target: { value: "transfer" } });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /call contract/i }));
    });

    expect(mockCallContract).toHaveBeenCalledWith("CCONTRACT123", "transfer", []);
  });

  it("displays estimated fee when available", () => {
    mockUseContractInteraction.mockReturnValue({ ...baseHook, estimatedFee: "0.0001234" });

    render(<ContractInteraction />);

    expect(screen.getByText("0.0001234 XLM")).toBeInTheDocument();
    expect(screen.getByText("Estimated fee")).toBeInTheDocument();
  });

  it("displays success status with tx hash", () => {
    mockUseContractInteraction.mockReturnValue({
      ...baseHook,
      status: "success",
      txHash: "abc123txhash",
      result: "42",
    });

    render(<ContractInteraction />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/transaction confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/abc123txhash/)).toBeInTheDocument();
  });

  it("displays error status with message", () => {
    mockUseContractInteraction.mockReturnValue({
      ...baseHook,
      status: "error",
      error: "Contract not found.",
    });

    render(<ContractInteraction />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText(/transaction failed/i)).toBeInTheDocument();
    expect(screen.getByText("Contract not found.")).toBeInTheDocument();
  });

  it("shows Reset button on success and calls reset when clicked", () => {
    const mockReset = vi.fn();
    mockUseContractInteraction.mockReturnValue({
      ...baseHook,
      status: "success",
      txHash: "abc",
      result: "ok",
      reset: mockReset,
    });

    render(<ContractInteraction />);

    const resetBtn = screen.getByRole("button", { name: /reset/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner during submitting status", () => {
    mockUseContractInteraction.mockReturnValue({
      ...baseHook,
      status: "submitting",
      isLoading: true,
    });

    render(<ContractInteraction />);

    expect(screen.getByText(/submitting to network/i)).toBeInTheDocument();
  });

  it("shows boolean select for boolean param type", () => {
    render(<ContractInteraction />);

    fireEvent.click(screen.getByRole("button", { name: /add parameter/i }));

    const typeSelect = screen.getByLabelText("Parameter 1 type");
    fireEvent.change(typeSelect, { target: { value: "boolean" } });

    const valueSelect = screen.getByLabelText("Parameter 1 value");
    expect(valueSelect.tagName).toBe("SELECT");
    expect(screen.getByRole("option", { name: "true" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "false" })).toBeInTheDocument();
  });
});
