import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  WalletError,
  WalletErrorCode,
} from "../errors";
import { normalizeNetwork } from "../network";

// ── Mock @stellar/freighter-api ───────────────────────────────────────────────

const mockIsConnected = vi.fn();
const mockGetAddress = vi.fn();
const mockGetNetwork = vi.fn();
const mockIsAllowed = vi.fn();
const mockSetAllowed = vi.fn();
const mockSignTransaction = vi.fn();

vi.mock("@stellar/freighter-api", () => ({
  isConnected: (...args: unknown[]) => mockIsConnected(...args),
  getAddress: (...args: unknown[]) => mockGetAddress(...args),
  getNetwork: (...args: unknown[]) => mockGetNetwork(...args),
  isAllowed: (...args: unknown[]) => mockIsAllowed(...args),
  setAllowed: (...args: unknown[]) => mockSetAllowed(...args),
  signTransaction: (...args: unknown[]) => mockSignTransaction(...args),
}));

// Mock @stellar/stellar-sdk Horizon
vi.mock("@stellar/stellar-sdk", () => {
  return {
    Networks: { TESTNET: "Test SDF Network ; September 2015", PUBLIC: "Public Global Stellar Network ; September 2015" },
    Horizon: {
      Server: vi.fn().mockImplementation(() => ({
        loadAccount: vi.fn().mockResolvedValue({
          balances: [{ asset_type: "native", balance: "100.0" }],
        }),
      })),
    },
  };
});

// ── Import after mocks ───────────────────────────────────────────────────────

import { FreighterWallet } from "../provider";
import { useWalletStore } from "@/store/walletStore";

// ── Helpers ───────────────────────────────────────────────────────────────────

function resetMocks() {
  mockIsConnected.mockReset();
  mockGetAddress.mockReset();
  mockGetNetwork.mockReset();
  mockIsAllowed.mockReset();
  mockSetAllowed.mockReset();
  mockSignTransaction.mockReset();
}

function mockFreighterInstalled() {
  mockIsConnected.mockResolvedValue({ isConnected: true });
}

function mockFreighterNotInstalled() {
  mockIsConnected.mockResolvedValue({ isConnected: false });
}

function mockFreighterThrows() {
  mockIsConnected.mockRejectedValue(new Error("Freighter not found"));
}

function mockAllowed() {
  mockIsAllowed.mockResolvedValue({ isAllowed: true });
}

function mockNotYetAllowed() {
  mockIsAllowed.mockResolvedValue({ isAllowed: false });
}

function mockUserGrantsAccess() {
  mockSetAllowed.mockResolvedValue({ isAllowed: true });
}

function mockUserDeclines() {
  mockSetAllowed.mockResolvedValue({ isAllowed: false });
}

function mockAddress(address = "GABC1234567890ABCDEF") {
  mockGetAddress.mockResolvedValue({ address });
}

function mockFreighterNetwork(network = "TESTNET") {
  mockGetNetwork.mockResolvedValue(network);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("FreighterWallet (provider)", () => {
  beforeEach(() => {
    resetMocks();
  });

  describe("isInstalled", () => {
    it("returns true when Freighter is connected", async () => {
      mockFreighterInstalled();
      const wallet = new FreighterWallet();
      expect(await wallet.isInstalled()).toBe(true);
    });

    it("returns false when Freighter is not connected", async () => {
      mockFreighterNotInstalled();
      const wallet = new FreighterWallet();
      expect(await wallet.isInstalled()).toBe(false);
    });

    it("returns false when Freighter throws", async () => {
      mockFreighterThrows();
      const wallet = new FreighterWallet();
      expect(await wallet.isInstalled()).toBe(false);
    });
  });

  describe("connect", () => {
    it("throws NOT_INSTALLED when extension is not present", async () => {
      mockFreighterNotInstalled();
      const wallet = new FreighterWallet();
      await expect(wallet.connect()).rejects.toMatchObject({
        code: WalletErrorCode.NOT_INSTALLED,
      });
    });

    it("throws USER_DECLINED when user denies permission", async () => {
      mockFreighterInstalled();
      mockNotYetAllowed();
      mockUserDeclines();
      const wallet = new FreighterWallet();
      await expect(wallet.connect()).rejects.toMatchObject({
        code: WalletErrorCode.USER_DECLINED,
      });
    });

    it("returns public key on successful connection", async () => {
      mockFreighterInstalled();
      mockAllowed();
      mockAddress("GABC1234567890ABCDEF");
      const wallet = new FreighterWallet();
      const address = await wallet.connect();
      expect(address).toBe("GABC1234567890ABCDEF");
    });

    it("requests permission when not yet allowed", async () => {
      mockFreighterInstalled();
      mockNotYetAllowed();
      mockUserGrantsAccess();
      mockAddress("GABC1234567890ABCDEF");
      const wallet = new FreighterWallet();
      await wallet.connect();
      expect(mockSetAllowed).toHaveBeenCalled();
    });
  });

  describe("getNetwork", () => {
    it("returns normalized TESTNET", async () => {
      mockFreighterNetwork("TESTNET");
      const wallet = new FreighterWallet();
      expect(await wallet.getNetwork()).toBe("TESTNET");
    });

    it("returns normalized PUBLIC", async () => {
      mockFreighterNetwork("PUBLIC");
      const wallet = new FreighterWallet();
      expect(await wallet.getNetwork()).toBe("PUBLIC");
    });

    it("defaults to TESTNET on error", async () => {
      mockGetNetwork.mockRejectedValue(new Error("fail"));
      const wallet = new FreighterWallet();
      expect(await wallet.getNetwork()).toBe("TESTNET");
    });
  });
});

describe("normalizeNetwork", () => {
  it("normalizes 'TESTNET' string", () => {
    expect(normalizeNetwork("TESTNET")).toBe("TESTNET");
  });

  it("normalizes 'PUBLIC' string", () => {
    expect(normalizeNetwork("PUBLIC")).toBe("PUBLIC");
  });

  it("normalizes 'PUBNET' variant to PUBLIC", () => {
    expect(normalizeNetwork("PUBNET")).toBe("PUBLIC");
  });

  it("normalizes 'public' lowercase to PUBLIC", () => {
    expect(normalizeNetwork("public")).toBe("PUBLIC");
  });

  it("extracts from object with network prop", () => {
    expect(normalizeNetwork({ network: "PUBLIC" })).toBe("PUBLIC");
  });

  it("extracts from object with networkUrl prop", () => {
    expect(normalizeNetwork({ networkUrl: "pubnet" })).toBe("PUBLIC");
  });

  it("defaults to TESTNET for unknown values", () => {
    expect(normalizeNetwork(null)).toBe("TESTNET");
    expect(normalizeNetwork(undefined)).toBe("TESTNET");
    expect(normalizeNetwork("random")).toBe("TESTNET");
  });
});

describe("WalletError", () => {
  it("creates error with correct code and default message", () => {
    const error = new WalletError(WalletErrorCode.NOT_INSTALLED);
    expect(error.code).toBe(WalletErrorCode.NOT_INSTALLED);
    expect(error.message).toContain("Freighter wallet is not installed");
    expect(error.name).toBe("WalletError");
  });

  it("creates error with custom message", () => {
    const error = new WalletError(WalletErrorCode.NETWORK_MISMATCH, "custom message");
    expect(error.code).toBe(WalletErrorCode.NETWORK_MISMATCH);
    expect(error.message).toBe("custom message");
  });

  it("is instanceof Error", () => {
    const error = new WalletError(WalletErrorCode.SESSION_STALE);
    expect(error).toBeInstanceOf(Error);
  });
});
