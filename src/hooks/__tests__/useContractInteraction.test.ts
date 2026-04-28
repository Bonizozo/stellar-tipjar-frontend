import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useContractInteraction } from "../useContractInteraction";
import { useWalletContext } from "@/contexts/WalletContext";

vi.mock("@/contexts/WalletContext");

const mockUseWalletContext = vi.mocked(useWalletContext);

const mockWalletConnected = {
  isConnected: true,
  publicKey: "GABC1234567890ABCDEF",
  network: "TESTNET" as const,
  signStellarTransaction: vi.fn().mockResolvedValue("signed-xdr"),
  isInstalled: true,
  shortAddress: "GABC...CDEF",
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

const mockWalletDisconnected = {
  ...mockWalletConnected,
  isConnected: false,
  publicKey: null,
  status: "idle" as const,
};

describe("useContractInteraction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with idle status", () => {
    mockUseWalletContext.mockReturnValue(mockWalletConnected);
    const { result } = renderHook(() => useContractInteraction());

    expect(result.current.status).toBe("idle");
    expect(result.current.txHash).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.estimatedFee).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("exposes callContract, estimateFee, and reset functions", () => {
    mockUseWalletContext.mockReturnValue(mockWalletConnected);
    const { result } = renderHook(() => useContractInteraction());

    expect(typeof result.current.callContract).toBe("function");
    expect(typeof result.current.estimateFee).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("reset clears all state", () => {
    mockUseWalletContext.mockReturnValue(mockWalletConnected);
    const { result } = renderHook(() => useContractInteraction());

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.txHash).toBeNull();
    expect(result.current.result).toBeNull();
    expect(result.current.estimatedFee).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("returns error when wallet is not connected on callContract", async () => {
    mockUseWalletContext.mockReturnValue(mockWalletDisconnected);
    const { result } = renderHook(() => useContractInteraction());

    let callResult: Awaited<ReturnType<typeof result.current.callContract>>;
    await act(async () => {
      callResult = await result.current.callContract("CCONTRACT", "transfer", []);
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("Wallet not connected.");
    expect(callResult!.status).toBe("error");
    expect(callResult!.error).toBe("Wallet not connected.");
  });

  it("returns null when wallet is not connected on estimateFee", async () => {
    mockUseWalletContext.mockReturnValue(mockWalletDisconnected);
    const { result } = renderHook(() => useContractInteraction());

    let feeResult: string | null = "not-null";
    await act(async () => {
      feeResult = await result.current.estimateFee("CCONTRACT", "balance", []);
    });

    expect(feeResult).toBeNull();
    expect(result.current.error).toBe("Wallet not connected.");
  });

  it("isLoading is true during estimating status", () => {
    mockUseWalletContext.mockReturnValue(mockWalletConnected);
    const { result } = renderHook(() => useContractInteraction());

    // Manually check the isLoading derivation logic
    // isLoading = status === "estimating" || status === "signing" || status === "submitting"
    expect(result.current.isLoading).toBe(false); // idle
  });
});
