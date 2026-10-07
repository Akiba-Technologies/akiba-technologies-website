"use client";

import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { useHomeConfig, DEFAULT_HOME_CONFIG } from "@/lib/home-store";

export function ByTheNumbers() {
  const { config } = useHomeConfig();
  const btn = config.byTheNumbers || DEFAULT_HOME_CONFIG.byTheNumbers;

  const stats = [
    {
      target: Number(btn.stat1Target) || 50,
      suffix: btn.stat1Suffix ?? "+",
      label: btn.stat1Label || "Enterprise Deployments",
    },
    {
      target: Number(btn.stat2Target) || 99.9,
      decimals: 1,
      suffix: btn.stat2Suffix ?? "%",
      label: btn.stat2Label || "System Uptime SLA",
    },
    {
      target: Number(btn.stat3Target) || 200,
      suffix: btn.stat3Suffix ?? "+",
      label: btn.stat3Label || "Engineers Trained",
    },
  ];

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
              {btn.kicker || "Engineering Scale • Proven Impact"}
            </p>
            <h2 id="numbers-heading" className="numbers-title">
              {btn.title || "Akiba Technologies by the"}{" "}
              <span className="numbers-highlight">{btn.highlight || "numbers"}</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="numbers-subtitle">
              {btn.subtitle || "Delivering high-performance software with engineering rigor and scalable architecture."}
            </p>
          </Reveal>
        </div>

        {/* Stats Grid */}
        <div className="numbers-grid">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={150 + idx * 80} className="numbers-col">
              <div className="numbers-card">
                <div className="numbers-val">
                  <Counter to={stat.target} decimals={stat.decimals || 0} />
                  <span className="numbers-suffix">{stat.suffix}</span>
                </div>
                <p className="numbers-lbl">{stat.label}</p>
              </div>
              {idx < stats.length - 1 && <div className="numbers-divider" aria-hidden="true" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
