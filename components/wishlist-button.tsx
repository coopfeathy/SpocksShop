"use client";

import { useState } from "react";
import { useWishlist } from "@/contexts/wishlist-context";

export function WishlistButton({
  productId,
  compact = false,
}: {
  productId: string;
  compact?: boolean;
}) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [feedback, setFeedback] = useState("");
  const active = isWishlisted(productId);

  return (
    <div className="relative">
      <button
        type="button"
        aria-pressed={active}
        aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
        onClick={() => {
          const isNowSaved = toggleWishlist(productId);
          setFeedback(isNowSaved ? "Saved" : "Removed");
          window.setTimeout(() => setFeedback(""), 1100);
        }}
        className={`btn ${
          compact ? "px-3 py-2" : ""
        } ${active ? "btn-outline border-amber-300 bg-amber-50 text-amber-900" : "btn-outline"}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${active ? "fill-amber-700 text-amber-700" : "fill-none text-slate-700"}`}
        >
          <path
            d="M12 20.4s-6.55-3.83-9.06-8.17C1.05 8.9 2.3 4.9 6.08 4.23c2.03-.35 3.31.63 3.92 1.53.61-.9 1.89-1.88 3.92-1.53 3.78.67 5.03 4.67 3.14 8-2.51 4.34-9.06 8.17-9.06 8.17Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {!compact ? <span>{active ? "Saved" : "Save"}</span> : null}
      </button>
      {feedback ? (
        <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-2 py-1 text-[11px] text-white">
          {feedback}
        </span>
      ) : null}
    </div>
  );
}
