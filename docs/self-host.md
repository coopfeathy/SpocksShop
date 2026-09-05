# Self-host plan: mini PC, inventory, marketplaces

**Decision:** Run Spock's Resale Shop on hardware you own. Pay only for things you cannot replace: a domain name, electricity, and marketplace/payment fees when a sale actually happens.

Do **not** pay for Vercel, Neon, Clerk, Resend, Vendoo, List Perfectly, or a VPS unless you later choose to.

---

## What the site can do on your mini PC

| Need | How we do it without extra companies |
|------|--------------------------------------|
| Public website | Next.js + Caddy on the mini PC |
| Reach the internet | Cloudflare Tunnel (free) or router port 443 |
| HTTPS | Let's Encrypt via Caddy, or Cloudflare |
| Database / inventory / sales | PostgreSQL in Docker on the same box |
| Product photos | Local disk (`/var/spocks/media`) |
| Admin login | App password + session cookie (no Clerk) |
| Contact email | Your existing Gmail SMTP |
| Card payments (optional) | Stripe only if you want cards; fee per sale |
| No-card sales | Cash, Zelle, Venmo, local pickup, or invoice |

---

## Honest marketplace reality

You cannot legally and reliably auto-post to “all the big resale apps” from a private server with official APIs.

| Channel | Official listing API for a small seller? | Practical approach |
|---------|------------------------------------------|--------------------|
| Your own site | Yes (we own it) | Source of truth |
| eBay | Yes — eBay Sell / Inventory APIs | First (and only) true auto-list target |
| Facebook Marketplace | No public seller listing API for personal accounts | Manual post using a generated listing packet |
| Poshmark | No public seller API | Manual post from listing packet |
| Mercari (US) | No public seller API | Manual post from listing packet |
| Craigslist / OfferUp | No useful official seller API | Manual |

Paid crosslisters exist because those platforms block unofficial bots. Building scrapers or session bots risks account bans and is not the plan.

**Inventory rule that matters more than auto-post:** one product record, many channels. When it sells anywhere, mark it `sold` and end or take down the other listings. That prevents double-selling.

---

## Mini PC baseline

Recommended, not fancy:

- x86 mini PC (Intel N100 / N150 class is enough)
- 16 GB RAM
- 256 GB+ SSD
- Wired Ethernet
- Ubuntu Server 24.04 LTS
- Optional USB drive for nightly backups

Keep it on a UPS if you can. Home internet outages take the shop offline; that is the tradeoff vs paying a host.

---

## Software stack (all self-hosted)

```
Internet
  └── Cloudflare Tunnel (free)  OR  router port-forward 443
        └── Caddy (HTTPS reverse proxy)
              └── Next.js app (Node)
              └── Postgres (inventory, orders, sales)
              └── local photo files
```

Install on the mini PC:

1. Ubuntu Server, create a non-root user, enable `ufw` (allow 22, and 80/443 only if not using a tunnel).
2. Docker Engine + Docker Compose plugin.
3. Git clone `coopfeathy/SpocksShop`.
4. Cloudflare Tunnel if you do not want to open ports.

You still need **one paid thing** for a real storefront: a domain (you already reference `spocksresaleshop.com`). Point that domain at Cloudflare, then the tunnel, not at your home IP if you can avoid it.

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

Docker Compose (to be added when we implement the backend) will run:

- `app` — Next.js production build
- `db` — Postgres 16
- `caddy` — TLS + reverse proxy

Until the backend exists, you can still preview the current frontend:

```bash
sudo apt install -y nodejs npm
npm ci
npm run build
npm run start -- --port 3000
```

That is **not** production inventory yet. It is the current mocked catalog.

---

## Inventory and sales model (source of truth on your box)

Keep the existing product fields. Add operational records:

- **products** — sku, qty, status (`draft|listed|reserved|sold|archived`), cost, price
- **product_images** — files on disk
- **channel_listings** — channel, external id, url, status (`draft|active|ended|sold`)
- **sales** — channel, sold price, fees, shipping cost, net profit, sold at
- **orders** — website checkout only

When a sale is recorded (website paid, or you tap “sold on eBay”):

1. Decrement quantity (usually to 0 for one-of-a-kind resale).
2. Set product status `sold`.
3. Mark every `channel_listings` row ended/sold.
4. Write a `sales` row with fees so profit is real (`sold_price - purchase_cost - fees - shipping`).

That is the tracking system. It does not require Shopify or a POS subscription.

---

## Listing packet (how you still hit every marketplace)

Admin generates a packet from the product record:

- Title, description, condition notes
- Price, brand, size, dimensions, weight
- Photo files ready to upload
- Per-channel checklist: Website / eBay / Facebook / Poshmark / Mercari

Workflow:

1. Photograph and enter the item once in admin.
2. Publish on your site immediately.
3. Auto-publish to eBay when credentials exist.
4. Copy packet into Facebook / Poshmark / Mercari by hand (2–4 minutes each).
5. Paste the live URLs back into `channel_listings`.
6. When any channel sells, mark sold in admin; take down the rest.

This is how most profitable small resellers actually operate without paying a crosslist SaaS.

---

## Payments without extra subscriptions

**Cheapest path that still works:**

- Website: “Request to purchase” → you invoice by Zelle / Venmo / cash pickup. No processor fee if you accept that friction.
- eBay / Poshmark / Mercari: they already take their cut; do not add another layer.
- Cards on your own site later: Stripe (no monthly fee on standard pricing; percentage only when paid). Only add this when you are losing sales without cards.

Do not add Shop Pay, PayPal subscriptions, or a hosted checkout company until volume demands it.

---

## Email without Resend

Use Gmail you already have:

- App password + SMTP (`smtp.gmail.com:587`)
- Contact form → your inbox
- Optional order confirmation later

Gmail daily send limits are fine for a small shop.

---

## Backups (non-negotiable on a home server)

Nightly on the mini PC:

- `pg_dump` of Postgres
- Copy of `/var/spocks/media`
- Copy of `.env`

Write to an external drive. Once a week copy that drive off-site or to a cheap USB you keep elsewhere. A dead SSD with no dump is a closed shop.

---

## Security minimums

- SSH keys only; disable password SSH
- `ufw` + `fail2ban`
- Admin path not indexed (`/admin` + strong password)
- Unraid-style “always on” is optional; Ubuntu + Docker is simpler
- Do not expose Postgres to the internet
- Cloudflare Tunnel preferred over opening 443 on residential ISP

---

## What we should build next in the repo

In this order, still on the mini-PC stack:

1. Docker Compose + Dockerfile + Caddyfile + `.env.example`
2. Postgres schema + seed from current `lib/data.ts`
3. Admin login + product CRUD + local photo upload
4. Sales logging + sold-everywhere inventory lock
5. Listing packet UI (copy title/description/photos)
6. Optional eBay Sell API publish
7. Website checkout only after inventory is real

---

## Costs you should expect

| Item | Typical |
|------|---------|
| Mini PC (if you do not own one) | one-time hardware |
| Electricity | a few dollars a month |
| Domain | ~$12/year if not already owned |
| Cloudflare Tunnel | $0 |
| Docker / Postgres / Caddy / Next.js | $0 |
| eBay / Poshmark / Mercari | their selling fees when an item sells |
| Stripe | only if you enable cards |
| Crosslisting SaaS | $0 — we are not using it |
