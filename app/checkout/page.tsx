import type { Metadata } from "next";
import { CheckoutPageContent } from "@/components/checkout-page-content";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase at Spock's Resale Shop.",
};

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
