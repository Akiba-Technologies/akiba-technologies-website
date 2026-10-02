"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";

export function WhyChooseKnocker() {
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.removeProperty("--mouse-x");
    e.currentTarget.style.removeProperty("--mouse-y");
  };

  return (
    <section className="sec sec-why-knocker" id="why-choose" aria-labelledby="why-knocker-h">
      {/* Background ambient lighting */}
      <div className="why-knocker-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Section Header */}
        <Reveal
          className="sec-head"
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 20,
            maxWidth: "none",
            flexWrap: "wrap",
            marginBottom: 42,
          }}
        >
          <div>
            <p className="kicker">Why Akiba Tech</p>
            <h2 id="why-knocker-h" className="why-title">
              Why Choose <span className="title-accent">Akiba Tech</span>?
            </h2>
            <p className="lede why-lede">
              Empowering digital transformation through scalable, high-performance technology. We build modern, reliable, and high-impact software solutions with clean architecture and cutting-edge engineering.
            </p>
          </div>
          <Link className="btn btn-ghost btn-sm" href="/services">
            Explore Capabilities
            <svg className="btn-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 8h11m-4.5-4.5L13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>

        {/* Clean, Creative Bento Grid with Interactive Cursor Spotlight */}
        <div className="why-bento-grid">
          {/* Card 1: Enterprise AI & Intelligent Automation (Span 7) */}
          <Reveal
            className="why-card why-card-ai"
            delay={50}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="why-card-top">
              <div className="why-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <span className="why-tag">Flagship Capability</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Enterprise AI &amp; Automation</h3>
              <p className="why-card-desc">
                Autonomous agents, intelligent workflows, and private LLM pipelines engineered to automate operations with zero data leakage.
              </p>

              {/* Punchy Client Value Points */}
              <div className="why-feature-list">
                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Autonomous multi-step agent workflows &amp; orchestration</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Private &amp; secure RAG architectures with proprietary vector search</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Deterministic human-in-the-loop guardrails &amp; compliance audits</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="why-card-footer">
                <div className="why-chips">
                  <span className="why-chip">Custom Agents</span>
                  <span className="why-chip">Private RAG</span>
                  <span className="why-chip">Workflow AI</span>
                </div>
                <Link href="/services/ai" className="why-card-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Custom Software & Modern Web Platforms (Span 5) */}
          <Reveal
            className="why-card why-card-web"
            delay={100}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="why-card-top">
              <div className="why-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="why-tag">Full-Stack Modern</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Custom Software &amp; Web Platforms</h3>
              <p className="why-card-desc">
                High-concurrency web platforms engineered with strict type safety, sub-second speeds, and scalable architecture.
              </p>

              {/* Punchy Client Value Points */}
              <div className="why-feature-list">
                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Server-rendered Next.js performance &amp; instant navigation</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Strict TypeScript standards &amp; maintainable clean code</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Conversion-driven responsive UX &amp; mobile accessibility</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="why-card-footer">
                <div className="why-chips">
                  <span className="why-chip">Next.js</span>
                  <span className="why-chip">TypeScript</span>
                  <span className="why-chip">Modern UI</span>
                </div>
                <Link href="/services/web" className="why-card-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Cloud & Infrastructure Solutions (Span 4) */}
          <Reveal
            className="why-card why-card-cloud"
            delay={150}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="why-card-top">
              <div className="why-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <span className="why-tag">Infrastructure</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Cloud &amp; DevOps Engineering</h3>
              <p className="why-card-desc">
                High-availability topology, automated container clusters, and resilient DevOps pipelines for continuous uptime.
              </p>

              {/* Punchy Client Value Points */}
              <div className="why-feature-list">
                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">99.9% uptime SLA with automated multi-zone failover</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Zero-downtime CI/CD automated deployment rollouts</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Reproducible Infrastructure-as-Code across AWS &amp; Azure</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="why-card-footer">
                <div className="why-chips">
                  <span className="why-chip">Docker</span>
                  <span className="why-chip">Kubernetes</span>
                  <span className="why-chip">CI/CD</span>
                </div>
                <Link href="/services/cloud" className="why-card-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Digital Strategy & Product Transformation (Span 4) */}
          <Reveal
            className="why-card why-card-growth"
            delay={200}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="why-card-top">
              <div className="why-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <span className="why-tag">Strategic Impact</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Digital Strategy &amp; Growth</h3>
              <p className="why-card-desc">
                Aligning technical architecture directly with commercial outcomes, lower friction, and accelerated time-to-market.
              </p>

              {/* Punchy Client Value Points */}
              <div className="why-feature-list">
                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Technical discovery scoping to de-risk complex roadmaps</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Rapid two-week agile sprint delivery cycles</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Measurable commercial ROI &amp; conversion optimization</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="why-card-footer">
                <div className="why-chips">
                  <span className="why-chip">Discovery</span>
                  <span className="why-chip">Agile</span>
                  <span className="why-chip">Conversion</span>
                </div>
                <Link href="/services/strategy" className="why-card-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Card 5: Mission-Critical ERP & Core Systems (Span 4) */}
          <Reveal
            className="why-card why-card-erp"
            delay={250}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="why-card-top">
              <div className="why-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="why-tag">Operational Core</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Enterprise ERP &amp; Operations</h3>
              <p className="why-card-desc">
                Unified platforms that connect multi-branch inventory, audited ledgers, and automated procurement in real time.
              </p>

              {/* Punchy Client Value Points */}
              <div className="why-feature-list">
                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Real-time multi-branch warehouse &amp; stock sync</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Audit-proof double-entry GAAP financial ledgers</span>
                </div>

                <div className="why-feature-item">
                  <span className="feature-check" aria-hidden="true">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="feature-title">Hardware barcode scanner &amp; POS checkout integration</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="why-card-footer">
                <div className="why-chips">
                  <span className="why-chip">Multi-Branch</span>
                  <span className="why-chip">Audited Ledgers</span>
                  <span className="why-chip">POS Sync</span>
                </div>
                <Link href="/services/erp" className="why-card-link">
                  Learn more
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
