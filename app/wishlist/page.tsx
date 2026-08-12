import type { Metadata } from "next";
import { WishlistPageContent } from "@/components/wishlist-page-content";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Saved finds from Spock's Resale Shop.",
};

export default function WishlistPage() {
  return <WishlistPageContent />;
}
