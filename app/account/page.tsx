import type { Metadata } from "next";
import { AccountPageContent } from "@/components/account-page-content";

export const metadata: Metadata = {
  title: "Account",
  description: "View your account and order history.",
};

export default function AccountPage() {
  return <AccountPageContent />;
}
