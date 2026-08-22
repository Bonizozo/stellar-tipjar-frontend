import {
  getAddress,
  getNetwork,
  isAllowed,
  isConnected,
  setAllowed,
  signTransaction as freighterSignTransaction,
} from "@stellar/freighter-api";
import { Horizon } from "@stellar/stellar-sdk";

import { WalletError, WalletErrorCode } from "./errors";
import {
  type StellarNetwork,
  NETWORKS,
  normalizeNetwork,
} from "./network";

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

export interface WalletProvider {
  isInstalled(): Promise<boolean>;
  connect(): Promise<string>;
  disconnect(): Promise<void>;
  getNetwork(): Promise<StellarNetwork>;
  getFreighterNetwork(): Promise<StellarNetwork>;
  signTransaction(xdr: string, network: StellarNetwork): Promise<string>;
  getBalance(publicKey: string, network: StellarNetwork): Promise<string>;
}

export class FreighterWallet implements WalletProvider {
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
      throw new WalletError(WalletErrorCode.NOT_INSTALLED);
    }

    const allowed = await isAllowed();
    if (!readBooleanProp(allowed, "isAllowed")) {
      const consent = await setAllowed();
      if (!readBooleanProp(consent, "isAllowed")) {
        throw new WalletError(WalletErrorCode.USER_DECLINED);
      }
    }

    const addressResult = await getAddress();
    if (typeof addressResult === "string") {
      return addressResult;
    }

    const address =
      readStringProp(addressResult, "address") ??
      readStringProp(addressResult, "publicKey");
    if (!address) {
      throw new WalletError(
        WalletErrorCode.USER_DECLINED,
        readStringProp(addressResult, "error") ?? "Failed to get public key from Freighter.",
      );
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

  async getFreighterNetwork(): Promise<StellarNetwork> {
    return this.getNetwork();
  }

  async signTransaction(
    xdr: string,
    network: StellarNetwork,
  ): Promise<string> {
    const result = await freighterSignTransaction(xdr, {
      networkPassphrase: NETWORKS[network].passphrase,
    });

    if (typeof result === "string") {
      return result;
    }

    const signed =
      readStringProp(result, "signedTxXdr") ??
      readStringProp(result, "signedXDR");
    if (!signed) {
      throw new Error(
        readStringProp(result, "error") ?? "Failed to sign transaction.",
      );
    }

    return signed;
  }

  async getBalance(
    publicKey: string,
    network: StellarNetwork,
  ): Promise<string> {
    try {
      const server = new Horizon.Server(NETWORKS[network].horizonUrl);
      const account = await server.loadAccount(publicKey);
      const nativeBalance = account.balances.find(
        (b) => b.asset_type === "native",
      );
      return nativeBalance?.balance ?? "0.0";
    } catch {
      return "0.0";
    }
  }
}
