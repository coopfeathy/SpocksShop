"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface RevealProps {
  children: React.ReactNode;
  /** CSS animation class to apply when visible. Default "reveal-up" */
  animation?: "reveal-up" | "reveal-fade" | "reveal-scale" | "reveal-left" | "reveal-right";
  /** Delay in ms. Default 0 */
  delay?: number;
  className?: string;
}

export function Reveal({
  children,
  animation = "reveal-up",
  delay = 0,
  className = "",
}: RevealProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>({ delay });

  return (
    <div
      ref={ref}
      className={`${animation}-init ${visible ? animation : ""} ${className}`}
    >
      {children}
    </div>
  );
}
