import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact-page-content";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Spock's Resale Shop for product questions and order support.",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="surface-dark rounded-2xl px-6 py-6 text-stone-100">
        <p className="font-tech text-[11px] uppercase tracking-[0.13em] text-stone-300">
          MESSAGE UPLINK
        </p>
      </section>
      <SectionHeading
        eyebrow="Contact"
        title="Send us a signal"
        description="Questions about an item or order? We usually reply within one business day."
      />
      <ContactPageContent />
    </div>
  );
}
