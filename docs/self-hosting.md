# Self-hosting (Phase 1 foundation)

The existing storefront is unchanged. This phase adds Docker, PostgreSQL, migrations, seed data, and `/admin`.

## Start the stack

```bash
cp .env.example .env
# set POSTGRES_PASSWORD, SESSION_SECRET, ADMIN_EMAIL

docker compose up -d db
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

App: http://localhost:3000
Admin: http://localhost:3000/admin

## Access admin

1. Seed creates `ADMIN_EMAIL`.
2. Sign in at `/admin/login`.
3. Default bootstrap password is `change-me-now` unless you set `ADMIN_BOOTSTRAP_PASSWORD` or `ADMIN_PASSWORD_HASH`.

## Migrations

```bash
npm run db:migrate
```

## Seed

```bash
npm run db:seed
```

Seeds catalog from `lib/data.ts`, shipping rows, an **unverified** tax configuration, and an admin user if missing.

## Backup

```bash
export DATABASE_URL=postgres://spocks:PASSWORD@127.0.0.1:5432/spocks_shop
export BACKUP_DIR=./backups
./scripts/backup.sh
```

## Restore

```bash
./scripts/restore.sh backups/spocks-shop-YYYYMMDDThhmmssZ.sql.gz
```
