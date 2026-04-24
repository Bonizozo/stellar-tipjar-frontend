/**
 * Contract State Exporter
 * Exports Stellar contract state to JSON for backup purposes
 */

import * as StellarSdk from "@stellar/stellar-sdk";
import * as crypto from "crypto";

export interface Creator {
  address: string;
  username: string;
  displayName: string;
  totalReceived: string;
  createdAt: number;
}

export interface Tip {
  id: string;
  sender: string;
  recipient: string;
  amount: string;
  asset: string;
  message: string;
  timestamp: number;
  txHash: string;
}

export interface StateMetadata {
  exportedAt: number;
  exportedBy: string;
  network: string;
  contractId: string;
  blockHeight?: number;
  checksum: string;
}

export interface ContractState {
  version: number;
  creators: Creator[];
  tips: Tip[];
  balances: Record<string, string>;
  metadata: StateMetadata;
}

export interface ExporterConfig {
  contractId: string;
  network: "testnet" | "mainnet" | "futurenet";
  rpcUrl?: string;
}

const NETWORK_URLS: Record<string, string> = {
  testnet: "https://soroban-testnet.stellar.org",
  mainnet: "https://mainnet.stellar.validationcloud.io/v1/soroban",
  futurenet: "https://rpc-futurenet.stellar.org",
};

export class StateExporter {
  private server: StellarSdk.SorobanRpc.Server;
  private contractId: string;
  private network: string;

  constructor(config: ExporterConfig) {
    this.contractId = config.contractId;
    this.network = config.network;
    const rpcUrl = config.rpcUrl ?? NETWORK_URLS[config.network];
    this.server = new StellarSdk.SorobanRpc.Server(rpcUrl, {
      allowHttp: rpcUrl.startsWith("http://"),
    });
  }

  async exportState(): Promise<ContractState> {
    console.log(`Exporting state for contract: ${this.contractId}`);

    const [creators, tips, balances] = await Promise.all([
      this.exportCreators(),
      this.exportTips(),
      this.exportBalances(),
    ]);

    const state: Omit<ContractState, "metadata"> = {
      version: 1,
      creators,
      tips,
      balances,
    };

    const checksum = this.computeChecksum(state);

    return {
      ...state,
      metadata: {
        exportedAt: Date.now(),
        exportedBy: "state-exporter",
        network: this.network,
        contractId: this.contractId,
        checksum,
      },
    };
  }

  private async exportCreators(): Promise<Creator[]> {
    try {
      const ledgerKey = StellarSdk.xdr.LedgerKey.contractData(
        new StellarSdk.xdr.LedgerKeyContractData({
          contract: new StellarSdk.Address(this.contractId).toScAddress(),
          key: StellarSdk.xdr.ScVal.scvSymbol("creators"),
          durability: StellarSdk.xdr.ContractDataDurability.persistent(),
        })
      );

      const response = await this.server.getLedgerEntries(ledgerKey);
      if (!response.entries?.length) return [];

      const entry = response.entries[0];
      return this.parseCreatorsFromLedgerEntry(entry);
    } catch (err) {
      console.warn("Could not fetch creators from contract storage:", err);
      return [];
    }
  }

  private async exportTips(): Promise<Tip[]> {
    try {
      const ledgerKey = StellarSdk.xdr.LedgerKey.contractData(
        new StellarSdk.xdr.LedgerKeyContractData({
          contract: new StellarSdk.Address(this.contractId).toScAddress(),
          key: StellarSdk.xdr.ScVal.scvSymbol("tips"),
          durability: StellarSdk.xdr.ContractDataDurability.persistent(),
        })
      );

      const response = await this.server.getLedgerEntries(ledgerKey);
      if (!response.entries?.length) return [];

      return this.parseTipsFromLedgerEntry(response.entries[0]);
    } catch (err) {
      console.warn("Could not fetch tips from contract storage:", err);
      return [];
    }
  }

  private async exportBalances(): Promise<Record<string, string>> {
    try {
      const ledgerKey = StellarSdk.xdr.LedgerKey.contractData(
        new StellarSdk.xdr.LedgerKeyContractData({
          contract: new StellarSdk.Address(this.contractId).toScAddress(),
          key: StellarSdk.xdr.ScVal.scvSymbol("balances"),
          durability: StellarSdk.xdr.ContractDataDurability.persistent(),
        })
      );

      const response = await this.server.getLedgerEntries(ledgerKey);
      if (!response.entries?.length) return {};

      return this.parseBalancesFromLedgerEntry(response.entries[0]);
    } catch (err) {
      console.warn("Could not fetch balances from contract storage:", err);
      return {};
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseCreatorsFromLedgerEntry(entry: any): Creator[] {
    try {
      const val = entry.val?.contractData()?.val();
      if (!val) return [];

      // ScVal vec of maps — each map entry corresponds to a Creator struct.
      // TODO(contracts-integration): The exact field names ("address",
      // "username", "display_name", "total_received", "created_at") must
      // match the Soroban contract's storage schema in stellar-tipjar-contracts.
      // Update the symbol keys below once the contract ABI is confirmed.
      const vec = val.vec?.();
      if (!vec) return [];

      return vec.map((item: StellarSdk.xdr.ScVal) => {
        const map = this.scValToMap(item);
        return {
          address: map["address"] ?? "",
          username: map["username"] ?? "",
          displayName: map["display_name"] ?? "",
          totalReceived: map["total_received"] ?? "0",
          createdAt: parseInt(map["created_at"] ?? "0", 10),
        } satisfies Creator;
      });
    } catch (err) {
      console.warn("Failed to parse creators from ledger entry:", err);
      return [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseTipsFromLedgerEntry(entry: any): Tip[] {
    try {
      const val = entry.val?.contractData()?.val();
      if (!val) return [];

      // TODO(contracts-integration): Field names must match the Tip struct
      // in stellar-tipjar-contracts. Confirm "tx_hash" vs "txHash" etc.
      const vec = val.vec?.();
      if (!vec) return [];

      return vec.map((item: StellarSdk.xdr.ScVal) => {
        const map = this.scValToMap(item);
        return {
          id: map["id"] ?? "",
          sender: map["sender"] ?? "",
          recipient: map["recipient"] ?? "",
          amount: map["amount"] ?? "0",
          asset: map["asset"] ?? "XLM",
          message: map["message"] ?? "",
          timestamp: parseInt(map["timestamp"] ?? "0", 10),
          txHash: map["tx_hash"] ?? "",
        } satisfies Tip;
      });
    } catch (err) {
      console.warn("Failed to parse tips from ledger entry:", err);
      return [];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private parseBalancesFromLedgerEntry(entry: any): Record<string, string> {
    try {
      const val = entry.val?.contractData()?.val();
      if (!val) return {};

      // TODO(contracts-integration): Balances may be stored as a Map<Address, i128>
      // or as individual per-address ledger keys. Confirm storage layout in
      // stellar-tipjar-contracts before relying on this output.
      const map = val.map?.();
      if (!map) return {};

      const result: Record<string, string> = {};
      for (const entry of map) {
        const key = this.scValToString(entry.key());
        const value = this.scValToString(entry.val());
        if (key) result[key] = value;
      }
      return result;
    } catch (err) {
      console.warn("Failed to parse balances from ledger entry:", err);
      return {};
    }
  }

  /**
   * Convert a ScVal map into a plain string Record.
   * Handles scvMap with symbol or string keys.
   */
  private scValToMap(val: StellarSdk.xdr.ScVal): Record<string, string> {
    const result: Record<string, string> = {};
    try {
      const map = val.map?.();
      if (!map) return result;
      for (const entry of map) {
        const key = this.scValToString(entry.key());
        const value = this.scValToString(entry.val());
        if (key) result[key] = value;
      }
    } catch {
      // ignore malformed entries
    }
    return result;
  }

  /**
   * Extract a string representation from any ScVal type.
   */
  private scValToString(val: StellarSdk.xdr.ScVal): string {
    try {
      switch (val.switch().name) {
        case "scvSymbol":
          return val.sym().toString();
        case "scvString":
          return val.str().toString();
        case "scvAddress":
          return StellarSdk.Address.fromScAddress(val.address()).toString();
        case "scvI128":
        case "scvU128": {
          const parts = (val as any).i128?.() ?? (val as any).u128?.();
          if (parts) {
            const hi = BigInt(parts.hi().toString());
            const lo = BigInt(parts.lo().toString());
            return ((hi << 64n) | lo).toString();
          }
          return "0";
        }
        case "scvI64":
          return val.i64().toString();
        case "scvU64":
          return val.u64().toString();
        case "scvU32":
          return val.u32().toString();
        case "scvI32":
          return val.i32().toString();
        case "scvBool":
          return val.b().toString();
        default:
          return "";
      }
    } catch {
      return "";
    }
  }

  computeChecksum(state: Omit<ContractState, "metadata">): string {
    const data = JSON.stringify(state, Object.keys(state).sort());
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  verifyChecksum(state: ContractState): boolean {
    const { metadata, ...rest } = state;
    const computed = this.computeChecksum(rest);
    return computed === metadata.checksum;
  }
}
