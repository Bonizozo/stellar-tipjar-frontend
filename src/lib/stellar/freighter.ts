import {
  getAddress,
  getNetwork,
  isAllowed,
  isConnected,
  setAllowed,
  signTransaction,
} from "@stellar/freighter-api";
import { Horizon, Networks } from "@stellar/stellar-sdk";

import type { StellarNetwork, WalletProvider } from "@/lib/stellar/types";

const TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
const PUBLIC_HORIZON_URL = "https://horizon.stellar.org";

const NETWORK_PASSPHRASES: Record<StellarNetwork, string> = {
  PUBLIC: Networks.PUBLIC,
  TESTNET: Networks.TESTNET,
};

function readBooleanProp(value: unknown, key: string): boolean {
  if (typeof value === "object" && value !== null && key in value) {
    return (value as Record<string, unknown>)[key] === true;
  }

  return value === true;
}

function readStringProp(value: unknown, key: string): string | null {
  if (typeof value === "object" && value !== null && key in value) {
    const prop = (value as Record<string, unknown>)[key];
    return typeof prop === "string" ? prop : null;
  }

  return null;
}

function normalizeNetwork(value: unknown): StellarNetwork {
  const networkText =
    typeof value === "string"
      ? value
      : readStringProp(value, "network") ?? readStringProp(value, "networkUrl") ?? "TESTNET";

  const normalized = networkText.toUpperCase();
  return normalized === "PUBLIC" || normalized.includes("PUBNET") ? "PUBLIC" : "TESTNET";
}

function horizonForNetwork(network: StellarNetwork): Horizon.Server {
  return new Horizon.Server(network === "PUBLIC" ? PUBLIC_HORIZON_URL : TESTNET_HORIZON_URL);
}

export class FreighterWallet implements WalletProvider {
  readonly provider = "freighter" as const;

  async isInstalled(): Promise<boolean> {
    try {
      const result = await isConnected();
      return readBooleanProp(result, "isConnected");
    } catch {
      return false;
    }
  }

  async connect(): Promise<string> {
    if (!(await this.isInstalled())) {
      throw new Error("Freighter wallet is not installed. Please install it from https://freighter.app");
    }

    const allowed = await isAllowed();
    if (!readBooleanProp(allowed, "isAllowed")) {
      const consent = await setAllowed();
      if (!readBooleanProp(consent, "isAllowed")) {
        throw new Error("Wallet permission was declined.");
      }
    }

    const addressResult = await getAddress();
    if (typeof addressResult === "string") {
      return addressResult;
    }

    const address = readStringProp(addressResult, "address") ?? readStringProp(addressResult, "publicKey");
    if (!address) {
      throw new Error(readStringProp(addressResult, "error") ?? "Failed to get public key from Freighter.");
    }

    return address;
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  async getNetwork(): Promise<StellarNetwork> {
    try {
      const result = await getNetwork();
      return normalizeNetwork(result);
    } catch {
      return "TESTNET";
    }
  }

  async signTransaction(xdr: string, network: StellarNetwork): Promise<string> {
    const result = await signTransaction(xdr, {
      network,
      networkPassphrase: NETWORK_PASSPHRASES[network],
    });

    if (typeof result === "string") {
      return result;
    }

    const signed = readStringProp(result, "signedTxXdr") ?? readStringProp(result, "signedXDR");
    if (!signed) {
      throw new Error(readStringProp(result, "error") ?? "Failed to sign transaction.");
    }

    return signed;
  }

  async getBalance(publicKey: string, network: StellarNetwork): Promise<string> {
    try {
      const account = await horizonForNetwork(network).loadAccount(publicKey);
      const nativeBalance = account.balances.find((balance) => balance.asset_type === "native");
      return nativeBalance?.balance ?? "0.0";
    } catch {
      return "0.0";
    }
  }
}
