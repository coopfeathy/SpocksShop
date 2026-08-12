"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  /** Fraction of element that must be visible before triggering. Default 0.15 */
  threshold?: number;
  /** Delay before adding the reveal class (ms). Default 0 */
  delay?: number;
  /** Only trigger once. Default true */
  once?: boolean;
}

/** Returns [ref, isVisible]. Attach ref to the element you want to observe. */
export function useScrollReveal<T extends Element = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.15, delay = 0, once = true } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            const t = window.setTimeout(() => setVisible(true), delay);
            if (once) observer.disconnect();
            return () => window.clearTimeout(t);
          } else {
            setVisible(true);
            if (once) observer.disconnect();
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, once]);

  return [ref, visible] as const;
}
