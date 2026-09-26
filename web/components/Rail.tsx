"use client";

import { useEffect, useRef } from "react";

// The signature element: a hairline bus down the left gutter that fills mint
// with how far down the page the visitor has scrolled, plus a travelling
// packet. This one runs on every scroll frame, so it writes directly to the
// DOM through a ref instead of round-tripping through React state and a
// re-render on every tick.
export function Rail() {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ticking = false;

    const paint = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", paint, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", paint);
    };
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      <span className="rail-cap top" />
      <span className="rail-fill" ref={fillRef} />
      <span className="rail-pulse" />
      <span className="rail-cap bot" />
    </div>
  );
}
