/**
 * Backup Scheduler
 * Automates periodic contract state snapshots with incremental support
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { StateExporter, ContractState, ExporterConfig } from "./state-exporter";

export interface SchedulerConfig extends ExporterConfig {
  outputDir: string;
  intervalMs: number;
  maxBackups?: number;
  encryptionKey?: string;
  storageBackend?: "local" | "s3" | "ipfs";
  s3?: {
    bucket: string;
    region: string;
    prefix?: string;
  };
  ipfs?: {
    apiUrl: string;
  };
}

export interface BackupRecord {
  id: string;
  timestamp: number;
  filePath: string;
  checksum: string;
  size: number;
  incremental: boolean;
  previousBackupId?: string;
}

export interface BackupManifest {
  contractId: string;
  network: string;
  backups: BackupRecord[];
  lastFullBackup?: string;
}

export class BackupScheduler {
  private config: SchedulerConfig;
  private exporter: StateExporter;
  private timer: ReturnType<typeof setInterval> | null = null;
  private manifest: BackupManifest;
  private manifestPath: string;

  constructor(config: SchedulerConfig) {
    this.config = { maxBackups: 30, ...config };
    this.exporter = new StateExporter(config);
    this.manifestPath = path.join(config.outputDir, "manifest.json");
    this.manifest = this.loadManifest();
  }

  /** Start automated backups on the configured interval */
  start(): void {
    if (this.timer) return;
    console.log(
      `Backup scheduler started. Interval: ${this.config.intervalMs}ms`
    );
    // Run immediately, then on interval
    this.runBackup().catch(console.error);
    this.timer = setInterval(() => {
      this.runBackup().catch(console.error);
    }, this.config.intervalMs);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log("Backup scheduler stopped.");
    }
  }

  /** Run a single backup cycle */
  async runBackup(incremental = false): Promise<BackupRecord> {
    const state = await this.exporter.exportState();
    const lastBackup = this.getLastBackup();

    // Incremental: skip if state hasn't changed
    if (incremental && lastBackup) {
      const { metadata: _m, ...rest } = state;
      const currentChecksum = this.exporter.computeChecksum(rest);
      if (currentChecksum === lastBackup.checksum) {
        console.log("No state changes detected, skipping incremental backup.");
        return lastBackup;
      }
    }

    const record = await this.saveBackup(state, incremental, lastBackup?.id);
    this.manifest.backups.push(record);

    if (!incremental) {
      this.manifest.lastFullBackup = record.id;
    }

    this.pruneOldBackups();
    this.saveManifest();

    console.log(`Backup saved: ${record.id} (${record.size} bytes)`);
    return record;
  }

  private async saveBackup(
    state: ContractState,
    incremental: boolean,
    previousId?: string
  ): Promise<BackupRecord> {
    fs.mkdirSync(this.config.outputDir, { recursive: true });

    const id = `backup_${this.config.contractId}_${Date.now()}`;
    const fileName = `${id}.json`;
    const filePath = path.join(this.config.outputDir, fileName);

    let content = JSON.stringify(state, null, 2);

    if (this.config.encryptionKey) {
      content = this.encrypt(content, this.config.encryptionKey);
    }

    fs.writeFileSync(filePath, content, "utf-8");

    const { metadata: _m, ...rest } = state;
    const checksum = this.exporter.computeChecksum(rest);

    const record: BackupRecord = {
      id,
      timestamp: Date.now(),
      filePath,
      checksum,
      size: Buffer.byteLength(content),
      incremental,
      previousBackupId: previousId,
    };

    // Upload to remote storage if configured
    if (this.config.storageBackend === "s3") {
      await this.uploadToS3(filePath, fileName, content);
    } else if (this.config.storageBackend === "ipfs") {
      const cid = await this.uploadToIPFS(content);
      console.log(`IPFS CID: ${cid}`);
    }

    return record;
  }

  private encrypt(data: string, key: string): string {
    const keyBuf = crypto.scryptSync(key, "salt", 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-gcm", keyBuf, iv);
    const encrypted = cipher.update(data, "utf8", "hex") + cipher.final("hex");
    const tag = cipher.getAuthTag().toString("hex");
    return JSON.stringify({ iv: iv.toString("hex"), data: encrypted, tag });
  }

  private async uploadToS3(
    _filePath: string,
    fileName: string,
    content: string
  ): Promise<void> {
    const { s3 } = this.config;
    if (!s3) return;
    const key = `${s3.prefix ?? "backups"}/${fileName}`;
    const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");
    const client = new S3Client({ region: s3.region });
    await client.send(
      new PutObjectCommand({
        Bucket: s3.bucket,
        Key: key,
        Body: content,
        ContentType: "application/json",
        ServerSideEncryption: "AES256",
      })
    );
    console.log(`[S3] Uploaded to s3://${s3.bucket}/${key}`);
  }

  private async uploadToIPFS(content: string): Promise<string> {
    const { ipfs } = this.config;
    if (!ipfs) return "";

    // Compatible with Kubo RPC API (/api/v0/add) and Pinata (/pinning/pinJSONToIPFS)
    const isPinata = ipfs.apiUrl.includes("pinata");

    if (isPinata) {
      const response = await fetch(`${ipfs.apiUrl}/pinning/pinJSONToIPFS`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT ?? ""}`,
        },
        body: JSON.stringify({
          pinataContent: JSON.parse(content),
          pinataMetadata: { name: `tipjar-backup-${Date.now()}` },
        }),
      });
      if (!response.ok) {
        throw new Error(`Pinata upload failed: ${response.status} ${response.statusText}`);
      }
      const data = (await response.json()) as { IpfsHash: string };
      console.log(`[IPFS/Pinata] CID: ${data.IpfsHash}`);
      return data.IpfsHash;
    }

    // Kubo RPC: multipart form POST to /api/v0/add
    const blob = new Blob([content], { type: "application/json" });
    const form = new FormData();
    form.append("file", blob, "backup.json");

    const response = await fetch(`${ipfs.apiUrl}/api/v0/add?pin=true`, {
      method: "POST",
      body: form,
    });
    if (!response.ok) {
      throw new Error(`IPFS upload failed: ${response.status} ${response.statusText}`);
    }
    const data = (await response.json()) as { Hash: string };
    console.log(`[IPFS/Kubo] CID: ${data.Hash}`);
    return data.Hash;
  }

  private pruneOldBackups(): void {
    const max = this.config.maxBackups ?? 30;
    while (this.manifest.backups.length > max) {
      const oldest = this.manifest.backups.shift();
      if (oldest && fs.existsSync(oldest.filePath)) {
        fs.unlinkSync(oldest.filePath);
        console.log(`Pruned old backup: ${oldest.id}`);
      }
    }
  }

  getLastBackup(): BackupRecord | undefined {
    return this.manifest.backups[this.manifest.backups.length - 1];
  }

  getManifest(): BackupManifest {
    return this.manifest;
  }

  private loadManifest(): BackupManifest {
    if (fs.existsSync(this.manifestPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.manifestPath, "utf-8"));
      } catch {
        // fall through to default
      }
    }
    return {
      contractId: this.config.contractId,
      network: this.config.network,
      backups: [],
    };
  }

  private saveManifest(): void {
    fs.mkdirSync(this.config.outputDir, { recursive: true });
    fs.writeFileSync(
      this.manifestPath,
      JSON.stringify(this.manifest, null, 2),
      "utf-8"
    );
  }
}
