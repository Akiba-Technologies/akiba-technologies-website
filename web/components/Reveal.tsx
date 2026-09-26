"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

// Fades and lifts its content in the first time it crosses into view.
// Renders as a plain <div> by default, or whatever tag "as" names, so it can
// wrap a CTA <a> without adding an extra box that would break a flex row.
export function Reveal({ as = "div", delay = 0, className = "", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    // IntersectionObserver ignores whatever its callback returns, so the
    // pending timeout is tracked here instead and cleared by the effect's
    // own cleanup if the component unmounts (or delay changes) first.
    let timer: ReturnType<typeof setTimeout> | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          timer = setTimeout(() => setVisible(true), delay);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return createElement(
    as,
    { ref, className: `${className}${visible ? " in" : ""}`.trim(), "data-rv": true, ...rest },
    children
  );
}
