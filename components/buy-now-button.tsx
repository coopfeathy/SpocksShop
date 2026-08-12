"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";

export function BuyNowButton({ productId }: { productId: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(productId);
        router.push("/checkout");
      }}
      className="btn btn-accent px-6 py-3"
    >
      Buy now
    </button>
  );
}
