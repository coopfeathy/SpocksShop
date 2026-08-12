"use client";

import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { useWishlist } from "@/contexts/wishlist-context";
import { shopProducts } from "@/lib/data";

export function WishlistPageContent() {
  const { wishlistItems } = useWishlist();
  const items = shopProducts.filter((product) => wishlistItems.includes(product.id));

  if (items.length === 0) {
    return (
      <EmptyState
        title="No saved finds yet"
        description="Tap the heart icon on any product card to keep discoveries here."
        ctaLabel="Explore catalog"
        ctaHref="/shop"
      />
    );
  }

  return (
    <div className="space-y-7">
      <SectionHeading
        eyebrow="Your saved finds"
        title="Wishlist"
        description="A shortlist of discoveries worth revisiting."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
