"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { IDE_PANES, type IdePane } from "@/lib/ide-content";

const CYCLE_MS = 7200;
const LATENCY_MS = 2600;

function randomLatency() {
  return (Math.random() * 15 + 26).toFixed(1) + "ms";
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Renders one source line as its typed tokens. The "--i" custom property
// drives a staggered transition-delay in CSS, so the whole reveal is
// declarative: React just toggles the parent pane's "on" class.
function Line({ line, index }: { line: IdePane["lines"][number]; index: number }) {
  const style = { "--i": index } as CSSProperties;
  if (line.blank) return <div className="cl" style={style}> </div>;
  return (
    <div className="cl" style={style}>
      {line.tokens.map((tok, i) =>
        tok.cls ? (
          <span key={i} className={`t-${tok.cls}`}>
            {tok.text}
          </span>
        ) : (
          <span key={i}>{tok.text}</span>
        )
      )}
    </div>
  );
}

export function IdeWindow() {
  const [active, setActive] = useState<IdePane["id"]>("api");
  const [latency, setLatency] = useState("31.4ms");
  const rootRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopCycle = () => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current);
      cycleRef.current = null;
    }
  };

  const startCycle = () => {
    if (prefersReducedMotion()) return;
    stopCycle();
    cycleRef.current = setInterval(() => {
      setActive((current) => {
        const idx = IDE_PANES.findIndex((p) => p.id === current);
        return IDE_PANES[(idx + 1) % IDE_PANES.length]?.id ?? current;
      });
    }, CYCLE_MS);
  };

  // Gentle auto cycle through the panes, starting only once the window has
  // actually scrolled into view, and stopping for good once a visitor picks
  // a tab themselves.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      startCycle();
      return stopCycle;
    }
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            startCycle();
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopCycle();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A quietly moving latency read-out in the status strip.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setLatency(randomLatency()), LATENCY_MS);
    return () => clearInterval(id);
  }, []);

  const select = (id: IdePane["id"]) => {
    setActive(id);
    stopCycle();
  };

  return (
    <div className="ide" id="ide" ref={rootRef}>
      <div className="ide-bar">
        <span className="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <div className="ide-tabs" role="tablist" aria-label="Engineering view">
          {IDE_PANES.map((pane) => (
            <button
              key={pane.id}
              className="ide-tab"
              type="button"
              role="tab"
              aria-selected={active === pane.id}
              onClick={() => select(pane.id)}
            >
              {pane.tabLabel}
            </button>
          ))}
        </div>
        <span className="ide-host">
          <span className="dot" aria-hidden="true" />
          akiba-prod-eu1
        </span>
      </div>

      <div className="ide-body">
        {IDE_PANES.map((pane) => (
          <div
            key={pane.id}
            className={`ide-pane${active === pane.id ? " on" : ""}`}
            role="tabpanel"
            aria-label={pane.ariaLabel}
            aria-hidden={active !== pane.id}
          >
            {pane.lines.map((line, i) => (
              <Line line={line} index={i} key={i} />
            ))}
          </div>
        ))}
      </div>

      <div className="ide-status">
        <span>eu-central-1</span>
        <span>3 nodes healthy</span>
        <span>
          p95 <b>{latency}</b>
        </span>
        <span className="sp">build 4.18.2 &bull; deployed 6m ago</span>
      </div>
    </div>
  );
}
