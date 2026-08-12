"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useCart } from "@/contexts/cart-context";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cartItems, removeFromCart, subtotal } = useCart();

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const lineItems = useMemo(
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

  return (
    <>
      <button
        type="button"
        aria-label="Close cart drawer"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-950/45 transition-opacity duration-300 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Cart drawer"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-stone-700 bg-[var(--charcoal)] text-stone-100 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-stone-700 px-5 py-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button type="button" className="btn btn-outline-dark" onClick={onClose}>
            Close
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lineItems.length === 0 ? (
            <p className="rounded-xl border border-stone-700 bg-stone-900/30 px-4 py-3 text-sm text-stone-300">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-3">
              {lineItems.map(({ product, quantity }) => (
                <li key={product.id} className="rounded-xl border border-stone-700 bg-stone-900/40 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{product.title}</p>
                      <p className="text-xs text-stone-400">Qty {quantity}</p>
                    </div>
                    <p className="text-sm">{formatCurrency(product.price * quantity)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="mt-2 text-xs font-semibold text-rose-300 hover:text-rose-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className="border-t border-stone-700 px-5 py-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="text-stone-300">Subtotal</span>
            <span className="text-base font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex gap-2">
            <Link href="/cart" className="btn btn-outline-dark flex-1" onClick={onClose}>
              View cart
            </Link>
            <Link href="/checkout" className="btn btn-accent flex-1" onClick={onClose}>
              Checkout
            </Link>
          </div>
        </footer>
      </aside>
    </>
  );
}
