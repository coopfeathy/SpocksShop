"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImage({
  src,
  alt,
  width = 960,
  height = 720,
  className = "",
  imgClassName = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${className}`}>
      <div className={`absolute inset-0 ${loaded ? "opacity-0" : "opacity-100"} skeleton`} />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
