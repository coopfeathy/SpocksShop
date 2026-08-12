"use client";

import Link from "next/link";
import { StarField } from "@/components/visual/star-field";
import { OrbitalDecoration } from "@/components/visual/orbital-decoration";
import { Constellation } from "@/components/visual/constellation";
import { ScanLine } from "@/components/visual/scan-line";

export function HeroSection() {
  return (
    <section
      className="hero-wrapper hero-catalog-frame surface-dark relative overflow-hidden"
      aria-label="Hero"
    >
      {/* Layer 1 — animated star field */}
      <div className="absolute inset-0 z-0">
        <StarField starCount={140} speed={0.6} />
      </div>

      {/* Layer 2 — orbital decoration top-right */}
      <div className="absolute -right-16 -top-24 z-0 h-[340px] w-[340px] opacity-40 sm:opacity-55">
        <OrbitalDecoration size="lg" accent="gold" rings={3} />
      </div>

      {/* Layer 3 — constellation bottom-left */}
      <div className="absolute -bottom-8 -left-12 z-0 h-52 w-64 opacity-35">
        <Constellation points={10} lineColor="rgba(196,154,85,0.4)" dotColor="rgba(196,154,85,0.7)" />
      </div>

      {/* Layer 4 — orbital decoration small, top-left */}
      <div className="absolute left-8 top-8 z-0 h-32 w-32 opacity-25">
        <OrbitalDecoration size="sm" accent="blue" rings={2} />
      </div>

      {/* Occasional scan line */}
      <ScanLine
        className="absolute inset-0 z-0"
        color="rgba(196,154,85,0.4)"
        duration={7}
      />

      {/* Main content */}
      <div className="relative z-10 grid items-center gap-8 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          {/* Eyebrow */}
          <div
            className="hero-enter flex items-center gap-3 opacity-0"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="font-tech text-[10px] tracking-[0.22em] text-stone-400 uppercase">
              Field Catalog · Expedition Active
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main headline */}
          <h1
            className="hero-enter font-display mt-5 text-[clamp(2.4rem,6vw,5rem)] leading-[0.9] tracking-tight text-stone-50 opacity-0"
            style={{ animationDelay: "0.15s" }}
          >
            THE UNIVERSE IS
            <br />
            <span className="text-[var(--gold-light)]">FULL OF FINDS.</span>
          </h1>

          {/* Subhead */}
          <p
            className="hero-enter font-display mt-4 text-[clamp(1rem,2.5vw,1.5rem)] text-stone-300 opacity-0"
            style={{ animationDelay: "0.32s" }}
          >
            We just happen to look for them.
          </p>

          {/* Slogan */}
          <p
            className="hero-enter font-tech mt-3 text-[11px] tracking-[0.2em] text-stone-500 uppercase opacity-0"
            style={{ animationDelay: "0.48s" }}
          >
            Live Long and Prosper.
          </p>

          {/* CTAs */}
          <div
            className="hero-enter mt-8 flex flex-wrap gap-3 opacity-0"
            style={{ animationDelay: "0.65s" }}
          >
            <Link href="/shop" className="btn btn-accent">
              Explore the Finds
            </Link>
            <Link href="/hunt" className="btn btn-outline-dark">
              Follow the Hunt
            </Link>
          </div>

          {/* Catalog info strip */}
          <div
            className="hero-enter catalog-info-line-light mt-8 flex flex-wrap gap-5 py-2.5 opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="font-tech text-[10px] tracking-[0.16em] text-stone-500 uppercase">
              Node: SRS-01
            </span>
            <span className="font-tech text-[10px] tracking-[0.16em] text-stone-500 uppercase">
              Signal: Active
            </span>
            <span className="font-tech text-[10px] tracking-[0.16em] text-stone-500 uppercase">
              Status: Curated Treasure Hunt
            </span>
          </div>
        </div>

        {/* Right side — coordinates + decorative chart */}
        <div
          className="hero-enter relative hidden justify-center lg:flex opacity-0"
          style={{ animationDelay: "0.4s" }}
          aria-hidden="true"
        >
          {/* Decorative scanning target */}
          <div className="relative h-72 w-72">
            <OrbitalDecoration size="lg" accent="gold" rings={3} className="absolute inset-0 h-full w-full" />
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-tech text-[9px] tracking-[0.22em] text-stone-500 uppercase">
                Scanning
              </p>
              <p className="font-tech mt-1 text-[11px] tracking-[0.18em] text-stone-400 uppercase">
                Galaxy Sector 7
              </p>
              <div className="mt-2 flex gap-1">
                {[1,2,3].map(i => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-emerald-400"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coordinate labels around the orbit */}
          <div className="absolute top-4 left-8">
            <p className="font-tech text-[9px] tracking-[0.14em] text-stone-600 opacity-70">
              RA 14h 29m
            </p>
          </div>
          <div className="absolute bottom-4 right-8">
            <p className="font-tech text-[9px] tracking-[0.14em] text-stone-600 opacity-70">
              DEC +02° 03&apos;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
