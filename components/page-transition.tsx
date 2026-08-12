"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    const bar = barRef.current;
    if (!bar) return;

    // Reset and re-trigger animation
    bar.style.animation = "none";
    bar.style.opacity = "1";
    // Force reflow
    void bar.offsetHeight;
    bar.style.animation = "";
    bar.style.animation = "progress-bar 0.7s cubic-bezier(0.22,1,0.36,1) both";
  }, [pathname]);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="page-transition-bar"
      style={{ animation: "none", opacity: 0 }}
    />
  );
}
