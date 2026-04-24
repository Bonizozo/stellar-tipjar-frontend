/**
 * Contract State Importer
 * Imports/restores contract state from a backup JSON
 */

import * as fs from "fs";
import * as crypto from "crypto";
import * as StellarSdk from "@stellar/stellar-sdk";
import { ContractState, StateExporter } from "./state-exporter";

export interface ImportResult {
  success: boolean;
  contractId: string;
  creatorsRestored: number;
  tipsRestored: number;
  balancesRestored: number;
  errors: string[];
}

export interface ImporterConfig {
  contractId: string;
  network: "testnet" | "mainnet" | "futurenet";
  encryptionKey?: string;
}

export class StateImporter {
  private config: ImporterConfig;

  constructor(config: ImporterConfig) {
    this.config = config;
  }

  /**
   * Load and parse a backup file (supports encrypted and plain JSON)
   */
  async loadBackup(filePath: string): Promise<ContractState> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Backup file not found: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, "utf-8");

    let state: ContractState;
    if (this.config.encryptionKey && this.isEncrypted(raw)) {
      const decrypted = this.decrypt(raw, this.config.encryptionKey);
      state = JSON.parse(decrypted);
    } else {
      state = JSON.parse(raw);
    }

    return state;
  }

  /**
   * Verify backup integrity before import
   */
  verifyBackup(state: ContractState): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!state.metadata) errors.push("Missing metadata");
    if (!state.metadata?.checksum) errors.push("Missing checksum");
    if (!state.metadata?.contractId) errors.push("Missing contractId");
    if (state.metadata?.contractId !== this.config.contractId) {
      errors.push(
        `Contract ID mismatch: expected ${this.config.contractId}, got ${state.metadata?.contractId}`
      );
    }
    if (state.metadata?.network !== this.config.network) {
      errors.push(
        `Network mismatch: expected ${this.config.network}, got ${state.metadata?.network}`
      );
    }

    // Verify checksum
    if (state.metadata?.checksum) {
      const exporter = new StateExporter({
        contractId: this.config.contractId,
        network: this.config.network,
      });
      const { metadata: _meta, ...rest } = state;
      const computed = exporter.computeChecksum(rest);
      if (computed !== state.metadata.checksum) {
        errors.push(
          `Checksum mismatch: data may be corrupted or tampered with`
        );
      }
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Perform a dry-run import — validates without writing
   */
  async dryRun(state: ContractState): Promise<ImportResult> {
    const { valid, errors } = this.verifyBackup(state);
    return {
      success: valid,
      contractId: this.config.contractId,
      creatorsRestored: valid ? state.creators.length : 0,
      tipsRestored: valid ? state.tips.length : 0,
      balancesRestored: valid ? Object.keys(state.balances).length : 0,
      errors,
    };
  }

  /**
   * Import state — submits a restore transaction to the contract's admin
   * endpoint using the provided keypair.
   *
   * TODO(contracts-integration): Replace "restore_state" with the actual
   * admin function name defined in stellar-tipjar-contracts. The XDR
   * encoding of `stateToScVal` must also match the contract's expected
   * argument types exactly.
   */
  async importState(
    state: ContractState,
    adminSecret: string
  ): Promise<ImportResult> {
    const { valid, errors } = this.verifyBackup(state);
    if (!valid) {
      return {
        success: false,
        contractId: this.config.contractId,
        creatorsRestored: 0,
        tipsRestored: 0,
        balancesRestored: 0,
        errors,
      };
    }

    try {
      const networkPassphrase =
        this.config.network === "mainnet"
          ? StellarSdk.Networks.PUBLIC
          : this.config.network === "futurenet"
          ? StellarSdk.Networks.FUTURENET
          : StellarSdk.Networks.TESTNET;

      const rpcUrls: Record<string, string> = {
        testnet: "https://soroban-testnet.stellar.org",
        mainnet: "https://mainnet.stellar.validationcloud.io/v1/soroban",
        futurenet: "https://rpc-futurenet.stellar.org",
      };

      const server = new StellarSdk.SorobanRpc.Server(
        rpcUrls[this.config.network]
      );
      const keypair = StellarSdk.Keypair.fromSecret(adminSecret);
      const account = await server.getAccount(keypair.publicKey());

      // Build the restore call — passes the full state JSON as a string arg.
      // TODO(contracts-integration): swap "restore_state" and arg encoding
      // to match the actual contract interface.
      const contract = new StellarSdk.Contract(this.config.contractId);
      const stateJson = StellarSdk.xdr.ScVal.scvString(
        JSON.stringify({ creators: state.creators, tips: state.tips, balances: state.balances })
      );

      const tx = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase,
      })
        .addOperation(contract.call("restore_state", stateJson))
        .setTimeout(30)
        .build();

      const prepared = await server.prepareTransaction(tx);
      prepared.sign(keypair);

      const result = await server.sendTransaction(prepared);

      if (result.status === "ERROR") {
        return {
          success: false,
          contractId: this.config.contractId,
          creatorsRestored: 0,
          tipsRestored: 0,
          balancesRestored: 0,
          errors: [`Transaction failed: ${JSON.stringify(result.errorResult)}`],
        };
      }

      console.log(`Restore transaction submitted: ${result.hash}`);
      console.log(`  Creators: ${state.creators.length}`);
      console.log(`  Tips: ${state.tips.length}`);
      console.log(`  Balances: ${Object.keys(state.balances).length}`);

      return {
        success: true,
        contractId: this.config.contractId,
        creatorsRestored: state.creators.length,
        tipsRestored: state.tips.length,
        balancesRestored: Object.keys(state.balances).length,
        errors: [],
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        contractId: this.config.contractId,
        creatorsRestored: 0,
        tipsRestored: 0,
        balancesRestored: 0,
        errors: [`Import failed: ${message}`],
      };
    }
  }

  private isEncrypted(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      return typeof parsed.iv === "string" && typeof parsed.data === "string";
    } catch {
      return false;
    }
  }

  private decrypt(encryptedJson: string, key: string): string {
    const { iv, data, tag } = JSON.parse(encryptedJson);
    const keyBuf = crypto.scryptSync(key, "salt", 32);
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      keyBuf,
      Buffer.from(iv, "hex")
    );
    decipher.setAuthTag(Buffer.from(tag, "hex"));
    return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
  }
}
