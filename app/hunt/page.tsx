import type { Metadata } from "next";
import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { Reveal } from "@/components/reveal";
import { OrbitalDecoration } from "@/components/visual/orbital-decoration";
import { Constellation } from "@/components/visual/constellation";
import { CatalogLabel } from "@/components/visual/catalog-label";
import { DiscoveryBadge } from "@/components/visual/discovery-badge";
import { StarField } from "@/components/visual/star-field";
import {
  getProductById,
  huntEntries,
  showHuntSensitiveMetrics,
} from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Hunt",
  description:
    "Every discovery at Spock's Resale Shop has a story, from sourcing location to final listing.",
};

export default function HuntPage() {
  const entries = [...huntEntries].sort((a, b) =>
    b.discoveryDate.localeCompare(a.discoveryDate),
  );

  return (
    <div className="space-y-14">

      {/* ── HEADER ── */}
      <section className="surface-dark relative overflow-hidden rounded-3xl px-6 py-14 text-stone-100 sm:px-10">
        {/* Starfield */}
        <div className="absolute inset-0 z-0">
          <StarField starCount={100} speed={0.4} />
        </div>
        {/* Orbital decoration */}
        <div className="absolute -right-8 -top-12 h-64 w-64 opacity-25 pointer-events-none z-0" aria-hidden="true">
          <OrbitalDecoration size="lg" accent="gold" rings={3} />
        </div>
        {/* Constellation */}
        <div className="absolute bottom-0 left-0 h-48 w-56 opacity-20 pointer-events-none z-0" aria-hidden="true">
          <Constellation points={9} lineColor="rgba(196,154,85,0.5)" dotColor="rgba(196,154,85,0.7)" animated={false} />
        </div>

        <div className="relative z-10">
          <div className="hero-enter flex items-center gap-3 opacity-0" style={{ animationDelay: "0.05s" }}>
            <CatalogLabel label="Discovery Log" variant="gold" />
            <CatalogLabel label="Expedition Active" variant="green" />
          </div>
          <h1 className="hero-enter font-display mt-5 text-[clamp(2.2rem,5vw,4rem)] leading-[0.92] tracking-tight text-stone-50 opacity-0" style={{ animationDelay: "0.15s" }}>
            THE HUNT
          </h1>
          <p className="hero-enter font-display mt-2 text-xl text-stone-300 opacity-0" style={{ animationDelay: "0.28s" }}>
            Every great find starts somewhere.
          </p>
          <p className="hero-enter mt-4 max-w-2xl text-sm leading-7 text-stone-400 opacity-0" style={{ animationDelay: "0.4s" }}>
            We chase stories, not just inventory. Each piece below was personally discovered
            in the wild — restored, documented, and brought into the shop with full field notes.
          </p>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="space-y-0">
        <Reveal animation="reveal-fade">
          <div className="mb-10">
            <p className="text-eyebrow mb-1">Recent discoveries</p>
            <h2 className="font-display text-display-md text-slate-900">
              Discovery Timeline
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              A behind-the-scenes look at where items were found and how they made it into the collection.
            </p>
          </div>
        </Reveal>

        {/* Timeline rail */}
        <div className="timeline-rail relative space-y-8 pl-6 md:pl-10">
          {entries.map((entry, i) => {
            const product = getProductById(entry.productId);
            if (!product) return null;
            const expNum = entry.id.replace("hunt-", "").padStart(3, "0");
            const available = entry.status === "Available" && product.status === "listed";

            return (
              <Reveal key={entry.id} animation="reveal-left" delay={i * 100}>
                <article className="hunt-entry relative rounded-2xl overflow-hidden">
                  {/* Timeline dot */}
                  <span
                    className="absolute -left-[1.35rem] top-8 z-10 h-3.5 w-3.5 rounded-full border-2 border-amber-400 bg-amber-400/30"
                    aria-hidden="true"
                  />

                  <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Images */}
                    <div className="space-y-2.5">
                      <div className="relative overflow-hidden rounded-xl">
                        <ProductImage
                          src={entry.photos[0]?.src ?? product.images[0].src}
                          alt={entry.photos[0]?.alt ?? product.images[0].alt}
                          className="h-52 rounded-xl"
                          imgClassName="transition-transform duration-500 hover:scale-[1.04]"
                        />
                        {/* Status overlay */}
                        <div className="absolute top-3 left-3">
                          {available ? (
                            <DiscoveryBadge type="expedition" />
                          ) : (
                            <DiscoveryBadge type="archive" />
                          )}
                        </div>
                      </div>
                      {entry.photos.slice(1, 4).length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {entry.photos.slice(1, 4).map((photo) => (
                            <ProductImage
                              key={photo.id}
                              src={photo.src}
                              alt={photo.alt}
                              className="h-18 rounded-lg"
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Content */}
                    <div>
                      {/* Header row */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <CatalogLabel label={`Expedition ${expNum}`} variant="gold" />
                        <CatalogLabel label={formatDate(entry.discoveryDate)} />
                        {product.subcategory ? (
                          <CatalogLabel label={product.subcategory} variant="blue" />
                        ) : null}
                      </div>

                      <h2 className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl">
                        {product.title}
                      </h2>

                      {/* Field data table */}
                      <dl className="mt-5 space-y-3">
                        <div>
                          <dt className="font-tech text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            Found at
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-slate-800">
                            {entry.whereDiscovered}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-tech text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            Field notes
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-slate-700">
                            {entry.story}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-tech text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            Result
                          </dt>
                          <dd className="mt-0.5 text-sm leading-relaxed text-slate-700">
                            {entry.result}
                          </dd>
                        </div>
                      </dl>

                      {/* Pricing */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <span className="chip chip-blue">
                          Listed: {formatCurrency(entry.finalResalePrice)}
                        </span>
                        {showHuntSensitiveMetrics ? (
                          <>
                            <span className="chip chip-gold">
                              Cost: {formatCurrency(entry.purchasePrice)}
                            </span>
                            {typeof entry.profit === "number" ? (
                              <span className="chip chip-green">
                                Profit: {formatCurrency(entry.profit)}
                              </span>
                            ) : null}
                          </>
                        ) : null}
                      </div>

                      {/* CTA */}
                      <div className="mt-6">
                        {available ? (
                          <Link href={`/shop/${product.slug}`} className="btn btn-primary">
                            See the Find →
                          </Link>
                        ) : (
                          <p className="font-tech text-[10px] uppercase tracking-[0.14em] text-slate-400">
                            ◼ This find has already been claimed.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
