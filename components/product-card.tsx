"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { ProductImage } from "@/components/product-image";
import { WishlistButton } from "@/components/wishlist-button";
import { DiscoveryBadge } from "@/components/visual/discovery-badge";
import { isJustFound, isOnSale } from "@/lib/data";
import { Product } from "@/lib/types";
import { formatCurrency, toTitleCase } from "@/lib/utils";

function formatSpecimen(id: string) {
  const numeric = id.replaceAll(/\D/g, "");
  return `SPECIMEN ${numeric.padStart(5, "0")}`;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  const justFound = isJustFound(product.dateListed);
  const onSale = isOnSale(product);
  const available = product.quantity > 0;

  return (
    <article className="catalog-card group relative rounded-2xl overflow-hidden transition-all duration-300 motion-reduce:transform-none">
      {/* IMAGE ZONE */}
      <div className="card-image-wrap relative h-56">
        <ProductImage
          src={product.images[0].src}
          alt={product.images[0].alt}
          className="h-56 rounded-none"
          imgClassName="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />

        {/* Secondary image */}
        {product.images[1] ? (
          <div className="card-image-secondary absolute inset-0">
            <ProductImage
              src={product.images[1].src}
              alt={product.images[1].alt}
              className="h-56 rounded-none"
            />
          </div>
        ) : null}

        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
          {justFound ? <DiscoveryBadge type="just-found" /> : null}
          {onSale ? <DiscoveryBadge type="sale" /> : null}
          {!available ? <DiscoveryBadge type="archive" /> : null}
          {product.quantity === 1 && available ? <DiscoveryBadge type="last-one" /> : null}
        </div>

        {/* Top-right wishlist */}
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <WishlistButton productId={product.id} compact />
        </div>

        {/* Catalog meta bar slides up on hover */}
        <div className="card-meta-reveal absolute bottom-0 left-0 right-0 z-10 bg-[#0f1420]/85 px-3 py-2 backdrop-blur-sm">
          <p className="font-tech text-[9px] tracking-[0.16em] text-stone-300 uppercase">
            {formatSpecimen(product.id)} · {product.sku}
          </p>
          <p className="font-tech text-[9px] tracking-[0.12em] text-stone-400 uppercase mt-0.5">
            Condition: {product.condition} · {available ? "Available" : "Sold"}
          </p>
        </div>
      </div>

      {/* CONTENT ZONE */}
      <div className="px-3.5 pb-3.5 pt-3">
        {/* Category + condition chips */}
        <div className="flex flex-wrap gap-1.5">
          <span className="chip">{toTitleCase(product.category)}</span>
          <span className={`chip ${product.condition === "New" || product.condition === "Like New" ? "chip-green" : ""}`}>
            {product.condition}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display mt-2.5 text-lg leading-tight text-slate-900 group-hover:text-[var(--blue-muted)] transition-colors duration-200">
          <Link href={`/shop/${product.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]">
            {product.title}
          </Link>
        </h3>

        {/* Subcategory */}
        {product.subcategory ? (
          <p className="font-tech mt-1 text-[10px] uppercase tracking-[0.13em] text-slate-400">
            {product.subcategory}
          </p>
        ) : null}

        {/* Price + CTA row */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="font-display text-xl font-semibold text-slate-900">
              {formatCurrency(product.price)}
            </p>
            {onSale && product.originalPrice ? (
              <p className="font-tech text-[10px] text-slate-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!available}
            className={`btn text-xs px-4 py-2 transition-all duration-200 ${
              !available
                ? "btn-outline opacity-50 cursor-not-allowed"
                : added
                ? "btn-accent scale-95"
                : "btn-primary"
            }`}
            aria-label={`Add ${product.title} to cart`}
          >
            {!available ? "Sold" : added ? "✓ Added" : "Add"}
          </button>
        </div>

        {/* Open link */}
        <Link
          href={`/shop/${product.slug}`}
          className="btn-text mt-2 inline-flex items-center gap-1 text-[11px]"
        >
          Open catalog entry
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

