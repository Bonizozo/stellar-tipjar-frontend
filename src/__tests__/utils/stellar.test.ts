import { describe, it, expect } from "vitest";
import {
  getNetworkPassphrase,
  formatAddress,
  getBalance,
  STELLAR_NETWORK,
  STELLAR_HORIZON_URL,
} from "@/utils/stellar";
import { NETWORKS } from "@/lib/wallet";

describe("stellar utility", () => {
  it("exports STELLAR_NETWORK and STELLAR_HORIZON_URL", () => {
    expect(STELLAR_NETWORK).toBeDefined();
    expect(STELLAR_HORIZON_URL).toBeDefined();
  });

  it("returns passphrase for default network", () => {
    const passphrase = getNetworkPassphrase();
    expect(passphrase).toBe(NETWORKS[STELLAR_NETWORK].passphrase);
  });

  it("returns passphrase for explicit StellarNetwork", () => {
    expect(getNetworkPassphrase("TESTNET")).toBe(NETWORKS["TESTNET"].passphrase);
    expect(getNetworkPassphrase("PUBLIC")).toBe(NETWORKS["PUBLIC"].passphrase);
  });

  it("formats Stellar address correctly", () => {
    const addr = "GABC1234567890XYZWXYZ";
    expect(formatAddress(addr)).toBe("GABC...WXYZ");
    expect(formatAddress("")).toBe("");
  });

  it("getBalance returns account balance for default and explicit network", async () => {
    const balance = await getBalance("GBAD_TEST_KEY");
    expect(balance).toBe("0.0");

    const testnetBalance = await getBalance("GBAD_TEST_KEY", "TESTNET");
    expect(testnetBalance).toBe("0.0");
  });
});
