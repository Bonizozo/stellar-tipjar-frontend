#!/usr/bin/env ts-node
/**
 * CLI entry point for backup/restore operations
 * Usage:
 *   ts-node tools/backup/cli.ts export --contract <id> --network <net> --output <file>
 *   ts-node tools/backup/cli.ts verify --file <file> --contract <id> --network <net>
 *   ts-node tools/backup/cli.ts import --file <file> --contract <id> --network <net> [--dry-run]
 *   ts-node tools/backup/cli.ts schedule --contract <id> --network <net> --interval <ms>
 */

import * as fs from "fs";
import { StateExporter } from "./state-exporter";
import { StateImporter } from "./state-importer";
import { BackupScheduler } from "./backup-scheduler";

function parseArgs(argv: string[]): Record<string, string | boolean> {
  const args: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

async function main() {
  const [, , command, ...rest] = process.argv;
  const args = parseArgs(rest);

  const contractId = args["contract"] as string;
  const network = (args["network"] as "testnet" | "mainnet" | "futurenet") ?? "testnet";
  const encryptionKey = args["key"] as string | undefined;

  switch (command) {
    case "export": {
      const outputFile = args["output"] as string;
      if (!contractId || !outputFile) {
        console.error("Usage: cli.ts export --contract <id> --network <net> --output <file>");
        process.exit(1);
      }
      const exporter = new StateExporter({ contractId, network });
      const state = await exporter.exportState();
      let content = JSON.stringify(state, null, 2);
      if (encryptionKey) {
        // Encryption handled by BackupScheduler; here we just warn
        console.warn("Encryption via CLI: use backup-scheduler for encrypted exports");
      }
      fs.mkdirSync(require("path").dirname(outputFile), { recursive: true });
      fs.writeFileSync(outputFile, content, "utf-8");
      console.log(`State exported to ${outputFile}`);
      console.log(`  Creators : ${state.creators.length}`);
      console.log(`  Tips     : ${state.tips.length}`);
      console.log(`  Balances : ${Object.keys(state.balances).length}`);
      console.log(`  Checksum : ${state.metadata.checksum}`);
      break;
    }

    case "verify": {
      const file = args["file"] as string;
      if (!file || !contractId) {
        console.error("Usage: cli.ts verify --file <file> --contract <id> --network <net>");
        process.exit(1);
      }
      const importer = new StateImporter({ contractId, network, encryptionKey });
      const state = await importer.loadBackup(file);
      const { valid, errors } = importer.verifyBackup(state);
      if (valid) {
        console.log("Backup verification PASSED");
      } else {
        console.error("Backup verification FAILED:");
        errors.forEach((e) => console.error(`  - ${e}`));
        process.exit(1);
      }
      break;
    }

    case "import": {
      const file = args["file"] as string;
      const dryRun = args["dry-run"] === true;
      const adminSecret = args["secret"] as string | undefined;
      if (!file || !contractId) {
        console.error("Usage: cli.ts import --file <file> --contract <id> --network <net> [--dry-run]");
        process.exit(1);
      }
      const importer = new StateImporter({ contractId, network, encryptionKey });
      const state = await importer.loadBackup(file);
      const result = dryRun
        ? await importer.dryRun(state)
        : await importer.importState(state, adminSecret ?? "");

      if (result.success) {
        console.log(`Import ${dryRun ? "dry-run" : ""} SUCCEEDED`);
        console.log(`  Creators restored : ${result.creatorsRestored}`);
        console.log(`  Tips restored     : ${result.tipsRestored}`);
        console.log(`  Balances restored : ${result.balancesRestored}`);
      } else {
        console.error(`Import FAILED:`);
        result.errors.forEach((e) => console.error(`  - ${e}`));
        process.exit(1);
      }
      break;
    }

    case "schedule": {
      const intervalMs = parseInt(args["interval"] as string ?? "3600000", 10);
      const outputDir = (args["output"] as string) ?? "./backups";
      if (!contractId) {
        console.error("Usage: cli.ts schedule --contract <id> --network <net> [--interval <ms>]");
        process.exit(1);
      }
      const scheduler = new BackupScheduler({
        contractId,
        network,
        outputDir,
        intervalMs,
        encryptionKey,
      });
      scheduler.start();
      console.log(`Scheduler running. Press Ctrl+C to stop.`);
      process.on("SIGINT", () => { scheduler.stop(); process.exit(0); });
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error("Commands: export | verify | import | schedule");
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
