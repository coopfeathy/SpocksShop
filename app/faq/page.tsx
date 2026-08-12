import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shopping, shipping, and returns.",
};

const faqItems = [
  {
    id: "shipping",
    question: "How long does shipping take?",
    answer:
      "Most orders ship within 1-2 business days. Standard delivery typically arrives in 3-6 business days within the U.S.",
  },
  {
    id: "returns",
    question: "Do you accept returns?",
    answer:
      "Yes. Returns are accepted within 14 days for items that arrive damaged or materially different from the listing condition.",
  },
  {
    id: "privacy",
    question: "How is my information used?",
    answer:
      "We only collect the information needed to process your order and communicate updates. We do not sell customer data.",
  },
  {
    id: "inventory",
    question: "Will sold out items come back?",
    answer:
      "Usually not. Most inventory is one-of-a-kind, so availability changes quickly and restocks are uncommon.",
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Help center"
        title="Frequently Asked Questions"
        description="Everything you need to know before and after checkout."
      />

      <section className="surface-panel space-y-3 rounded-2xl p-6">
        {faqItems.map((item) => (
          <details key={item.id} id={item.id} className="rounded-xl border border-slate-200 bg-white/80 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
