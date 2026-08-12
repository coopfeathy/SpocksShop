"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState } from "@/components/empty-state";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/data";
import { ORDERS_STORAGE_KEY, readFromStorage } from "@/lib/storage";
import { Order } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export function AccountPageContent() {
  const [orders] = useState<Order[]>(() =>
    readFromStorage<Order[]>(ORDERS_STORAGE_KEY, []),
  );

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Once you complete checkout, your order history will appear here."
        ctaLabel="Explore products"
        ctaHref="/shop"
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="surface-dark rounded-2xl px-6 py-6 text-stone-100">
        <p className="font-tech text-[11px] uppercase tracking-[0.13em] text-stone-300">
          CUSTOMER ARCHIVE
        </p>
      </section>
      <SectionHeading
        eyebrow="Account"
        title="Order History"
        description="Review recent orders and rediscover what you've found."
      />

      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order.id} className="surface-panel rounded-xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">Order {order.id}</h2>
              <p className="text-sm text-slate-600">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-1 text-sm text-slate-600">{order.customerName}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {order.items.map((item) => {
                const product = products.find((entry) => entry.id === item.productId);
                return (
                  <li key={`${order.id}-${item.productId}`} className="flex justify-between">
                    <span>
                      {product?.title ?? item.productId} × {item.quantity}
                    </span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-sm font-semibold text-slate-900">
                Total: {formatCurrency(order.total)}
              </p>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/shop"
        className="btn btn-outline inline-flex"
      >
        Continue shopping
      </Link>
    </div>
  );
}
