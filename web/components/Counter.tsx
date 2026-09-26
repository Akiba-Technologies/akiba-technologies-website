"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  decimals?: number;
};

// Counts up from 0 to its target the first time it scrolls into view, eased
// out so it settles rather than snapping. Honours reduced motion by jumping
// straight to the final value.
export function Counter({ to, decimals = 0 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setDisplay(to.toFixed(decimals));
      return;
    }

    let frame: number | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(el);

          const duration = 1400;
          let start: number | null = null;

          const step = (t: number) => {
            if (start === null) start = t;
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay((to * eased).toFixed(decimals));
            if (p < 1) frame = requestAnimationFrame(step);
            else setDisplay(to.toFixed(decimals));
          };
          frame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, decimals]);

  return <span ref={ref}>{display}</span>;
}
