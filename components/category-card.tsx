import Link from "next/link";
import Image from "next/image";
import { shopProducts } from "@/lib/data";
import { Category } from "@/lib/types";

const categoryTaglines: Record<string, string> = {
  clothing: "Things worth wearing again.",
  shoes: "Step into the second life.",
  electronics: "Old technology. New life.",
  collectibles: "Some things are worth keeping.",
  vintage: "Before it was vintage.",
  home: "Objects with another story to tell.",
  gaming: "Press start again.",
  miscellaneous: "Unexpected objects, curated anyway.",
};

export function CategoryCard({ category }: { category: Category }) {
  const sample = shopProducts.find((p) => p.category === category.slug);

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="category-tile group block no-underline"
      aria-label={`Browse ${category.name}`}
    >
      <article className="relative h-56 w-full overflow-hidden rounded-xl">
        {/* Background image */}
        {sample ? (
          <div className="category-tile-image absolute inset-0">
            <Image
              src={sample.images[0].src}
              alt={sample.images[0].alt}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-stone-200" />
        )}

        {/* Gradient overlay */}
        <div className="category-tile-overlay absolute inset-0" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="font-tech text-[9px] tracking-[0.2em] text-stone-400 uppercase mb-1">
            {category.name}
          </p>
          <h3 className="font-display text-xl font-semibold leading-tight text-white">
            {categoryTaglines[category.slug] ?? category.description}
          </h3>
          <p className="font-tech mt-2 text-[9px] tracking-[0.14em] text-stone-400 uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Browse →
          </p>
        </div>
      </article>
    </Link>
  );
}

