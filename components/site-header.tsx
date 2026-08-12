"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { CartDrawer } from "@/components/cart-drawer";

const primaryNav = ["/shop", "/hunt", "/about"];

const tickerMessages = [
  "SCANNING THE GALAXY FOR GREAT FINDS",
  "NEWLY CATALOGUED OBJECTS ADDED WEEKLY",
  "SECOND-LIFE INVENTORY. FIRST-RATE CURATION.",
];

export function SiteHeader() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTickerIndex((current) => (current + 1) % tickerMessages.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(192,180,155,0.4)] bg-[rgba(247,242,229,0.94)] backdrop-blur-xl">
      {/* Main nav bar */}
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3.5 md:px-8">
        <Link href="/" className="group shrink-0">
          <p className="font-display text-base font-semibold tracking-[0.06em] text-slate-900 sm:text-lg">
            Spock&apos;s Resale Shop
          </p>
          <p className="font-tech text-[9px] tracking-[0.18em] text-slate-400 uppercase">
            Curated Finds · Est. 2026
          </p>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary menu">
          {navLinks
            .filter((link) => primaryNav.includes(link.href))
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`btn px-5 py-2 text-xs ${
                  pathname === link.href ? "btn-primary" : "btn-ghost"
                }`}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <form action="/shop" method="get" className="relative">
            <label htmlFor="global-search" className="sr-only">
              Search finds
            </label>
            <input
              id="global-search"
              name="q"
              placeholder="Search finds..."
              className="field-input h-8 w-40 rounded-full pl-8 text-[12px]"
            />
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
              ⌕
            </span>
          </form>
          <Link
            href="/wishlist"
            className="btn btn-ghost px-3 py-2 text-xs relative"
            aria-label={`Wishlist (${wishlistItems.length} items)`}
          >
            ♥
            {wishlistItems.length > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] text-white">
                {wishlistItems.length}
              </span>
            ) : null}
          </Link>
          <Link href="/account" className="btn btn-ghost px-3 py-2 text-xs" aria-label="Account">
            ⌂
          </Link>
          <button
            type="button"
            className="btn btn-primary px-4 py-2 text-xs relative"
            onClick={() => setDrawerOpen(true)}
            aria-label={`Open cart (${cartCount} items)`}
          >
            Cart
            {cartCount > 0 ? (
              <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-slate-900 font-bold">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="btn btn-ghost px-3 py-2 text-xs"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
          <button
            type="button"
            className="btn btn-primary px-3 py-2 text-xs relative"
            onClick={() => setDrawerOpen(true)}
          >
            Cart
            {cartCount > 0 ? (
              <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-slate-900 font-bold">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>

      {/* Ticker */}
      <div className="status-ticker">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-1 md:px-8">
          <p
            key={tickerIndex}
            className="font-tech text-[9px] tracking-[0.16em] text-slate-500 uppercase"
            style={{ animation: "ticker-fade 3.2s ease both" }}
          >
            {tickerMessages[tickerIndex]}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <p className="font-tech text-[9px] tracking-[0.16em] text-slate-500 uppercase">
              Signal: Active
            </p>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen ? (
        <nav
          className="border-t border-stone-200 bg-[rgba(247,242,229,0.98)] px-4 py-4 lg:hidden"
          aria-label="Mobile menu"
        >
          <div className="grid gap-2">
            <form action="/shop" method="get" className="mb-3">
              <label htmlFor="mobile-search" className="sr-only">
                Search finds
              </label>
              <input
                id="mobile-search"
                name="q"
                placeholder="Search finds..."
                className="field-input rounded-xl text-sm"
              />
            </form>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-slate-900 text-stone-100"
                    : "bg-white/70 text-slate-700 hover:bg-white"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                href="/wishlist"
                className="btn btn-outline flex-1 justify-center py-2 text-xs"
                onClick={() => setMobileOpen(false)}
              >
                Wishlist {wishlistItems.length > 0 ? `(${wishlistItems.length})` : ""}
              </Link>
              <Link
                href="/account"
                className="btn btn-outline flex-1 justify-center py-2 text-xs"
                onClick={() => setMobileOpen(false)}
              >
                Account
              </Link>
            </div>
          </div>
        </nav>
      ) : null}
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
