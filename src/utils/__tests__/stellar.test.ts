import { describe, it, expect } from "vitest";
import {
  formatAddress,
  getNetworkPassphrase,
  STELLAR_NETWORK,
  type StellarNetwork,
} from "../stellar";

describe("Stellar Utilities & Network Types (#588)", () => {
  it("formats Stellar public key addresses with truncation", () => {
    expect(formatAddress("GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")).toBe("GBXX...XXXX");
    expect(formatAddress("")).toBe("");
  });

  it("retrieves the network passphrase for default and explicit networks", () => {
    const defaultPassphrase = getNetworkPassphrase();
    expect(typeof defaultPassphrase).toBe("string");
    expect(defaultPassphrase.length).toBeGreaterThan(0);

    const testnetPassphrase = getNetworkPassphrase("TESTNET");
    expect(testnetPassphrase).toBe("Test SDF Network ; September 2015");

    const publicPassphrase = getNetworkPassphrase("PUBLIC");
    expect(publicPassphrase).toBe("Public Global Stellar Network ; September 2015");
  });

  it("exports STELLAR_NETWORK matching StellarNetwork type", () => {
    const network: StellarNetwork = STELLAR_NETWORK;
    expect(["TESTNET", "PUBLIC"]).toContain(network);
  });
});
