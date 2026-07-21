import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";

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

vi.mock("@stellar/stellar-sdk", () => ({
  Networks: {
    TESTNET: "Test SDF Network ; September 2015",
    PUBLIC: "Public Global Stellar Network ; September 2015",
  },
  Horizon: {
    Server: vi.fn().mockImplementation(() => ({
      loadAccount: vi.fn().mockResolvedValue({
        balances: [{ asset_type: "native", balance: "50.0" }],
      }),
    })),
  },
}));

// ── Import after mocks ───────────────────────────────────────────────────────

import { WalletError, WalletErrorCode } from "../errors";
import { FreighterWallet } from "../provider";

// We need to import the store carefully — it may have been initialized by
// a previous test file, so we reset it between tests.
let useWalletStore: typeof import("@/store/walletStore").useWalletStore;
let setWalletProvider: typeof import("@/store/walletStore").setWalletProvider;

beforeEach(async () => {
  // Fresh import each time to reset module-level singleton
  const mod = await import("@/store/walletStore");
  useWalletStore = mod.useWalletStore;
  setWalletProvider = mod.setWalletProvider;
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function resetMocks() {
  mockIsConnected.mockReset();
  mockGetAddress.mockReset();
  mockGetNetwork.mockReset();
  mockIsAllowed.mockReset();
  mockSetAllowed.mockReset();
  mockSignTransaction.mockReset();
}

function createMockProvider(overrides: Partial<FreighterWallet> = {}): FreighterWallet {
  const defaults: FreighterWallet = {
    isInstalled: vi.fn().mockResolvedValue(true),
    connect: vi.fn().mockResolvedValue("GABC1234567890ABCDEF"),
    disconnect: vi.fn().mockResolvedValue(undefined),
    getNetwork: vi.fn().mockResolvedValue("TESTNET"),
    getFreighterNetwork: vi.fn().mockResolvedValue("TESTNET"),
    signTransaction: vi.fn().mockResolvedValue("signed-xdr"),
    getBalance: vi.fn().mockResolvedValue("100.0"),
  };
  return { ...defaults, ...overrides } as unknown as FreighterWallet;
}

// ── State machine tests ───────────────────────────────────────────────────────

describe("Wallet Store — State Machine", () => {
  beforeEach(() => {
    resetMocks();
    localStorage.clear();
    vi.clearAllMocks();
    // Reset the store to initial state
    useWalletStore.setState({
      status: "unavailable",
      publicKey: null,
      network: "TESTNET",
      balance: "0.0",
      error: null,
    });
  });

  describe("initialize", () => {
    it("sets status to 'unavailable' when Freighter is not installed", async () => {
      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(false),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("unavailable");
      expect(state.publicKey).toBeNull();
    });

    it("sets status to 'available' when installed but no persisted session", async () => {
      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("available");
      expect(state.publicKey).toBeNull();
    });

    it("restores 'connected' from valid persisted session", async () => {
      // Persist a valid session
      const session = {
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
        wasConnected: true,
      };
      localStorage.setItem("wallet-session", JSON.stringify(session));

      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockResolvedValue("GABC1234567890ABCDEF"),
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
        getBalance: vi.fn().mockResolvedValue("100.0"),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("connected");
      expect(state.publicKey).toBe("GABC1234567890ABCDEF");
      expect(state.network).toBe("TESTNET");
      expect(state.balance).toBe("100.0");
    });

    it("downgrades to 'available' when persisted address does not match", async () => {
      const session = {
        publicKey: "GOLD_ADDRESS",
        network: "TESTNET",
        wasConnected: true,
      };
      localStorage.setItem("wallet-session", JSON.stringify(session));

      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockResolvedValue("GNEW_ADDRESS"),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("available");
      expect(state.publicKey).toBeNull();
      // Session should be cleared
      expect(localStorage.getItem("wallet-session")).toBeNull();
    });

    it("downgrades to 'available' when session revalidation fails", async () => {
      const session = {
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
        wasConnected: true,
      };
      localStorage.setItem("wallet-session", JSON.stringify(session));

      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockRejectedValue(new Error("User declined")),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("available");
      expect(state.publicKey).toBeNull();
      expect(localStorage.getItem("wallet-session")).toBeNull();
    });

    it("handles corrupted localStorage gracefully", async () => {
      localStorage.setItem("wallet-session", "NOT_VALID_JSON!!!");

      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).toBe("available");
    });
  });

  describe("connect", () => {
    it("transitions: available → connecting → connected", async () => {
      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockResolvedValue("GABC1234567890ABCDEF"),
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
        getBalance: vi.fn().mockResolvedValue("100.0"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({ status: "available" });

      await useWalletStore.getState().connect();

      const state = useWalletStore.getState();
      expect(state.status).toBe("connected");
      expect(state.publicKey).toBe("GABC1234567890ABCDEF");
      expect(state.balance).toBe("100.0");
      expect(state.error).toBeNull();
    });

    it("transitions to 'error' with WalletError on failure", async () => {
      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockRejectedValue(
          new WalletError(WalletErrorCode.USER_DECLINED),
        ),
      });
      setWalletProvider(mock);

      useWalletStore.setState({ status: "available" });

      await useWalletStore.getState().connect();

      const state = useWalletStore.getState();
      expect(state.status).toBe("error");
      expect(state.error).toBeInstanceOf(WalletError);
      expect(state.error?.code).toBe(WalletErrorCode.USER_DECLINED);
    });

    it("persists session to localStorage on success", async () => {
      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockResolvedValue("GABC1234567890ABCDEF"),
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
        getBalance: vi.fn().mockResolvedValue("100.0"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({ status: "available" });
      await useWalletStore.getState().connect();

      const stored = JSON.parse(localStorage.getItem("wallet-session")!);
      expect(stored.publicKey).toBe("GABC1234567890ABCDEF");
      expect(stored.network).toBe("TESTNET");
      expect(stored.wasConnected).toBe(true);
    });
  });

  describe("disconnect", () => {
    it("transitions from 'connected' to 'available' and clears session", async () => {
      const mockDisconnect = vi.fn().mockResolvedValue(undefined);
      const mock = createMockProvider({ disconnect: mockDisconnect });
      setWalletProvider(mock);

      // Set up a connected state with persisted session
      localStorage.setItem(
        "wallet-session",
        JSON.stringify({
          publicKey: "GABC",
          network: "TESTNET",
          wasConnected: true,
        }),
      );
      useWalletStore.setState({
        status: "connected",
        publicKey: "GABC",
        network: "TESTNET",
        balance: "50.0",
      });

      await useWalletStore.getState().disconnect();

      const state = useWalletStore.getState();
      expect(state.status).toBe("available");
      expect(state.publicKey).toBeNull();
      expect(state.balance).toBe("0.0");
      expect(localStorage.getItem("wallet-session")).toBeNull();
      expect(mockDisconnect).toHaveBeenCalled();
    });
  });

  describe("signStellarTransaction", () => {
    it("throws SESSION_STALE when not connected", async () => {
      useWalletStore.setState({ status: "available", publicKey: null });

      await expect(
        useWalletStore.getState().signStellarTransaction("mock-xdr"),
      ).rejects.toMatchObject({ code: WalletErrorCode.SESSION_STALE });
    });

    it("throws NETWORK_MISMATCH when Freighter network differs from app", async () => {
      const mock = createMockProvider({
        getNetwork: vi.fn().mockResolvedValue("PUBLIC"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
      });

      await expect(
        useWalletStore.getState().signStellarTransaction("mock-xdr"),
      ).rejects.toMatchObject({ code: WalletErrorCode.NETWORK_MISMATCH });

      const state = useWalletStore.getState();
      expect(state.error).toBeInstanceOf(WalletError);
      expect(state.error?.code).toBe(WalletErrorCode.NETWORK_MISMATCH);
    });

    it("returns signed XDR when networks match", async () => {
      const mock = createMockProvider({
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
        signTransaction: vi.fn().mockResolvedValue("signed-xdr-result"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
      });

      const result = await useWalletStore
        .getState()
        .signStellarTransaction("mock-xdr");

      expect(result).toBe("signed-xdr-result");
    });

    it("throws USER_DECLINED when Freighter signing fails", async () => {
      const mock = createMockProvider({
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
        signTransaction: vi.fn().mockRejectedValue(new Error("User rejected")),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
      });

      await expect(
        useWalletStore.getState().signStellarTransaction("mock-xdr"),
      ).rejects.toMatchObject({ code: WalletErrorCode.USER_DECLINED });
    });
  });

  describe("refreshBalance", () => {
    it("updates balance when connected", async () => {
      const mock = createMockProvider({
        getBalance: vi.fn().mockResolvedValue("250.5"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        publicKey: "GABC",
        network: "TESTNET",
      });

      await useWalletStore.getState().refreshBalance();

      expect(useWalletStore.getState().balance).toBe("250.5");
    });

    it("does nothing when not connected", async () => {
      const mock = createMockProvider();
      setWalletProvider(mock);

      useWalletStore.setState({ status: "available" });

      await useWalletStore.getState().refreshBalance();

      expect(useWalletStore.getState().balance).toBe("0.0");
    });
  });

  describe("checkNetworkMismatch", () => {
    it("returns true when networks differ", async () => {
      const mock = createMockProvider({
        getNetwork: vi.fn().mockResolvedValue("PUBLIC"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        network: "TESTNET",
      });

      const hasMismatch = await useWalletStore
        .getState()
        .checkNetworkMismatch();
      expect(hasMismatch).toBe(true);
    });

    it("returns false when networks match", async () => {
      const mock = createMockProvider({
        getNetwork: vi.fn().mockResolvedValue("TESTNET"),
      });
      setWalletProvider(mock);

      useWalletStore.setState({
        status: "connected",
        network: "TESTNET",
      });

      const hasMismatch = await useWalletStore
        .getState()
        .checkNetworkMismatch();
      expect(hasMismatch).toBe(false);
    });

    it("returns false when not connected", async () => {
      useWalletStore.setState({ status: "available" });

      const hasMismatch = await useWalletStore
        .getState()
        .checkNetworkMismatch();
      expect(hasMismatch).toBe(false);
    });
  });

  describe("stale session rendering", () => {
    it("never shows 'connected' for stale persisted sessions", async () => {
      // Simulate a stale session where the wallet is no longer accessible
      const staleSession = {
        publicKey: "GABC1234567890ABCDEF",
        network: "TESTNET",
        wasConnected: true,
      };
      localStorage.setItem("wallet-session", JSON.stringify(staleSession));

      const mock = createMockProvider({
        isInstalled: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockRejectedValue(new Error("Extension removed")),
      });
      setWalletProvider(mock);

      await useWalletStore.getState().initialize();

      const state = useWalletStore.getState();
      expect(state.status).not.toBe("connected");
      expect(state.status).toBe("available");
    });
  });
});
