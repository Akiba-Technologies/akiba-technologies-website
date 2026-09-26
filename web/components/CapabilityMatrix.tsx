"use client";

import { useRef, useState, type ReactNode } from "react";

export type CapabilityPanel = {
  id: string;
  index: string;
  name: string;
  content: ReactNode;
};

// A vertical tab list with roving tabindex and arrow-key navigation, per the
// WAI-ARIA tabs pattern: only the active tab sits in the tab order, and
// Up/Down (or Left/Right) move focus and selection together.
export function CapabilityMatrix({ panels }: { panels: CapabilityPanel[] }) {
  const [active, setActive] = useState(panels[0]?.id ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (index: number, e: React.KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = panels[(index + step + panels.length) % panels.length];
    if (!next) return;
    setActive(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <div className="matrix" id="matrix">
      <div className="mx-tabs" role="tablist" aria-label="Capability areas" aria-orientation="vertical">
        {panels.map((panel, i) => (
          <button
            key={panel.id}
            ref={(el) => {
              tabRefs.current[panel.id] = el;
            }}
            className="mx-tab"
            type="button"
            role="tab"
            aria-selected={active === panel.id}
            tabIndex={active === panel.id ? 0 : -1}
            onClick={() => setActive(panel.id)}
            onKeyDown={(e) => move(i, e)}
          >
            <span className="ix">{panel.index}</span>
            <span className="nm">{panel.name}</span>
          </button>
        ))}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          id={panel.id}
          className={`mx-panel${active === panel.id ? " on" : ""}`}
          role="tabpanel"
          aria-label={panel.name}
        >
          {panel.content}
        </div>
      ))}
    </div>
  );
}
