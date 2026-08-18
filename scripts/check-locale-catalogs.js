#!/usr/bin/env node

/**
 * Locale-catalog completeness check.
 *
 * next-intl falls back silently to the default locale (or to the raw key) for
 * any message missing from a non-default catalog, so a genuinely incomplete
 * `fr.json`/`ar.json`/etc. produces no error, warning, or test failure — just
 * English text (or a `nav.explore`-style key) quietly appearing in the middle
 * of an otherwise-localized page. Because `en` is complete by definition, a
 * reviewer glancing at `en.json` never sees the gap.
 *
 * This script treats `messages/en.json` as the presumed-complete source of
 * truth and diffs every other locale's key set against it, failing the check
 * when any key is missing. The point is to catch translation-catalog drift
 * mechanically rather than relying on someone browsing the app in each
 * configured language.
 *
 * Usage:
 *   node scripts/check-locale-catalogs.js              # fail on missing keys
 *   node scripts/check-locale-catalogs.js --strict     # also fail on extra keys
 *   node scripts/check-locale-catalogs.js --dir=<path> # audit a custom directory (testing)
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_MESSAGES_DIR = path.join(process.cwd(), "messages");

/**
 * Flatten a nested catalog object into an array of dotted keys, e.g.
 * { nav: { home: "Home" } } -> ["nav.home"]. Arrays are treated as leaves.
 */
function flattenKeys(obj, prefix = "", out = []) {
  for (const [key, value] of Object.entries(obj)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenKeys(value, dotted, out);
    } else {
      out.push(dotted);
    }
  }
  return out;
}

/**
 * Audit one locale catalog against the `en` source of truth.
 * @param {object} source   parsed `en` catalog (the source of truth)
 * @param {object} catalog  parsed locale catalog under audit
 * @returns {{ missing: string[], extra: string[] }}
 */
function auditCatalog(source, catalog) {
  const sourceKeys = flattenKeys(source).sort();
  const catalogKeys = flattenKeys(catalog).sort();
  const catalogSet = new Set(catalogKeys);

  const missing = sourceKeys.filter((key) => !catalogSet.has(key));
  const extra = catalogKeys.filter((key) => !sourceKeys.includes(key));
  return { missing, extra };
}

/**
 * Audit every non-`en` catalog in `messagesDir`.
 * @returns {Array<{ locale: string, missing: string[], extra: string[] }>}
 */
function auditAllCatalogs(messagesDir) {
  const files = fs
    .readdirSync(messagesDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const sourcePath = path.join(messagesDir, "en.json");
  if (!fs.existsSync(sourcePath)) {
    throw new Error(
      `[locale-catalogs] ${sourcePath} not found — the \`en\` catalog is the source of truth.`,
    );
  }

  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

  return files
    .filter((f) => f !== "en.json")
    .map((f) => {
      const locale = f.replace(/\.json$/, "");
      const catalog = JSON.parse(
        fs.readFileSync(path.join(messagesDir, f), "utf8"),
      );
      const { missing, extra } = auditCatalog(source, catalog);
      return { locale, missing, extra };
    });
}

function parseDirArg() {
  const arg = process.argv.find((a) => a.startsWith("--dir="));
  if (!arg) return DEFAULT_MESSAGES_DIR;
  const dir = arg.split("=")[1];
  if (!fs.existsSync(dir)) {
    throw new Error(`[locale-catalogs] Messages directory not found: ${dir}`);
  }
  return dir;
}

function main() {
  const messagesDir = parseDirArg();
  const strict = process.argv.includes("--strict");
  const results = auditAllCatalogs(messagesDir);

  const missingTotal = results.reduce((n, r) => n + r.missing.length, 0);
  const extraTotal = results.reduce((n, r) => n + r.extra.length, 0);
  const cleanCount = results.filter(
    (r) => r.missing.length === 0 && r.extra.length === 0,
  ).length;

  console.log(`[locale-catalogs] Auditing catalogs against \`en\` in ${messagesDir}\n`);

  for (const { locale, missing, extra } of results) {
    if (missing.length === 0 && extra.length === 0) {
      continue;
    }

    console.log(`  ${locale}:`);
    for (const key of missing) {
      console.log(`    MISSING  ${key}`);
    }
    for (const key of extra) {
      console.log(`    EXTRA    ${key}`);
    }
  }

  console.log(
    `\n  ${cleanCount}/${results.length} non-en catalogs have the exact same key set as \`en\`.`,
  );

  const strictFailure = strict && extraTotal > 0;
  if (missingTotal > 0 || strictFailure) {
    const reasons = [];
    if (missingTotal > 0) {
      reasons.push(`${missingTotal} key(s) missing from non-\`en\` catalogs`);
    }
    if (strictFailure) {
      reasons.push(`${extraTotal} orphaned key(s) present (--strict)`);
    }
    console.error(
      `\n[locale-catalogs] FAIL — ${reasons.join("; ")}.` +
        "\nnext-intl silently falls back to `en` (or the raw key) for missing translations," +
        "\nso incomplete catalogs are invisible without a mechanical check. Add the missing" +
        "\nkeys to the affected catalog(s) or align the extra keys with `en`.",
    );
    process.exit(1);
  }

  if (extraTotal > 0) {
    console.warn(
      `\n[locale-catalogs] WARN — ${extraTotal} key(s) exist outside \`en\` (orphaned/never used). ` +
        `Run with --strict to fail on these.`,
    );
  }

  console.log("\n[locale-catalogs] PASS — every locale covers all `en` keys.");
}

if (require.main === module) {
  main();
}

module.exports = { flattenKeys, auditCatalog, auditAllCatalogs, main };