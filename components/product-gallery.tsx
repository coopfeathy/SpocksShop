"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import { ProductImage as ProductImageType } from "@/lib/types";

export function ProductGallery({ images }: { images: ProductImageType[] }) {
  const [active, setActive] = useState(0);
  const activeImage = images[active] ?? images[0];

  return (
    <div className="space-y-3">
      <ProductImage
        src={activeImage.src}
        alt={activeImage.alt}
        className="retro-glow h-[430px] rounded-xl border border-white/70 bg-white/80"
      />
      <div className="grid grid-cols-3 gap-2">
        {images.map((image, index) => (
          <button
            type="button"
            key={image.id}
            onClick={() => setActive(index)}
            className={`overflow-hidden rounded-lg border p-0.5 ${
              active === index ? "border-slate-900" : "border-slate-200"
            }`}
          >
            <ProductImage
              src={image.src}
              alt={image.alt}
              className="h-20 w-full rounded-md"
              imgClassName="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
