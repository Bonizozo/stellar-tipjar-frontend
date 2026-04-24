/**
 * Tests for contract state backup and recovery
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { StateExporter, ContractState } from "../state-exporter";
import { StateImporter } from "../state-importer";
import { BackupScheduler } from "../backup-scheduler";

const MOCK_CONTRACT_ID = "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4";
const MOCK_NETWORK = "testnet" as const;

function makeMockState(overrides: Partial<ContractState> = {}): ContractState {
  const base: Omit<ContractState, "metadata"> = {
    version: 1,
    creators: [
      {
        address: "GABC123",
        username: "creator1",
        displayName: "Creator One",
        totalReceived: "1000",
        createdAt: 1700000000,
      },
    ],
    tips: [
      {
        id: "tip_1",
        sender: "GSENDER",
        recipient: "GABC123",
        amount: "100",
        asset: "XLM",
        message: "Great work!",
        timestamp: 1700000100,
        txHash: "abc123",
      },
    ],
    balances: { GABC123: "900" },
  };

  const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
  const checksum = exporter.computeChecksum(base);

  return {
    ...base,
    ...overrides,
    metadata: {
      exportedAt: Date.now(),
      exportedBy: "test",
      network: MOCK_NETWORK,
      contractId: MOCK_CONTRACT_ID,
      checksum,
      ...(overrides.metadata ?? {}),
    },
  };
}

// ── StateExporter ─────────────────────────────────────────────────────────────

describe("StateExporter", () => {
  it("computes a stable checksum for the same state", () => {
    const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    const { metadata: _m, ...rest } = state;
    const c1 = exporter.computeChecksum(rest);
    const c2 = exporter.computeChecksum(rest);
    expect(c1).toBe(c2);
    expect(c1).toHaveLength(64); // sha256 hex
  });

  it("produces different checksums for different states", () => {
    const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const s1 = makeMockState();
    const s2 = makeMockState();
    s2.balances["GNEW"] = "500";
    const { metadata: _m1, ...r1 } = s1;
    const { metadata: _m2, ...r2 } = s2;
    expect(exporter.computeChecksum(r1)).not.toBe(exporter.computeChecksum(r2));
  });

  it("verifyChecksum returns true for valid state", () => {
    const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    expect(exporter.verifyChecksum(state)).toBe(true);
  });

  it("verifyChecksum returns false when state is tampered", () => {
    const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    state.balances["GABC123"] = "9999999"; // tamper
    expect(exporter.verifyChecksum(state)).toBe(false);
  });
});

// ── StateImporter ─────────────────────────────────────────────────────────────

describe("StateImporter", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tipjar-backup-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("loads a plain JSON backup from disk", async () => {
    const state = makeMockState();
    const filePath = path.join(tmpDir, "backup.json");
    fs.writeFileSync(filePath, JSON.stringify(state), "utf-8");

    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const loaded = await importer.loadBackup(filePath);
    expect(loaded.creators).toHaveLength(1);
    expect(loaded.tips).toHaveLength(1);
  });

  it("throws when backup file does not exist", async () => {
    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    await expect(importer.loadBackup("/nonexistent/path.json")).rejects.toThrow("not found");
  });

  it("verifyBackup passes for a valid state", () => {
    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    const { valid, errors } = importer.verifyBackup(state);
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it("verifyBackup fails for wrong contractId", () => {
    const importer = new StateImporter({ contractId: "CWRONG", network: MOCK_NETWORK });
    const state = makeMockState();
    const { valid, errors } = importer.verifyBackup(state);
    expect(valid).toBe(false);
    expect(errors.some((e) => e.includes("Contract ID mismatch"))).toBe(true);
  });

  it("verifyBackup fails for wrong network", () => {
    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: "mainnet" });
    const state = makeMockState();
    const { valid, errors } = importer.verifyBackup(state);
    expect(valid).toBe(false);
    expect(errors.some((e) => e.includes("Network mismatch"))).toBe(true);
  });

  it("verifyBackup fails when checksum is tampered", () => {
    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    state.balances["GABC123"] = "99999"; // tamper after checksum was set
    const { valid, errors } = importer.verifyBackup(state);
    expect(valid).toBe(false);
    expect(errors.some((e) => e.includes("Checksum mismatch"))).toBe(true);
  });

  it("dryRun returns success without writing anything", async () => {
    const importer = new StateImporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
    const state = makeMockState();
    const result = await importer.dryRun(state);
    expect(result.success).toBe(true);
    expect(result.creatorsRestored).toBe(1);
    expect(result.tipsRestored).toBe(1);
    expect(result.balancesRestored).toBe(1);
  });
});

// ── Encryption round-trip ─────────────────────────────────────────────────────

describe("Encryption round-trip", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tipjar-enc-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("encrypted backup can be decrypted and verified by StateImporter", async () => {
    const key = "super-secret-key-123";

    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      encryptionKey: key,
    });

    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());
    const record = await scheduler.runBackup();

    // Importer should decrypt and verify successfully
    const importer = new StateImporter({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      encryptionKey: key,
    });

    const loaded = await importer.loadBackup(record.filePath);
    const { valid, errors } = importer.verifyBackup(loaded);
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);
    expect(loaded.creators).toHaveLength(1);
    expect(loaded.tips).toHaveLength(1);
  });

  it("decryption fails with wrong key", async () => {
    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      encryptionKey: "correct-key",
    });

    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());
    const record = await scheduler.runBackup();

    const importer = new StateImporter({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      encryptionKey: "wrong-key",
    });

    await expect(importer.loadBackup(record.filePath)).rejects.toThrow();
  });
});

// ── IPFS upload ───────────────────────────────────────────────────────────────

describe("BackupScheduler IPFS upload", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tipjar-ipfs-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    vi.restoreAllMocks();
  });

  it("calls Kubo /api/v0/add and logs the CID", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ Hash: "QmTestCID123" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      storageBackend: "ipfs",
      ipfs: { apiUrl: "http://localhost:5001" },
    });

    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());
    await scheduler.runBackup();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/v0/add"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("calls Pinata /pinning/pinJSONToIPFS when apiUrl contains pinata", async () => {
    process.env.PINATA_JWT = "test-jwt-token";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ IpfsHash: "QmPinataCID456" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      storageBackend: "ipfs",
      ipfs: { apiUrl: "https://api.pinata.cloud" },
    });

    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());
    await scheduler.runBackup();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("pinJSONToIPFS"),
      expect.objectContaining({ method: "POST" })
    );
    delete process.env.PINATA_JWT;
  });
});

describe("BackupScheduler", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "tipjar-scheduler-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("saves a backup file and manifest on runBackup", async () => {
    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
    });

    // Mock exportState so we don't hit the network
    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());

    const record = await scheduler.runBackup();
    expect(fs.existsSync(record.filePath)).toBe(true);
    expect(record.checksum).toHaveLength(64);

    const manifest = scheduler.getManifest();
    expect(manifest.backups).toHaveLength(1);
    expect(fs.existsSync(path.join(tmpDir, "manifest.json"))).toBe(true);
  });

  it("skips incremental backup when state is unchanged", async () => {
    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
    });

    const mockState = makeMockState();
    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(mockState);

    await scheduler.runBackup(false); // full backup
    const r2 = await scheduler.runBackup(true); // incremental — same state

    // Should return the same record (no new file)
    expect(scheduler.getManifest().backups).toHaveLength(1);
    expect(r2.id).toBe(scheduler.getManifest().backups[0].id);
  });

  it("prunes old backups beyond maxBackups", async () => {
    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      maxBackups: 2,
    });

    let counter = 0;
    vi.spyOn(scheduler["exporter"], "exportState").mockImplementation(async () => {
      const s = makeMockState();
      s.balances[`G${counter++}`] = "1"; // ensure different checksum each time
      const exporter = new StateExporter({ contractId: MOCK_CONTRACT_ID, network: MOCK_NETWORK });
      const { metadata: _m, ...rest } = s;
      s.metadata.checksum = exporter.computeChecksum(rest);
      return s;
    });

    await scheduler.runBackup();
    await scheduler.runBackup();
    await scheduler.runBackup(); // should prune first

    expect(scheduler.getManifest().backups).toHaveLength(2);
  });

  it("encrypts backup when encryptionKey is provided", async () => {
    const scheduler = new BackupScheduler({
      contractId: MOCK_CONTRACT_ID,
      network: MOCK_NETWORK,
      outputDir: tmpDir,
      intervalMs: 999999,
      encryptionKey: "test-secret-key",
    });

    vi.spyOn(scheduler["exporter"], "exportState").mockResolvedValue(makeMockState());

    const record = await scheduler.runBackup();
    const content = fs.readFileSync(record.filePath, "utf-8");
    const parsed = JSON.parse(content);

    // Encrypted format has iv, data, tag — not raw state fields
    expect(parsed).toHaveProperty("iv");
    expect(parsed).toHaveProperty("data");
    expect(parsed).toHaveProperty("tag");
    expect(parsed).not.toHaveProperty("creators");
  });
});
