export function dollarsToCents(value: number): number {
  return Math.round(value * 100);
}

export function centsToDollars(cents: number): number {
  return cents / 100;
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(centsToDollars(cents));
}

export function computeOrderTotal(input: {
  goodsSubtotalCents: number;
  shippingCents: number;
  taxCents: number;
}): number {
  if (input.goodsSubtotalCents < 0 || input.shippingCents < 0 || input.taxCents < 0) {
    throw new Error("Order components cannot be negative.");
  }
  return input.goodsSubtotalCents + input.shippingCents + input.taxCents;
}
