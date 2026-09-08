import { paymentSettingsStatus } from "@/lib/commerce/payments";

export default function AdminPaymentsPage() {
  const status = paymentSettingsStatus();
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Payment Settings</h1>
      <p className="text-sm text-slate-600">{status.note}</p>
      <ul className="space-y-2 text-sm">
        <li>Stripe secret configured: {status.stripeConfigured ? "yes" : "no"}</li>
        <li>BTCPay configured: {status.btcpayConfigured ? "yes" : "no"}</li>
        <li>Checkout enabled: {status.checkoutEnabled ? "yes" : "no"}</li>
      </ul>
    </section>
  );
}
