"use client";

import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

interface StatItem {
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    target: 50,
    suffix: "+",
    label: "Enterprise Deployments",
  },
  {
    target: 99.9,
    decimals: 1,
    suffix: "%",
    label: "System Uptime SLA",
  },
  {
    target: 200,
    suffix: "+",
    label: "Engineers Trained",
  },
];

export function ByTheNumbers() {
  return (
    <section
      className="sec sec-by-numbers"
      aria-labelledby="numbers-heading"
      style={{
        background: "linear-gradient(180deg, rgb(8, 17, 30) 0%, rgb(7, 14, 22) 100%)",
      }}
    >
      {/* Background circuit dots ambient pattern (matching development process) */}
      <div className="sec-pattern pattern-dots-circuit" aria-hidden="true" />

      {/* Background ambient radial glow (clean background without grid lines) */}
      <div className="numbers-cyber-bg" aria-hidden="true">
        <div className="laser-radial-glow" />
      </div>

      <div className="wrap">
        {/* Section Header */}
        <div className="numbers-head">
          <Reveal>
            <p className="kicker numbers-kicker">
              Engineering Scale &bull; Proven Impact
            </p>
            <h2 id="numbers-heading" className="numbers-title">
              Akiba Technologies by the <span className="numbers-highlight">numbers</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="numbers-subtitle">
              Delivering high-performance software with engineering rigor and scalable architecture.
            </p>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="numbers-grid">
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} delay={150 + idx * 80} className="numbers-col">
              <div className="numbers-card">
                <div className="numbers-val">
                  <Counter to={stat.target} decimals={stat.decimals || 0} />
                  <span className="numbers-suffix">{stat.suffix}</span>
                </div>
                <p className="numbers-lbl">{stat.label}</p>
              </div>
              {idx < STATS.length - 1 && <div className="numbers-divider" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
