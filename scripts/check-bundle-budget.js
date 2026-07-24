#!/usr/bin/env node

/**
 * Bundle budget check.
 *
 * Reads the "shared by every route" JS emitted by the last `next build`
 * (.next/build-manifest.json -> rootMainFiles + polyfillFiles) and fails
 * the build if it exceeds the configured gzip budget. This is the JS every
 * visitor pays for on first load, regardless of which page they land on,
 * so it's the number that regresses silently when a heavy dependency gets
 * imported at module scope instead of behind a lazy `import()`.
 *
 * Usage: node scripts/check-bundle-budget.js [--budget-kb=<gzip KB>]
 */

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const NEXT_DIR = path.join(process.cwd(), ".next");
const BUILD_MANIFEST = path.join(NEXT_DIR, "build-manifest.json");

// Baseline (pre-lazy-loading) shared First Load JS was ~161 KB gzip.
// Budget leaves headroom for legitimate growth while still catching
// regressions like a heavy library landing back in the shared chunk.
const DEFAULT_BUDGET_KB = 190;

function parseBudgetArg() {
  const arg = process.argv.find((a) => a.startsWith("--budget-kb="));
  if (!arg) return DEFAULT_BUDGET_KB;
  const value = Number(arg.split("=")[1]);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid --budget-kb value: ${arg}`);
  }
  return value;
}

function gzipSize(filePath) {
  const content = fs.readFileSync(filePath);
  return zlib.gzipSync(content, { level: 9 }).length;
}

function main() {
  if (!fs.existsSync(BUILD_MANIFEST)) {
    console.error(
      `[bundle-budget] ${BUILD_MANIFEST} not found — run \`next build\` first.`,
    );
    process.exit(1);
  }

  const budgetKb = parseBudgetArg();
  const manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST, "utf8"));
  const files = [
    ...(manifest.rootMainFiles ?? []),
    ...(manifest.polyfillFiles ?? []),
  ];

  if (files.length === 0) {
    console.error("[bundle-budget] No shared root/polyfill files found in build manifest.");
    process.exit(1);
  }

  let totalRaw = 0;
  let totalGzip = 0;
  const rows = files.map((file) => {
    const filePath = path.join(NEXT_DIR, file);
    const raw = fs.statSync(filePath).size;
    const gzip = gzipSize(filePath);
    totalRaw += raw;
    totalGzip += gzip;
    return { file, raw, gzip };
  });

  const totalGzipKb = totalGzip / 1024;
  const totalRawKb = totalRaw / 1024;

  console.log("[bundle-budget] Shared First Load JS (rootMainFiles + polyfillFiles):\n");
  for (const row of rows) {
    console.log(
      `  ${row.file}  ${(row.raw / 1024).toFixed(1)} KB raw / ${(row.gzip / 1024).toFixed(1)} KB gzip`,
    );
  }
  console.log(
    `\n  TOTAL: ${totalRawKb.toFixed(1)} KB raw / ${totalGzipKb.toFixed(1)} KB gzip`,
  );
  console.log(`  Budget: ${budgetKb.toFixed(1)} KB gzip\n`);

  if (totalGzipKb > budgetKb) {
    console.error(
      `[bundle-budget] FAIL — shared First Load JS is ${totalGzipKb.toFixed(1)} KB gzip, ` +
        `which exceeds the ${budgetKb.toFixed(1)} KB budget by ${(totalGzipKb - budgetKb).toFixed(1)} KB.\n` +
        `Investigate what landed in the shared chunk (npm run analyze) before merging.`,
    );
    process.exit(1);
  }

  console.log(
    `[bundle-budget] PASS — ${(budgetKb - totalGzipKb).toFixed(1)} KB under budget.`,
  );
}

main();
