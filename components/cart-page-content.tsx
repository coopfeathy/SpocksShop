"use client";

import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { SectionHeading } from "@/components/section-heading";
import { useCart } from "@/contexts/cart-context";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function CartPageContent() {
  const { cartItems, removeFromCart, subtotal, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Start exploring current finds and add your favorites before they disappear."
        ctaLabel="Shop now"
        ctaHref="/shop"
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="surface-dark rounded-2xl px-6 py-6 text-stone-100">
        <p className="font-tech text-[11px] uppercase tracking-[0.13em] text-stone-300">
          FIELD CART
        </p>
      </section>
      <SectionHeading
        eyebrow="Your selections"
        title="Cart"
        description="Review your items before checkout."
      />

      <div className="space-y-4">
        {cartItems.map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) {
            return null;
          }

          return (
            <article key={item.productId} className="surface-panel grid gap-4 rounded-xl p-4 sm:grid-cols-[1fr_auto_auto]">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{product.title}</h2>
                <p className="text-sm text-slate-600">{product.subcategory}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                Qty
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.productId, Number(event.target.value))
                  }
                  className="field-input w-16 text-center"
                />
              </label>

              <button
                type="button"
                onClick={() => removeFromCart(item.productId)}
                className="justify-self-start text-sm font-semibold text-rose-700 hover:text-rose-900"
              >
                Remove
              </button>
            </article>
          );
        })}
      </div>

      <section className="space-panel rounded-xl p-6 text-slate-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-300">Subtotal</p>
          <p className="text-2xl font-semibold">{formatCurrency(subtotal)}</p>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Shipping and taxes are calculated at checkout.
        </p>
        <Link href="/checkout" className="btn btn-accent mt-5 inline-flex">
          Proceed to checkout
        </Link>
      </section>
    </div>
  );
}
