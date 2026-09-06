# Payments, tax, and shipping (CFLLC / SpockShop.com)

Website checkout is a CFLLC sale. Marketplace checkouts are *those* platforms’ sales. Books need both, separately.

---

## 1. Cards — Stripe

Use **Stripe Checkout** (hosted page) first, not a custom card form.

Why:

- PCI stays on Stripe
- Works from a home mini PC as long as HTTPS and webhooks reach the box (Cloudflare Tunnel)
- No monthly Stripe fee on standard pricing; you pay when a charge succeeds
- Payouts go to the CFLLC Stripe account (same EIN / bank as the LLC)

Flow:

1. Customer enters shipping address on SpockShop.com.
2. Server quotes shipping + sales tax from **server prices**, not the browser.
3. Server creates a Stripe Checkout Session for `subtotal + shipping + tax`.
4. Webhook `checkout.session.completed` marks the order paid, decrements inventory, writes the `sales` row.

Store on the order: `stripe_session_id`, `payment_intent_id`, amount breakdown.

Do not put card numbers on the mini PC.

---

## 2. Crypto — BTCPay Server on the same mini PC

Do **not** add Coinbase Commerce, BitPay, or another hosted crypto company if the goal is fewer vendors. **BTCPay Server** is open source and runs in Docker next to the shop.

- Customer picks “Pay with crypto.”
- Shop creates a BTCPay invoice for the same total (subtotal + shipping + tax) in USD, payable in BTC (and Lightning if you enable it).
- BTCPay webhook marks the order paid the same way Stripe does.
- You withdraw from *your* wallet. No extra processor cut beyond miner / Lightning fees.

Caveats to accept up front:

- Crypto is volatile; invoice should be short-lived (15–60 minutes).
- Treat crypto receipts as CFLLC income at the USD invoice amount.
- You still owe sales tax on the taxable amount even if the customer paid in BTC.
- Start with Bitcoin only. More coins = more wallet ops, not more sales.

---

## 3. Sales tax — CFLLC books

Tax is a **liability**, not profit. Checkout must show it, collect it on website orders, and store a snapshot so a CPA can file.

### What to collect on every website order

- Ship-to street, city, state, ZIP, country
- Taxable subtotal (item price; usually shipping *is* taxable in some states — store both flags)
- Jurisdiction: state (+ county/city later if volume requires)
- Rate used and amount collected
- `tax_exempt` flag (almost never for retail resale to consumers)

### Nexus (you must confirm with your CPA)

Likely starting point: **origin/nexus in the state(s) where CFLLC has a real presence** (home office / inventory storage). Destination rates apply for many states once you have nexus there.

Do not guess nexus from this doc. For software:

**v1 (cheap, honest):**

- Configurable nexus states in admin (start with the CFLLC home state).
- For ship-to addresses **in a nexus state**, apply that state’s combined rate table (state + a default local average, or ZIP rate file).
- For ship-to addresses **outside nexus**, charge `$0` tax and record `tax_reason = no_nexus`.
- Local pickup: origin-state rate.

**v1.1 if orders spread across many states:**

- Stripe Tax is the least-work option (Stripe already in the stack). It is a paid calculation add-on. Use it only when a ZIP-rate file becomes painful.
- Avoid a third tax SaaS (TaxJar / Avalara) until filing complexity requires it.

### Resale nuance

You already paid sales tax or used a resale certificate when *buying* inventory. That does not remove tax when *selling* to a consumer on SpockShop.com. Marketplace facilitated sales (eBay, Depop, etc.) are often collected by the platform — record “tax remitted by platform” so you do not double-pay.

Admin sales log columns:

- `channel`
- `sold_price`
- `tax_collected` (website)
- `tax_remitted_by_platform` (eBay/Depop/etc.)
- `platform_fees`
- `shipping_charged` / `shipping_cost`
- `purchase_cost`
- `net_to_cfllc`

---

## 4. Shipping quotes

Products already have `weightLb` and `dimensions`. Use them.

**v1 (no extra company):**

- Admin sets a few rules: e.g. under 1 lb = $6, 1–5 lb = $12, 5–15 lb = $18, oversized = “request quote.”
- Free-shipping threshold optional (e.g. $75).
- Local pickup = $0 shipping, origin tax.

**v1.1:** USPS Retail Ground / Priority via a free or low-cost rate source if the flat table is leaving money on the table. EasyPost/Shippo are extra companies — skip until volume hurts.

Checkout order:

1. Cart line items (server-verified price + qty)
2. Shipping method (pickup vs ship)
3. Address
4. Shipping amount
5. Tax on (goods [+ shipping if required])
6. Grand total → Stripe or BTCPay

Never trust a total the browser submits.

---

## 5. Website order statuses

`pending_payment` → `paid` → `packed` → `shipped` → `completed`  
Also: `cancelled`, `refunded`

Paid is only set from Stripe or BTCPay webhooks, not from the thank-you page.

---

## 6. What CFLLC still handles outside the app

- Stripe account legal name / EIN / bank = CFLLC
- Sales-tax permit(s) in nexus state(s)
- Quarterly/annual sales-tax return using the order export
- 1099-K / Stripe payouts vs marketplace 1099s — do not commingle in one “sales” number without `channel`

The shop software stores the numbers. It does not file the return.
