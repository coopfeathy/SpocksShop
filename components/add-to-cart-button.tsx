"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";

export function AddToCartButton({ productId }: { productId: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(productId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
      }}
      className={`btn ${added ? "btn-accent" : "btn-primary"} px-6 py-3`}
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
