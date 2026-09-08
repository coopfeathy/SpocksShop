# Database

PostgreSQL 16. ORM: Drizzle. Driver: `postgres.js`.

## Tables

- `users` — admin/staff credentials
- `customers` — website buyers (unused until checkout)
- `addresses` — shipping/billing/pickup
- `categories`
- `products` — unique-find flag default true; `purchase_cost_cents` is admin-only
- `inventory` — `on_hand`, `reserved`, `sold`; check constraint prevents reserved > on hand
- `shipping_rates` — editable weight table
- `tax_rates` — configurable jurisdictions, dates, source, verified flag
- `orders` — includes `sales_channel`; website vs marketplace are distinct
- `order_items` — price/title snapshots
- `payments` — Stripe or BTCPay rows; no fake success
- `refunds`
- `admin_notes`

## Oversell protection

`reserveInventory` and `commitInventorySale` use `SELECT … FOR UPDATE` inside a transaction.

## Migrations and seed

See `docs/self-hosting.md`.
