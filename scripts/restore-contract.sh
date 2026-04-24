#!/usr/bin/env bash
# restore-contract.sh
# Restore Stellar contract state from a backup file
# Usage: ./scripts/restore-contract.sh --file <backup.json> [--contract <id>] [--network <testnet|mainnet>] [--dry-run]

set -euo pipefail

# ── Defaults ──────────────────────────────────────────────────────────────────
BACKUP_FILE=""
CONTRACT_ID="${STELLAR_CONTRACT_ID:-}"
NETWORK="${STELLAR_NETWORK:-testnet}"
ADMIN_SECRET="${STELLAR_ADMIN_SECRET:-}"
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY:-}"
DRY_RUN=false

# ── Argument parsing ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --file)      BACKUP_FILE="$2"; shift 2 ;;
    --contract)  CONTRACT_ID="$2"; shift 2 ;;
    --network)   NETWORK="$2";     shift 2 ;;
    --secret)    ADMIN_SECRET="$2"; shift 2 ;;
    --key)       ENCRYPTION_KEY="$2"; shift 2 ;;
    --dry-run)   DRY_RUN=true;     shift   ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Validation ────────────────────────────────────────────────────────────────
if [[ -z "$BACKUP_FILE" ]]; then
  echo "ERROR: --file <backup.json> is required"
  exit 1
fi

if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "ERROR: Backup file not found: $BACKUP_FILE"
  exit 1
fi

if [[ -z "$CONTRACT_ID" ]]; then
  echo "ERROR: CONTRACT_ID is required. Set STELLAR_CONTRACT_ID or pass --contract <id>"
  exit 1
fi

if ! $DRY_RUN && [[ -z "$ADMIN_SECRET" ]]; then
  echo "ERROR: STELLAR_ADMIN_SECRET is required for live restore. Use --dry-run to validate only."
  exit 1
fi

# ── Header ────────────────────────────────────────────────────────────────────
echo "================================================"
echo " Stellar TipJar — Contract State Restore"
echo "================================================"
echo " Backup   : $BACKUP_FILE"
echo " Contract : $CONTRACT_ID"
echo " Network  : $NETWORK"
echo " Dry Run  : $DRY_RUN"
echo "================================================"

# ── Verify checksum file if present ──────────────────────────────────────────
CHECKSUM_FILE="${BACKUP_FILE}.sha256"
if [[ -f "$CHECKSUM_FILE" ]]; then
  echo "[1/4] Verifying file checksum..."
  if command -v sha256sum &>/dev/null; then
    sha256sum --check "$CHECKSUM_FILE"
  else
    shasum -a 256 --check "$CHECKSUM_FILE"
  fi
  echo "  Checksum OK"
else
  echo "[1/4] No .sha256 file found, skipping file checksum verification"
fi

# ── Verify backup integrity ───────────────────────────────────────────────────
echo "[2/4] Verifying backup integrity..."
VERIFY_ARGS="--file $BACKUP_FILE --contract $CONTRACT_ID --network $NETWORK"
if [[ -n "$ENCRYPTION_KEY" ]]; then
  VERIFY_ARGS="$VERIFY_ARGS --key $ENCRYPTION_KEY"
fi
npx ts-node tools/backup/cli.ts verify $VERIFY_ARGS

# ── Dry run ───────────────────────────────────────────────────────────────────
echo "[3/4] Running dry-run import check..."
DRY_ARGS="--file $BACKUP_FILE --contract $CONTRACT_ID --network $NETWORK --dry-run"
if [[ -n "$ENCRYPTION_KEY" ]]; then
  DRY_ARGS="$DRY_ARGS --key $ENCRYPTION_KEY"
fi
npx ts-node tools/backup/cli.ts import $DRY_ARGS

if $DRY_RUN; then
  echo ""
  echo "Dry run complete. No changes were made."
  echo "Re-run without --dry-run to perform the actual restore."
  exit 0
fi

# ── Confirm live restore ──────────────────────────────────────────────────────
echo ""
echo "WARNING: This will restore contract state on $NETWORK."
read -r -p "Type 'yes' to confirm: " CONFIRM
if [[ "$CONFIRM" != "yes" ]]; then
  echo "Aborted."
  exit 1
fi

# ── Live restore ──────────────────────────────────────────────────────────────
echo "[4/4] Restoring contract state..."
IMPORT_ARGS="--file $BACKUP_FILE --contract $CONTRACT_ID --network $NETWORK --secret $ADMIN_SECRET"
if [[ -n "$ENCRYPTION_KEY" ]]; then
  IMPORT_ARGS="$IMPORT_ARGS --key $ENCRYPTION_KEY"
fi
npx ts-node tools/backup/cli.ts import $IMPORT_ARGS

echo ""
echo "Restore complete."
