import type { Metadata } from "next";
import { CartPageContent } from "@/components/cart-page-content";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review products in your cart before checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
