"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { useHomeConfig } from "@/lib/home-store";

export function WhyChooseKnocker() {
  const { config } = useHomeConfig();
  const { telemetry } = config;
  return (
    <section className="sec sec-why-knocker" id="why-choose" aria-labelledby="why-knocker-h">
      {/* Background ambient lighting */}
      <div className="why-knocker-glow" aria-hidden="true" />

      <div className="wrap">
        {/* Section Header (left-aligned with kicker & action link, consistent with other sections) */}
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

        {/* Creative Bento Grid */}
        <div className="why-bento-grid">
          {/* Card 1: AI & Automation Systems (Featured Wide Card) */}
          <Reveal className="why-card why-card-ai" delay={50}>
            <div className="why-card-top">
              <div className="why-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93l-.75.14V14h3a3 3 0 0 1 3 3v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3h3v-3.93l-.75-.14A4.002 4.002 0 0 1 8 6a4 4 0 0 1 4-4Z" />
                  <circle cx="12" cy="6" r="1" />
                </svg>
              </div>
              <span className="why-tag">Flagship Capability</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">AI &amp; Automation Systems</h3>
              <p className="why-card-desc">
                Intelligent workflow automation, AI integration, and data pipelines engineered for efficiency, cost reduction, and automated business processes.
              </p>

              {/* Telemetry Visual Widget */}
              <div className="why-telemetry-box">
                <div className="why-telemetry-header">
                  <div className="why-telemetry-indicator">
                    <span className="telemetry-live-dot" />
                    <span>Neural Pipeline Active</span>
                  </div>
                  <span className="telemetry-speed">Latency: {telemetry.aiLatency || "82ms"}</span>
                </div>
                <div className="why-telemetry-meter">
                  <div className="why-telemetry-bar" style={{ width: "94%" }} />
                </div>
                <div className="why-telemetry-metrics">
                  <div className="metric-pill">
                    <span className="metric-val">{telemetry.aiAccuracy || "99.4%"}</span>
                    <span className="metric-lbl">Accuracy</span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-val">{telemetry.aiThroughput || "+4.8x"}</span>
                    <span className="metric-lbl">Throughput</span>
                  </div>
                  <div className="metric-pill">
                    <span className="metric-val">Zero</span>
                    <span className="metric-lbl">Data Leakage</span>
                  </div>
                </div>
              </div>

              {/* Visual feature pills */}
              <div className="why-chips">
                <span className="why-chip">Custom LLMs &amp; Agents</span>
                <span className="why-chip">RAG &amp; Vector Embeddings</span>
                <span className="why-chip">Automated RPA Pipelines</span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Custom Software & Web Development */}
          <Reveal className="why-card why-card-web" delay={100}>
            <div className="why-card-top">
              <div className="why-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </div>
              <span className="why-tag">Full-Stack Modern</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Custom Software &amp; Web Development</h3>
              <p className="why-card-desc">
                Full-stack development, modern APIs, responsive web applications, and UI/UX design built for reliability, clean code, and fast delivery.
              </p>

              {/* Visual Performance Gauge */}
              <div className="why-web-visual">
                <div className="lighthouse-badge">
                  <div className="lighthouse-circle">{telemetry.lighthouseScore || "100"}</div>
                  <div className="lighthouse-text">
                    <span className="lh-title">Lighthouse Score</span>
                    <span className="lh-sub">Sub-second First Contentful Paint</span>
                  </div>
                </div>
              </div>

              <div className="why-chips">
                <span className="why-chip">React &amp; Next.js 14</span>
                <span className="why-chip">Progressive Web Apps</span>
                <span className="why-chip">Headless Architecture</span>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Cloud & Infrastructure Solutions */}
          <Reveal className="why-card why-card-cloud" delay={150}>
            <div className="why-card-top">
              <div className="why-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
              </div>
              <span className="why-tag">Multi-Cloud IaC</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Cloud &amp; Infrastructure Solutions</h3>
              <p className="why-card-desc">
                DevOps automation, database design, Docker containerization, and cloud deployment emphasizing security, high uptime, and enterprise scalability.
              </p>

              {/* Visual Cloud Nodes Status */}
              <div className="why-cloud-nodes">
                <div className="cloud-node-item">
                  <span className="cloud-dot active" />
                  <span>AWS &bull; Azure &bull; GCP</span>
                </div>
                <div className="cloud-node-badge">
                  <span>99.9% Uptime SLA</span>
                </div>
              </div>

              <div className="why-chips">
                <span className="why-chip">Docker &amp; Kubernetes</span>
                <span className="why-chip">CI/CD Automation</span>
                <span className="why-chip">Zero-Downtime Deploy</span>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Digital Growth */}
          <Reveal className="why-card why-card-growth" delay={200}>
            <div className="why-card-top">
              <div className="why-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <span className="why-tag">Measurable ROI</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">Digital Growth</h3>
              <p className="why-card-desc">
                Strategic SEO, performance marketing, and conversion rate optimization to accelerate your market presence.
              </p>

              {/* Visual Growth Sparkline Widget */}
              <div className="why-growth-stats">
                <div className="growth-stat-col">
                  <span className="growth-val">+240%</span>
                  <span className="growth-lbl">Search Velocity</span>
                </div>
                <div className="growth-stat-divider" />
                <div className="growth-stat-col">
                  <span className="growth-val">3.2x</span>
                  <span className="growth-lbl">Conversion Lift</span>
                </div>
              </div>

              <div className="why-chips">
                <span className="why-chip">Technical SEO</span>
                <span className="why-chip">Conversion Engineering</span>
                <span className="why-chip">User Analytics</span>
              </div>
            </div>
          </Reveal>

          {/* Card 5: ERP Systems */}
          <Reveal className="why-card why-card-erp" delay={250}>
            <div className="why-card-top">
              <div className="why-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <span className="why-tag">Operational Core</span>
            </div>

            <div className="why-card-body">
              <h3 className="why-card-title">ERP Systems</h3>
              <p className="why-card-desc">
                Complete enterprise resource planning solutions to streamline your business processes and improve operational efficiency.
              </p>

              {/* Visual ERP Sync Indicator */}
              <div className="why-erp-sync">
                <div className="erp-sync-pill">
                  <span className="erp-sync-dot" />
                  <span>Real-Time Multi-Location Ledger Sync</span>
                </div>
              </div>

              <div className="why-chips">
                <span className="why-chip">Stock &amp; Warehouse</span>
                <span className="why-chip">Financial Ledgers</span>
                <span className="why-chip">Automated Audits</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
