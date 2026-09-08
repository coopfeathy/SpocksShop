# Tax configuration

**VERIFY WITH ARKANSAS DFA BEFORE LIVE SALES.**

The application does not treat any percentage as the legally correct Bentonville or Arkansas rate. Seed data may include a placeholder decimal rate so the admin UI is usable. That row is created with `verified_with_authority = false`.

## Stored fields

- jurisdiction
- applies_to (`pickup` | `destination` | `both`)
- state / city / postal code
- rate (decimal, configured in admin — not hard-coded as the legal rate)
- effective_from / expires_at
- source_reference
- is_active
- verified_with_authority

## Selection

- Pickup → match pickup-location rows (Bentonville configuration).
- Ship inside AR → match destination city/ZIP.
- Ship outside AR → $0 tax, reason “no nexus” (v1).

Live collection (`requireVerifiedForLive`) refuses unverified rows.

## Order snapshot

Completed orders will store `tax_snapshot` JSON so later config edits cannot rewrite history.

Marketplace channels do not use this website tax collector.
