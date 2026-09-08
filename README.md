This is a [Next.js](https://nextjs.org) project for Spock's Resale Shop.

The public storefront is unchanged. Phase 1 adds a self-hosted Postgres foundation and `/admin`.

## Storefront (existing)

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Foundation (Docker + Postgres + admin)

See `docs/self-hosting.md`.

```bash
cp .env.example .env
docker compose up -d db
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Do not collect live sales tax until a tax row is marked verified after Arkansas DFA confirmation.
