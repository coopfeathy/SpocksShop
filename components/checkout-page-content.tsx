"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { SectionHeading } from "@/components/section-heading";
import { useCart } from "@/contexts/cart-context";
import { products } from "@/lib/data";
import { appendOrder } from "@/lib/storage";
import { Order } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

type CheckoutStatus = "idle" | "submitting" | "success" | "error";

export function CheckoutPageContent() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState<CheckoutStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  const checkoutItems = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          return { product, quantity: item.quantity };
        })
        .filter((entry): entry is { product: (typeof products)[number]; quantity: number } =>
          Boolean(entry),
        ),
    [cartItems],
  );

  if (checkoutItems.length === 0 && status !== "success") {
    return (
      <EmptyState
        title="Your cart is currently empty"
        description="Add some finds to your cart before checkout."
        ctaLabel="Return to shop"
        ctaHref="/shop"
      />
    );
  }

  async function handleCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (checkoutItems.length === 0) {
      setStatus("error");
      setErrorMessage("Your cart is empty.");
      return;
    }

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!customerName || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please provide valid customer details.");
      return;
    }

    const orderNumber = `SRS-${Date.now().toString().slice(-6)}`;
    const order: Order = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      customerName,
      email,
      items: checkoutItems.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
        price: product.price,
      })),
      total: subtotal,
    };

    appendOrder(order);
    clearCart();
    setOrderId(orderNumber);
    setStatus("success");
  }

  if (status === "success") {
    return (
      <section className="surface-panel rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Order confirmed</h1>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Thanks for shopping with Spock&apos;s Resale Shop. Your order number is{" "}
          <strong>{orderId}</strong>.
        </p>
        <div className="surface-panel mx-auto mt-5 max-w-lg rounded-xl border-dashed p-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Packing Note
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Packed with care by the Spock&apos;s team. Live Long and Prosper.
          </p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/account"
            className="btn btn-primary"
          >
            View order history
          </Link>
          <Link
            href="/shop"
            className="btn btn-outline"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-7">
      <section className="surface-dark rounded-2xl px-6 py-6 text-stone-100">
        <p className="font-tech text-[11px] uppercase tracking-[0.13em] text-stone-300">
          CHECKOUT TERMINAL
        </p>
      </section>
      <SectionHeading
        eyebrow="Secure checkout"
        title="Checkout"
        description="Complete your purchase and claim your latest discovery."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleCheckout} className="surface-panel space-y-4 rounded-xl p-6">
          <div>
            <label htmlFor="checkout-full-name" className="field-label">
              Full name
            </label>
            <input
              id="checkout-full-name"
              name="fullName"
              required
              className="field-input mt-1"
            />
          </div>
          <div>
            <label htmlFor="checkout-email" className="field-label">
              Email
            </label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              required
              className="field-input mt-1"
            />
          </div>
          <div>
            <label htmlFor="checkout-address" className="field-label">
              Shipping address
            </label>
            <input
              id="checkout-address"
              name="address"
              required
              className="field-input mt-1"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="checkout-city" className="field-label">
                City
              </label>
              <input
                id="checkout-city"
                name="city"
                required
                className="field-input mt-1"
              />
            </div>
            <div>
              <label htmlFor="checkout-zip" className="field-label">
                ZIP code
              </label>
              <input
                id="checkout-zip"
                name="zip"
                required
                className="field-input mt-1"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Processing..." : "Place order"}
          </button>

          {status === "error" ? (
            <p className="status-alert status-alert-error" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>

        <aside className="space-panel rounded-xl p-6 text-slate-100">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {checkoutItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span>
                  {product.title} × {quantity}
                </span>
                <span>{formatCurrency(product.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
