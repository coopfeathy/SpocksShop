#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
mkdir -p "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
FILE="$BACKUP_DIR/spocks-shop-$STAMP.sql"

if command -v pg_dump >/dev/null 2>&1; then
  pg_dump "$DATABASE_URL" --no-owner --format=plain > "$FILE"
else
  docker compose exec -T db pg_dump -U "${POSTGRES_USER:-spocks}" "${POSTGRES_DB:-spocks_shop}" > "$FILE"
fi

gzip -f "$FILE"
echo "Wrote ${FILE}.gz"
