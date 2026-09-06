# Self-host plan: mini PC, inventory, marketplaces

**Decision:** Run Spock's Resale Shop on hardware you own. Pay only for things you cannot replace: domain, electricity, Stripe/crypto network fees when a site sale happens, and marketplace selling fees.

**Locked choices (2026-09-05)**

- Domain: **SpockShop.com**
- Legal entity: **CFLLC** (Cooper Featherstone LLC) — site sales, tax collected, and 1099-K / sales-tax filings roll up here
- Website payments: **Stripe (cards) now** + **crypto** (self-hosted BTCPay, not another hosted wallet company)
- Checkout must calculate **shipping + sales tax** before payment
- Channels in use: Website, **Facebook Marketplace**, **Depop**, **eBay**
- Channels under consideration: Poshmark, Mercari, Vinted

Do **not** pay for Vercel, Neon, Clerk, Resend, Vendoo, List Perfectly, or a VPS unless you later choose to.

---

## What the site can do on your mini PC

| Need | How we do it |
|------|----------------|
| Public website | Next.js + Caddy on the mini PC |
| Public hostname | SpockShop.com via Cloudflare + Tunnel |
| HTTPS | Cloudflare / Caddy |
| Database / inventory / sales | PostgreSQL in Docker on the same box |
| Product photos | Local disk (`/var/spocks/media`) |
| Admin login | App password + session cookie (no Clerk) |
| Contact email | Existing Gmail SMTP |
| Cards | Stripe Checkout or Payment Element, payouts to CFLLC |
| Crypto | BTCPay Server container on the same mini PC |
| Tax | Destination-based sales tax on website orders; stored per order for CFLLC books |
| Shipping | Weight/dims already on products; quote at checkout |

---

## Honest marketplace reality

You cannot legally and reliably auto-post to every resale app from a private server.

| Channel | Official listing API for a small seller? | Practical approach |
|---------|------------------------------------------|--------------------|
| Website (SpockShop.com) | Yes | Source of truth |
| eBay | Yes — Sell / Inventory APIs | First auto-list target |
| Depop | No general public seller API | Listing packet + paste URL back |
| Facebook Marketplace | No public seller listing API for normal accounts | Listing packet |
| Poshmark | No public seller API | Listing packet |
| Mercari (US) | No public seller API | Listing packet |
| Vinted | Limited / not a simple small-seller publish API | Listing packet |

Paid crosslisters exist because those platforms block unofficial bots. Scrapers and session bots are not the plan.

**Inventory rule:** one product, many channels. Sale on any channel marks the item `sold` and flags every other listing to end. That is how you avoid double-selling.

---

## Mini PC baseline

- x86 mini PC (Intel N100 / N150 class)
- 16 GB RAM (BTCPay + Postgres + Next + Caddy will share this)
- 256 GB+ SSD
- Wired Ethernet + UPS if possible
- Ubuntu Server 24.04 LTS
- USB drive for nightly backups

Home internet outages take SpockShop.com offline. That is the cost of not paying a host.

---

## Software stack

```
Internet
  └── Cloudflare Tunnel → SpockShop.com
        └── Caddy
              ├── Next.js shop + admin
              ├── Postgres
              ├── BTCPay Server (crypto invoices)
              └── local photo files
Stripe lives off-box (cards). BTCPay lives on-box (crypto).
```

---

## First-boot commands (outline)

```bash
sudo apt update && sudo apt install -y git ufw fail2ban
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
# log out and back in

git clone https://github.com/coopfeathy/SpocksShop.git
cd SpocksShop
```

Until Docker + backend exist, frontend-only preview:

```bash
sudo apt install -y nodejs npm
npm ci
npm run build
npm run start -- --port 3000
```

That is still the mocked catalog.

---

## Inventory and sales model

- **products** — sku, qty, status, cost, price, weight, dimensions (already in types)
- **product_images** — disk files
- **channel_listings** — `website | ebay | facebook | depop | poshmark | mercari | vinted`
- **orders** — website only: address, shipping quote, tax snapshot, payment method, Stripe/BTCPay ids
- **sales** — every channel: sold price, platform fees, shipping, tax collected, net to CFLLC

Sold anywhere:

1. Qty → 0 (typical unique resale item)
2. Product `sold`
3. All channel listings ended/sold
4. `sales` row with fees so profit is `sold_price - purchase_cost - platform_fees - shipping_cost` (tax collected is a liability, not profit)

See `docs/payments-tax-shipping.md` for checkout math.

---

## Listing packet channels

Checklist in admin: Website, eBay, Facebook, Depop, then optional Poshmark / Mercari / Vinted.

1. Enter item once.
2. Publish on SpockShop.com.
3. Auto-publish eBay when API keys exist.
4. Hand-post Facebook + Depop (and later Poshmark / Mercari / Vinted) from the packet.
5. Paste live URLs into `channel_listings`.
6. Any sale → mark sold → take down the rest.

---

## Email

Gmail SMTP you already have. Contact form + order receipts. No Resend.

---

## Backups

Nightly: `pg_dump`, `/var/spocks/media`, `.env`, BTCPay data volume → USB. Weekly off-site copy.

---

## Security

- SSH keys only
- `ufw` + `fail2ban`
- `/admin` not indexed
- Postgres and BTCPay RPC not on the public internet
- Cloudflare Tunnel instead of opening 443 on the house

---

## Build order

1. Docker Compose + Dockerfile + Caddy + `.env.example`
2. Postgres schema + seed from `lib/data.ts`
3. Admin + product CRUD + local photos
4. Sales log + sold-everywhere lock
5. Checkout: address → shipping + tax → Stripe and BTCPay
6. Listing packet (Facebook, Depop, eBay URLs)
7. eBay official publish
8. Add Poshmark / Mercari / Vinted to the packet when you open those closets

---

## Costs

| Item | Typical |
|------|---------|
| Mini PC + power | yours |
| SpockShop.com | domain renewal only |
| Cloudflare Tunnel | $0 |
| Docker / Postgres / Caddy / BTCPay | $0 |
| Stripe | percentage + fixed fee per *successful* card charge |
| Crypto | network fee; BTCPay has no monthly SaaS fee |
| eBay / Depop / Facebook / others | their selling fees when that channel sells |
| Crosslisting SaaS | $0 |
