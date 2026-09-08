#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL is required}"
FILE="${1:?Usage: scripts/restore.sh backups/spocks-shop-YYYYMMDDThhmmssZ.sql.gz}"

if [[ "$FILE" == *.gz ]]; then
  WORK="$(mktemp)"
  gunzip -c "$FILE" > "$WORK"
else
  WORK="$FILE"
fi

if command -v psql >/dev/null 2>&1; then
  psql "$DATABASE_URL" < "$WORK"
else
  docker compose exec -T db psql -U "${POSTGRES_USER:-spocks}" "${POSTGRES_DB:-spocks_shop}" < "$WORK"
fi

echo "Restore complete from $FILE"
