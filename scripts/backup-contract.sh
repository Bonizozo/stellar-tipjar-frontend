#!/usr/bin/env bash
# backup-contract.sh
# Export and backup Stellar contract state
# Usage: ./scripts/backup-contract.sh [--contract <id>] [--network <testnet|mainnet>] [--encrypt]

set -euo pipefail

# ── Defaults ──────────────────────────────────────────────────────────────────
CONTRACT_ID="${STELLAR_CONTRACT_ID:-}"
NETWORK="${STELLAR_NETWORK:-testnet}"
OUTPUT_DIR="${BACKUP_OUTPUT_DIR:-./backups}"
ENCRYPT=false
ENCRYPTION_KEY="${BACKUP_ENCRYPTION_KEY:-}"
STORAGE="${BACKUP_STORAGE:-local}"   # local | s3 | ipfs

# ── Argument parsing ──────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --contract)  CONTRACT_ID="$2"; shift 2 ;;
    --network)   NETWORK="$2";     shift 2 ;;
    --output)    OUTPUT_DIR="$2";  shift 2 ;;
    --encrypt)   ENCRYPT=true;     shift   ;;
    --storage)   STORAGE="$2";     shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

# ── Validation ────────────────────────────────────────────────────────────────
if [[ -z "$CONTRACT_ID" ]]; then
  echo "ERROR: CONTRACT_ID is required. Set STELLAR_CONTRACT_ID or pass --contract <id>"
  exit 1
fi

if $ENCRYPT && [[ -z "$ENCRYPTION_KEY" ]]; then
  echo "ERROR: BACKUP_ENCRYPTION_KEY must be set when --encrypt is used"
  exit 1
fi

# ── Setup ─────────────────────────────────────────────────────────────────────
mkdir -p "$OUTPUT_DIR"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_ID="backup_${CONTRACT_ID:0:8}_${TIMESTAMP}"
BACKUP_FILE="${OUTPUT_DIR}/${BACKUP_ID}.json"

echo "================================================"
echo " Stellar TipJar — Contract State Backup"
echo "================================================"
echo " Contract : $CONTRACT_ID"
echo " Network  : $NETWORK"
echo " Output   : $BACKUP_FILE"
echo " Encrypt  : $ENCRYPT"
echo " Storage  : $STORAGE"
echo "================================================"

# ── Run exporter ──────────────────────────────────────────────────────────────
echo "[1/4] Exporting contract state..."

EXPORT_ARGS="--contract $CONTRACT_ID --network $NETWORK --output $BACKUP_FILE"
if $ENCRYPT; then
  EXPORT_ARGS="$EXPORT_ARGS --encrypt --key $ENCRYPTION_KEY"
fi

npx ts-node tools/backup/cli.ts export $EXPORT_ARGS

# ── Verify backup ─────────────────────────────────────────────────────────────
echo "[2/4] Verifying backup integrity..."
npx ts-node tools/backup/cli.ts verify --file "$BACKUP_FILE" --contract "$CONTRACT_ID" --network "$NETWORK"

# ── Compute checksum ──────────────────────────────────────────────────────────
echo "[3/4] Computing file checksum..."
if command -v sha256sum &>/dev/null; then
  CHECKSUM=$(sha256sum "$BACKUP_FILE" | awk '{print $1}')
else
  CHECKSUM=$(shasum -a 256 "$BACKUP_FILE" | awk '{print $1}')
fi
echo "  SHA-256: $CHECKSUM"
echo "$CHECKSUM  $BACKUP_FILE" > "${BACKUP_FILE}.sha256"

# ── Remote storage upload ─────────────────────────────────────────────────────
echo "[4/4] Uploading to storage backend: $STORAGE"
case "$STORAGE" in
  s3)
    if [[ -z "${AWS_S3_BUCKET:-}" ]]; then
      echo "WARNING: AWS_S3_BUCKET not set, skipping S3 upload"
    else
      aws s3 cp "$BACKUP_FILE" "s3://${AWS_S3_BUCKET}/backups/${BACKUP_ID}.json"
      aws s3 cp "${BACKUP_FILE}.sha256" "s3://${AWS_S3_BUCKET}/backups/${BACKUP_ID}.json.sha256"
      echo "  Uploaded to s3://${AWS_S3_BUCKET}/backups/${BACKUP_ID}.json"
    fi
    ;;
  ipfs)
    if command -v ipfs &>/dev/null; then
      CID=$(ipfs add -q "$BACKUP_FILE")
      echo "  IPFS CID: $CID"
      echo "$CID" > "${BACKUP_FILE}.cid"
    else
      echo "WARNING: ipfs CLI not found, skipping IPFS upload"
    fi
    ;;
  local)
    echo "  Stored locally at $BACKUP_FILE"
    ;;
esac

echo ""
echo "Backup complete: $BACKUP_ID"
echo "File: $BACKUP_FILE"
echo "Checksum: $CHECKSUM"
