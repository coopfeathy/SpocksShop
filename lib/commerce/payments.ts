export type PaymentProviderName = "stripe" | "btcpay";

export type CreatePaymentInput = {
  orderId: string;
  amountCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
};

export type CreatePaymentResult = {
  provider: PaymentProviderName;
  redirectUrl: string;
  providerPaymentId: string;
};

export interface PaymentProvider {
  readonly name: PaymentProviderName;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
}

export class PaymentsNotEnabledError extends Error {
  constructor(provider: string) {
    super(`${provider} is configured in the data model only. Checkout is not implemented in Phase 1.`);
    this.name = "PaymentsNotEnabledError";
  }
}

export class StripeProvider implements PaymentProvider {
  readonly name = "stripe" as const;
  async createPayment(): Promise<CreatePaymentResult> {
    throw new PaymentsNotEnabledError("Stripe");
  }
}

export class BTCPayProvider implements PaymentProvider {
  readonly name = "btcpay" as const;
  async createPayment(): Promise<CreatePaymentResult> {
    throw new PaymentsNotEnabledError("BTCPay");
  }
}

export function getPaymentProvider(name: PaymentProviderName): PaymentProvider {
  if (name === "stripe") return new StripeProvider();
  return new BTCPayProvider();
}

export function paymentSettingsStatus() {
  return {
    stripeConfigured: Boolean(process.env.STRIPE_SECRET_KEY),
    btcpayConfigured: Boolean(
      process.env.BTCPAY_URL && process.env.BTCPAY_API_KEY && process.env.BTCPAY_STORE_ID,
    ),
    checkoutEnabled: false,
    note: "Phase 1 stores payment rows and provider names only. No fake success path. Webhook confirmation comes in the checkout phase.",
  };
}
