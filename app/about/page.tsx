import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { OrbitalDecoration } from "@/components/visual/orbital-decoration";
import { CatalogLabel } from "@/components/visual/catalog-label";
import { TechnicalGrid } from "@/components/visual/technical-grid";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Spock's Resale Shop sources interesting secondhand finds and gives them another life.",
};

const sourceTypes = [
  { label: "Outlet stores", icon: "◎" },
  { label: "Thrift & donation stores", icon: "◈" },
  { label: "Flea markets", icon: "◆" },
  { label: "Estate sales", icon: "◉" },
  { label: "Clearance stores", icon: "◑" },
  { label: "Other secondhand sources", icon: "◐" },
];

const principles = [
  {
    title: "We hunt, you discover.",
    body: "Every listing starts with real legwork — getting in the car, walking the aisles, and knowing what's worth picking up.",
  },
  {
    title: "Honesty is the whole point.",
    body: "Condition notes exist for a reason. We tell you exactly what you're getting, including flaws.",
  },
  {
    title: "Character over commodity.",
    body: "We're not here for bulk. We're here for interesting, useful objects that deserve a second chance.",
  },
  {
    title: "New finds, constantly.",
    body: "The inventory turns over regularly. If you don't see what you want today, come back soon.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-12">

      {/* ── HERO ── */}
      <section className="surface-dark hero-catalog-frame relative overflow-hidden rounded-3xl px-6 py-14 text-stone-100 sm:px-10">
        {/* Orbital decoration */}
        <div className="absolute -right-10 -top-10 h-56 w-56 opacity-25 pointer-events-none" aria-hidden="true">
          <OrbitalDecoration size="lg" accent="gold" rings={2} />
        </div>

        <div className="relative z-10">
          <div className="hero-enter flex flex-wrap gap-2 opacity-0" style={{ animationDelay: "0.05s" }}>
            <CatalogLabel label="About the mission" variant="gold" />
            <CatalogLabel label="Est. 2026" />
          </div>
          <h1 className="hero-enter font-display mt-5 text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] tracking-tight text-stone-50 opacity-0" style={{ animationDelay: "0.15s" }}>
            A shop built on discovery.
          </h1>
          <p className="hero-enter mt-4 max-w-2xl text-sm leading-7 text-stone-400 opacity-0" style={{ animationDelay: "0.3s" }}>
            Interesting items deserve another life. Spock&apos;s Resale Shop exists to find them,
            clean them up, and connect them with people who&apos;ll actually use them.
          </p>
        </div>
      </section>

      {/* ── MISSION BODY ── */}
      <Reveal animation="reveal-up">
        <section className="grid gap-6 md:grid-cols-2">
          <article className="catalog-card space-y-3 rounded-xl p-6">
            <p className="text-eyebrow">What we do</p>
            <h2 className="font-display text-xl text-slate-900">We hunt for quality, character, and value.</h2>
            <p className="text-sm leading-7 text-slate-700">
              Sometimes that means finding a nearly new kitchen item at an outlet closeout.
              Sometimes it means spotting a dusty vintage gem buried behind old cables at a flea market.
            </p>
            <p className="text-sm leading-7 text-slate-700">
              Either way, we clean it up, test what needs testing, and tell you exactly what
              you&apos;re getting — no surprises.
            </p>
          </article>

          <article className="catalog-card space-y-3 rounded-xl p-6">
            <p className="text-eyebrow">Why customers come back</p>
            <h2 className="font-display text-xl text-slate-900">One-of-a-kind inventory, honest condition notes.</h2>
            <p className="text-sm leading-7 text-slate-700">
              No inflated hype. No mystery defects. Just well-documented finds with personality,
              priced to reflect what they actually are.
            </p>
            <p className="text-sm leading-7 text-slate-700">
              Our job is to do the digging so you get the thrill of discovery without the
              guesswork.
            </p>
          </article>
        </section>
      </Reveal>

      {/* ── WHERE WE HUNT ── */}
      <Reveal animation="reveal-up">
        <section className="surface-panel relative overflow-hidden rounded-2xl px-6 py-10">
          {/* Technical grid decoration */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none" aria-hidden="true">
            <TechnicalGrid
              className="h-48 w-80"
              cellSize={35}
              color="rgba(196,154,85,0.7)"
              opacity={1}
              showTarget
            />
          </div>

          <div className="relative z-10">
            <p className="text-eyebrow mb-2">Where we source</p>
            <h2 className="font-display text-display-md text-slate-900">
              The Hunt is everywhere.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              We source from wherever interesting objects end up — which turns out to be
              a surprisingly long list of places.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sourceTypes.map((source) => (
                <li
                  key={source.label}
                  className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white/60 px-4 py-3"
                >
                  <span className="text-[var(--gold)] text-lg shrink-0">{source.icon}</span>
                  <span className="text-sm text-slate-700">{source.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      {/* ── PRINCIPLES ── */}
      <Reveal animation="reveal-up">
        <section className="space-y-4">
          <p className="text-eyebrow">How we operate</p>
          <h2 className="font-display text-display-md text-slate-900">Our principles.</h2>
          <div className="stagger-children grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} animation="reveal-up" delay={i * 80}>
                <article className="catalog-card rounded-xl p-5">
                  <h3 className="font-display text-lg text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── CLOSING ── */}
      <Reveal animation="reveal-up">
        <section className="surface-dark rounded-2xl px-6 py-10 text-stone-100 sm:px-8">
          <p className="text-eyebrow text-stone-500 mb-3">The short version</p>
          <p className="font-display text-2xl leading-snug text-stone-100 sm:text-3xl">
            Live Long and Prosper is our reminder to build a shop that&apos;s useful, reliable,
            and a bit adventurous.
          </p>
          <p className="mt-4 text-sm text-stone-400 max-w-xl">
            Spock&apos;s Resale Shop is an independent resale brand. We are not affiliated with
            Star Trek or Paramount Pictures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/hunt" className="btn btn-accent">
              See The Hunt →
            </Link>
            <Link href="/shop" className="btn btn-outline-dark">
              Browse the Finds
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
