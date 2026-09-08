# Payments (architecture only — checkout not implemented)

Providers implement `PaymentProvider`:

- `StripeProvider`
- `BTCPayProvider`

Both receive the **same server-calculated order total**. Phase 1 methods throw `PaymentsNotEnabledError`. There is no simulated “payment succeeded” path.

A payment row stores:

- `payment_provider`
- `payment_status`
- `provider_payment_id`
- `amount`
- `currency`
- timestamps

Confirmation in a later phase must come from the provider webhook. Secrets stay in environment variables and are never rendered in admin.
